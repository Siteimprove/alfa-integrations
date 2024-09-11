---
"@siteimprove/alfa-test-utils": patch
---

**Changed:** Content inside `<iframe>` is not checked anymore by default.

This is often third party content, or separate pages that can be checked separately, hence it often makes less sense to re-check it as part of the full page.

If you want to include `<ifrme>` content in the reports, pass the `{ outcomes: { includeIframe: true } }` to `Audit.run`. Content of `<iframe>` will nonetheless not be displayed in the Siteimprove Intelligence Platform Page Report, even if the uploaded result contains it.
