import * as path from "node:path";
import * as url from "node:url";

import { test } from "@siteimprove/alfa-test-deprecated";

import { Frontier } from "@siteimprove/alfa-frontier";

import { Crawler } from "../dist/crawler.js";

// TODO: This should be replaced with import.meta.dirname once we switch to Node 22
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixture = `${url.pathToFileURL(__dirname).href}/fixture`;

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
