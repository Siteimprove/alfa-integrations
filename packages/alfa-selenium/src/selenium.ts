/// <reference lib="dom" />
/// <reference types="node" />

import * as device from "@siteimprove/alfa-device/native";
import * as dom from "@siteimprove/alfa-dom/native";
import { Device } from "@siteimprove/alfa-device";
import { Document } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Page } from "@siteimprove/alfa-web";

import { WebDriver } from "selenium-webdriver";

/**
 * @public
 */
export namespace Selenium {
  export async function toPage(driver: WebDriver): Promise<Page> {
    const deviceJSON = await driver.executeScript(device.Native.fromWindow);
    const alfaDevice = Device.from(deviceJSON as Device.JSON);

    const documentJSON = await driver.executeScript(dom.Native.fromNode);

    return Page.of(
      Request.empty(),
      Response.empty(),
      Document.from(documentJSON as Document.JSON, alfaDevice),
      alfaDevice
    );
  }
}
