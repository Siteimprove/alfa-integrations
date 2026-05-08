import type { Command } from "@siteimprove/alfa-command";
import { Err, Result } from "@siteimprove/alfa-result";

import {
  answersPath,
  questionsPath,
  sessionPath,
} from "../../common/alfa-dir.js";
import {
  readAnswers,
  readQuestions,
  readSession,
} from "../../common/question-store.js";
import { formatUnanswered } from "../utils.js";

import type { Arguments } from "./arguments.js";
import type { Flags } from "./flags.js";

export const run: Command.Runner<typeof Flags, typeof Arguments> = async ({
  flags,
}) => {
  const session = readSession(sessionPath(flags.alfaDir));
  if (session === null) {
    return Err.of("No active session. Run 'alfa interview <url>' first.");
  }

  const questions = readQuestions(questionsPath(flags.alfaDir));
  const answers = readAnswers(answersPath(flags.alfaDir));

  return Result.of(formatUnanswered(questions, answers));
};
