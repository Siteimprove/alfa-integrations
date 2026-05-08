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

import type { Arguments } from "./arguments.js";
import type { Flags } from "./flags.js";

export const run: Command.Runner<typeof Flags, typeof Arguments> = async ({
  flags,
}) => {
  const session = readSession(sessionPath(flags.alfaDir));
  if (session === null) {
    return Err.of("No active session. Run 'alfa review <url>' first.");
  }

  const questions = readQuestions(questionsPath(flags.alfaDir));
  const answers = readAnswers(answersPath(flags.alfaDir));
  const unanswered = questions.filter((q) => !(q.hash in answers)).length;

  return Result.of(
    `Session status\n` +
      `  URL:         ${session.url}\n` +
      `  Started:     ${session.startedAt}\n` +
      `  Round:       ${session.round}\n` +
      `  Questions:   ${questions.length} total, ${unanswered} unanswered`,
  );
};
