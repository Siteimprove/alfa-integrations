# Siteimprove Accessibility Code Checker

The Accessibility Code Checker integrates Siteimprove’s Alfa engine into your development process and CI/CD pipeline using frameworks like Selenium, Playwright, Puppeteer, and Cypress.

With the Accessibility Code Checker, you’ll receive instant accessibility assessments, AI-powered remediation suggestions, and easily shareable reports. This ensures your website is accessible and compliant from the start.

See [full examples of using the Siteimprove Accessibility Code Checker](https://github.com/Siteimprove/alfa-examples/tree/main/accessibility-code-checker) in the `Siteimprove/alfa-examples` repository.

## Installation

Alfa is distributed as ESM. Thus, projects using the old CJS format for modules won't be able to use it directly. There are essentially four ways to handle that:

1. Switch the full project to ESM. This is likely the most future-proof solution, but also the one requiring most work upfront. Hence it might not be the best solution for all projects but is probably a good solution for new projects. Check [this quick overview of the required steps](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) to get an idea of the required work.
2. Use dynamic `import()`. That is, replace all `import { Foo } from "@siteimprove/alfa-foo;"` statements with `const { Foo } = await import("@siteipmrove/alfa-foo");` calls (and move them inside the async function which is also calling Alfa). This is a quick solution but might be cumbersome to maintain.
3. Use ESM files for the part of the project that uses Alfa. This is done easily by using the `.mts` or `.mjs` extension on the files. This is relatively quick but implies that the part of the project using Alfa will be isolated from the rest.
4. Use an ESM-for-CJS loader such as the `esm` package. This solution has not been tested, but it should work.

You can now install Alfa test utilities:

```shell
$ npm install --save-dev @siteimprove/alfa-test-utils
```

or

```shell
$ yarn add --dev @siteimprove/alfa-test-utils
```

## Running tests

Running the Siteimprove Accessibility Code Checker usually requires three steps:

1. **Scraping** the page to audit;
2. **Auditing** the page;
3. **Reporting** the results.
4. (optionally) **Decide** on test outcome (fail or pass).

Scrapping is highly dependent on the browser automation used. Specific browsers automation integrations are provided in separate packages. See some [detailled examples of scraping](scraping/integrated.md). The `@siteimprove/alfa-test-utils` package provides utilities to [audit the page](auditing/basic.md) and [report on the results](reporting/basic.md). There is currently no utility to [gatekeep](./gatekeeping/manual.md) on the results and this has to be done a bit manually.

## Why 'Alfa'

Despite the homophony, Alfa is far from being in the alpha stage of development. It powers the [Siteimprove Accessibility product](https://www.siteimprove.com/product/accessibility/) and [Accessibility Browser Extension](https://www.siteimprove.com/integrations/browser-extensions/), checking millions of web pages daily and helping thousands of customers.

We named our accessibility engine ‘Alfa’ after a guide dog. Just as Alfa guided his owner in the real world, let “Alfa” be your guide into the world of accessibility.
