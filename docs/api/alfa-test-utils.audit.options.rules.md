<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@siteimprove/alfa-test-utils](./alfa-test-utils.md) &gt; [Audit](./alfa-test-utils.audit.md) &gt; [Options](./alfa-test-utils.audit.options.md) &gt; [rules](./alfa-test-utils.audit.options.rules.md)

## Audit.Options.rules property

Filter rules to run from the Alfa rules; and custom rules to add. (default: use all Alfa stable rules)

**Signature:**

```typescript
rules?: Filter<Flattened.Rule> & {
            custom?: Iterable<Flattened.Rule>;
            override?: boolean;
        };
```
