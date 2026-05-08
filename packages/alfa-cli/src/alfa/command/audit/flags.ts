import { Flag } from "@siteimprove/alfa-command";

import { DEFAULT_ALFA_DIR } from "../common/alfa-dir.js";
import * as scrape from "../scrape/flags.js";

export const Flags = {
  ...scrape.Flags,

  help: Flag.help("Display the help information."),

  alfaDir: Flag.string(
    "alfa-dir",
    `The directory to look for a pre-recorded answers file. If an answers file
    is found it will be used to answer questions during the audit. Defaults to
    "${DEFAULT_ALFA_DIR}".`,
  )
    .type("path")
    .default(DEFAULT_ALFA_DIR),

  output: Flag.string(
    "output",
    `The path to write results to. If no path is provided, results are written
    to stdout.`,
  )
    .type("path")
    .alias("o")
    .optional(),

  interviewer: Flag.string(
    "interviewer",
    `The interviewer to use for answering questions during the audit. If not
    provided, questions will be left unanswered.`,
  )
    .type("name or package")
    .alias("i")
    .optional(),

  format: Flag.string("format", "The reporting format to use.")
    .type("name or package")
    .alias("f")
    .default("json"),

  outcomes: Flag.string(
    "outcome",
    `The type of outcome to include in the results. If not provided, all types
    of outcomes are included. This flag can be repeated to include multiple
    types of outcomes.`,
  )
    .choices("passed", "failed", "inapplicable", "cantTell")
    .repeatable()
    .optional(),

  cpuProfile: Flag.string(
    "cpu-profile",
    `The path to write a CPU profile of the audit to. If no path is provided,
    no CPU profile is made.`,
  )
    .type("path")
    .optional(),

  heapProfile: Flag.string(
    "heap-profile",
    `The path to write a heap profile of the audit to. If no path is provided,
    no heap profile is made.`,
  )
    .type("path")
    .optional(),
};
