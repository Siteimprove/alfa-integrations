# @siteimprove/alfa-selenium

## 0.77.3

## 0.77.2

## 0.77.1

## 0.77.0

## 0.76.2

### Patch Changes

- **Changed:** Update Alfa to ^0.97.0 ([#118](https://github.com/Siteimprove/alfa-integrations/pull/118))

## 0.76.1

### Patch Changes

- **Added:** The page URL is now correctly filled when grabbing the page. ([#116](https://github.com/Siteimprove/alfa-integrations/pull/116))

  A full `Request` and `Response` are build, with sensible values:

  - The request is assumed to be a GET.
  - The response is assumed to be a 200 OK with HTMl content.

  These values are not always correct, but should be in most cases. It is not really possible to build better values because the actual request and response may be long lost by the time one decides to call `.toPage`.

## 0.76.0

## 0.75.0

### Patch Changes

- **Changed:** Update Alfa ([#111](https://github.com/Siteimprove/alfa-integrations/pull/111))

- **Changed:** Update Alfa to ^0.96.0 ([#113](https://github.com/Siteimprove/alfa-integrations/pull/113))

## 0.74.3

### Patch Changes

- **Changed:** Update Alfa ([#104](https://github.com/Siteimprove/alfa-integrations/pull/104))

## 0.74.2

### Patch Changes

- **Changed:** Update Alfa ([#100](https://github.com/Siteimprove/alfa-integrations/pull/100))

## 0.74.1

### Patch Changes

- **Changed:** Update Alfa ([#99](https://github.com/Siteimprove/alfa-integrations/pull/99))

## 0.74.0

### Patch Changes

- **Changed:** Update Alfa ([#98](https://github.com/Siteimprove/alfa-integrations/pull/98))

## 0.73.4

### Patch Changes

- **Changed:** Update Alfa ([#95](https://github.com/Siteimprove/alfa-integrations/pull/95))

## 0.73.3

### Patch Changes

- **Changed:** Update Alfa ([#94](https://github.com/Siteimprove/alfa-integrations/pull/94))

## 0.73.2

### Patch Changes

- **Changed:** Update Alfa and yarn ([#87](https://github.com/Siteimprove/alfa-integrations/pull/87))

## 0.73.1

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

### Minor Changes

- **Added:** A new integration for scraping pages with Selenium is now available. ([#74](https://github.com/Siteimprove/alfa-integrations/pull/74))
