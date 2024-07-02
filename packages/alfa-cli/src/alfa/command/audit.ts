import { Command } from "@siteimprove/alfa-command";
import { Option } from "@siteimprove/alfa-option";

import { Arguments } from "./audit/arguments.js";
import { Flags } from "./audit/flags.js";

/**
 * @internal
 */
export default (parent: Command) =>
  Command.withArguments(
    "audit",
    parent.version,
    "Perform an accessibility audit of a page.",
    Flags,
    Arguments,
    Option.of(parent),
    () => async (...args) => {
      const { run } = await import("./audit/run.js");
      return run(...args);
    }
  );
