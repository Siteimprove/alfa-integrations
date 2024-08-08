# Auditing a page

See, [how to scrape a page](scraping/scraping.md) for getting the page in the first place, and [the introduction](../README.md) for installing the `@siteimprove/alfa-test-utils` package.

## Basic usage

Simply use the `Audit.run` function on the scraped page:

```typescript
import { Audit } from "@siteimprove/alfa-test-utils";

const alfaResult = await Audit.run(alfaPage);
```

The `alfaResult` object contains may properties, see [its technical documentation](https://github.com/Siteimprove/alfa-integrations/blob/main/docs/api/alfa-test-utils.audit.result.md) for details. These are not detailed here since it is mostly intended to be passed as is to the [reporting utilities](../reporting/reporting.md).

## Configuration

Running the audit as above will use all the Alfa rules, and keep all the results. This is not necessarily the best in all situations. The `Audit.run` function takes an optional configuration object as a second argument to fine-tune the audit. This Section gives some quick common setups to use, see the next Section for more details.

### Selecting rules by conformance

The most common setup is likely to only run the rules for WCAG AA conformance (level A and AA criteria):

```typescript
import { Audit, Rules } from "@siteimprove/alfa-test-utils";

const alfaResult = await Audit.run(alfaPage, {
  rules: { include: Rules.aaFilter },
});
```

This selects all the rules that are either level A or AA for WCAG 2.2. If an older version of WCAG is required use instead the `Rules.wcag20aaFilter` or `Rules.wcag21aaFilter` filters.

### Selecting by scope

Another common case is to test design systems by building pages with individual components. Several rules make little sense in that context (e.g., these test pages do not need a skip link and often have no title).

```typescript
import { Audit, Rules } from "@siteimprove/alfa-test-utils";

const alfaResult = await Audit.run(alfaPage, {
  rules: { include: Rules.componentFilter },
});
```

### Cherry-picking (and excluding) rules

The rule id number has to be found from [Alfa technical documentation](https://alfa.siteimprove.com/rules), it is the number in the `SIA-RXX` identifier. These id can also be found from [Alfa's implementation report](https://www.w3.org/WAI/standards-guidelines/act/implementations/alfa-assisted/) in the description before the implementation table of each ACT rule.

In some case it might be beneficial to only run a handful of selected rules:

```typescript
import { Audit, Rules } from "@siteimprove/alfa-test-utils";

const alfaResult = await Audit.run(alfaPage, {
  rules: { include: Rules.cherryPickFilter(2, 42, 68) },
});
```

A more common case could be to exclude a few rules, for example there could be a known color contrast issue that cannot be fixed immediately (and waits for designers to decide on new colors), thus excluding this rule will unclutter the result and allow focusing on the immediately actionable issues.

```typescript
const alfaResult = await Audit.run(page, {
  rules: { include: Rules.aaFilter, exclude: Rules.cherryPickFilter(69) },
});
```

### Focusing outcomes

When different parts of the page are under the responsibility of different teams, it can be beneficial to let each one focus on the relevant bit. This is done by filtering the outcomes of the audit.

```typescript
import { Audit, Outcomes } from "@siteimprove/alfa-test-utils";

const alfaResult = await Audit.run(alfaPage, {
  outcomes: { include: Outcomes.insideSelectorFilter("nav.global") },
});
```

The `Outcomes.insideSelectorFilter` filter takes a CSS selector as an argument and matches all the outcomes that are inside an element matching this selector. In this case this will only report issues inside a `<nav class="global">` element, e.g. a global navigation menu.

Similarly, it may be useful to exclude occurrences inside a given container:

```typescript
import { Audit, Outcomes } from "@siteimprove/alfa-test-utils";

const alfaResult = await Audit.run(alfaPage, {
  outcomes: { exclude: Outcomes.insideSelectorFilter("nav.global") },
});
```

### Excluding specific outcome

In some case, there is a know error for a given rule on a given element, and it can be needed to ignore it temporarily because the fix as not the highest priority. In settings where [the tests fail if there are errors](./gatekeeping.md), or simply to de-clutter the view, it is easier to simply discard such an outcome:

```typescript
import { Audit, Outcomes } from "@siteimprove/alfa-test-utils";

const alfaResult = await Audit.run(alfaPage, {
  outcomes: { exclude: Outcomes.ruleAndSelectorFilter(66, "span#secret") },
});
```

This excludes the AAA color contrast rule on the element matching the given selector.

## Advanced configuration

### Dual filtering

`Rules` and `Outcomes` filters can of course easily be combined:

```typescript
import { Audit, Outcomes, Rules } from "@siteimprove/alfa-test-utils";

const alfaResult = await Audit.run(alfaPage, {
  rules: { include: Rules.aaFilter, exclude: Rules.cherryPickFilter(69) },
  outcomes: { include: Outcomes.insideSelectorFilter("nav.global") },
});
```

### Combining filters

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

### More configuration

Check the [technical documentation of the `Audit.Option` object](https://github.com/Siteimprove/alfa-integrations/blob/main/docs/api/alfa-test-utils.audit.options.md) for details. It is notably possible to use custom filters for both rules and outcomes; and to write custom rules and add them to the audit (or replace the existing ones). We currently do not have guide for these and custom rules are not really 
