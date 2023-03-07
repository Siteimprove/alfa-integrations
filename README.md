# <img alt="Alfa" src="media/logo.svg" height="40"> Integrations

This repository contains integrations of Siteimprove's [Alfa accessibility checker][alfa] with various external tools, notably:

- a Command Line Interface;
- a minimal scraper/crawler to grab snapshot of web pages;
- integrations with component libraries such as React or Vue;
- integrations with testing frameworks such as Cypress or Jest;
- integrations with browser automations such as Playwright or Puppeteer.

[Issues][alfa issues], [Discussions][alfa discussions], and [project board][alfa board] are handled in the main Alfa repository.

## Command Line Interface

This repository contains a Command Line Interface for Alfa.

### Setup

Clone this repository, then install dependencies:

```shell
$ yarn install
```

> :warning: Make sure to instruct your client to pull packages belonging to the `@siteimprove` scope from GitHub by adding the line `@siteimprove:registry=https://npm.pkg.github.com/siteimprove` to your `.npmrc` file. See [Installing a package from Github registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package) for details.

Finally, build the project:

```shell
$ yarn build
```

### Usage

You can now run the Alfa CLI with:

```shell
# Display help
$ yarn alfa --help
# Audit a single page, storing results in JSON:
$ yarn alfa audit -f json -o audit.json https://example.com
# Scrape a page, to a JSON object that is usable as Alfa's input:
$ yarn alfa scrape -o page.json https://example.com

# Show detailed help for the commands:
$ yarn alfa scrape --help
$ yarn alfa audit --help
```

## Scraper and Crawler

The [@siteimprove/alfa-scraper](packages/alfa-scraper) package uses browser automation to navigate to a given page, and scrape its content in a format that is usable by the rest of Alfa.

The [@siteimprove/alfa-crawler](packages/alfa-crawler) package contains a minimal crawler that can scrape all pages belonging to a (sub-)domain or a website.

## Integrations

This repository contains several ready-made integrations of Alfa to various tools, making it easy and simple to integrate accessibility conformance testing as part of your development workflow. If you have suggestions for additional integerations, feel free to [open an issue][alfa issues]! We are always looking for new places where Alfa can be put to good use.

> :warning: The integrations are still experimental and subject to change.

| Package                                                      | Integrates with                              |
| :----------------------------------------------------------- | :------------------------------------------- |
| [**@siteimprove/alfa-angular**](packages/alfa-angular)       | [Angular](https://angular.io/)               |
| [**@siteimprove/alfa-chai**](packages/alfa-chai)             | [Chai](https://www.chaijs.com/)              |
| [**@siteimprove/alfa-cheerio**](packages/alfa-cheerio)       | [Cheerio](https://cheerio.js.org/)           |
| [**@siteimprove/alfa-cypress**](packages/alfa-cypress)       | [Cypress](https://www.cypress.io/)           |
| [**@siteimprove/alfa-enzyme**](packages/alfa-enzyme)         | [Enzyme](https://github.com/airbnb/enzyme)   |
| [**@siteimprove/alfa-jasmine**](packages/alfa-jasmine)       | [Jasmine](https://jasmine.github.io/)        |
| [**@siteimprove/alfa-jest**](packages/alfa-jest)             | [Jest](https://jestjs.io/)                   |
| [**@siteimprove/alfa-jquery**](packages/alfa-jquery)         | [jQuery](https://jquery.com/)                |
| [**@siteimprove/alfa-playwright**](packages/alfa-playwright) | [Playwright](https://playwright.dev/)        |
| [**@siteimprove/alfa-puppeteer**](packages/alfa-puppeteer)   | [Puppeteer](https://pptr.dev/)               |
| [**@siteimprove/alfa-react**](packages/alfa-react)           | [React](https://reactjs.org/)                |
| [**@siteimprove/alfa-unexpected**](packages/alfa-unexpected) | [Unexpected](http://unexpected.js.org/)      |
| [**@siteimprove/alfa-vue**](packages/alfa-vue)               | [Vue](https://vuejs.org/)                    |
| [**@siteimprove/alfa-webdriver**](packages/alfa-webdriver)   | [WebdriverIO](https://webdriver.io/)         |


## Funding

[<img src="media/europe.svg" height="96" align="right" alt="European emblem">](https://ec.europa.eu/)

Alfa is part of a project that has received funding from the European Union's [Horizon 2020 research and innovation programme](https://ec.europa.eu/programmes/horizon2020/) under [grant agreement Nº780057](https://cordis.europa.eu/project/id/780057). We would like to give thanks to the European Commission for their grant, as well as all European citizens, who have indirectly contributed to making Alfa possible. You rock! :raised_hands:

## License

Copyright &copy; [Siteimprove A/S](https://siteimprove.com/). Released under the terms of the [MIT license](LICENSE.md).

[alfa]: https://github.com/Siteimprove/alfa
[alfa board]: https://github.com/Siteimprove/alfa/projects/1
[alfa discussions]: https://github.com/Siteimprove/alfa/discussions
[alfa issues]: https://github.com/Siteimprove/alfa/issues
