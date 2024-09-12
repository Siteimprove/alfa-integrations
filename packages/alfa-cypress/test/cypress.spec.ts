/// <reference types="cypress" />

// import * as path from "node:path";
// import * as url from "node:url";
import { Cypress } from "../dist/index.js";
import * as device from "@siteimprove/alfa-device/native";

// // TODO: This should be replaced with import.meta.dirname once we switch to Node 22
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// const fixture = path.join(__dirname, "fixture");

it("should scrap a document", () => {
  cy.visit("test/fixture/page.html");

  // cy.window().then(device.Native.fromWindow).should("deep.equal", {});

  cy.document()
    .then(Cypress.toPage)
    .then((page) => ({ ...page.toJSON() /*, device: null */ }))
    .should("deep.equal", {
      request: { method: "GET", url: "about:blank", headers: [], body: "" },
      response: { url: "about:blank", status: 200, headers: [], body: "" },
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
                  { type: "text", data: "\n" },
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
      device: {},
    });
});
