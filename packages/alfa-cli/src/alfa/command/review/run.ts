/// <reference types="node" />

import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";

import { Audit } from "@siteimprove/alfa-act";
import type { Command } from "@siteimprove/alfa-command";
import { None } from "@siteimprove/alfa-option";
import { Err, Result } from "@siteimprove/alfa-result";
// TODO: replace with experimental rules once published
// import { experimentalRules, type Flattened } from "@siteimprove/alfa-rules";
// const { R98, R101 } = experimentalRules;
// const rules = [R98, R101] as Array<Flattened.Rule>;
import rules from "@siteimprove/alfa-rules";
import { Page } from "@siteimprove/alfa-web";

import {
  ALFA_DIR,
  ANSWERS_PATH,
  QUESTIONS_PATH,
  SCRAPE_PATH,
  SESSION_PATH,
} from "../common/paths.js";
import {
  readAnswers,
  readQuestions,
  readSession,
  writeAnswers,
  writeQuestions,
  writeSession,
  type AnswerValue,
  type StoredAnswers,
  type StoredQuestion,
} from "../common/question-store.js";
import { createRecordingOracle } from "../common/recording-oracle.js";
import { formatUnanswered, plural } from "./utils.js";

import type { Arguments } from "./arguments.js";
import type { Flags } from "./flags.js";

import * as scrape from "../scrape/run.js";

export const run: Command.Runner<typeof Flags, typeof Arguments> = async ({
  flags,
}) => {
  const { start, answer, reset } = flags;

  const active = [start.isSome(), answer.isSome(), reset.isSome()].filter(
    Boolean,
  ).length;

  if (active === 0) {
    return Err.of(
      "Specify one of --start <url>, --answer <hash=value>, or --reset. Run 'alfa review --help' for usage.",
    );
  }

  if (active > 1) {
    return Err.of(
      "--start, --answer, and --reset are mutually exclusive. Specify only one.",
    );
  }

  if (reset.isSome()) {
    return runReset();
  }

  if (answer.isSome()) {
    return runAnswer(answer.get());
  }

  if (start.isSome()) {
    return runStart(flags, start.get());
  }

  return Err.of("Unexpected state: no operational flag set.");
};

async function runStart(
  flags: Command.Flags.Values<typeof Flags>,
  target: string,
): Promise<Result<string>> {
  await fsPromises.mkdir(ALFA_DIR, { recursive: true });

  const existing = readSession(SESSION_PATH);
  if (existing !== null) {
    return Err.of(
      `A session is already active for ${existing.url}. Run 'alfa review --reset' first.`,
    );
  }

  const scrapeResult = await scrape.run({
    flags: { ...flags, output: None },
    args: { url: target },
  });

  if (scrapeResult.isErr()) {
    return scrapeResult;
  }

  const pageJson = scrapeResult.getUnsafe();
  const pageResult = Page.from(JSON.parse(pageJson));

  if (pageResult.isErr()) {
    return pageResult;
  }

  const page = pageResult.getUnsafe();

  await fsPromises.writeFile(SCRAPE_PATH, pageJson + "\n");

  const answers = readAnswers(ANSWERS_PATH);
  const { oracle, getQuestions } = createRecordingOracle(answers, page.document);
  await Audit.of(page, rules, oracle).evaluate();

  const discovered = [...getQuestions()];
  writeQuestions(QUESTIONS_PATH, discovered);
  writeSession(SESSION_PATH, { url: target, startedAt: new Date().toISOString() });

  const listing = formatUnanswered(discovered, answers);
  return Result.of(
    `Session started for ${target}.\n` +
      `Recorded ${discovered.length} ${plural(discovered.length, "question")}.\n\n` +
      listing +
      `\n\nRun 'alfa review --answer hash=value' to provide answers.`,
  );
}

async function runAnswer(
  pairs: Array<string>,
): Promise<Result<string>> {
  if (readSession(SESSION_PATH) === null) {
    return Err.of("No active session. Run 'alfa review --start <url>' first.");
  }

  if (!fs.existsSync(SCRAPE_PATH)) {
    return Err.of(
      "Scrape file missing. Run 'alfa review --reset' and 'alfa review --start <url>' to restart.",
    );
  }

  let answers: StoredAnswers = readAnswers(ANSWERS_PATH);

  if (pairs.length > 0) {
    const questions = readQuestions(QUESTIONS_PATH);
    const unanswered = questions.filter((q) => !(q.hash in answers));
    answers = applyPairs(answers, pairs, questions, unanswered);
    writeAnswers(ANSWERS_PATH, answers);
  }

  const pageJson = fs.readFileSync(SCRAPE_PATH, "utf-8");
  const page = Page.from(JSON.parse(pageJson)).getUnsafe();
  const { oracle, getQuestions } = createRecordingOracle(answers, page.document);
  await Audit.of(page, rules, oracle).evaluate();

  const discovered = getQuestions();
  const existing = readQuestions(QUESTIONS_PATH);
  const existingHashes = new Set(existing.map((q) => q.hash));
  const toAdd = discovered.filter((q) => !existingHashes.has(q.hash));

  if (toAdd.length > 0) {
    writeQuestions(QUESTIONS_PATH, [...existing, ...toAdd]);
  }

  const allQuestions = toAdd.length > 0 ? [...existing, ...toAdd] : existing;
  const unansweredCount = allQuestions.filter((q) => !(q.hash in answers)).length;

  if (toAdd.length === 0 && unansweredCount === 0) {
    return Result.of(
      "No new questions found. All questions have been answered. You can now run 'alfa review --reset' to end the session.",
    );
  }

  const header =
    toAdd.length > 0
      ? `${toAdd.length} new ${plural(toAdd.length, "question")} discovered.\n\n`
      : "No new questions discovered.\n\n";

  return Result.of(header + formatUnanswered(allQuestions, answers));
}

function runReset(): Result<string> {
  const deleted: string[] = [];

  for (const filePath of [SESSION_PATH, QUESTIONS_PATH, SCRAPE_PATH]) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      deleted.push(filePath);
    }
  }

  if (deleted.length === 0) {
    return Result.of("No active session to reset.");
  }

  return Result.of(
    `Session reset. Deleted:\n${deleted.map((f) => `  ${f}`).join("\n")}\nAnswers preserved.`,
  );
}

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
