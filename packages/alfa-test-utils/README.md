# alfa-test-utils

Utilities for running Alfa locally and uploading results to the Siteimprove Intelligence Platform.

## Installation

Alfa is distributed as npm packages in the Github registry. See [Github documentation on the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package) for configuring your package manager to use the Github registry for the `@siteimprove` organisation.

```bash
$ npm install --save-dev @siteimprove/alfa-test-utils
```
or
```bash
$ yarn add --dev @siteimprove/alfa-test-utils
```

## Basic usage

Use scraper packages such as `@siteimprove/alfa-playwright` to grab a page, then a simple test script could look like this:

```typescript
import { Audit, Rules, SIP } from "@siteimprove/alfa-test-utils";

Audit.run(page, { rules: { include: Rules.aaFilter } }).then((outcomes) => {
  SIP.upload(outcomes, {
    userName: process.env.SI_USERNAME,
    apiKey: prcoess.env.SI_API_KEY,
    testName: "WCAG 2.2 AA conformance test",
  }).then(console.log);
});
```
