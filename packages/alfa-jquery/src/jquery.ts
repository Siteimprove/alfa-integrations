/// <reference lib="dom" preserve="true" />
/// <reference types="jquery" preserve="true" />

import { Device } from "@siteimprove/alfa-device";

import * as device from "@siteimprove/alfa-device/native";
import { Document, Node } from "@siteimprove/alfa-dom";
import * as dom from "@siteimprove/alfa-dom/native";
import { Option } from "@siteimprove/alfa-option";
import { Request, Response } from "@siteimprove/alfa-http";
import { Page } from "@siteimprove/alfa-web";

/**
 * @public
 */
export namespace JQuery {
  export type Type = globalThis.JQuery;

  export async function toPage(
    value: Type,
    options?: dom.Native.Options,
  ): Promise<Page> {
    const firstNode = value.get(0);

    if (firstNode === undefined) {
      throw new Error("Unable to convert empty jQuery collection to page");
    }

    const pageDevice = Option.from(firstNode.ownerDocument.defaultView)
      .map(device.Native.fromWindow)
      .map(Device.from)
      .getOrElse(Device.standard);

    const nodes = (
      await Promise.all(
        value.toArray().map((node) => dom.Native.fromNode(node, options)),
      )
    ).map((nodeJSON) => Node.from(nodeJSON, pageDevice));

    return Page.of(
      Request.empty(),
      Response.empty(),
      Document.of(nodes),
      pageDevice,
    );
  }
}
