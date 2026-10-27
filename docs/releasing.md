# Releasing

Due to the inter-dependencies with other repositories, and the need to use the new release in Siteimprove products deployment process, the full release flow is a bit complicated. For the Alfa Integrations repository only, it is handled by [the release workflow](https://github.com/Siteimprove/alfa-integrations/actions/workflows/release.yml), but check [How to release Alfa (Siteimprove internal document)](https://siteimprove-wgs.atlassian.net/wiki/spaces/CE/pages/6291161101/How+to+release+Alfa) to be sure to not skip any step.

## Changes to supported Alfa versions

If a change to an integration package's Alfa requirements drops support for previously supported Alfa versions, run `yarn changeset` and select **minor** for the affected package. Commit the generated changeset with the dependency change. The existing fixed release group keeps the integration packages on the same version.

While integrations are on `0.x`, this means releasing `0.85.0` rather than `0.84.3`, for example. A caret range such as `^0.84.0` does not include `0.85.0`, preventing the new incompatible requirements from being installed automatically.
