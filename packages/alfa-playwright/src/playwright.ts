/// <reference lib="dom" preserve="true" />
/// <reference types="node" />

import { Device } from "@siteimprove/alfa-device";

import * as device from "@siteimprove/alfa-device/native";
import { Document, Node } from "@siteimprove/alfa-dom";
import * as dom from "@siteimprove/alfa-dom/native";
import { Header, Headers, Request, Response } from "@siteimprove/alfa-http";
import { URL } from "@siteimprove/alfa-url";
import { Page } from "@siteimprove/alfa-web";

import type { JSHandle } from "playwright";

/**
 * @public
 */
export namespace Playwright {
  export type Type = JSHandle;

  export async function toNode(value: Type, device?: Device): Promise<Node> {
    return Node.from(
      await value.evaluate(
        dom.Native.fromNode as (node: globalThis.Node) => Promise<Node.JSON>
      ),
      device
    );
  }

  export async function toPage(value: Type): Promise<Page> {
    const nodeJSON = await value.evaluate(
      dom.Native.fromNode as (node: globalThis.Node) => Promise<Node.JSON>
    );

    const deviceJSON = await value
      .evaluateHandle(() => window)
      .then((handle) => handle.evaluate(device.Native.fromWindow));

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
    const url = URL.parse(
      await value.evaluate(() => window.location.href)
    ).getUnsafe();
    const request = Request.of("GET", url);
    const response = Response.of(
      url,
      200,
      Headers.of([Header.of("Content-Type", "text/html")]),
    );

    const pageDevice = Device.from(deviceJSON);
    return Page.of(
      request,
      response,
      nodeJSON.type === "document"
        ? Document.from(nodeJSON as Document.JSON, pageDevice)
        : Document.of([Node.from(nodeJSON, pageDevice)]),
      pageDevice
    );
  }
}
