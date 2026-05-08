import { Flag } from "@siteimprove/alfa-command";

import { DEFAULT_ALFA_DIR } from "../../common/alfa-dir.js";

export const Flags = {
  help: Flag.help("Display the help information."),

  alfaDir: Flag.string(
    "alfa-dir",
    `The directory containing the session state. Defaults to "${DEFAULT_ALFA_DIR}".`,
  )
    .type("path")
    .default(DEFAULT_ALFA_DIR),
};
