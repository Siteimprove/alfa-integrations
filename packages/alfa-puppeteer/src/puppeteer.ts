/// <reference lib="dom" />

import { Device } from "@siteimprove/alfa-device";
import { Document, Node } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Page } from "@siteimprove/alfa-web";

import * as device from "@siteimprove/alfa-device/native";
import * as dom from "@siteimprove/alfa-dom/native";

import type { JSHandle } from "puppeteer";

/**
 * @public
 */
export namespace Puppeteer {
  export type Type = JSHandle<globalThis.Node>;

  export async function toNode(value: Type, device?: Device): Promise<Node> {
    return Node.from(await value.evaluate(dom.Native.fromNode), device);
  }

  export async function toPage(value: Type): Promise<Page> {
    const nodeJSON = await value.evaluate(dom.Native.fromNode);

    const deviceJSON = await value
      .evaluateHandle(() => window)
      .then((handle) => handle.evaluate(device.Native.fromWindow));

    const pageDevice = Device.from(deviceJSON);
    return Page.of(
      Request.empty(),
      Response.empty(),
      nodeJSON.type === "document"
        ? Document.from(nodeJSON as Document.JSON, pageDevice)
        : Document.of([Node.from(nodeJSON, pageDevice)]),
      pageDevice
    );
  }
}
