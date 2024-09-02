/// <reference lib="dom" />
/// <reference types="node" />

import * as device from "@siteimprove/alfa-device/native";
import * as dom from "@siteimprove/alfa-dom/native";
import { Device, Preference } from "@siteimprove/alfa-device";
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
    const alfaDevice = await driver.executeScript(fromWindow);

    console.log("Got device");
    console.dir(alfaDevice);

    // const deviceJSON = await driver.executeScript(() => {
    //   return device.Native.fromWindow(window);
    // });
    //
    // console.dir(deviceJSON);

    // const pageDevice = Device.from(deviceJSON as Device.JSON);
    return Page.of(
      Request.empty(),
      Response.empty(),
      Document.from(documentJSON as Document.JSON),
      Device.standard()
    );
  }
}

function fromWindow(): Device.JSON {
  return toDevice();

  function toDevice(): Device.JSON {
    const {
      documentElement: { clientWidth, clientHeight },
    } = window.document;

    return {
      type: "screen",
      viewport: {
        width: clientWidth,
        height: clientHeight,
        orientation: window.matchMedia("(orientation: landscape)").matches
          ? "landscape"
          : "portrait",
      },
      display: { resolution: window.devicePixelRatio, scan: "progressive" },
      scripting: { enabled: !window.matchMedia("(scripting: none)").matches },
      preferences: [...toPreferences()],
    };
  }

  function* toPreferences(): Iterable<Preference.JSON> {
    // Since everything has to be inlined, we need to redeclare it here.
    // Typing ensure that there isn't too many mistakes (a value may
    // still be missing).
    const preferences: {
      [K in Preference.Name]: Array<Preference.Value<K>>;
    } = {
      "forced-colors": ["none", "active"],
      inverted: ["none", "inverted"],
      "prefers-color-scheme": ["no-preference", "light", "dark"],
      "prefers-contrast": ["no-preference", "less", "more", "custom"],
      "prefers-reduced-motion": ["no-preference", "reduce"],
      "prefers-reduced-transparency": ["no-preference", "reduce"],
      "prefers-reduced-data": ["no-preference", "reduce"],
    };

    // It seems we need to manually query each preference individually.
    for (const name of Object.keys(preferences) as Array<Preference.Name>) {
      for (const value of preferences[name]) {
        if (window.matchMedia(`(${name}: ${value})`).matches) {
          yield { name, value };
        }
      }
    }
  }
}
