import { Flag } from "@siteimprove/alfa-command";
import { Option } from "@siteimprove/alfa-option";

export const Flags = {
  help: Flag.help("Display the help information."),

  outcome: Flag.string(
    "outcome",
    `The type of outcome to include. This flag can be repeated to filter
     multiple types. If omitted, all outcome types are included.
     Mutually exclusive with --node.`,
  )
    .choices("passed", "failed", "inapplicable", "cantTell")
    .repeatable()
    .optional()
    .default(Option.of(["failed" as const])),

  node: Flag.string(
    "node",
    `The internalId of a node to look up in the result's input page.`,
  )
    .type("internalId")
    .optional(),

  format: Flag.string(
    "format",
    `The format used to represent resolved nodes.
     "path" emits the node's XPath (default),
     "html" emits the node's outer HTML,
     "json" emits the full node JSON.`,
  )
    .choices("path", "html", "json")
    .default("path"),

  take: Flag.integer(
    "take",
    `The maximum number of outcomes to return.
     Cannot be used with --node. Must be a positive integer.
     If omitted, all matching outcomes are returned.`,
  ).optional(),

  skip: Flag.integer(
    "skip",
    `The number of outcomes to skip before returning results.
     Cannot be used with --node. Must be a non-negative integer.
     If omitted, no outcomes or groups are skipped.
     Can be combined with --take for pagination.`,
  ).optional(),

  output: Flag.string(
    "output",
    `The path to write results to. If no path is provided, results are written
     to stdout.`,
  )
    .type("path")
    .alias("o")
    .optional(),
};
