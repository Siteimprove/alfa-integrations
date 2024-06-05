// /// <reference types="webdriverio/async" />

// import { Device } from "@siteimprove/alfa-device";
// import { Document, Node } from "@siteimprove/alfa-dom";
// import { Request, Response } from "@siteimprove/alfa-http";
// import { Page } from "@siteimprove/alfa-web";
//
// import * as dom from "@siteimprove/alfa-dom/native";
//
// /**
//  * {@link https://w3c.github.io/webdriver/#dfn-web-elements}
//  *
//  * @public
//  */
// export interface WebElement {
//   /**
//    * {@link https://w3c.github.io/webdriver/#dfn-web-element-reference}
//    */
//   ["element-6066-11e4-a52e-4f735466cecf"]?: string;
// }
//
// /**
//  * @public
//  */
// export namespace WebElement {
//   export async function toPage(
//     webElement: WebElement,
//     browser: WebdriverIO.Browser
//   ): Promise<Page> {
//     const nodeJSON = await browser.execute(
//       dom.Native.fromNode,
//       webElement as any
//     );
//
//     return Page.of(
//       Request.empty(),
//       Response.empty(),
//       Document.of([Node.from(nodeJSON)]),
//       Device.standard()
//     );
//   }
// }

import { remote } from "webdriverio";

main()
async function main() {
  const browser = await remote({
    capabilities: {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: process.env.CI ? ["headless", "disable-gpu"] : [],
      },
    },
  });

  await browser.url("https://webdriver.io");

  const apiLink = await browser.$("=API");
  await apiLink.click();

  await browser.saveScreenshot("./screenshot.png");
  await browser.deleteSession();
}

// /// <reference types="node" />

// const { remote } = require('webdriverio')
//
// ;(async () => {
//   const browser = await remote({
//     capabilities: {
//       browserName: 'chrome'
//     }
//   })
//
//   await browser.url('https://webdriver.io')
//
//   const apiLink = await browser.$('=API')
//   await apiLink.click()
//
//   await browser.saveScreenshot('./screenshot.png')
//   await browser.deleteSession()
// })()
