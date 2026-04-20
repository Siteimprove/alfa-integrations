import { expect } from "chai";
import * as chai from "chai";
import { Device } from "@siteimprove/alfa-device";
import { h } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Rules } from "@siteimprove/alfa-rules";
import { test } from "@siteimprove/alfa-test";
import { Page } from "@siteimprove/alfa-web";

import { Chai } from "../dist/chai.js";

chai.use(
  Chai.createPlugin((page: Page) => page, [Rules.get("R12").getUnsafe()]),
);

test(".createPlugin adds a .to.be.accessible method", () => {
  const page = Page.of(
    Request.empty(),
    Response.empty(),
    h.document([<button>Hello World</button>]),
    Device.standard(),
  );

  expect(page).to.be.accessible();
});

test(".createPlugin adds a .not.to.be.accessible method", () => {
  const page = Page.of(
    Request.empty(),
    Response.empty(),
    h.document([<button></button>]),
    Device.standard(),
  );

  expect(page).not.to.be.accessible();
});
