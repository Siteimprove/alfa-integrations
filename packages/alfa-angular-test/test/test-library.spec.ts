import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { Angular } from "@siteimprove/alfa-angular";
import type { Element } from "@siteimprove/alfa-dom";
import { test } from "@siteimprove/alfa-test";
import type { Page } from "@siteimprove/alfa-web";

@Component({
  selector: "test-button",
  imports: [],
  template: ` <button>I'm a button!</button> `,
  styles: ``,
})
export class Button {}

// window.matchMedia is not currently implemented by Angular, so we need a mock.
// For the purpose of this test, we actually don't care about the result (they
// are not actually used), so we are OK with a mock that always answer `false`.
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
    };
  };

test(".toPage() creates an Alfa page", async (t) => {
  const fixture = TestBed.createComponent(Button);

  const alfaPage: Page = await Angular.toPage(fixture);

  // Filter out the attribute that stores Angular version, for test stability.
  const actual = alfaPage.toJSON();
  const wrapper = actual.document.children![0] as Element.JSON;
  wrapper.attributes = wrapper.attributes.filter(
    (attribute) => attribute.name !== "ng-version",
  );

  t.deepEqual(actual, {
    request: { method: "GET", url: "about:blank", headers: [], body: "" },
    response: { url: "about:blank", status: 200, headers: [], body: "" },
    document: {
      type: "document",
      children: [
        {
          type: "element",
          children: [
            {
              type: "element",
              children: [{ type: "text", data: "I'm a button!", box: null }],
              namespace: "http://www.w3.org/1999/xhtml",
              prefix: null,
              name: "button",
              attributes: [],
              style: null,
              shadow: null,
              content: null,
              box: null,
            },
          ],
          namespace: "http://www.w3.org/1999/xhtml",
          prefix: null,
          name: "div",
          attributes: [
            {
              type: "attribute",
              namespace: null,
              prefix: null,
              name: "id",
              value: "root0",
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
