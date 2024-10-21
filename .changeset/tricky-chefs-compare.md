---
"@siteimprove/alfa-test-utils": minor
---

**Breaking:** `Logging.prepare` and `Logging.result` have been replaced by `Logging.fromAudit` and `Logging#print`.

Migration: replace the `Logging.result(Logging.prepare(audit), pageReportUrl)` cals with `Logging.fromAudit(audit, pageReportUrl).print()`.
