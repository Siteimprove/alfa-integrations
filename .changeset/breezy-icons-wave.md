---
"@siteimprove/alfa-jquery": patch
---

**Fixed:** `JQuery.toPage` now correctly uses the `window` in which the (first element of the) collection lives, rather than the global `window` object of whichever context it may be called from.
