## API Report File for "@siteimprove/alfa-assert"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Future } from '@siteimprove/alfa-future';
import { Hashable } from '@siteimprove/alfa-hash';
import { Oracle } from '@siteimprove/alfa-act';
import { Outcome } from '@siteimprove/alfa-act';
import { Performance } from '@siteimprove/alfa-performance';
import { Predicate } from '@siteimprove/alfa-predicate';
import { Question } from '@siteimprove/alfa-act';
import { Result } from '@siteimprove/alfa-result';
import { Rule } from '@siteimprove/alfa-act';

// @public (undocumented)
export class Asserter<I, T extends Hashable, Q extends Question.Metadata, S> {
    // (undocumented)
    readonly expect: (input: I, options?: Assertion.Options<I, T, Q, S>) => Assertion<I, T, Q, S>;
    // (undocumented)
    static of<I, T extends Hashable, Q extends Question.Metadata, S>(rules: Iterable<Rule<I, T, Q, S>>, handlers?: Iterable<Handler<I, T, Q, S>>, options?: Asserter.Options<I, T, Q, S>): Asserter<I, T, Q, S>;
}

// @public (undocumented)
export namespace Asserter {
    // (undocumented)
    export interface Options<I, T extends Hashable, Q extends Question.Metadata, S> extends Assertion.Options<I, T, Q, S> {
    }
}

// @public (undocumented)
export class Assertion<I, T extends Hashable, Q extends Question.Metadata, S> {
    // (undocumented)
    accessible(): Future<Result<string>>;
    // (undocumented)
    get be(): this;
    // (undocumented)
    static of<I, T extends Hashable, Q extends Question.Metadata, S>(input: I, rules: Iterable<Rule<I, T, Q, S>>, handlers?: Iterable<Handler<I, T, Q, S>>, options?: Assertion.Options<I, T, Q, S>): Assertion<I, T, Q, S>;
    // (undocumented)
    get to(): this;
}

// @public (undocumented)
export namespace Assertion {
    // (undocumented)
    export interface Options<I, T extends Hashable, Q extends Question.Metadata, S> {
        readonly filter?: Predicate<Outcome.Failed<I, T, Q, S>>;
        readonly filterCantTell?: Predicate<Outcome.CantTell<I, T, Q, S>>;
        readonly oracle?: Oracle<I, T, Q, S>;
        readonly performance?: Performance<Rule.Event<I, T, Q, S>>;
    }
}

// @public (undocumented)
export interface Handler<I, T extends Hashable, Q extends Question.Metadata, S> {
    // (undocumented)
    (input: I, rules: Iterable<Rule<I, T, Q, S>>, outcomes: Iterable<Outcome<I, T, Q, S>>, message: string): Future.Maybe<string>;
}

// (No @packageDocumentation comment for this package)

```
