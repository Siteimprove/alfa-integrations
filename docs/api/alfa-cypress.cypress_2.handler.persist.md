<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@siteimprove/alfa-cypress](./alfa-cypress.md) &gt; [Cypress\_2](./alfa-cypress.cypress_2.md) &gt; [Handler](./alfa-cypress.cypress_2.handler.md) &gt; [persist](./alfa-cypress.cypress_2.handler.persist.md)

## Cypress\_2.Handler.persist() function

**Signature:**

```typescript
function persist<I, T extends Hashable, Q, S>(output: Mapper<I, string>, format?: Formatter<I, T, Q, S>): Handler<I, T, Q, S>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  output | Mapper&lt;I, string&gt; |  |
|  format | Formatter&lt;I, T, Q, S&gt; | _(Optional)_ |

**Returns:**

[Handler](./alfa-assert.handler.md)<!-- -->&lt;I, T, Q, S&gt;

## Remarks

Cypress has this rather odd model of relying on synchronously enqueued hooks and commands to provide a feeling of using a synchronous API. As the handler will run \_as part of\_ a command, this means that we can't register any additional commands when the handler runs; this must instead be handled beforehand. The handler therefore starts by registering an `after()` hook that will write any files collected during the test run \_after\_ the tests are done.

