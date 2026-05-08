import { Command } from "@siteimprove/alfa-command";
import { Option } from "@siteimprove/alfa-option";

import { Arguments } from "./review/arguments.js";
import { Flags } from "./review/flags.js";

/**
 * @internal
 */
export default (parent: Command) =>
  Command.withArguments(
    "review",
    parent.version,
    "Review potential accessibility issues by answering questions discovered during an audit.",
    Flags,
    Arguments,
    Option.of(parent),
    () =>
      async (...args) => {
        const { run } = await import("./review/run.js");
        return run(...args);
      },
  );
