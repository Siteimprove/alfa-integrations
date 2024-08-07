<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@siteimprove/alfa-test-utils](./alfa-test-utils.md) &gt; [Audit](./alfa-test-utils.audit.md) &gt; [Result](./alfa-test-utils.audit.result.md)

## Audit.Result interface

The result of an audit.

**Signature:**

```typescript
interface Result 
```

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[alfaVersion](./alfa-test-utils.audit.result.alfaversion.md)


</td><td>


</td><td>

typeof alfaVersion


</td><td>

The version of Alfa used to run the audit.


</td></tr>
<tr><td>

[durations](./alfa-test-utils.audit.result.durations.md)


</td><td>


</td><td>

[Performance.Durations](./alfa-test-utils.performance.durations.md)


</td><td>

Performance durations for the audit.


</td></tr>
<tr><td>

[outcomes](./alfa-test-utils.audit.result.outcomes.md)


</td><td>


</td><td>

Map&lt;string, Sequence&lt;[alfaOutcome](./alfa-test-utils.alfaoutcome.md)<!-- -->&gt;&gt;


</td><td>

The audit outcomes, sorted by rule.


</td></tr>
<tr><td>

[page](./alfa-test-utils.audit.result.page.md)


</td><td>


</td><td>

Page


</td><td>

The audited page (Alfa representation).


</td></tr>
<tr><td>

[resultAggregates](./alfa-test-utils.audit.result.resultaggregates.md)


</td><td>


</td><td>

[ResultAggregates](./alfa-test-utils.audit.resultaggregates.md)


</td><td>

Aggregated result per rule


</td></tr>
</tbody></table>
