# Troubleshooting CORS issues with styling

## When does it occurs?

Web pages often rely on external data, either embedded content (`<iframe>`), or external resources (images, fonts, style sheets, …) In many cases, the external data is hosted on the same server, for example a page a `https://www.example.com/index.html` includes a style sheet at `https://www.example.com/style.css`, in which case loading them is usually not a problem. In other cases, however, the external data is hosted on a different server, for example a page at `https://www.example.com/index.html` includes a style sheet at `https://shared.example.net/style.css`.

Accessing data from an external server is called Cross Origin Resource Sharing, or CORS. In order to be done securely, both servers must trust each other, otherwise one risks to load an untrusted resource, or to provide a secure resource to an untrusted client. This is usually handled through a CORS policy. See [MDN article on CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) for more information.

When CORS policies mismatch, the resources are not loaded. In the case of the Code Checker, this often results in style sheets that are not loaded and therefore the audit generates incorrect results due to missing styling. Note that the page is likely to work perfectly even if the Code Checker cannot access the style, because they are not considered to be the same origin and therefore do not trigger the same CORS policies.

CORS problems with style have been noticed in two cases: with `<link>` elements and with `@import` rules, both of them can load an external style sheet. If the page has one of these which references a separate server, then chances are that CORS issues can cause the style to not be scraped by the Accessibility Code Checker.

## Solving the problem for `<link>` elements

`<link>` elements accept a `crossorigin` attribute, that can mostly be used to enforce an anonymous (unsecure) CORS policy when requesting the resource. This makes browsers be more careful in what they put in the request, but also more lenient in whom they accept to talk to. In many cases, we have witness anonymous CORS enforcement allowing the Accessibility Code Checker to scrape the style.

While the scraped page can be updated, this is likely needless work. Instead, pass the `{ enforceAnonymousCrossOrigin: true }` option to the `toPage` function. For example, instead of

```typescript
const alfaPage = await Playwright.toPage(document);
```

use

```typescript
const alfaPage = await Playwright.toPage(document, {
  enforceAnonymousCrossOrigin: true,
});
```

or similar changes for the other integrations.

Note that this will only work if the server hosting the resource (`https://shared.example.net/` in the example above) allows anonymous CORS requests. It is normally harmless to accept anonymous requests for style sheets, but the security settings on the server might disallow it and cannot always be easily changed. If this does not solve the problem, see the next section.

## Solving the problem for `@import` rules

`@import` rules that are included, for example, as part of a `<style>` elements have no way to enforce CORS policies. In many cases, the browsers will simply refuse to show their content.

It _may_ be possible to improve the situation by changing the CORS policy on either server, but we haven't witnessed it; and changing CORS policies may open a security risk.

The simplest way to circumvent the problem is to downgrade security settings on the browser used for scraping the page. While this is obviously not a good idea in general, this is acceptable in the setting of the Accessibility Code Checker because the browser instance is short-lived (only for manipulating and scraping a page); and because all loaded resources should be under control of author of the test suite, thus removing trust issues.

For Chromium browsers, this can be done with the `--disable-web-security` flag. For example, in Playwright:

```typescript
const browser = await playwright.chromium.launch({
  args: ["--disable-web-security"],
});
```

See the documentation of the relevant browser and browser automation to find the corresponding option in each specific case.

Be careful with downgraded browser instances. They will not perform normal security check. Only use them to scrape pages you control and trust, and close the instance immediately. Do not point a downgraded instance to a random page.
