---
"@siteimprove/alfa-test-utils": minor
---

**Added:** `SIP.upload` can now be called without an user email or API key, in which case it will return an `Err`.

That can nonetheless be passed to `Logging.fromAudit` which will then simply discard it. This makes it simpler to write tests without checking proactively the presence of the credentials and, e.g., run them both in environments where they are available and environments where they don't exist.
