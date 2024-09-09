import type { KnipConfig } from "knip";

const entry = ["src/index.ts!", "test/**/*.ts", "test/**/*.tsx"];
const project = ["src/**/*.ts!", "test/**/*.ts", "test/**/*.tsx"];

const config: KnipConfig = {
  workspaces: {
    ".": {
      entry: ["scripts/*.mjs"],
      project: ["scripts/**/*.mjs"],
      ignoreDependencies: [
        "@changesets/cli",
        "@siteimprove/alfa-cli",
        "prettier",
      ],
    },
    "packages/alfa-cli": { entry: ["src/alfa.ts!"], project },
    "packages/alfa-webdriver": {
      entry,
      project,
      ignoreDependencies: ["@types/debug"],
    },
    "packages/*": { entry, project },
  },
  // {@link https://github.com/webpro-nl/knip/issues/779}
  // Sadly it seems that this cannot be set up at the package level only.
  // "assertor" and "ACTContext" from alfa-formatter-earl are incorrectly
  // reported.
  // See also {@link https://github.com/webpro-nl/knip/issues/763}
  ignoreExportsUsedInFile: true
};

export default config;
