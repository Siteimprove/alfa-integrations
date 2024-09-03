/// <reference lib="dom" preserve="true" />

import { Device } from "@siteimprove/alfa-device";
import { Document, Node } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Page } from "@siteimprove/alfa-web";

import * as device from "@siteimprove/alfa-device/native";
import * as dom from "@siteimprove/alfa-dom/native";

import type { ComponentFixture } from "@angular/core/testing";

/**
 * @public
 */
export namespace Angular {
  export type Type = ComponentFixture<unknown>;

  export async function toPage(value: Type): Promise<Page> {
    const nodeJSON = await dom.Native.fromNode(value.nativeElement);

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
