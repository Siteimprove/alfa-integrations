import { Command } from "@siteimprove/alfa-command";
import { Option } from "@siteimprove/alfa-option";

import { Flags } from "./list/flags.js";
import { Arguments } from "./list/arguments.js";

/**
 * @internal
 */
export default (parent: Command) =>
  Command.withArguments(
    "list",
    parent.version,
    "List all unanswered questions in the current session.",
    Flags,
    Arguments,
    Option.of(parent),
    () => async (...args) => {
      const { run } = await import("./list/run.js");
      return run(...args);
    },
  );
