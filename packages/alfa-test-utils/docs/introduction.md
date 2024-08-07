# Siteimprove Accessibility Code Checker

## Overview

Running the Siteimprove Accessibility Code Checker usually requires three steps:

1. **Scraping** the page to audit;
2. **Auditing** the page;
3. **Reporting** the results.

Scrapping is highly dependent on the browser automation used. Specific browsers automation integrations are provided in separate packages. See some [detailled example of scraping](./scraping.md).

The `@siteimprove/alfa-test-utils` package provides utilities to audit the page and report on the results.

## Installation

Alfa packages are distributed as npm packages in the Github registry. See [Github documentation on the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package) for configuring your package manager to use the Github registry for the `@siteimprove` organisation. Or check a [quick guide on configuring the Github registry](./github-registry.md).

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
