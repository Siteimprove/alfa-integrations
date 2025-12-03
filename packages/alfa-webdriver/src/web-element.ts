/// <reference types="webdriverio" />

import { Device } from "@siteimprove/alfa-device";
import { Document, Node } from "@siteimprove/alfa-dom";
import { Request, Response } from "@siteimprove/alfa-http";
import { Page } from "@siteimprove/alfa-web";

import * as dom from "@siteimprove/alfa-dom/native";

/**
 * @public
 */
export namespace WebElement {
  export async function toPage(
    webElement: WebdriverIO.Element,
    browser: WebdriverIO.Browser,
    options?: dom.Native.Options,
  ): Promise<Page> {
    const nodeJSON = await browser.execute(
      dom.Native.fromNode,
      webElement,
      options,
    );

    return Page.of(
      Request.empty(),
      Response.empty(),
      Document.of([Node.from(nodeJSON)]),
      Device.standard(),
    );
  }
}
