# Alfa integrations changelog

## [0.79.0](../../compare/v0.78.2...v0.79.0) (2025-03-28)

### Added

- [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0790), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0790), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0790), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0790), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0790), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0790), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0790), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0790), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0790), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0790): `.toPage`, `.toNode`, or `#scrape` now accept a `dom.Native.Options` parameter; currently to enforce anonymous cross-origin on `<link>` elements before scraping the page. CLI now accepts a `--enforce-anonymous-cross-origin` flag to enforce this behavior. ([#144](https://github.com/Siteimprove/alfa-integrations/pull/144))

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0790), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0790), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0790), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0790), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0790), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0790), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0790), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0790), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0790), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0790), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0790), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0790), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0790), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0790), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0790), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0790), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0790), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0790), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0790), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0790), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0790), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0790), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0790), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0790), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0790), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0790), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0790): Update Alfa to 0.102.0. ([#146](https://github.com/Siteimprove/alfa-integrations/pull/146))

## [0.78.2](../../compare/v0.78.1...v0.78.2) (2025-03-20)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0782), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0782), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0782), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0782), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0782), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0782), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0782), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0782), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0782), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0782), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0782), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0782), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0782), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0782), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0782), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0782), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0782), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0782), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0782), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0782), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0782), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0782), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0782), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0782), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0782), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0782), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0782): Update Alfa to ^0.101.0. ([#143](https://github.com/Siteimprove/alfa-integrations/pull/143))

## [0.78.1](../../compare/v0.78.0...v0.78.1) (2025-03-18)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0781), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0781), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0781), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0781), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0781), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0781), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0781), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0781), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0781), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0781), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0781), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0781), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0781), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0781), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0781), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0781), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0781), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0781), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0781), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0781), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0781), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0781), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0781), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0781), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0781), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0781), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0781): Update Alfa to ^0.100.1. ([#137](https://github.com/Siteimprove/alfa-integrations/pull/137))

## [0.78.0](../../compare/v0.77.3...v0.78.0) (2025-03-05)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0780), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0780), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0780), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0780), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0780), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0780), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0780), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0780), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0780), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0780), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0780), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0780), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0780), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0780), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0780), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0780), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0780), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0780), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0780), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0780), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0780), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0780), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0780), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0780), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0780), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0780), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0780): Update Alfa. ([#134](https://github.com/Siteimprove/alfa-integrations/pull/134))

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0780): `CantTell` occurrences (Potential Issues) are no longer uploaded to the Siteimprove Platform. ([#133](https://github.com/Siteimprove/alfa-integrations/pull/133))

## [0.77.3](../../compare/v0.77.2...v0.77.3) (2025-02-21)

### Fixed

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0773): Fixed string escape characters in audit serialization. ([#131](https://github.com/Siteimprove/alfa-integrations/pull/131))

## [0.77.2](../../compare/v0.77.1...v0.77.2) (2025-02-20)

### Fixed

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0772): Increase the maximum size of pages that can be uploaded. ([#129](https://github.com/Siteimprove/alfa-integrations/pull/129))

## [0.77.1](../../compare/v0.77.0...v0.77.1) (2025-02-05)

### Changed

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0771): Improve error messages. ([#128](https://github.com/Siteimprove/alfa-integrations/pull/128))

## [0.77.0](../../compare/v0.76.2...v0.77.0) (2025-02-03)

### Breaking

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0770): The `siteID` parameter for uploading to the Siteimprove Intelligence Platform now needs to be a `number`, not a `string`. ([#122](https://github.com/Siteimprove/alfa-integrations/pull/122))

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0770): Individual rules durations are not recorded anymore during audits. ([#122](https://github.com/Siteimprove/alfa-integrations/pull/122))

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0770): `SUP.upload` now returns a `Result<string, Array<string>>`; `Logging.from*` now accept a `Result<string, Array<string>>`. ([#120](https://github.com/Siteimprove/alfa-integrations/pull/120))

### Added

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0770): `Logging` now includes error messages about problems that happens during deserialization or upload of results. ([#120](https://github.com/Siteimprove/alfa-integrations/pull/120))

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0770): `Logging` now accepts a severity (default to `"log"`) and `Logging#print` respects it. ([#120](https://github.com/Siteimprove/alfa-integrations/pull/120))

### Changed

- [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0770), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0770): Update Puppeteer vo v24. ([#124](https://github.com/Siteimprove/alfa-integrations/pull/124))

- [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0770): Update Cypress to v14. ([#124](https://github.com/Siteimprove/alfa-integrations/pull/124))

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0770), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0770), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0770), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0770), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0770), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0770): Classes that do not implement the Singleton pattern now have `protected` constructor and can be extended. ([#119](https://github.com/Siteimprove/alfa-integrations/pull/119))

## [0.76.2](../../compare/v0.76.1...v0.76.2) (2024-12-18)

### Changed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0762), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0762), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0762), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0762), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0762), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0762), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0762), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0762), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0762), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0762), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0762), [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0762), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0762), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0762), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0762), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0762), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0762), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0762), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0762), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0762), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0762), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0762), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0762), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0762), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0762), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0762), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0762): Update Alfa to ^0.97.0. ([#118](https://github.com/Siteimprove/alfa-integrations/pull/118))

## [0.76.1](../../compare/v0.76.0...v0.76.1) (2024-12-13)

### Added

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0761): The current version number is now exported. ([#115](https://github.com/Siteimprove/alfa-integrations/pull/115))

- [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0761), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0761), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0761), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0761): The page URL is now correctly filled when grabbing the page. ([#116](https://github.com/Siteimprove/alfa-integrations/pull/116))

## [0.76.0](../../compare/v0.75.0...v0.76.0) (2024-12-09)

### Added

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0760): `SIP.upload` now also accepts the commit information as an `Option` or `Result`. ([#114](https://github.com/Siteimprove/alfa-integrations/pull/114))

## [0.75.0](../../compare/v0.74.3...v0.75.0) (2024-12-06)

### Breaking

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0750): `SIP.upload` now requires a `siteID` parameter. ([#106](https://github.com/Siteimprove/alfa-integrations/pull/106))

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0750): `CommitInformation` is now optional and some of its properties have been rennamed; see the package's changelog for explanations and migration advice. ([#107](https://github.com/Siteimprove/alfa-integrations/pull/107))

### Added

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0750): A `Rules.ARIAFilter` and `Rules.bestPracticesFilter` are now available. ([#105](https://github.com/Siteimprove/alfa-integrations/pull/105))

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0750), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0750), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0750), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0750), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0750), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0750), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0750), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0750), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0750), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0750), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0750), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0750), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0750), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0750), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0750), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0750), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0750), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0750), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0750), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0750), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0750), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0750), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0750), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0750), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0750), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0750), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0750): Update Alfa. ([#111](https://github.com/Siteimprove/alfa-integrations/pull/111))

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0750), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0750), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0750), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0750), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0750), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0750), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0750), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0750), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0750), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0750), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0750), [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0750), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0750), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0750), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0750), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0750), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0750), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0750), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0750), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0750), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0750), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0750), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0750), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0750), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0750), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0750), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0750): Update Alfa to ^0.96.0. ([#113](https://github.com/Siteimprove/alfa-integrations/pull/113))

## [0.74.3](../../compare/v0.74.2...v0.74.3) (2024-11-19)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0743), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0743), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0743), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0743), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0743), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0743), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0743), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0743), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0743), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0743), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0743), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0743), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0743), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0743), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0743), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0743), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0743), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0743), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0743), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0743), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0743), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0743), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0743), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0743), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0743), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0743), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0743): Update Alfa. ([#104](https://github.com/Siteimprove/alfa-integrations/pull/104))

## [0.74.2](../../compare/v0.74.1...v0.74.2) (2024-10-22)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0742), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0742), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0742), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0742), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0742), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0742), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0742), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0742), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0742), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0742), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0742), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0742), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0742), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0742), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0742), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0742), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0742), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0742), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0742), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0742), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0742), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0742), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0742), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0742), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0742), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0742), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0742): Update Alfa. ([#100](https://github.com/Siteimprove/alfa-integrations/pull/100))

## [0.74.1](../../compare/v0.74.0...v0.74.1) (2024-10-22)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0741), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0741), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0741), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0741), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0741), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0741), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0741), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0741), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0741), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0741), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0741), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0741), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0741), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0741), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0741), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0741), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0741), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0741), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0741), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0741), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0741), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0741), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0741), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0741), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0741), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0741), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0741): Update Alfa. ([#99](https://github.com/Siteimprove/alfa-integrations/pull/99))

## [0.74.0](../../compare/v0.73.4...v0.74.0) (2024-10-22)

### Breaking

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0740): `Logging.prepare` and `Logging.result` have been replaced by `Logging.fromAudit` and `Logging#print`. ([#96](https://github.com/Siteimprove/alfa-integrations/pull/96))

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0740): The `Audit.Result` type has been renamed to `Audit`. ([#96](https://github.com/Siteimprove/alfa-integrations/pull/96))

### Added

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0740): `SIP.upload` can now be called without an user email or API key, in which case it will return an `Err`. ([#96](https://github.com/Siteimprove/alfa-integrations/pull/96))

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0740): An `Audit#toJSON` serialisation is now available. ([#96](https://github.com/Siteimprove/alfa-integrations/pull/96))

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0740): `Logging.fromAudit` also accepts an `Audit.JSON` input. ([#96](https://github.com/Siteimprove/alfa-integrations/pull/96))

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0740): The audit and report functionalities can now be imported separately. ([#96](https://github.com/Siteimprove/alfa-integrations/pull/96))

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0740), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0740), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0740), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0740), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0740), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0740), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0740), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0740), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0740), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0740), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0740), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0740), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0740), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0740), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0740), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0740), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0740), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0740), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0740), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0740), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0740), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0740), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0740), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0740), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0740), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0740), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0740): Update Alfa. ([#98](https://github.com/Siteimprove/alfa-integrations/pull/98))

## [0.73.4](../../compare/v0.73.3...v0.73.4) (2024-10-11)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0734), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0734), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0734), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0734), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0734), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0734), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0734), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0734), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0734), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0734), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0734), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0734), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0734), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0734), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0734), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0734), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0734), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0734), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0734), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0734), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0734), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0734), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0734), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0734), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0734), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0734), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0734): Update Alfa. ([#95](https://github.com/Siteimprove/alfa-integrations/pull/95))

## [0.73.3](../../compare/v0.73.2...v0.73.3) (2024-10-07)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0733), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0733), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0733), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0733), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0733), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0733), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0733), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0733), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0733), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0733), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0733), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0733), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0733), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0733), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0733), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0733), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0733), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0733), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0733), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0733), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0733), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0733), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0733), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0733), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0733), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0733), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0733): Update Alfa. ([#94](https://github.com/Siteimprove/alfa-integrations/pull/94))

## [0.73.2](../../compare/v0.73.1...v0.73.2) (2024-10-03)

### Changed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0732), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0732), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0732), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0732), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0732), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0732), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0732), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0732), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0732), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0732), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0732), [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0732), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0732), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0732), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0732), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0732), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0732), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0732), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0732), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0732), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0732), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0732), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0732), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0732), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0732), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0732), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0732): Update Alfa and yarn. ([#87](https://github.com/Siteimprove/alfa-integrations/pull/87))

## [0.73.1](../../compare/v0.73.0...v0.73.1) (2024-09-12)

### Changed

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0731): Content inside `<iframe>` is not checked anymore by default. ([#81](https://github.com/Siteimprove/alfa-integrations/pull/81))

## [0.73.0](../../compare/v0.72.2...v0.73.0) (2024-09-11)

### Changed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0730), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0730), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0730), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0730), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0730), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0730), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0730), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0730), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0730), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0730), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0730), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0730), [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0730), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0730), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0730), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0730), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0730), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0730), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0730), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0730), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0730), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0730), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0730), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0730), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0730), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0730), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0730): Reverting publication process. Use this version.

## [0.72.2](../../compare/v0.72.1...v0.72.2) (2024-09-11)

### Changed

- [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0722): Fixed repository URL in manifest files.

## [0.72.1](../../compare/v0.72.0...v0.72.1) (2024-09-11)

### Changed

- [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0721): Trying to activate npmjs release flow. ([#79](https://github.com/Siteimprove/alfa-integrations/pull/79))

## [0.72.0](../../compare/v0.71.2...v0.72.0) (2024-09-11)

### Changed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0720), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0720), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0720), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0720), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0720), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0720), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0720), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0720), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0720), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0720), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0720), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0720), [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0720), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0720), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0720), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0720), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0720), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0720), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0720), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0720), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0720), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0720), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0720), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0720), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0720), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0720), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0720): Dummy minor version to experiment with publish flow, use the previous or next minor version instead.

## [0.71.2](../../compare/v0.71.1...v0.71.2) (2024-09-11)

### Changed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0712), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0712), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0712), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0712), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0712), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0712), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0712), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0712), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0712), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0712), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0712), [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0712), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0712), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0712), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0712), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0712), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0712), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0712), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0712), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0712), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0712), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0712), [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0712), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0712), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0712), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0712), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0712): Update Alfa to ^0.92.0. ([#78](https://github.com/Siteimprove/alfa-integrations/pull/78))

## [0.71.1](../../compare/v0.71.0...v0.71.1) (2024-09-09)

### Fixed

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0711): The EARL formatter is now calling `jsonld` correctly and functioning again. ([#77](https://github.com/Siteimprove/alfa-integrations/pull/77))

## [0.71.0](../../compare/v0.70.1...v0.71.0) (2024-09-09)

### Added

- [@siteimprove/alfa-selenium](packages/alfa-selenium/CHANGELOG.md#0710): A new integration for scraping pages with Selenium is now available. ([#74](https://github.com/Siteimprove/alfa-integrations/pull/74))

## [0.70.1](../../compare/v0.70.0...v0.70.1) (2024-09-03)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0701), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0701), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0701), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0701), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0701), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0701), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0701), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0701), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0701), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0701), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0701), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0701), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0701), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0701), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0701), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0701), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0701), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0701), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0701), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0701), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0701), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0701), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0701), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0701), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0701), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0701): Update Alfa. ([#75](https://github.com/Siteimprove/alfa-integrations/pull/75))

## [0.70.0](../../compare/v0.69.1...v0.70.0) (2024-08-21)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0700), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0700), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0700), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0700), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0700), [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0700), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0700), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0700), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0700), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0700), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0700), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0700), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0700), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0700), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0700), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0700), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0700), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0700), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0700), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0700), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0700), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0700), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0700), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0700), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0700), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0700): Update Alfa. ([#68](https://github.com/Siteimprove/alfa-integrations/pull/68))

## [0.69.1](../../compare/v0.69.0...v0.69.1) (2024-08-08)

### Added

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0691): Documentation for the `@siteimprove/alfa-test-utils` package. ([#66](https://github.com/Siteimprove/alfa-integrations/pull/66))

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0691): Add utilities for pretty-printing console output. ([#64](https://github.com/Siteimprove/alfa-integrations/pull/64))

## [0.69.0](../../compare/v0.68.4...v0.69.0) (2024-08-07)

### Added

- [@siteimprove/alfa-test-utils](packages/alfa-test-utils/CHANGELOG.md#0690): New package for handling test utilities and interactions with the Siteimprove Intelligence Platform. ([#59](https://github.com/Siteimprove/alfa-integrations/pull/59))

## [0.68.4](../../compare/v0.68.3...v0.68.4) (2024-07-29)

### Changed

- [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0684): Fix importing of package name and version. ([#57](https://github.com/Siteimprove/alfa-integrations/pull/57))

- [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0684): Invoke `chalk` directly instead of the `alfa-highlight` deprecated wrapper. ([#58](https://github.com/Siteimprove/alfa-integrations/pull/58))

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0684), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0684): Alfa version is now read from the exported value in `alfa-rules`. ([#57](https://github.com/Siteimprove/alfa-integrations/pull/57))

### Fixed

- [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0684): mark CLI as executable. ([#56](https://github.com/Siteimprove/alfa-integrations/pull/56))

## [0.68.3](../../compare/v0.68.2...v0.68.3) (2024-07-25)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0683), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0683), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0683), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0683), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0683), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0683), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0683), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0683), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0683), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0683), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0683), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0683), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0683), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0683), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0683), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0683), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0683), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0683), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0683), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0683), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0683), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0683), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0683), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0683), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0683): Update Alfa. ([#54](https://github.com/Siteimprove/alfa-integrations/pull/54))

## [0.68.2](../../compare/v0.68.1...v0.68.2) (2024-07-25)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0682), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0682), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0682), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0682), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0682), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0682), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0682), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0682), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0682), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0682), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0682), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0682), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0682), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0682), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0682), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0682), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0682), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0682), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0682), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0682), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0682), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0682), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0682), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0682), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0682): Update Alfa. ([#53](https://github.com/Siteimprove/alfa-integrations/pull/53))

## [0.68.1](../../compare/v0.68.0...v0.68.1) (2024-07-19)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0681), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0681), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0681), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0681), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0681), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0681), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0681), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0681), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0681), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0681), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0681), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0681), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0681), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0681), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0681), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0681), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0681), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0681), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0681), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0681), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0681), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0681), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0681), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0681), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0681): Update Alfa. ([#52](https://github.com/Siteimprove/alfa-integrations/pull/52))

## [0.68.0](../../compare/v0.67.0...v0.68.0) (2024-07-03)

### Breaking

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0680), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0680), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0680), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0680), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0680), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0680), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0680), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0680), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0680), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0680), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0680), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0680), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0680), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0680), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0680), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0680), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0680), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0680), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0680), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0680), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0680), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0680), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0680), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0680), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0680): TS resolution has been changed to `Node16`, target to `es2022`. ([#50](https://github.com/Siteimprove/alfa-integrations/pull/50))

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0680), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0680), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0680), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0680), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0680), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0680), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0680), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0680), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0680), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0680), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0680), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0680), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0680), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0680), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0680), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0680), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0680), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0680), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0680), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0680), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0680), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0680), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0680), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0680), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0680): Alfa is now distributed as ESM rather than CJS modules; projects using it must be ESM or use dynamic `import()`. ([#50](https://github.com/Siteimprove/alfa-integrations/pull/50))

## [0.67.0](../../compare/v0.66.3...v0.67.0) (2024-06-26)

### Breaking

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0670), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0670), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0670), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0670), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0670), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0670), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0670), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0670), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0670), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0670), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0670), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0670), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0670), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0670), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0670), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0670), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0670), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0670), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0670), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0670), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0670), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0670), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0670), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0670): The .js files are now built in the dist folder rather than in src. ([#49](https://github.com/Siteimprove/alfa-integrations/pull/49))

## [0.66.3](../../compare/v0.66.2...v0.66.3) (2024-06-25)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0663), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0663), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0663), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0663), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0663), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0663), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0663), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0663), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0663), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0663), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0663), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0663), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0663), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0663), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0663), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0663), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0663), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0663), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0663), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0663), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0663), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0663), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0663), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0663), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0663): Update Alfa. ([#47](https://github.com/Siteimprove/alfa-integrations/pull/47))

## [0.66.2](../../compare/v0.66.1...v0.66.2) (2024-06-25)

### Changed

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0662), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0662), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0662), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0662), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0662), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0662), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0662), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0662), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0662), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0662), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0662), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0662), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0662), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0662), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0662), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0662), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0662), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0662), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0662), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0662), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0662), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0662), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0662), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0662), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0662): Update Alfa. ([#46](https://github.com/Siteimprove/alfa-integrations/pull/46))

## [0.66.1](../../compare/v0.66.0...v0.66.1) (2024-06-24)

### Changed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0661), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0661), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0661), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0661), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0661), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0661), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0661), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0661), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0661), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0661), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0661), [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0661), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0661), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0661), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0661), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0661), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0661), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0661), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0661), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0661), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0661), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0661), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0661), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0661), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0661): Update Alfa to ^0.83.1. ([#45](https://github.com/Siteimprove/alfa-integrations/pull/45))

## [0.66.0](../../compare/v0.65.2...v0.66.0) (2024-06-13)

### Added

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0660), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0660), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0660), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0660), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0660), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0660), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0660), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0660), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0660), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0660), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0660), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0660), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0660), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0660), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0660), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0660), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0660), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0660), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0660), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0660), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0660), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0660), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0660), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0660): Package dependency graphs are now included in the documentation. ([#43](https://github.com/Siteimprove/alfa-integrations/pull/43))

### Changed

- [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0660): Update webdriverio to latest version. ([#43](https://github.com/Siteimprove/alfa-integrations/pull/43))

- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0660), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0660), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0660), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0660), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0660), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0660), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0660), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0660), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0660), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0660), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0660), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0660), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0660), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0660), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0660), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0660), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0660), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0660), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0660), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0660), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0660), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0660), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0660), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0660), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0660): Update Alfa. ([#44](https://github.com/Siteimprove/alfa-integrations/pull/44))

## [0.65.2](../../compare/v0.65.1...v0.65.2) (2024-06-03)

### Changed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0652), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0652), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0652), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0652), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0652), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0652), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0652), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0652), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0652), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0652), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0652), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0652), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0652), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0652), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0652), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0652), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0652), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0652), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0652), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0652), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0652), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0652), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0652), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0652): Update Alfa. ([#42](https://github.com/Siteimprove/alfa-integrations/pull/42))

## [0.65.1](../../compare/v0.65.0...v0.65.1) (2024-05-01)

### Changed

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0651), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0651), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0651), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0651), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0651), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0651), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0651), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0651), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0651), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0651), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0651), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0651), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0651), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0651), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0651), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0651), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0651), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0651), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0651), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0651), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0651), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0651), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0651), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0651): Update Alfa. ([#41](https://github.com/Siteimprove/alfa-integrations/pull/41))

## [0.65.0](../../compare/v0.64.11...v0.65.0) (2024-04-30)

### Breaking

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0650), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0650), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0650), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0650): `toPage` is now `async`. ([#40](https://github.com/Siteimprove/alfa-integrations/pull/40))

### Changed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0650), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0650), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0650), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0650), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0650), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0650), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0650), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0650), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0650), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0650), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0650), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0650), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0650), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0650), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0650), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0650), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0650), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0650), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0650), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0650), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0650), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0650), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0650), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0650): Update Alfa to ^0.79.1. ([#40](https://github.com/Siteimprove/alfa-integrations/pull/40))

## [0.64.11](../../compare/v0.64.10...v0.64.11) (2024-04-17)

### Changed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#06411), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#06411), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#06411), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#06411), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#06411), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#06411), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#06411), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#06411), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#06411), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#06411), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#06411), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#06411), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#06411), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#06411), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#06411), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#06411), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#06411), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#06411), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#06411), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#06411), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#06411), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#06411), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#06411), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#06411): Update Alfa to ^0.77.0. ([#38](https://github.com/Siteimprove/alfa-integrations/pull/38))

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#06411), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#06411), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#06411), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#06411), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#06411), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#06411), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#06411), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#06411), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#06411), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#06411), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#06411), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#06411), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#06411), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#06411), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#06411), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#06411), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#06411), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#06411), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#06411), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#06411), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#06411), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#06411), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#06411), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#06411): Updated Alfa. ([#39](https://github.com/Siteimprove/alfa-integrations/pull/39))

## [0.64.10](../../compare/v0.64.9...v0.64.10) (2024-03-21)

### Changed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#06410), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#06410), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#06410), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#06410), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#06410), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#06410), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#06410), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#06410), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#06410), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#06410), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#06410), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#06410), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#06410), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#06410), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#06410), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#06410), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#06410), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#06410), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#06410), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#06410), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#06410), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#06410), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#06410), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#06410): Update Alfa to ^0.76.0. ([#37](https://github.com/Siteimprove/alfa-integrations/pull/37))

## [0.64.9](../../compare/v0.64.8...v0.64.9) (2024-02-26)

### Changed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0649), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0649), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0649), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0649), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0649), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0649), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0649), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0649), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0649), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0649), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0649), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0649), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0649), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0649), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0649), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0649), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0649), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0649), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0649), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0649), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0649), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0649), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0649), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0649): Update Alfa to ^0.75.0. ([#36](https://github.com/Siteimprove/alfa-integrations/pull/36))

## [0.64.8](../../compare/v0.64.7...v0.64.8) (2024-02-14)

### Changed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0648), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0648), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0648), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0648), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0648), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0648), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0648), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0648), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0648), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0648), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0648), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0648), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0648), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0648), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0648), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0648), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0648), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0648), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0648), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0648), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0648), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0648), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0648), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0648): Update Alfa to ^0.74.0. ([#34](https://github.com/Siteimprove/alfa-integrations/pull/34))

## [0.64.7](../../compare/v0.64.6...v0.64.7) (2024-02-14)

### Changed

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0647), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0647), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0647), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0647), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0647), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0647), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0647), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0647), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0647), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0647), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0647), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0647), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0647), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0647), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0647), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0647), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0647), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0647), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0647), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0647), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0647), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0647), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0647), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0647): Update Alfa. ([#33](https://github.com/Siteimprove/alfa-integrations/pull/33))

## [0.64.6](../../compare/v0.64.5...v0.64.6) (2024-02-06)

### Changed

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0646), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0646), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0646), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0646), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0646), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0646), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0646), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0646), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0646), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0646), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0646), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0646), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0646), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0646), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0646), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0646), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0646), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0646), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0646), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0646), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0646), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0646), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0646), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0646): Update to Alfa v0.73.0. ([#32](https://github.com/Siteimprove/alfa-integrations/pull/32))

## [0.64.5](../../compare/v0.64.4...v0.64.5) (2024-01-08)

### Changed

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0645), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0645), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0645), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0645), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0645), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0645), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0645), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0645), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0645), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0645), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0645), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0645), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0645), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0645), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0645), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0645), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0645), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0645), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0645), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0645), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0645), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0645), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0645), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0645): Update Alfa to v0.72.0. ([#31](https://github.com/Siteimprove/alfa-integrations/pull/31))

## [0.64.4](../../compare/v0.64.3...v0.64.4) (2023-12-20)

### Changed

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0644), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0644), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0644), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0644), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0644), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0644), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0644), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0644), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0644), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0644), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0644), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0644), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0644), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0644), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0644), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0644), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0644), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0644), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0644), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0644), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0644), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0644), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0644), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0644): Each package now has peer dependencies to the main Alfa packages it uses. ([#30](https://github.com/Siteimprove/alfa-integrations/pull/30))

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0644), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0644), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0644), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0644), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0644), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0644), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0644), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0644), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0644), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0644), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0644), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0644), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0644), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0644), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0644), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0644), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0644), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0644), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0644), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0644), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0644), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0644), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0644), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0644): Update Alfa to version 0.71.0. ([#30](https://github.com/Siteimprove/alfa-integrations/pull/30))

## [0.64.3](../../compare/v0.64.2...v0.64.3) (2023-12-15)

### Changed

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0643), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0643), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0643), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0643), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0643), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0643), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0643), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0643), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0643), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0643), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0643), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0643), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0643), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0643), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0643), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0643), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0643), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0643), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0643), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0643), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0643), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0643), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0643), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0643): Update Alfa. ([#29](https://github.com/Siteimprove/alfa-integrations/pull/29))

## [0.64.2](../../compare/v0.64.1...v0.64.2) (2023-12-05)

### Fixed

- [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0642): Fake release to test flow.

## [0.64.1](../../compare/v0.64.0...v0.64.1) (2023-12-05)

### Changed

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0641), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0641), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0641), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0641), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0641), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0641), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0641), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0641), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0641), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0641), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0641), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0641), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0641), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0641), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0641), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0641), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0641), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0641), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0641), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0641), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0641), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0641), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0641), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0641): Update Alfa.

