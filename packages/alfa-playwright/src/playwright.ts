/// <reference lib="dom" />
/// <reference types="node" />

import { Device } from "@siteimprove/alfa-device";

import * as device from "@siteimprove/alfa-device/native";
import { Document, Node } from "@siteimprove/alfa-dom";
import * as dom from "@siteimprove/alfa-dom/native";
import { Request, Response } from "@siteimprove/alfa-http";
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
