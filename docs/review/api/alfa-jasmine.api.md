## API Report File for "@siteimprove/alfa-jasmine"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Asserter } from '@siteimprove/alfa-assert';
import type { Handler } from '@siteimprove/alfa-assert';
import type { Hashable } from '@siteimprove/alfa-hash';
import type { Mapper } from '@siteimprove/alfa-mapper';
import type { Question } from '@siteimprove/alfa-act';
import type { Rule } from '@siteimprove/alfa-act';

// @public (undocumented)
export namespace Jasmine {
    // (undocumented)
    export function createPlugin<I, J, T extends Hashable, Q extends Question.Metadata = {}, S = T>(transform: Mapper<I, Promise<J>>, rules: Iterable<Rule<J, T, Q, S>>, handlers?: Iterable<Handler<J, T, Q, S>>, options?: Asserter.Options<J, T, Q, S>): void;
}

// (No @packageDocumentation comment for this package)

```