## [0.64.0](../../compare/v0.63.1...v0.64.0) (2023-10-20)

### Added

- [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0640), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0640): `Playwright.toNode` and `Puppeteer.toNode` now accept an option `Device` parameter. ([#26](https://github.com/Siteimprove/alfa-integrations/pull/26))

### Changed

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0640), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0640), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0640), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0640), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0640), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0640), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0640), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0640), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0640), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0640), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0640), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0640), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0640), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0640), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0640), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0640), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0640), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0640), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0640), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0640), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0640), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0640), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0640), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0640): Update to Alfa v0.68.0. ([#26](https://github.com/Siteimprove/alfa-integrations/pull/26))

## [0.63.1](../../compare/v0.63.0...v0.63.1) (2023-09-12)

### Fixed

- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0631), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0631), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0631), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0631), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0631), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0631), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0631), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0631), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0631), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0631), [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0631), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0631), [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0631), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0631), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0631), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0631), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0631), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0631), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0631), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0631), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0631), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0631), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0631), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0631), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0631): Set up correct permissions in the release workflow.

## [0.63.0](../../compare/v0.62.11...v0.63.0) (2023-09-12)

### Changed

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0630), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0630), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0630), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0630), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0630), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0630), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0630), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0630), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0630), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0630), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0630), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0630), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0630), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0630), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0630), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0630), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0630), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0630), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0630), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0630), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0630), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0630), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0630), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0630), [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0630): Update release flow to newer version. ([#24](https://github.com/Siteimprove/alfa-integrations/pull/24))

- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md#0630), [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md#0630), [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md#0630), [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md#0630), [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md#0630), [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md#0630), [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md#0630), [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md#0630), [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md#0630), [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md#0630), [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md#0630), [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md#0630), [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md#0630), [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md#0630), [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md#0630), [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md#0630), [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md#0630), [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md#0630), [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md#0630), [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md#0630), [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md#0630), [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md#0630), [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md#0630), [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md#0630), [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md#0630): Update Alfa to version 0.67.0. ([#24](https://github.com/Siteimprove/alfa-integrations/pull/24))

## [v0.62.11](../../compare/v0.62.10...v0.62.11) (2023-08-10)

Packages changed:
- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md)
- [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md)
- [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md)
- [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md)
- [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md)
- [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md)
- [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md)
- [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md)
- [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md)
- [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md)
- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md)
- [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md)
- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md)
- [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md)
- [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md)
- [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md)
- [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md)
- [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md)
- [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md)
- [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md)
- [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md)
- [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md)
- [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md)
- [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md)
- [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md)

