import { Command } from "@siteimprove/alfa-command";
import { Option } from "@siteimprove/alfa-option";

import { Arguments } from "./review/arguments.js";
import { Flags } from "./review/flags.js";

import answer from "./review/answer.js";
import reset from "./review/reset.js";

/**
 * @internal
 */
export default (parent: Command) =>
  Command.withSubcommandsAndArguments(
    "review",
    parent.version,
    "Review potential accessibility issues by answering questions discovered during an audit.",
    Flags,
    Arguments,
    (self) => ({
      answer: answer(self),
      reset: reset(self),
    }),
    Option.of(parent),
    () =>
      async (...args) => {
        const { run } = await import("./review/run.js");
        return run(...args);
      },
  );
