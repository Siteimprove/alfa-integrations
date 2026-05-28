import { defineConfig } from "vitest/config";

const exclude = [
  // alfa-angular is tested through alfa-angular-test.
  "packages/alfa-angular",
  // Packages with integration to a tests launcher use that launcher, and are
  // therefore skipped here. Use `yarn test-other` to run those.
  "packages/alfa-angular-test",
  "packages/alfa-cypress",
  "packages/alfa-jasmine",
  "packages/alfa-jest",
];

console.log(`Running on Node ${process.version}.`);

if (process.version.includes("v26")) {
  // Node26 is breaking the utterly outdated yauzl 2 and extract-zip, which are
  // used by webdriver to extract the puppeteer browser; plus some direct problem
  // in webdriver HTTP headings.
  // Until webdriver updates and fixes these problems, we simply skip the tests
  // in Node26. Given that the CI/CD also runs Node 22 and 24, this should be OK.
  // Another possibility is to forces yauzl resolution to 3.*, out of the semver
  // range for extract-zip. However, (i) this does not fix the HTTP heading
  // problem; and (ii) overrides out of semver is often a wonky fix at best.
  //
  // Monitor https://github.com/webdriverio/webdriverio/issues/15265 for updates
  // on Webdriver side.
  console.log(
    "Skipping Webdriver tests due to Node26/yauzl/extract-zip incompatibility.",
  );
  exclude.push("packages/alfa-webdriver");
}

export default defineConfig({
  test: {
    include: ["packages/alfa-*/test/**/*.spec.ts?(x)"],
    exclude,
    // Several tests, notably the ones that spawn a new browser instance, tend
    // to take a lot of time… Especially when launching all tests simultaneously.
    testTimeout: 60_000 /* ms */,
    // Some packages have vitest use jsdom to build the dom, it is just simpler
    // to define it at top-level and share it than to setup projects with separate
    // configurations.
    environment: "jsdom",
  },
});
