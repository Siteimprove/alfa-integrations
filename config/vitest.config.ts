import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/alfa-*/test/**/*.spec.ts?(x)"],
    // Packages with integration to a tests launcher use that launcher, and are
    // therefore skipped here. Use `yarn test:other` to run those.
    exclude: [
      "packages/alfa-cypress",
      "packages/alfa-jest",
      // TODO
      "packages/alfa-angular",
      "packages/alfa-assert",
      "packages/alfa-chai",
      "packages/alfa-cheerio",
      "packages/alfa-cli",
      "packages/alfa-command",
      "packages/alfa-crawler",
      "packages/alfa-enzyme",
      "packages/alfa-formatter",
      "packages/alfa-formatter-earl",
      "packages/alfa-formatter-json",
      "packages/alfa-formatter-sarif",
      "packages/alfa-frontier",
      "packages/alfa-interviewer",
      "packages/alfa-jasmine",
      "packages/alfa-jquery",
      "packages/alfa-playwright",
      "packages/alfa-puppeteer",
      "packages/alfa-react",
      "packages/alfa-scraper",
      "packages/alfa-selenium",
      "packages/alfa-unexpected",
      "packages/alfa-vue",
      "packages/alfa-webdriver",
    ],
  },
});
