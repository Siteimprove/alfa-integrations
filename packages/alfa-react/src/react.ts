import { Device } from "@siteimprove/alfa-device";
import type { Node } from "@siteimprove/alfa-dom";
import { Document, Element } from "@siteimprove/alfa-dom";
import { Native } from "@siteimprove/alfa-dom/native";
import { Request, Response } from "@siteimprove/alfa-http";
import { Page } from "@siteimprove/alfa-web";

import { JSDOM } from "jsdom";
import type { ReactElement } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";

// Setup JSDOM environment, so we can have DOM bindings for React to use.
const { window } = new JSDOM(`<!DOCTYPE html><body></body>`);
const { document } = window;
(global as any).window = window;
(global as any).document = document;

/**
 * @public
 */
export namespace React {
  export type Type = ReactElement;

  /**
   * Returns an Alfa JSON representation of the React root around the rendered
   * element(s).
   *
   * @remarks
   * There may be several children in the root in case of React fragments.
   */
  export async function toNode(value: Type): Promise<Node.JSON> {
    // Create a new React root for each render to avoid conflicts.
    const div = document.createElement("div");
    const root = createRoot(div);

    // flushSync is needed to wait for the render to complete before proceeding.
    flushSync(() => root.render(value));

    return Native.fromNode(div);
  }

  export async function toPage(value: Type): Promise<Page> {
    const reactRoot = await toNode(value);

    // 1. We do not convert the React root since we need the children to be
    //    orphaned in order for the document to adopt them.
    // 2. We do not have a device in this context, so we drop the meaningless
    //    layout information.
    const elements = (reactRoot.children ?? []).map((json) =>
      Element.from(json),
    );

    return Page.of(
      Request.empty(),
      Response.empty(),
      Document.of(elements),
      Device.standard(),
    );
  }
}
