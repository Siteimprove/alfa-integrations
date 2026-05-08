/// <reference types="node" />

import * as fs from "node:fs";

import { Audit, Outcome } from "@siteimprove/alfa-act";
import type { Command } from "@siteimprove/alfa-command";
import { Formatter } from "@siteimprove/alfa-formatter";
import { Interviewer } from "@siteimprove/alfa-interviewer";
import { Iterable } from "@siteimprove/alfa-iterable";
import { None, Option } from "@siteimprove/alfa-option";
import type { Err } from "@siteimprove/alfa-result";
import { Result } from "@siteimprove/alfa-result";
import { Page } from "@siteimprove/alfa-web";

// TODO: replace with experimental rules once published
// import { experimentalRules, type Flattened } from "@siteimprove/alfa-rules";
// const { R98, R101 } = experimentalRules;
// const rules = [R98, R101] as Array<Flattened.Rule>;
import rules from "@siteimprove/alfa-rules";

import { Profiler } from "../../profiler.js";

import type { Arguments } from "./arguments.js";
import type { Flags } from "./flags.js";

import * as scrape from "../scrape/run.js";

import { ANSWERS_PATH } from "../common/paths.js";
import { createAnsweringOracle } from "../common/answering-oracle.js";
import { readAnswers } from "../common/question-store.js";

export const run: Command.Runner<typeof Flags, typeof Arguments> = async ({
  flags,
  args: { url: target },
}) => {
  const formatter = await Formatter.load<any, any, any, any>(flags.format);

  if (!formatter.isOk()) {
    return formatter as Err<string>;
  }

  const interviewer = Option.from(
    await flags.interviewer
      .map((interviewer) => Interviewer.load<any, any, any, any>(interviewer))
      .getOr(undefined),
  );

  if (interviewer.some((interviewer) => interviewer.isErr())) {
    // TS can't narrow on .some() as it would incorrectly narrow the "false"
    // branch to Err.
    return interviewer.getUnsafe() as Err<string>;
  }

  let json: string;

  if (!target.isSome()) {
    json = fs.readFileSync(0, "utf-8");
  } else {
    const result = await scrape.run({
      flags: {
        ...flags,
        output: None,
      },
      args: {
        url: target.get(),
      },
    });

    if (!result.isOk()) {
      return result as Err<string>;
    }

    json = result.get();
  }

  const pageResult = Page.from(JSON.parse(json));

  if (pageResult.isErr()) {
    return pageResult;
  }
  const page = pageResult.getUnsafe();

  // If oracle is provided by --interviewer, use that, otherwise check if there are any pre-recorded answers.
  let oracle = interviewer
    .map((interviewer) => interviewer.getUnsafe()(page, rules))
    .getOr(undefined);

  if (oracle === undefined) {
    const answersFilePath = ANSWERS_PATH;
    if (fs.existsSync(answersFilePath)) {
      process.stderr.write(`Using answers from ${answersFilePath}\n`);
      const answers = readAnswers(answersFilePath);
      oracle = createAnsweringOracle(answers, page.document);
    }
  }

  const audit = Audit.of(page, rules, oracle);

  for (const _ of flags.cpuProfile) {
    await Profiler.CPU.start();
  }

  for (const _ of flags.heapProfile) {
    await Profiler.Heap.start();
  }

  let outcomes = await audit.evaluate();

  for (const path of flags.cpuProfile) {
    fs.writeFileSync(path, JSON.stringify(await Profiler.CPU.stop()) + "\n");
  }

  for (const path of flags.heapProfile) {
    fs.writeFileSync(path, JSON.stringify(await Profiler.Heap.stop()) + "\n");
  }

  if (flags.outcomes.isSome()) {
    const filter = new Set(flags.outcomes.get());

    outcomes = Iterable.filter(outcomes, (outcome) => {
      if (Outcome.isPassed(outcome)) {
        return filter.has("passed");
      }

      if (Outcome.isFailed(outcome)) {
        return filter.has("failed");
      }

      if (Outcome.isInapplicable(outcome)) {
        return filter.has("inapplicable");
      }

      return filter.has("cantTell");
    });
  }

  const output = await formatter.get()(page, rules, outcomes);

  if (flags.output.isSome()) {
    fs.writeFileSync(flags.output.get(), output + "\n");
    return Result.of("");
  } else {
    return Result.of(output);
  }
};
