import { Flag } from "@siteimprove/alfa-command";

import * as scrape from "../scrape/flags.js";

export const Flags = {
  ...scrape.Flags,

  start: Flag.string(
    "start",
    "Start a new review session for the given URL.",
  ).optional(),

  answer: Flag.string(
    "answer",
    `Provide an answer for a recorded question as a hash=value pair.
    This flag can be repeated to provide multiple answers in one invocation.`,
  )
    .repeatable()
    .optional(),

  reset: Flag.empty(
    "reset",
    "Clear the current session, cached scrape, and recorded questions. Answers are preserved.",
  ).optional(),

  help: Flag.help("Display the help information."),
};
