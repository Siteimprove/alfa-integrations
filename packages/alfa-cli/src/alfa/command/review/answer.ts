import { Command } from "@siteimprove/alfa-command";
import { Option } from "@siteimprove/alfa-option";

import { Flags } from "./answer/flags.js";
import { Arguments } from "./answer/arguments.js";

/**
 * @internal
 */
export default (parent: Command) =>
  Command.withArguments(
    "answer",
    parent.version,
    `Provide answers for recorded questions as hash=value pairs, then re-run the
    audit using the cached scrape to discover any newly unlocked questions. Run
    'alfa review list' to see the hashes of unanswered questions.`,
    Flags,
    Arguments,
    Option.of(parent),
    () => async (...args) => {
      const { run } = await import("./answer/run.js");
      return run(...args);
    },
  );
