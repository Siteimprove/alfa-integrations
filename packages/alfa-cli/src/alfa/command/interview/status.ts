import { Command } from "@siteimprove/alfa-command";
import { Option } from "@siteimprove/alfa-option";

import { Flags } from "./status/flags.js";
import { Arguments } from "./status/arguments.js";

/**
 * @internal
 */
export default (parent: Command) =>
  Command.withArguments(
    "status",
    parent.version,
    "Print information about the current interview session.",
    Flags,
    Arguments,
    Option.of(parent),
    () => async (...args) => {
      const { run } = await import("./status/run.js");
      return run(...args);
    },
  );
