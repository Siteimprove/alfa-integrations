export default {
  nestedGroups: () => [
    {
      name: "Command line",
      children: [
        "@siteimprove/alfa-cli",
        "@siteimprove/alfa-command",
        "@siteimprove/alfa-interviewer",
      ],
    },
    {
      name: "Formatters",
      children: [
        "@siteimprove/alfa-formatter",
        "@siteimprove/alfa-formatter-earl",
        "@siteimprove/alfa-formatter-json",
        "@siteimprove/alfa-formatter-sarif",
      ],
    },
    {
      name: "Integrations with frameworks",
      children: [
        {
          name: "Test frameworks",
          children: [
            "@siteimprove/alfa-assert",
            "@siteimprove/alfa-chai",
            "@siteimprove/alfa-cypress",
            "@siteimprove/alfa-jasmine",
            "@siteimprove/alfa-jest",
            "@siteimprove/alfa-unexpected",
          ],
        },
        {
          name: "Components libraries",
          children: [
            "@siteimprove/alfa-angular",
            "@siteimprove/alfa-cheerio",
            "@siteimprove/alfa-enzyme",
            "@siteimprove/alfa-react",
            "@siteimprove/alfa-vue",
          ],
        },
        "@siteimprove/alfa-jquery",
        {
          name: "Browser automations",
          children: [
            "@siteimprove/alfa-playwright",
            "@siteimprove/alfa-puppeteer",
            "@siteimprove/alfa-selenium",
            "@siteimprove/alfa-webdriver",
          ],
        },
      ],
    },
    {
      name: "Web crawler",
      children: [
        "@siteimprove/alfa-crawler",
        "@siteimprove/alfa-frontier",
        "@siteimprove/alfa-scraper",
      ],
    },
  ],
};
