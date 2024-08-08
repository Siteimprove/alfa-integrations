# Auditing a page

See, [how to scrape a page](scraping/scraping.md) for getting the page in the first place, and [the introduction](../README.md) for installing the `@siteimprove/alfa-test-utils` package.

This page shows basic usage of the scraping, see [common configuration](./configuration.md) for frequent set up such as selecting the rules to run or the issues to show; and [advanced configuration](./advanced.md) for more complex setups.

## Basic usage

Simply use the `Audit.run` function on the scraped page:

```typescript
import { Audit } from "@siteimprove/alfa-test-utils";

const alfaResult = await Audit.run(alfaPage);
```

The `alfaResult` object contains may properties, see [its technical documentation](https://github.com/Siteimprove/alfa-integrations/blob/main/docs/api/alfa-test-utils.audit.result.md) for details. These are not detailed here since it is mostly intended to be passed as is to the [reporting utilities](../reporting/basic.md).
