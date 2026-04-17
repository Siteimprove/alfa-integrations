import { test } from "@siteimprove/alfa-test";
import * as cheerio from "cheerio";

import { Cheerio } from "../dist/cheerio.js";

test(".toPage() converts a Cheerio node to an Alfa page", (t) => {
  const cheerioNode = cheerio.load('<h2 class="title">Hello world</h2>')("h2");

  t.deepEqual(Cheerio.toPage(cheerioNode).toJSON(), {
    request: { method: "GET", url: "about:blank", headers: [], body: "" },
    response: { url: "about:blank", status: 200, headers: [], body: "" },
    document: {
      type: "document",
      children: [
        {
          type: "element",
          children: [{ type: "text", data: "Hello world", box: null }],
          namespace: "http://www.w3.org/1999/xhtml",
          prefix: null,
          name: "h2",
          attributes: [
            {
              type: "attribute",
              namespace: null,
              prefix: null,
              name: "class",
              value: "title",
            },
          ],
          style: null,
          shadow: null,
          content: null,
          box: null,
        },
      ],
      style: [],
    },
    device: {
      type: "screen",
      viewport: { width: 1280, height: 720, orientation: "landscape" },
      display: { resolution: 1, scan: "progressive" },
      scripting: { enabled: true },
      preferences: [],
    },
  });
});
