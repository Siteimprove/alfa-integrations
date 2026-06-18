import { Command } from "@siteimprove/alfa-command";
import { Option } from "@siteimprove/alfa-option";

import { Arguments } from "./query/arguments.js";
import { Flags } from "./query/flags.js";

/**
 * @internal
 */
export default (parent: Command) =>
  Command.withArguments(
    "query",
    parent.version,
    `Query a result file produced by "alfa audit". Filter outcomes by type with
    --outcome, or look up a specific node by its internalId with --node. If no
    file is provided, the result is read from stdin.`,
    Flags,
    Arguments,
    Option.of(parent),
    () => async (...args) => {
      const { run } = await import("./query/run.js");
      return run(...args);
    },
  );
