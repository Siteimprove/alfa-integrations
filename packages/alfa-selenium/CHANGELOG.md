# @siteimprove/alfa-selenium

## 0.80.2

### Patch Changes

- **Changed:** Update Alfa. ([#168](https://github.com/Siteimprove/alfa-integrations/pull/168))

## 0.80.1

### Patch Changes

- **Changed:** Alfa has been updated. ([#158](https://github.com/Siteimprove/alfa-integrations/pull/158))

## 0.80.0

### Minor Changes

- **Changed:** Alfa has been updated. ([#156](https://github.com/Siteimprove/alfa-integrations/pull/156))

## 0.79.4

### Patch Changes

- **Changed:** Update Alfa. ([#153](https://github.com/Siteimprove/alfa-integrations/pull/153))

## 0.79.3

### Patch Changes

- **Changed:** Update Alfa to 0.103.2. ([#151](https://github.com/Siteimprove/alfa-integrations/pull/151))

## 0.79.2

### Patch Changes

- **Changed:** Update Alfa to 0.103.1. ([#150](https://github.com/Siteimprove/alfa-integrations/pull/150))

## 0.79.1

### Patch Changes

- **Changed:** Update Alfa to 0.103.0. ([#148](https://github.com/Siteimprove/alfa-integrations/pull/148))

## 0.79.0

### Minor Changes

- **Added:** `.toPage`, `.toNode`, or `#scrape` now accept a `dom.Native.Options` parameter; currently to enforce anonymous cross-origin on `<link>` elements before scraping the page. CLI now accepts a `--enforce-anonymous-cross-origin` flag to enforce this behavior. ([#144](https://github.com/Siteimprove/alfa-integrations/pull/144))

### Patch Changes

- **Changed:** Update Alfa to 0.102.0. ([#146](https://github.com/Siteimprove/alfa-integrations/pull/146))

## 0.78.2

### Patch Changes

- **Changed:** Update Alfa to ^0.101.0. ([#143](https://github.com/Siteimprove/alfa-integrations/pull/143))

## 0.78.1

### Patch Changes

- **Changed:** Update Alfa to ^0.100.1. ([#137](https://github.com/Siteimprove/alfa-integrations/pull/137))

## 0.78.0

### Patch Changes

- **Changed:** Update Alfa ([#134](https://github.com/Siteimprove/alfa-integrations/pull/134))

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
