/// <reference lib="dom" preserve="true" />
/// <reference types="jquery" preserve="true" />

import { Device } from "@siteimprove/alfa-device";
import { Document, Node } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Page } from "@siteimprove/alfa-web";

import * as device from "@siteimprove/alfa-device/native";
import * as dom from "@siteimprove/alfa-dom/native";

/**
 * @public
 */
export namespace JQuery {
  export type Type = globalThis.JQuery;

  export async function toPage(
    value: Type,
    options?: dom.Native.Options
  ): Promise<Page> {
    const node = value.get(0);

    if (node === undefined) {
      throw new Error("Unable to convert empty jQuery collection to page");
    }

    const nodeJSON = await dom.Native.fromNode(node, options);

    const deviceJSON = device.Native.fromWindow(window);

    const pageDevice = Device.from(deviceJSON);
    return Page.of(
      Request.empty(),
      Response.empty(),
      Document.of([Node.from(nodeJSON, pageDevice)]),
      pageDevice
    );
  }
}
