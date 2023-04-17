## API Report File for "@siteimprove/alfa-cypress"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

/// <reference types="cypress" />
/// <reference lib="dom" />

import * as act from '@siteimprove/alfa-act';
import { Asserter } from '@siteimprove/alfa-assert';
import { Formatter } from '@siteimprove/alfa-formatter';
import { Handler } from '@siteimprove/alfa-assert';
import { Hashable } from '@siteimprove/alfa-hash';
import { Mapper } from '@siteimprove/alfa-mapper';
import { Page } from '@siteimprove/alfa-web';

// @public (undocumented)
namespace Cypress_2 {
    // (undocumented)
    function createPlugin<T extends Hashable, Q = never, S = T>(rules: Iterable<act.Rule<Page, T, Q, S>>, handlers?: Iterable<Handler<Page, T, Q, S>>, options?: Asserter.Options<Page, T, Q, S>): globalThis.Chai.ChaiPlugin;
    // (undocumented)
    namespace Handler {
        // (undocumented)
        function persist<I, T extends Hashable, Q, S>(output: Mapper<I, string>, format?: Formatter<I, T, Q, S>): Handler<I, T, Q, S>;
    }
    // (undocumented)
    function toPage(value: Type): Page;
    // (undocumented)
    type Type = globalThis.Node | globalThis.JQuery;
}
export { Cypress_2 as Cypress }

// (No @packageDocumentation comment for this package)

```