#!/usr/bin/env node

/// <reference types="node" />

import * as path from "path";
import * as tty from "tty";

import { Command, Flag } from "@siteimprove/alfa-command";
import { None } from "@siteimprove/alfa-option";
import { Err } from "@siteimprove/alfa-result";

import * as pkg from "../package.json";

import audit from "./alfa/command/audit";
import scrape from "./alfa/command/scrape";

const {
  argv: [, bin],
  platform,
  arch,
  version,
} = process;

const application = Command.withSubcommands(
  path.basename(bin),
  `${pkg.name}/${pkg.version} ${platform}-${arch} node-${version}`,
  `The tool for all your accessibility needs on the command line.`,
  {
    help: Flag.help("Display the help information."),
    version: Flag.version("Output the current version."),
  },
  (self) => ({
    audit: audit(self),
    scrape: scrape(self),
  }),
  None
);

application
  .run(process.argv.slice(2))
  .catch((err: Error) => Err.of(`${err.stack ?? err.message}`))
  .then(async (result) => {
    process.exitCode = result.isOk() ? 0 : 1;

    let stream: tty.WriteStream;
    let output: string;

    if (result.isOk()) {
      stream = process.stdout;
      output = result.get();
    } else {
      stream = process.stderr;
      // This is the else branch of a .isOk()
      output = result.getErrUnsafe();
    }

    output = output.trimRight();

    if (output.length > 0) {
      stream.write(output + "\n");
    }
  });
