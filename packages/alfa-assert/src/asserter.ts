import type { Question, Rule } from "@siteimprove/alfa-act";
import type { Hashable } from "@siteimprove/alfa-hash";

import { Assertion } from "./assertion.js";
import type { Handler } from "./handler.js";

/**
 * @public
 */
export class Asserter<I, T extends Hashable, Q extends Question.Metadata, S> {
  public static of<I, T extends Hashable, Q extends Question.Metadata, S>(
    rules: Iterable<Rule<I, T, Q, S>>,
    handlers: Iterable<Handler<I, T, Q, S>> = [],
    options: Asserter.Options<I, T, Q, S> = {}
  ): Asserter<I, T, Q, S> {
    return new Asserter(Array.from(rules), Array.from(handlers), options);
  }

  private readonly _rules: Array<Rule<I, T, Q, S>>;
  private readonly _handlers: Array<Handler<I, T, Q, S>>;
  private readonly _options: Asserter.Options<I, T, Q, S>;

  protected constructor(
    rules: Array<Rule<I, T, Q, S>>,
    handlers: Array<Handler<I, T, Q, S>>,
    options: Asserter.Options<I, T, Q, S>
  ) {
    this._rules = rules;
    this._handlers = handlers;
    this._options = options;
  }

  public readonly expect = (
    input: I,
    options: Assertion.Options<I, T, Q, S> = {}
  ) =>
    Assertion.of(input, this._rules, this._handlers, {
      ...this._options,
      ...options,
    });
}

/**
 * @public
 */
export namespace Asserter {
  export interface Options<
    I,
    T extends Hashable,
    Q extends Question.Metadata,
    S
  > extends Assertion.Options<I, T, Q, S> {}
}
