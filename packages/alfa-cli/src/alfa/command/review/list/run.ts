import type { Command } from "@siteimprove/alfa-command";
import { Err, Result } from "@siteimprove/alfa-result";

import {
  ANSWERS_PATH,
  QUESTIONS_PATH,
  SESSION_PATH,
} from "../../common/paths.js";
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
  const session = readSession(SESSION_PATH);
  if (session === null) {
    return Err.of("No active session. Run 'alfa review <url>' first.");
  }

  const questions = readQuestions(QUESTIONS_PATH);
  const answers = readAnswers(ANSWERS_PATH);

  return Result.of(formatUnanswered(questions, answers));
};
