---
"@siteimprove/alfa-test-utils": patch
---

**Added:** The audit and report functionalities can now be imported separately.

This resolves a problem where logging functionalities, highly depending on node, would crash bundlers and injections into other Javascript worlds when trying to import the full `@siteimprove/alfa-test-utils` package.
