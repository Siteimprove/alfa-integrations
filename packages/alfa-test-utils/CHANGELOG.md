# @siteimprove/alfa-test-utils

## 0.73.3

### Patch Changes

- **Changed:** Update Alfa ([#94](https://github.com/Siteimprove/alfa-integrations/pull/94))

## 0.73.2

### Patch Changes

- **Changed:** Update Alfa and yarn ([#87](https://github.com/Siteimprove/alfa-integrations/pull/87))

## 0.73.1

### Patch Changes

- **Changed:** Content inside `<iframe>` is not checked anymore by default. ([#81](https://github.com/Siteimprove/alfa-integrations/pull/81))

  This is often third party content, or separate pages that can be checked individually, hence it often makes less sense to re-check it as part of the full page.

  If you want to include `<ifrme>` content in the reports, pass the `{ outcomes: { includeIframe: true } }` to `Audit.run`. Content of `<iframe>` will nonetheless not be displayed in the Siteimprove Intelligence Platform Page Report, even if the uploaded result contains it.

## 0.73.0

### Minor Changes

- **Changed:** Reverting publication process. Use this version. ([`0d018f8`](https://github.com/Siteimprove/alfa-integrations/commit/0d018f84d1fe0f714f397de88c4bd3e6434cba57))

## 0.72.2

## 0.72.1

## 0.72.0

### Minor Changes

- **Changed:** Dummy minor version to experiment with publish flow, use the previous or next minor version instead. ([`4daf29d`](https://github.com/Siteimprove/alfa-integrations/commit/4daf29d55745310b6ac845f963b306a4f0e57b08))

## 0.71.2

### Patch Changes

- **Changed:** Update Alfa to ^0.92.0 ([#78](https://github.com/Siteimprove/alfa-integrations/pull/78))

## 0.71.1

## 0.71.0

## 0.70.1

### Patch Changes

- **Changed:** Update Alfa ([#75](https://github.com/Siteimprove/alfa-integrations/pull/75))

## 0.70.0

### Minor Changes

- **Changed:** Update Alfa ([#68](https://github.com/Siteimprove/alfa-integrations/pull/68))

## 0.69.1

### Patch Changes

- **Added:** Documentation for the `@siteimprove/alfa-test-utils` package. ([#66](https://github.com/Siteimprove/alfa-integrations/pull/66))

- **Added:** Add utilities for pretty-printing console output ([#64](https://github.com/Siteimprove/alfa-integrations/pull/64))

## 0.69.0

### Minor Changes

- **Added:** New package for handling test utilities and interactions with the Siteimprove Intelligence Platform. ([#59](https://github.com/Siteimprove/alfa-integrations/pull/59))

  A new package is now available, intended to wrap several test utilities. It currently contains:

  - a wrapper to upload audit results to the Siteimprove Intelligence Platform and see them in the Page Report;
  - a helper to run an audit, selecting rules to use and outcomes to keep;
  - a collection of filters to select the rules to run in the audit;
  - a collection of filters to select the outcomes to keep in the audit.
