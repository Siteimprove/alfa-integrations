/// <reference types="node" />

import * as fs from "node:fs";

import type { Command } from "@siteimprove/alfa-command";
import { Result } from "@siteimprove/alfa-result";

import {
  questionsPath,
  scrapePath,
  sessionPath,
} from "../../common/alfa-dir.js";

import type { Arguments } from "./arguments.js";
import type { Flags } from "./flags.js";

export const run: Command.Runner<typeof Flags, typeof Arguments> = async ({
  flags,
}) => {
  const deleted: string[] = [];

  for (const filePath of [
    sessionPath(flags.alfaDir),
    questionsPath(flags.alfaDir),
    scrapePath(flags.alfaDir),
  ]) {
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
};
