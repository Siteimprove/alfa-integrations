import { Device, Viewport } from "@siteimprove/alfa-device";
import { Element, h } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Rectangle } from "@siteimprove/alfa-rectangle";
import { test } from "@siteimprove/alfa-test";
import { Page } from "@siteimprove/alfa-web";

import { JSDOM } from "jsdom";
import { jQueryFactory } from "jquery/factory";

import { JQuery } from "../src/index.js";

function mkTarget(text: string, device: Device): Element {
  return h.element(
    "div",
    [h.attribute("class", "target")],
    [h.text(text)],
    undefined,
    undefined,
    Rectangle.of(0, 0, 0, 0),
    device,
  );
}

test(".toPage() creates an Alfa page", async (t) => {
  const { window } = new JSDOM(
    "<html><head></head><body><div class='target'>Hello</div><div id='ignored'>Lorem ipsum</div><div class='target'>World</div></body></html>",
  );

  // window.matchMedia is not currently implemented by JSDOM, so we need a mock.
  // For the purpose of this test, we actually don't care about the result (they
  // are not actually used), so we are OK with a mock that always answer `false`.
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
      };
    };

  const $ = jQueryFactory(window.parent);

  const target = $(".target");

  const actual = await JQuery.toPage(target);

  const standard = Device.standard();
  const device = Device.of(
    standard.type,
    // JSDOM is not doing layout, and therefore doesn't implement `clientWidth`
    // which device.Native uses to get veiwport size. So, in this test we get
    // a 0×0 viewport.
    Viewport.of(0, 0, Viewport.Orientation.Portrait),
    standard.display,
    standard.scripting,
    standard.preferences,
  );

  const expected = Page.of(
    Request.empty(),
    Response.empty(),
    h.document([mkTarget("Hello", device), mkTarget("World", device)]),
    device,
  );

  t.deepEqual(actual.toJSON(), expected.toJSON());
});
