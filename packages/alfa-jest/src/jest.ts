/// <reference types="jest" />

import type { Question, Rule } from "@siteimprove/alfa-act";
import type { Handler } from "@siteimprove/alfa-assert";
import { Asserter } from "@siteimprove/alfa-assert";
import type { Future } from "@siteimprove/alfa-future";
import type { Hashable } from "@siteimprove/alfa-hash";
import type { Mapper } from "@siteimprove/alfa-mapper";

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeAccessible(): Promise<void>;
    }
  }
}

/**
 * @public
 */
export namespace Jest {
  export function createPlugin<
    I,
    J,
    T extends Hashable,
    Q extends Question.Metadata = {},
    S = T
  >(
    transform: Mapper<I, Future.Maybe<J>>,
    rules: Iterable<Rule<J, T, Q, S>>,
    handlers: Iterable<Handler<J, T, Q, S>> = [],
    options: Asserter.Options<J, T, Q, S> = {}
  ): void {
    const asserter = Asserter.of(rules, handlers, options);

    expect.extend({
      async toBeAccessible(value: I) {
        const input = await transform(value);

        const result = await asserter.expect(input).to.be.accessible();

        const message = result.isOk() ? result.get() : result.getErrUnsafe();

        return {
          pass: result.isOk(),
          message: () =>
            this.utils.matcherHint("toBeAccessible", "received", "", {
              isNot: this.isNot,
            }) +
            " but " +
            message,
        };
      },
    });
  }
}
