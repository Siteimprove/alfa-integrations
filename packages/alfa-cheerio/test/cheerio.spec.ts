import { Device } from "@siteimprove/alfa-device";
import { h } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { test } from "@siteimprove/alfa-test";
import { Page } from "@siteimprove/alfa-web";
import * as cheerio from "cheerio";

import { Cheerio } from "../dist/cheerio.js";

test(".toPage() creates an Alfa page", (t) => {
  const doc = cheerio.load("<html><p>Hello World</p></html>");

  const actual = Cheerio.toPage(doc("html"));

  const expected = Page.of(
    Request.empty(),
    Response.empty(),
    h.document([
      h.element(
        "html",
        [],
        [
          h.element("head"),
          h.element("body", [], [h.element("p", [], [h.text("Hello World")])]),
        ],
      ),
    ]),
    Device.standard(),
  );

  t.deepEqual(actual.toJSON(), expected.toJSON());
});
