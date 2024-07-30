# @siteimprove/alfa-jasmine

## 0.68.4

## 0.68.3

### Patch Changes

- **Changed:** Update Alfa ([#54](https://github.com/Siteimprove/alfa-integrations/pull/54))

## 0.68.2

### Patch Changes

- **Changed:** Update Alfa. ([#53](https://github.com/Siteimprove/alfa-integrations/pull/53))

## 0.68.1

### Patch Changes

- **Changed:** Update Alfa ([#52](https://github.com/Siteimprove/alfa-integrations/pull/52))

## 0.68.0

### Minor Changes

- - **Breaking:** TS resolution has been changed to `Node16`, target to `es2022`. ([#50](https://github.com/Siteimprove/alfa-integrations/pull/50))

- - **Breaking:** Alfa is now distributed as ESM rather than CJS modules; projects using it must be ESM or use dynamic `import()`. ([#50](https://github.com/Siteimprove/alfa-integrations/pull/50))

    ⚠️ This is the last of a series of changes on the internal structure and build process of distributed packages that was started with v0.67.0.

## 0.67.0

### Minor Changes

- **Breaking:** The .js files are now built in the dist folder rather than in src. ([#49](https://github.com/Siteimprove/alfa-integrations/pull/49))

  ⚠️ This is the first of a series of changes on the internal structure and build process of distributed packages. It is probably better to not use this version and wait until more of these internal changes have been done to jump directly to the final result. We are internally releasing these changes for validation purpose only.

  This should not impact consumers, the package.json files should be set correctly to consume these files.

## 0.66.3

### Patch Changes

- **Changed:** Update Alfa. ([#47](https://github.com/Siteimprove/alfa-integrations/pull/47))

## 0.66.2

### Patch Changes

- **Changed:** Update Alfa ([#46](https://github.com/Siteimprove/alfa-integrations/pull/46))

## 0.66.1

### Patch Changes

- **Changed:** Update Alfa to ^0.83.1 ([#45](https://github.com/Siteimprove/alfa-integrations/pull/45))

## 0.66.0

### Minor Changes

- **Added:** Package dependency graphs are now included in the documentation. ([#43](https://github.com/Siteimprove/alfa-integrations/pull/43))

### Patch Changes

- **Changed:** Update Alfa. ([#44](https://github.com/Siteimprove/alfa-integrations/pull/44))

## 0.65.2

### Patch Changes

- **Changed:** Update Alfa ([#42](https://github.com/Siteimprove/alfa-integrations/pull/42))

## 0.65.1

### Patch Changes

- **Changed:** Update Alfa. ([#41](https://github.com/Siteimprove/alfa-integrations/pull/41))

## 0.65.0

### Patch Changes

- **Changed:** Update Alfa to ^0.79.1 ([#40](https://github.com/Siteimprove/alfa-integrations/pull/40))

## 0.64.11

### Patch Changes

- **Changed:** Update Alfa to ^0.77.0 ([#38](https://github.com/Siteimprove/alfa-integrations/pull/38))

- **Changed:** Updated Alfa. ([#39](https://github.com/Siteimprove/alfa-integrations/pull/39))

## 0.64.10

### Patch Changes

- **Changed:** Update Alfa to ^0.76.0 ([#37](https://github.com/Siteimprove/alfa-integrations/pull/37))

## 0.64.9

### Patch Changes

- **Changed:** Update Alfa to ^0.75.0 ([#36](https://github.com/Siteimprove/alfa-integrations/pull/36))

## 0.64.8

### Patch Changes

- **Changed:** Update Alfa to ^0.74.0 ([#34](https://github.com/Siteimprove/alfa-integrations/pull/34))

## 0.64.7

### Patch Changes

- **Changed:** Update Alfa ([#33](https://github.com/Siteimprove/alfa-integrations/pull/33))

## 0.64.6

### Patch Changes

- **Changed:** Update to Alfa v0.73.0 ([#32](https://github.com/Siteimprove/alfa-integrations/pull/32))

## 0.64.5

### Patch Changes

- **Changed:** Update Alfa to v0.72.0 ([#31](https://github.com/Siteimprove/alfa-integrations/pull/31))

## 0.64.4

### Patch Changes

- **Changed:** Each package now has peer dependencies to the main Alfa packages it uses. ([#30](https://github.com/Siteimprove/alfa-integrations/pull/30))

  This should ease problem with code downstream that tries to Ix, e.g., `Option` from different versions of the package and fail to build.

- **Changed:** Update Alfa to version 0.71.0. ([#30](https://github.com/Siteimprove/alfa-integrations/pull/30))

## 0.64.3

### Patch Changes

- **Changed:** Update Alfa. ([#29](https://github.com/Siteimprove/alfa-integrations/pull/29))

## 0.64.2

## 0.64.1

### Patch Changes

- **Changed:** Update Alfa. ([`c8699c0`](https://github.com/Siteimprove/alfa-integrations/commit/c8699c081dfa36b407dbecc51baf1e11739e2537))

## 0.64.0

### Patch Changes

- **Changed:** Update to Alfa v0.68.0 ([#26](https://github.com/Siteimprove/alfa-integrations/pull/26))

## 0.63.1

### Patch Changes

- **Fixed:** Set up correct permissions in the release workflow ([`c47b1c9`](https://github.com/Siteimprove/alfa-integrations/commit/c47b1c9b3eb79ded5c872f3e31d0b33c9140c039))

## 0.63.0

### Minor Changes

- **Changed:** Update release flow to newer version ([#24](https://github.com/Siteimprove/alfa-integrations/pull/24))

### Patch Changes

- **Changed:** Update Alfa to version 0.67.0 ([#24](https://github.com/Siteimprove/alfa-integrations/pull/24))

## 0.62.11

### Patch Changes

- **Changes:** Updated Alfa to v0.66.0 ([`f8c0275`](https://github.com/Siteimprove/alfa-integrations/commit/f8c0275d9eadc6e98ad9aa9f2a17bb95b12d4859))

## 0.62.10

### Patch Changes

- **Added:** Updated Alfa to v0.65.0 ([#19](https://github.com/Siteimprove/alfa-integrations/pull/19))

  Functions that are building `Element` directly now add an empty box to them.

## 0.62.9

### Patch Changes

- **Changed:** Update Alfa to 0.64.0 ([#17](https://github.com/Siteimprove/alfa-integrations/pull/17))

## 0.62.8

### Patch Changes

- Update Alfa to 0.63.1 ([#10](https://github.com/Siteimprove/alfa-integrations/pull/10))

## 0.62.7

### Patch Changes

- **Updated:** Adapt to latest Alfa ([#9](https://github.com/Siteimprove/alfa-integrations/pull/9))

  Replace the `Result#get`/`Result#getErr` with the new `Unsafe` versions.

## 0.62.6

## 0.62.5

## 0.62.4
