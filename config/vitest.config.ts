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

if (process.version.startsWith("v26")) {
  // Node26 is breaking the utterly outdated yauzl 2 and extract-zip, which are
  // used by webdriver to extract the puppeteer browser; plus some direct problem
  // in webdriver HTTP headings. Node 24.16 had the same root cause backported
  // and also causes the problem.
  // Until webdriver updates and fixes these problems, we simply skip its tests
  // in Node26/24.16. Given that the CI/CD also runs Node 22 and 24.14, this
  // should be OK.
  // Another possibility is to forces yauzl resolution to 3.*, out of the semver
  // range for extract-zip. However, (i) this does not fix the HTTP heading
  // problem; and (ii) overrides out of semver is often a wonky fix at best.
  //
  // Monitor https://github.com/webdriverio/webdriverio/issues/15265 for updates
  // on Webdriver side.
  // See also https://github.com/max-mapper/extract-zip/issues/154 (unlikley to
  // be acted upon as the last commits to that repo are from 2020).
  //
  // Also update the integrate workflow to unfix the minor Node 24 version once
  // this is fixed upstream.
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
