import { Argument } from "@siteimprove/alfa-command";

export const Arguments = {
  file: Argument.string(
    "file",
    `The path to a result file produced by "alfa audit". If not provided, the
    result is read from stdin.`,
  ).optional(),
};
