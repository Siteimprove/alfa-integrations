/// <reference types="../types/unexpected.d.ts" preserve="true" />

import type { Hashable } from "@siteimprove/alfa-hash";
import type unexpected from "unexpected";

import type { Question, Rule } from "@siteimprove/alfa-act";
import type { Handler } from "@siteimprove/alfa-assert";
import { Asserter } from "@siteimprove/alfa-assert";
import type { Future } from "@siteimprove/alfa-future";
import type { Mapper } from "@siteimprove/alfa-mapper";

declare module "unexpected" {
  interface Expect {
    (
      subject: unknown,
      assertionName: "to be accessible" | "not to be accessible"
    ): Promise<void>;
  }
}

/**
 * @public
 */
export namespace Unexpected {
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
  ): unexpected.PluginDefinition {
    const asserter = Asserter.of(rules, handlers, options);

    return {
      name: "@siteimprove/alfa-unexpected",
      installInto(unexpected) {
        unexpected.addType({
          name: "Element",
          base: "object",
          identify(value: unknown): value is I {
            return true;
          },
          inspect(value, depth, output) {
            output.text(`${value}`);
          },
        });

        unexpected.addAssertion<I>(
          `<Element> [not] to be accessible`,
          async (expect, value) => {
            const input = await transform(value);

            const result = await asserter.expect(input).to.be.accessible();

            expect(result.isOk(), "[not] to be", true);
          }
        );
      },
    };
  }
}
