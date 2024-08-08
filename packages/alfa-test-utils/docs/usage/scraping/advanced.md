# Advanced scraping

This page describes [scraping](./integrated.md) options for projects who do not have a browser automation already set up.

## Standalone scraper

The `@siteimprove/alfa-scraper` package provides a standalone package (using puppeteer internally). It might be a better fit for projects who do not already have browser automation and end-to-end tests in place.

Install the `@siteimprove/alfa-scraper` package:

```shell
$ npm install --save-dev @siteimprove/alfa-scraper
```

or

```shell
$ yarn add --dev @siteimprove/alfa-scraper
```

Then, point the scraper at a live page (this may require to set up a local server for it, or use Node's `url.pathToFileURL` to point at a local file):

```typescript
import { Scraper } from "@siteimprove/alfa-scraper";

const alfaPage = await Scraper.of()
  .scrape("http://localhost:8080")
  .then((result) => result.getUnsafe("Could not scrape page"));
```

## Command Line Scraper

The `@siteimprove/alfa-cli` package provides a scraper usable from the command line (using puppeteer internally). The resulting scrape must be saved to a local file and then loaded into a page. Thus, it may not be the best option for automated tests but can be useful for quick iteration and experimentation of the process.

Install the `@siteimprove/alfa-cli` and `@siteimprove/alfa-web` packages:

```shell
$ npm install --save-dev @siteimprove/alfa-cli @siteimprove/alfa-web
```

or

```shell
$ yarn add --dev @siteimprove/alfa-cli @siteimprove/alfa-web
```

Scrape and save a page:

```shell
$ npm run alfa scrape -o page.json http://localhost:8080
```

or

```shell
$ yarn alfa scrape -o page.json http://localhost:8080
```

(use `alfa scrape --help` for more options)

Then load the page into an Alfa object:

```typescript
import fs from "node:fs";
import path from "node:path";
import { Page } from "@siteimprove/alfa-web";

const file = "page.json";
const alfaPage = Page.from(
  JSON.parse(fs.readFileSync(path.join(".", file), "utf-8"))
).getUnsafe("Could not parse the page");
```

## Generic integration

The `@siteimprove/alfa-dom/native` package provides a `Native.fromNode` function that can be used to convert any document object into an Alfa document (and page). It can, notably, be used inside an actual browser (e.g. as part of a script or extension) or injected into a headless browser by whichever means the browser automation tool provides for this. See the [Selenium](./integrated.md#selenium) integration for some example usage.