## [v0.62.10](../../compare/v0.62.9...v0.62.10) (2023-07-14)

Packages changed:
- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md)
- [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md)
- [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md)
- [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md)
- [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md)
- [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md)
- [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md)
- [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md)
- [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md)
- [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md)
- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md)
- [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md)
- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md)
- [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md)
- [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md)
- [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md)
- [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md)
- [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md)
- [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md)
- [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md)
- [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md)
- [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md)
- [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md)
- [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md)
- [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md)

## [v0.62.9](../../compare/v0.62.8...v0.62.9) (2023-06-22)

Packages changed:
- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md)
- [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md)
- [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md)
- [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md)
- [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md)
- [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md)
- [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md)
- [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md)
- [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md)
- [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md)
- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md)
- [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md)
- [@siteimprove/alfa-formatter-sarif](packages/alfa-formatter-sarif/CHANGELOG.md)
- [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md)
- [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md)
- [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md)
- [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md)
- [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md)
- [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md)
- [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md)
- [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md)
- [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md)
- [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md)
- [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md)
- [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md)

## [v0.62.8](../../compare/v0.62.7...v0.62.8) (2023-05-17)

Packages changed:
- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md)
- [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md)
- [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md)
- [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md)
- [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md)
- [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md)
- [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md)
- [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md)
- [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md)
- [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md)
- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md)
- [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md)
- [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md)
- [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md)
- [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md)
- [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md)
- [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md)
- [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md)
- [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md)
- [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md)
- [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md)
- [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md)
- [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md)
- [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md)

