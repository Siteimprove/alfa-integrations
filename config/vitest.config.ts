import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/alfa-*/test/**/*.spec.ts?(x)"],
    exclude: [
      // Packages with integration to a tests launcher use that launcher, and are
      // therefore skipped here. Use `yarn test-other` to run those.
      "packages/alfa-cypress",
      "packages/alfa-jest",
      // tests disabled due to unstability
      "packages/alfa-vue",
    ],
    // Several tests, notably the ones that spawn a new browser instance, tend
    // to take a lot of time… Especially when launching all tests simultaneously.
    testTimeout: 60_000 /* ms */,
  },
});
