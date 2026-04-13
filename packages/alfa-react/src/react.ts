import { Device } from "@siteimprove/alfa-device";
import { Document, Node } from "@siteimprove/alfa-dom";
import { Future } from "@siteimprove/alfa-future";
import { Native } from "@siteimprove/alfa-dom/native";
import { Request, Response } from "@siteimprove/alfa-http";
import { Page } from "@siteimprove/alfa-web";

import type { ReactElement } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";

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
  export function toNode(value: Type): Future<Node.JSON> {
    // Create a new React root for each render to avoid conflicts.
    const div = document.createElement("div");
    const root = createRoot(div);

    // flushSync is needed to wait for the render to complete before proceeding.
    flushSync(() => root.render(value));

    return Future.from(Native.fromNode(div));
  }

  export function toPage(value: Type): Future<Page> {
    const reactRoot = toNode(value);

    // 1. We do not convert the React root since we need the children to be
    //    orphaned in order for the document to adopt them.
    // 2. We do not have a device in this context, so we drop the meaningless
    //    layout information.
    const elements = reactRoot.map((root) =>
      (root.children ?? []).map((json) => Node.from(json)),
    );

    return elements.map((elements) =>
      Page.of(
        Request.empty(),
        Response.empty(),
        Document.of(elements),
        Device.standard(),
      ),
    );
  }
}
