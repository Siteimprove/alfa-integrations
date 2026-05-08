import { Flag } from "@siteimprove/alfa-command";

import * as scrape from "../scrape/flags.js";
import { DEFAULT_ALFA_DIR } from "../common/alfa-dir.js";

export const Flags = {
  ...scrape.Flags,

  help: Flag.help("Display the help information."),

  alfaDir: Flag.string(
    "alfa-dir",
    `The directory to store the session state, cached scrape, and questions in.
     Defaults to "${DEFAULT_ALFA_DIR}".`,
  )
    .type("path")
    .default(DEFAULT_ALFA_DIR),
};
