import { Frontier } from "@siteimprove/alfa-frontier";

import { test } from "@siteimprove/alfa-test-deprecated";

import * as url from "node:url";

import { Crawler } from "../dist/crawler.js";

const fixture = `${url.pathToFileURL(import.meta.dirname).href}/fixture`;

test("#crawl() crawls a frontier", async (t) =>
  await Crawler.with(async (crawler) => {
    const frontier = Frontier.of(fixture, [`${fixture}/a.html`]);

    const pages: Array<string> = [];

    for await (const result of crawler.crawl(frontier)) {
      t.equal(result.isOk(), true);

      pages.push(result.getUnsafe().response.url.toString());
    }

    t.deepEqual(pages, [
      `${fixture}/a.html`,
      `${fixture}/b.html`,
      `${fixture}/c.html`,
    ]);
  }));
