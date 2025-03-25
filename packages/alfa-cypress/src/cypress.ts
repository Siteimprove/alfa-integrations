/// <reference lib="dom" preserve="true" />
/// <reference types="cypress" preserve="true" />

// While it may be tempting to pull in @siteimprove/alfa-chai for this module as
// Cypress uses Chai for all its assertion methods, it's a trap! Cypress bundles
// its own copy of the TypeScript typings for Chai and so we have to avoid the
// two being referenced in the same compilation unit as they'd be considered
// incompatible.

import type { Question } from "@siteimprove/alfa-act";
import { Asserter, type Handler } from "@siteimprove/alfa-assert";
import { Device } from "@siteimprove/alfa-device";
import { Document, Node } from "@siteimprove/alfa-dom";
import type { Formatter } from "@siteimprove/alfa-formatter";
import type { Hashable } from "@siteimprove/alfa-hash";
import { Header, Headers, Request, Response } from "@siteimprove/alfa-http";
import type { Mapper } from "@siteimprove/alfa-mapper";
import { URL } from "@siteimprove/alfa-url";
import { Page } from "@siteimprove/alfa-web";

import type * as act from "@siteimprove/alfa-act";
import * as device from "@siteimprove/alfa-device/native";
import * as dom from "@siteimprove/alfa-dom/native";
import earl from "@siteimprove/alfa-formatter-earl";

declare global {
  namespace Chai {
    interface Assertion {
      accessible(): Promise<void>;
    }
  }

  namespace Cypress {
    interface Chainer<Subject> {
      (chainer: "be.accessible"): Chainable<Subject>;
      (chainer: "not.be.accessible"): Chainable<Subject>;
    }
  }
}

/**
 * @public
 */
export namespace Cypress {
  export function createPlugin<
    T extends Hashable,
    Q extends Question.Metadata = {},
    S = T
  >(
    rules: Iterable<act.Rule<Page, T, Q, S>>,
    handlers: Iterable<Handler<Page, T, Q, S>> = [],
    options: Asserter.Options<Page, T, Q, S> = {}
  ): globalThis.Chai.ChaiPlugin {
    const asserter = Asserter.of(rules, handlers, options);

    return (chai) => {
      chai.Assertion.addMethod("accessible", async function () {
        const input = await toPage(this._obj);

        const result = asserter
          .expect(input)
          .to.be.accessible()

          // Cypress has aversions towards promises and asynchronous functions.
          // We therefore have to synchronously unwrap the future, which it is
          // fortunately designed for. This _will_ panic if the value isn't
          // available, but this shouldn't happen in practice as the assertion
          // handlers can't be asynchronous either.
          // https://github.com/cypress-io/cypress/issues/4742
          .get();

        const message = result.isOk() ? result.get() : result.getErrUnsafe();

        this.assert(
          result.isOk(),
          `expected #{this} to be accessible${
            result.isErr() ? ` but ${message}` : ""
          }`,
          `expected #{this} to not be accessible${
            result.isOk() ? ` but ${message}` : ""
          }`,
          /* Expected */ true,
          /* Actual */ result.isOk(),
          /* Show diff */ false
        );
      });
    };
  }

  export type Type = globalThis.Node | globalThis.JQuery;

  export async function toPage(value: Type, options?: dom.Native.Options): Promise<Page> {
    if ("jquery" in value) {
      value = value.get(0);
    }

    const nodeJSON = await dom.Native.fromNode(value, options);

    // This escapes shadow DOM, but not iframes!
    const root = value.getRootNode({ composed: true });
    // If the root is a document, we can get its window for building the
    // device. Otherwise, we hope that the global window object is decent.
    const view =
      (root.nodeType === root.DOCUMENT_NODE
        ? (root as globalThis.Document).defaultView
        : undefined) ?? window;

    const deviceJSON = device.Native.fromWindow(view);
    const pageDevice = Device.from(deviceJSON);

    /*
     * We cannot really grab the request and response as they may have been
     * long-lost when .toPage is called. We can at least grab the current URL
     * and fill the rest with reasonable defaults values. Given that we do not
     * really use these in the audit, this is mostly OK.
     *
     * Known caveats:
     * * We assume that the request was a GET and the response a 200 OK. This is
     *   probably not too wrong in most cases, but can easily be completely off.
     * * We assume that the response was HTML. This is probably mostly correct.
     * * We always return an empty Headers list; this is most likely wrong since
     *   at least a Content-Type header should be present on the response.
     */
    // WARNING: This will throw an exception in the unlikely case that
    // window.location.href is not a valid URL (which should never happen)
    const url = URL.parse(view.location.href).getUnsafe();
    const request = Request.of("GET", url);
    const response = Response.of(
      url,
      200,
      Headers.of([Header.of("Content-Type", "text/html")])
    );

    return Page.of(
      request,
      response,
      nodeJSON.type === "document"
        ? Document.from(nodeJSON as Document.JSON, pageDevice)
        : Document.of([Node.from(nodeJSON, pageDevice)]),
      pageDevice
    );
  }

  export namespace Handler {
    /**
     * @remarks
     * Cypress has this rather odd model of relying on synchronously enqueued
     * hooks and commands to provide a feeling of using a synchronous API. As
     * the handler will run _as part of_ a command, this means that we can't
     * register any additional commands when the handler runs; this must instead
     * be handled beforehand. The handler therefore starts by registering an
     * `after()` hook that will write any files collected during the test run
     * _after_ the tests are done.
     */
    export function persist<
      I,
      T extends Hashable,
      Q extends Question.Metadata,
      S
    >(
      output: Mapper<I, string>,
      format: Formatter<I, T, Q, S> = earl()
    ): Handler<I, T, Q, S> {
      const files = new Map<string, string>();

      after(() => {
        for (const [file, data] of files) {
          cy.writeFile(file, data);
        }
      });

      return (input, rules, outcomes, message) => {
        const file = output(input);

        files.set(file, format(input, rules, outcomes) + "\n");

        return `${message}, see the full report at ${file}`;
      };
    }
  }
}
