/// <reference types="node" />

import * as fs from "node:fs";

import { Audit } from "@siteimprove/alfa-act";
import type { Command } from "@siteimprove/alfa-command";
import { Err, Result } from "@siteimprove/alfa-result";
import { experimentalRules, type Flattened } from "@siteimprove/alfa-rules";
import { Page } from "@siteimprove/alfa-web";

import {
  answersPath,
  questionsPath,
  scrapePath,
  sessionPath,
} from "../../common/alfa-dir.js";
import type {
  AnswerValue,
  StoredAnswers,
  StoredQuestion,
} from "../../common/question-store.js";
import {
  readAnswers,
  readQuestions,
  readSession,
  writeAnswers,
  writeQuestions,
  writeSession,
} from "../../common/question-store.js";
import { createRecordingOracle } from "../../common/recording-oracle.js";
import { formatUnanswered, plural } from "../utils.js";

import type { Arguments } from "./arguments.js";
import type { Flags } from "./flags.js";

const { R98, R101 } = experimentalRules;
const rules = [R98, R101] as Array<Flattened.Rule>;

export const run: Command.Runner<typeof Flags, typeof Arguments> = async ({
  flags,
  args: { pairs },
}) => {
  const sPath = sessionPath(flags.alfaDir);
  const session = readSession(sPath);
  if (session === null) {
    return Err.of("No active session. Run 'alfa review <url>' first.");
  }

  const scrapeFile = scrapePath(flags.alfaDir);
  if (!fs.existsSync(scrapeFile)) {
    return Err.of(
      "Scrape file missing. Run 'alfa review reset' and 'alfa review <url>' to restart.",
    );
  }

  const aPath = answersPath(flags.alfaDir);
  const qPath = questionsPath(flags.alfaDir);

  let answers: StoredAnswers = readAnswers(aPath);

  if (pairs.isSome()) {
    const pairsArray = [...pairs.get()];
    if (pairsArray.length > 0) {
      const questions = readQuestions(qPath);
      const unanswered = questions.filter((q) => !(q.hash in answers));
      answers = applyPairs(answers, pairsArray, questions, unanswered);
      writeAnswers(aPath, answers);
    }
  }

  const pageJson = fs.readFileSync(scrapeFile, "utf-8");
  const page = Page.from(JSON.parse(pageJson)).getUnsafe();
  const { oracle, getQuestions } = createRecordingOracle(
    answers,
    page.document,
  );
  await Audit.of(page, rules, oracle).evaluate();

  const discovered = getQuestions();
  const existing = readQuestions(qPath);
  const existingHashes = new Set(existing.map((q) => q.hash));
  const toAdd = discovered.filter((q) => !existingHashes.has(q.hash));

  if (toAdd.length > 0) {
    writeQuestions(qPath, [...existing, ...toAdd]);
  }

  writeSession(sPath, { ...session, round: session.round + 1 });

  const allQuestions = toAdd.length > 0 ? [...existing, ...toAdd] : existing;
  const unansweredCount = allQuestions.filter(
    (q) => !(q.hash in answers),
  ).length;

  if (toAdd.length === 0 && unansweredCount === 0) {
    return Result.of(
      "No new questions found. All questions have been answered. You can now run 'alfa review reset' to end the session.",
    );
  }

  const header =
    toAdd.length > 0
      ? `${toAdd.length} new ${plural(toAdd.length, "question")} discovered.\n\n`
      : "No new questions discovered.\n\n";

  return Result.of(header + formatUnanswered(allQuestions, answers));
};

function applyPairs(
  existing: StoredAnswers,
  pairs: ReadonlyArray<string>,
  questions: StoredQuestion[],
  unanswered: StoredQuestion[],
): StoredAnswers {
  const updated = { ...existing };
  const questionByHash = new Map(questions.map((q) => [q.hash, q]));
  let positionalIndex = 0;

  for (const pair of pairs) {
    const eqIdx = pair.indexOf("=");

    if (eqIdx === -1) {
      // Positional: map to the next unanswered question in list order.
      const question = unanswered[positionalIndex++];
      if (question === undefined) {
        process.stderr.write(
          `Warning: more values than unanswered questions, ignoring "${pair}"\n`,
        );
        continue;
      }
      const value = parseAnswerValue(pair, question.type);
      if (value !== undefined) {
        updated[question.hash] = value;
      }
    } else {
      // Keyed: hash=value or 1-based-index=value.
      const key = pair.slice(0, eqIdx);
      const rawValue = pair.slice(eqIdx + 1);
      const index = /^\d+$/.test(key) ? parseInt(key, 10) : NaN;
      let hash: string;
      if (!isNaN(index)) {
        const question = unanswered[index - 1];
        if (question === undefined) {
          process.stderr.write(
            `Warning: index ${index} is out of range (${unanswered.length} unanswered ${plural(unanswered.length, "question")}), ignoring "${pair}"\n`,
          );
          continue;
        }
        hash = question.hash;
      } else {
        hash = key;
      }
      const type = questionByHash.get(hash)?.type ?? "string";
      const value = parseAnswerValue(rawValue, type);
      if (value !== undefined) {
        updated[hash] = value;
      }
    }
  }

  return updated;
}

function parseAnswerValue(raw: string, type: string): AnswerValue | undefined {
  if (raw === "") return undefined;
  switch (type) {
    case "boolean":
      if (raw === "true" || raw === "y" || raw === "yes") return true;
      if (raw === "false" || raw === "n" || raw === "no") return false;
      return undefined;
    case "node":
      if (raw === "null" || raw === "none" || raw === "-") return null;
      return raw;
    case "node[]":
      return raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    case "color[]":
      return raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    case "string":
      return raw;
    default:
      return raw;
  }
}
