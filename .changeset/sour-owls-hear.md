---
"@siteimprove/alfa-test-utils": minor
---

**Changed:** `CantTell` occurrences (Potential Issues) are no longer uploaded to the Siteimprove Platform.

This significantly reduces the payload size on larger pages. The Potential Issues review flow is not implemented for these page reports, so the benefits of uploading these is null.

The `CantTell` results are still generated locally and may be acted upon by custom reporters, or to write oracles for the audit.
