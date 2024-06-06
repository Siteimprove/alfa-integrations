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
    "packages/alfa-cli": { entry: ["bin/alfa.ts!"], project: ["bin/**/*.ts!"] },
    "packages/alfa-webdriver": {
      entry,
      project,
      ignoreDependencies: ["@types/debug"],
    },
    "packages/*": { entry, project },
  },
};

export default config;
