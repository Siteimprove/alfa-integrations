# Manual Gatekeeping

In this context, gatekeeping is about deciding whether a test should pass or fail, and whether (for example) a Pull Request can be merged or not.

Utilities for gatekeeping are not built yet and are scheduled for September 2024. However, it is possible to inspect the audit result and make some decision about it. See [Auditing a page](../auditing/basic.md) for information how to generate the results.

For example, to fail a test if there is any accessibility issue in the page (assuming a testing library providing an assertion `t`):

```typescript
const failingRules = alfaResult.resultAggregates.filter(
  (aggregate) => aggregate.failed > 0
);

t.equal(
  failingRules.size,
  0,
  `The page has ${failingRules.size} failing rules`
);
```

See [the technical documentation of the `Result` object](https://github.com/Siteimprove/alfa-integrations/blob/main/docs/api/alfa-test-utils.audit.result.md) for more hints on what can be used as gatekeeping.
