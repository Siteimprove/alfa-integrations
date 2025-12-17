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

// type TestNode = TestElement | string;

// type TestElement = TestRenderer.ReactTestRendererJSON;

// function toNode(node: TestNode): Node.JSON {
//   return isString(node) ? toText(node) : toElement(node);
// }

// function toElement(element: TestElement): Element.JSON {
//   const { type: name, props, children } = element;
//
//   const attributes = keys(props).reduce<Array<Attribute.JSON>>(
//     (attributes, prop) => {
//       for (const attribute of toAttribute(prop, props[prop])) {
//         attributes.push(attribute);
//       }
//
//       return attributes;
//     },
//     [],
//   );
//
//   return {
//     type: "element",
//     namespace: Namespace.HTML,
//     prefix: null,
//     name,
//     attributes,
//     style: null,
//     children: children?.map(toNode) ?? [],
//     shadow: null,
//     content: null,
//     box: null,
//   };
// }
//
// function toAttribute(name: string, value: unknown): Option<Attribute.JSON> {
//   switch (value) {
//     // Attributes that are either `null` or `undefined` are always ignored.
//     case null:
//     case undefined:
//       return None;
//   }
//
//   name = toAttributeName(name);
//
//   return toAttributeValue(name, value).map((value) => {
//     return {
//       type: "attribute",
//       namespace: null,
//       prefix: null,
//       name,
//       value,
//     };
//   });
// }
//
// function toAttributeName(name: string): string {
//   switch (name) {
//     case "className":
//       return "class";
//
//     case "htmlFor":
//       return "for";
//   }
//
//   return name;
// }
//
// function toAttributeValue(name: string, value: unknown): Option<string> {
//   switch (name) {
//     case "style":
//       if (isObject(value)) {
//         return Option.of(toInlineStyle(value));
//       }
//   }
//
//   if (name.startsWith("aria-") && isBoolean(value)) {
//     return Option.of(String(value));
//   }
//
//   switch (value) {
//     case false:
//       return None;
//
//     case true:
//       return Option.of(name);
//   }
//
//   return Option.of(String(value));
// }
//
// function toText(data: string): Text.JSON {
//   return {
//     type: "text",
//     data,
//     box: null,
//   };
// }
//
// function toInlineStyle(props: { [key: string]: unknown }): string {
//   let style = "";
//   let delimiter = "";
//
//   for (const prop of keys(props)) {
//     if (props[prop]) {
//       style += prop.replace(/([A-Z])/g, "-$1").toLowerCase();
//       style += ": ";
//       style += String(props[prop]).trim();
//       style += delimiter;
//
//       delimiter = ";";
//     }
//   }
//
//   return style;
// }
