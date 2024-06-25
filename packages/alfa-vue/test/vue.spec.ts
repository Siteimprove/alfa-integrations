import "jsdom-global/register";
import * as device from "@siteimprove/alfa-device/dist/native";
import { test } from "@siteimprove/alfa-test";

import { Device } from "@siteimprove/alfa-device";
import { h, Namespace } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Rectangle } from "@siteimprove/alfa-rectangle";
import { Page } from "@siteimprove/alfa-web";

import V from "vue";
import { mount } from "@vue/test-utils";

import { Vue } from "../src";

export const Button = V.extend({
  template: `
    <button class="btn"></button>
  `,
});

// window.matchMedia is not currently implemented by JSDOM, so we need to mock
// it.
// For the purpose of this test, we actually don't care about the result (they
// are not actually used), so we are OK with a mock that always answer `false`.
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
    };
  };

test(`.toPage() creates an Alfa Page (vue)`, async (t) => {
  const button = mount(Button);

  const actual = await Vue.toPage(button);
  let pageDevice = Device.from(device.Native.fromWindow(window));
  const expected = Page.of(
    Request.empty(),
    Response.empty(),
    h.document([
      h.element(
        "button",
        { class: "btn" },
        [],
        [],
        Namespace.HTML,
        Rectangle.of(0, 0, 0, 0),
        pageDevice
      ),
    ]),
    pageDevice
  );

  t.deepEqual(actual.toJSON(), expected.toJSON());
});
