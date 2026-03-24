import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/alfa-*/test/**/*.spec.ts?(x)"],
    exclude: [
      // Packages with integration to a tests launcher use that launcher, and are
      // therefore skipped here. Use `yarn test-other` to run those.
      "packages/alfa-angular", // no actual test
      "packages/alfa-angular-test",
      "packages/alfa-cypress",
      "packages/alfa-jasmine",
      "packages/alfa-jest",
      // avoiding webdriver shenanigans by calling the node script directly
      "packages/alfa-webdriver",
    ],
    // Several tests, notably the ones that spawn a new browser instance, tend
    // to take a lot of time… Especially when launching all tests simultaneously.
    testTimeout: 60_000 /* ms */,
    // Some packages have vitest use jsdom to build the dom, it is just simpler
    // to define it at top-level and share it.
    environment: "jsdom",
  },
});
