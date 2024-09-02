/// <reference lib="dom" />
/// <reference types="node" />

import * as device from "@siteimprove/alfa-device/native";
import * as dom from "@siteimprove/alfa-dom/native";
import { Device } from "@siteimprove/alfa-device";
import { Document, Node } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Page } from "@siteimprove/alfa-web";

import { WebDriver } from "selenium-webdriver";

/**
 * @public
 */
export namespace Selenium {
  export async function toPage(driver: WebDriver): Promise<Page> {
    const document = await driver.executeScript("return document;");
    const documentJSON = await driver.executeScript(
      dom.Native.fromNode,
      document
    );

    //TODO: Fix with selenium device
    const deviceJSON = await driver.executeScript(() => {
      return device.Native.fromWindow(window);
    });

    const pageDevice = Device.from(deviceJSON as Device.JSON);
    return Page.of(
      Request.empty(),
      Response.empty(),
      Document.from(documentJSON as Document.JSON, pageDevice),
      pageDevice
    );
  }
}
