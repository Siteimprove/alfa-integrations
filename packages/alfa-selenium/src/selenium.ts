/// <reference lib="dom" preserve="true" />
/// <reference types="node" />

import * as device from "@siteimprove/alfa-device/native";
import * as dom from "@siteimprove/alfa-dom/native";
import { Device } from "@siteimprove/alfa-device";
import { Document } from "@siteimprove/alfa-dom";
import { Header, Headers, Request, Response } from "@siteimprove/alfa-http";
import { URL } from "@siteimprove/alfa-url";
import { Page } from "@siteimprove/alfa-web";

import { WebDriver } from "selenium-webdriver";

/**
 * @public
 */
export namespace Selenium {
  export async function toPage(
    driver: WebDriver,
    options?: dom.Native.Options
  ): Promise<Page> {
    const deviceJSON = await driver.executeScript(device.Native.fromWindow);
    const alfaDevice = Device.from(deviceJSON as Device.JSON);

    const document = await driver.executeScript(() => window.document);

    const documentJSON = await driver.executeScript(
      dom.Native.fromNode,
      document,
      options
    );

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
      await driver.executeScript(() => window.location.href)
    ).getUnsafe();
    const request = Request.of("GET", url);
    const response = Response.of(
      url,
      200,
      Headers.of([Header.of("Content-Type", "text/html")])
    );

    return Page.of(
      request,
      response,
      Document.from(documentJSON as Document.JSON, alfaDevice),
      alfaDevice
    );
  }
}
