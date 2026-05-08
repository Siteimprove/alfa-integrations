import { Command } from "@siteimprove/alfa-command";
import { Option } from "@siteimprove/alfa-option";

import { Arguments } from "./interview/arguments.js";
import { Flags } from "./interview/flags.js";

import answer from "./interview/answer.js";
import list from "./interview/list.js";
import status from "./interview/status.js";
import reset from "./interview/reset.js";

/**
 * @internal
 */
export default (parent: Command) =>
  Command.withSubcommandsAndArguments(
    "interview",
    parent.version,
    "Conduct an interview recording answers to questions asked during an accessibility audit.",
    Flags,
    Arguments,
    (self) => ({
      answer: answer(self),
      list: list(self),
      status: status(self),
      reset: reset(self),
    }),
    Option.of(parent),
    () =>
      async (...args) => {
        const { run } = await import("./interview/run.js");
        return run(...args);
      },
  );
