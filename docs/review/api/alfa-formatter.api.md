## API Report File for "@siteimprove/alfa-formatter"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import type { Future } from '@siteimprove/alfa-future';
import type { Hashable } from '@siteimprove/alfa-hash';
import type { Outcome } from '@siteimprove/alfa-act';
import type { Question } from '@siteimprove/alfa-act';
import { Result } from '@siteimprove/alfa-result';
import type { Rule } from '@siteimprove/alfa-act';

// @public (undocumented)
export type Formatter<I, T extends Hashable, Q extends Question.Metadata = {}, S = T> = (input: I, rules: Iterable<Rule<I, T, Q, S>>, outcomes: Iterable<Outcome<I, T, Q, S>>) => Future.Maybe<string>;

// @public (undocumented)
export namespace Formatter {
    // (undocumented)
    export function load<I, T extends Hashable, Q extends Question.Metadata = {}, S = T>(name: string, defaultScope?: string): Promise<Result<Formatter<I, T, Q, S>, string>>;
}

// (No @packageDocumentation comment for this package)

```
