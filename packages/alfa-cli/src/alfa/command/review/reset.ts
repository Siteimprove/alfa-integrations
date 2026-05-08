import { Command } from "@siteimprove/alfa-command";
import { Option } from "@siteimprove/alfa-option";

import { Flags } from "./reset/flags.js";
import { Arguments } from "./reset/arguments.js";

/**
 * @internal
 */
export default (parent: Command) =>
  Command.withArguments(
    "reset",
    parent.version,
    `Clear the current session: delete the session state, cached scrape, and
    recorded questions. Answers are preserved so they can be reused in a new
    session.`,
    Flags,
    Arguments,
    Option.of(parent),
    () => async (...args) => {
      const { run } = await import("./reset/run.js");
      return run(...args);
    },
  );
