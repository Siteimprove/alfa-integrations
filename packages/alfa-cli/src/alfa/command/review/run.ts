/// <reference types="node" />

import * as fs from "node:fs/promises";

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
  answersPath,
  ensureAlfaDir,
  questionsPath,
  scrapePath,
  sessionPath,
} from "../common/alfa-dir.js";
import {
  readAnswers,
  readSession,
  writeQuestions,
  writeSession,
} from "../common/question-store.js";
import { createRecordingOracle } from "../common/recording-oracle.js";
import { formatUnanswered, plural } from "./utils.js";

import type { Arguments } from "./arguments.js";
import type { Flags } from "./flags.js";

import * as scrape from "../scrape/run.js";


export const run: Command.Runner<typeof Flags, typeof Arguments> = async ({
  flags,
  args: { url: target },
}) => {
  await ensureAlfaDir(flags.alfaDir);

  const sessionFilePath = sessionPath(flags.alfaDir);

  const existing = readSession(sessionFilePath);
  if (existing !== null) {
    return Err.of(
      `A session is already active for ${existing.url}. Run 'alfa review reset' first.`,
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

  const answersFilePath = answersPath(flags.alfaDir);
  const questionsFilePath = questionsPath(flags.alfaDir);

  await fs.writeFile(scrapePath(flags.alfaDir), pageJson + "\n");

  const answers = readAnswers(answersFilePath);
  const { oracle, getQuestions } = createRecordingOracle(
    answers,
    page.document,
  );
  await Audit.of(page, rules, oracle).evaluate();

  const discovered = [...getQuestions()];
  writeQuestions(questionsFilePath, discovered);

  writeSession(sessionFilePath, {
    url: target,
    round: 1,
    startedAt: new Date().toISOString(),
  });

  const listing = formatUnanswered(discovered, answers);
  return Result.of(
    `Session started for ${target}.\n` +
      `Recorded ${discovered.length} ${plural(discovered.length, "question")}.\n\n` +
      listing +
      `\n\nRun 'alfa review answer hash=value ...' to provide answers.`,
  );
};
