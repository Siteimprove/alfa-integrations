# alfa-test-utils

Utilities for running Alfa locally and uploading results to the Siteimprove Intelligence Platform.

## Installation

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
    apiKey: process.env.SI_API_KEY,
    testName: "WCAG 2.2 AA conformance test",
  }).then(console.log);
});
```

See [the full documentation](https://alfa.siteimprove.com/code-checker) for detailed usage instructions.