## [v0.62.7](../../compare/v0.62.6...v0.62.7) (2023-05-17)

Packages changed:
- [@siteimprove/alfa-angular](packages/alfa-angular/CHANGELOG.md)
- [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md)
- [@siteimprove/alfa-chai](packages/alfa-chai/CHANGELOG.md)
- [@siteimprove/alfa-cheerio](packages/alfa-cheerio/CHANGELOG.md)
- [@siteimprove/alfa-cli](packages/alfa-cli/CHANGELOG.md)
- [@siteimprove/alfa-command](packages/alfa-command/CHANGELOG.md)
- [@siteimprove/alfa-crawler](packages/alfa-crawler/CHANGELOG.md)
- [@siteimprove/alfa-cypress](packages/alfa-cypress/CHANGELOG.md)
- [@siteimprove/alfa-enzyme](packages/alfa-enzyme/CHANGELOG.md)
- [@siteimprove/alfa-formatter](packages/alfa-formatter/CHANGELOG.md)
- [@siteimprove/alfa-formatter-earl](packages/alfa-formatter-earl/CHANGELOG.md)
- [@siteimprove/alfa-formatter-json](packages/alfa-formatter-json/CHANGELOG.md)
- [@siteimprove/alfa-frontier](packages/alfa-frontier/CHANGELOG.md)
- [@siteimprove/alfa-interviewer](packages/alfa-interviewer/CHANGELOG.md)
- [@siteimprove/alfa-jasmine](packages/alfa-jasmine/CHANGELOG.md)
- [@siteimprove/alfa-jest](packages/alfa-jest/CHANGELOG.md)
- [@siteimprove/alfa-jquery](packages/alfa-jquery/CHANGELOG.md)
- [@siteimprove/alfa-playwright](packages/alfa-playwright/CHANGELOG.md)
- [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md)
- [@siteimprove/alfa-react](packages/alfa-react/CHANGELOG.md)
- [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md)
- [@siteimprove/alfa-unexpected](packages/alfa-unexpected/CHANGELOG.md)
- [@siteimprove/alfa-vue](packages/alfa-vue/CHANGELOG.md)
- [@siteimprove/alfa-webdriver](packages/alfa-webdriver/CHANGELOG.md)

## [v0.62.6](../../compare/v0.62.5...v0.62.6) (2023-04-20)

Packages changed:
- [@siteimprove/alfa-puppeteer](packages/alfa-puppeteer/CHANGELOG.md)
- [@siteimprove/alfa-scraper](packages/alfa-scraper/CHANGELOG.md)

## [v0.62.5](../../compare/v0.62.4...v0.62.5) (2023-04-05)

Packages changed:
- [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md)

## [v0.62.4](../../compare/v0.62.3...v0.62.4) (2023-04-04)

Packages changed:
- [@siteimprove/alfa-assert](packages/alfa-assert/CHANGELOG.md)

## [0.62.3](../../compare/v0.61.0...v0.62.3) (2023-03-30)

No functional change, first release handled from the `alfa-integrations` repository.

## 0.61.0 (2023-03-06)

Changes up to version 0.61.0 were tracked in the [main Alfa Changelog](https://github.com/Siteimprove/alfa/blob/main/CHANGELOG.md)
