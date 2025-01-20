---
"@siteimprove/alfa-test-utils": minor
---

**Breaking:** `SUP.upload` now returns a `Result<string, Array<string>>`; `Logging.from*` now accept a `Result<string, Array<string>>`.

This allows for more than one error to be reported at once.
