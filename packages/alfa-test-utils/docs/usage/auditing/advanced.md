# Advanced audit configuration

## Dual filtering

`Rules` and `Outcomes` filters can of course easily be combined:

```typescript
import { Audit, Outcomes, Rules } from "@siteimprove/alfa-test-utils";

const alfaResult = await Audit.run(alfaPage, {
  rules: { include: Rules.aaFilter, exclude: Rules.cherryPickFilter(69) },
  outcomes: { include: Outcomes.insideSelectorFilter("nav.global") },
});
```

## Combining filters

Rules filters (typically) can also be combined with the predicate combinators of the `@siteimprove/alfa-predicate` package:

```typescript
import { Predicate } from "@siteimprove/alfa-predicate";
import { Audit, Outcomes, Rules } from "@siteimprove/alfa-test-utils";

const { and } = Predicate;
const alfaResult = await Audit.run(alfaPage, {
  rules: { include: and(Rules.aaFilter, Rules.componentFilter) },
});
```

This will only select the level A and AA rules that are also "component" rules.

> **Tip:** [`Predicates`](https://github.com/Siteimprove/alfa/blob/main/docs/api/alfa-predicate.predicate.md) are simply functions returning a boolean and can also be combined manually, e.g. `rule => Rules.aaFilter(rule) && Rules.componentFilter(rule)` would achieve the same result as the `and` combinator.

## More configuration

Check the [technical documentation of the `Audit.Option` object](https://github.com/Siteimprove/alfa-integrations/blob/main/docs/api/alfa-test-utils.audit.options.md) for details; see also which [rules filters](https://github.com/Siteimprove/alfa-integrations/blob/main/docs/api/alfa-test-utils.rules.md) and [outcomes filters](https://github.com/Siteimprove/alfa-integrations/blob/main/docs/api/alfa-test-utils.outcomes.md) are pre-built and can be used . It is also possible to use custom filters for both rules and outcomes; and to write custom rules and add them to the audit (or replace the existing ones). We currently do not have guide for these and custom rules are not really supported in the Siteimprove Intelligence platform.
