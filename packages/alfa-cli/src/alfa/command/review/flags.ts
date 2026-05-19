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
    `Provide answers as a space-separated list of hash=value pairs.
    Example: --answer "abc123=true def456=#ff0000,#000000"`,
  ).optional(),

  reset: Flag.empty(
    "reset",
    "Clear the current session, cached scrape, and recorded questions. Answers are preserved.",
  ).optional(),

  help: Flag.help("Display the help information."),
};
