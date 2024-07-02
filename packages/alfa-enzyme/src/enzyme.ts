/// <reference types="node" />

import { React } from "@siteimprove/alfa-react";
import type { Page } from "@siteimprove/alfa-web";

import type { CommonWrapper } from "enzyme";

/**
 * @public
 */
export namespace Enzyme {
  export type Type = CommonWrapper;

  export function toPage(value: Type): Page {
    return React.toPage(value.getElement());
  }
}
