/// <reference types="jasmine" />

import type { Question, Rule } from "@siteimprove/alfa-act";
import type { Handler } from "@siteimprove/alfa-assert";
import { Asserter } from "@siteimprove/alfa-assert";
import type { Hashable } from "@siteimprove/alfa-hash";
import type { Mapper } from "@siteimprove/alfa-mapper";

import { addAsyncMatcher } from "./jasmine/add-async-matcher.js";

declare global {
  namespace jasmine {
    interface Matchers<T> {
      toBeAccessible(): Promise<void>;
    }
  }
}

/**
 * @public
 */
export namespace Jasmine {
  export function createPlugin<
    I,
    J,
    T extends Hashable,
    Q extends Question.Metadata = {},
    S = T
  >(
    transform: Mapper<I, Promise<J>>,
    rules: Iterable<Rule<J, T, Q, S>>,
    handlers: Iterable<Handler<J, T, Q, S>> = [],
    options: Asserter.Options<J, T, Q, S> = {}
  ): void {
    const asserter = Asserter.of(rules, handlers, options);

    addAsyncMatcher("toBeAccessible", (util) => {
      return {
        async compare(value: I) {
          const input = await transform(value);

          const result = await asserter.expect(input).to.be.accessible();

          const message = result.isOk() ? result.get() : result.getErrUnsafe();

          return {
            pass: result.isOk(),
            message:
              util.buildFailureMessage("toBeAccessible", result.isOk(), value) +
              " " +
              message,
          };
        },
      };
    });
  }
}
