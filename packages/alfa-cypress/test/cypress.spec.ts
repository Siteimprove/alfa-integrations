/// <reference types="cypress" />

import { Query } from "@siteimprove/alfa-dom";
import { Cypress } from "../dist/index.js";
import { Device } from "@siteimprove/alfa-device";

it("should scrape a document", () => {
  cy.visit("test/fixture/page.html");

  // Cypress visits the page in its own server with random-ish port, so we do
  // not try to guess the full URL, and simply check that we retrieve the same
  // value that Cypress itself provides.
  cy.url().then((pageUrl) =>
    cy
      .document()
      .then(Cypress.toPage)
      .then((alfaPage) => {
        // Test the presence of layout information
        for (const element of Query.getElementDescendants(alfaPage.document)) {
          expect(element.getBoundingBox(alfaPage.device).isSome()).to.equal(
            true
          );
        }

        // We've seen instability in tests for the devices, most notably for the user
        // preferences that seem to depend on the user's profile. To keep this test simple
        // we just check that a non-standard device has been crawled and discard it.
        // This will fail if the standard device randomly happens to be used, but
        // since it has no user-preference set, this should not be the case.
        expect(alfaPage.device.equals(Device.standard())).to.equal(false);

        const actual = {
          ...alfaPage.toJSON(),
          // This effectively removes the layout information which may be unstable.
          document: alfaPage.document.toJSON(),
          device: null,
        };

        expect(actual).to.deep.equal({
          request: { method: "GET", url: pageUrl, headers: [], body: "" },
          response: {
            url: pageUrl,
            status: 200,
            headers: [{ name: "Content-Type", value: "text/html" }],
            body: "",
          },
          document: {
            type: "document",
            children: [
              { type: "type", name: "html", publicId: null, systemId: null },
              {
                type: "element",
                children: [
                  {
                    type: "element",
                    children: [],
                    namespace: "http://www.w3.org/1999/xhtml",
                    prefix: null,
                    name: "head",
                    attributes: [],
                    style: null,
                    shadow: null,
                    content: null,
                    box: null,
                  },
                  {
                    type: "element",
                    children: [
                      {
                        type: "element",
                        children: [{ type: "text", data: "Hello" }],
                        namespace: "http://www.w3.org/1999/xhtml",
                        prefix: null,
                        name: "div",
                        attributes: [],
                        style: null,
                        shadow: null,
                        content: null,
                        box: null,
                      },
                      { type: "text", data: "\n " },
                      {
                        type: "element",
                        children: [
                          {
                            type: "text",
                            data: ` document.domain = 'localhost'; (()=>{"use strict";const e=window.Cypress=parent.Cypress;if(!e)throw new Error("Something went terribly wrong and we cannot proceed. We expected to find the global Cypress in the parent window but it is missing. This should never happen and likely is a bug. Please open an issue.");const t=(()=>{let e,t,n,r;const i=()=>{e=!1,t=!1,n=[],r={}},o=(e,t=[])=>"function"==typeof e?e.apply(window,t):window.eval(e);return i(),{wrap:()=>{const i={setTimeout:window.setTimeout,setInterval:window.setInterval,requestAnimationFrame:window.requestAnimationFrame,clearTimeout:window.clearTimeout,clearInterval:window.clearInterval},a=(e,t)=>i[e].apply(window,t),s=e=>n=>(t&&(r[n]=!0),a(e,[n])),w=t=>(...r)=>{let i,[s,w,...p]=r;return i=a(t,[(...r)=>{if(!e)return o(s,r);n.push({timerId:i,fnOrCode:s,params:r,type:t})},w,...p]),i};window.setTimeout=w("setTimeout"),window.setInterval=w("setInterval"),window.requestAnimationFrame=w("requestAnimationFrame"),window.clearTimeout=s("clearTimeout"),window.clearInterval=s("clearInterval")},reset:i,pause:a=>{e=Boolean(a),e||(t=!0,n.forEach((e=>{const{timerId:t,type:n,fnOrCode:i,params:a}=e;"setInterval"===n&&r[t]||o(i,a)})),i())}}})();e.removeAllListeners("app:timers:reset"),e.removeAllListeners("app:timers:pause"),e.on("app:timers:reset",t.reset),e.on("app:timers:pause",t.pause),t.wrap(),e.action("app:window:before:load",window)})(); `,
                          },
                        ],
                        namespace: "http://www.w3.org/1999/xhtml",
                        prefix: null,
                        name: "script",
                        attributes: [
                          {
                            type: "attribute",
                            namespace: null,
                            prefix: null,
                            name: "type",
                            value: "text/javascript",
                          },
                        ],
                        style: null,
                        shadow: null,
                        content: null,
                        box: null,
                      },
                      { type: "text", data: " " },
                    ],
                    namespace: "http://www.w3.org/1999/xhtml",
                    prefix: null,
                    name: "body",
                    attributes: [],
                    style: null,
                    shadow: null,
                    content: null,
                    box: null,
                  },
                ],
                namespace: "http://www.w3.org/1999/xhtml",
                prefix: null,
                name: "html",
                attributes: [],
                style: null,
                shadow: null,
                content: null,
                box: null,
              },
            ],
            style: [],
          },
          device: null,
        });
      })
  );
});
