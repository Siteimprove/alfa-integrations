import { Flag } from "@siteimprove/alfa-command";

import * as scrape from "../scrape/flags.js";

export const Flags = {
  ...scrape.Flags,

  help: Flag.help("Display the help information."),
};
