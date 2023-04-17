<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@siteimprove/alfa-assert](./alfa-assert.md) &gt; [Assertion](./alfa-assert.assertion.md) &gt; [Options](./alfa-assert.assertion.options.md)

## Assertion.Options interface

**Signature:**

```typescript
interface Options<I, T extends Hashable, Q, S> 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [filter?](./alfa-assert.assertion.options.filter.md) | <code>readonly</code> | Predicate&lt;Outcome.Failed&lt;I, T, Q, S&gt;&gt; | _(Optional)_ Predicate for filtering outcomes that should count towards an assertion failure.; only failed outcomes matching this filter will be reported. If left unset, all failed outcomes will be reported |
|  [filterCantTell?](./alfa-assert.assertion.options.filtercanttell.md) | <code>readonly</code> | Predicate&lt;Outcome.CantTell&lt;I, T, Q, S&gt;&gt; | _(Optional)_ Predicate for filtering cantTell outcome. If left unset, no cantTell outcome will be reported. |
|  [oracle?](./alfa-assert.assertion.options.oracle.md) | <code>readonly</code> | Oracle&lt;I, T, Q, S&gt; | _(Optional)_ Passing an oracle to the rules evaluation. |
|  [performance?](./alfa-assert.assertion.options.performance.md) | <code>readonly</code> | Performance&lt;Rule.Event&lt;I, T, Q, S&gt;&gt; | _(Optional)_ Passing a performance listener. |
