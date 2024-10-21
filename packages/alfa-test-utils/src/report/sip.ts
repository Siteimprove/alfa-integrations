import { Array } from "@siteimprove/alfa-array";
import { Element, Query } from "@siteimprove/alfa-dom";
import { Map } from "@siteimprove/alfa-map";
import { Err, Ok } from "@siteimprove/alfa-result";
import type { Result } from "@siteimprove/alfa-result";
import type { Thunk } from "@siteimprove/alfa-thunk";
import { Page } from "@siteimprove/alfa-web";

import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import type { Agent as HttpsAgent } from "https";

import { Audit, type Performance } from "../audit/index.js";
import { type CommitInformation, getCommitInformation } from "./git.js";

/**
 * Interacting with Siteimprove Intelligence Platform (SIP) API.
 *
 * @public
 */
export namespace SIP {
  /** @internal */
  export namespace Defaults {
    export const URL =
      "https://api.siteimprove.com/v2/a11y/AlfaDevCheck/CreateReport";
    export const Title = "";
    export const Name = undefined;
  }

  /**
   * Upload the results of an accessibility check to the Siteimprove Intelligence
   * Platform (SIP) API. Returns the URL of a Page Report showing the audit results.
   *
   * @public
   */
  export async function upload(
    audit: Audit | Audit.JSON,
    options: Options
  ): Promise<Result<string, string>>;

  /**
   * Internal overload for tests, allowing
   * * a custom upload URL (use stage / dev URLs); and
   * * mocking timestamp (timestamp stability in tests); and
   * * a custom HTTPS agent (use self-signed certificates in local tests).
   *
   * @internal
   */
  export async function upload(
    audit: Audit | Audit.JSON,
    options: Options,
    override: { url?: string; timestamp?: string; httpsAgent?: HttpsAgent }
  ): Promise<Result<string, string>>;

  export async function upload(
    audit: Audit | Audit.JSON,
    options: Options,
    override: { url?: string; timestamp?: string; HttpsAgent?: HttpsAgent } = {}
  ): Promise<Result<string, string>> {
    if (options.userName === undefined) {
      return Err.of("Missing user name for Siteimprove Intelligence Platform");
    }

    if (options.apiKey === undefined) {
      return Err.of("Missing API key for Siteimprove Intelligence Platform");
    }

    const config = await Metadata.axiosConfig(audit, options, override);

    try {
      const axiosResponse = await axios.request(config);
      const { pageReportUrl, preSignedUrl, id } = axiosResponse.data;

      await axios.request(S3.axiosConfig(id, preSignedUrl, audit));

      return Ok.of(pageReportUrl);
    } catch (error) {
      console.error(error);
    }

    return Err.of("Could not retrieve a page report URL");
  }

  /**
   * @public
   */
  export interface Options {
    /**
     * The username to connect to the Siteimprove Intelligence Platform
     */
    userName?: string;

    /**
     * The API key to connect to Siteimprove Intelligence Platform
     */
    apiKey?: string;

    /**
     * The URL of the page, or a function to build it from the audited page.
     * Defaults to the URL used to scrape the page.
     *
     * @remarks
     * Overwriting it typically allows to circumvent `localhost` addresses for
     * tests that are run on local servers.
     */
    pageURL?: string | ((page: Page) => string);

    /**
     * The title of the page, or a function to build it from the audited page.
     * Defaults to the content of the first `<title>` element, if any.
     */
    pageTitle?: string | ((page: Page) => string);

    /**
     * A name for the test (e.g. "AA conformance", …), or a function building a
     * test name from the git commit information (e.g. the git hash or branch name).
     */
    testName?: string | ((git: CommitInformation) => string);

    /**
     * Whether to upload git commit information to the Siteimprove Intelligence Platform
     * (default: yes).
     *
     * @remarks
     * If the directory is not in a git repository, or git is not installed,
     * this will silently fail and not send any information.
     */
    includeGitInfo?: boolean;
  }

  /**
   * Handling the metadata request to the Siteimprove API.
   *
   * @internal
   */
  export namespace Metadata {
    // We need to capitalize names for the API calls.
    type RuleDurations = { [K in CamelCase<Performance.DurationKey>]: number };
    type CommonDurations = { [K in CamelCase<Performance.CommonKeys>]: number };

    /** @internal */
    export interface Payload {
      /**
       * The time the request is sent, formatted as an ISO 8601 string.
       */
      RequestTimestamp: string;

      /**
       * Version of Alfa used for the checks
       */
      Version: `${number}.${number}.${number}`;

      // Ignored for now.
      // /**
      //  * The site ID to which the page belongs in the Siteimprove Intelligence Platform.
      //  */
      // SiteId?: string;

      /**
       * Information about the latest git commit
       */
      CommitInformation?: CommitInformation;

      // Ignored for now.
      // /**
      //  * Back link to a URL of choice, typically a link to the Pull Request
      //  * containing the changes, …
      //  */
      // BackLink?: string;

      /**
       * The URL of the page. Defaults to the URL in the Response but can be
       * overwritten to avoid `localhost` addresses in local tests, …
       */
      PageUrl: string;

      /**
       * The title of the page checked, defaults to the first `<title>` element
       * if any, or "Unnamed page" if none.
       */
      PageTitle: string;

      /**
       * Name of the test, e.g. "AA conformance", "Color contrast",
       * "On branch: \<branch name\>", …
       * Defaults to "Unnamed test".
       */
      TestName?: string;

      /**
       * Aggregated data for the results with number of Passed, Failed, and
       * CantTell occurrences per rule.
       */
      ResultAggregates: Array<{
        RuleId: string;
        Failed: number;
        Passed: number;
        CantTell: number;
        Durations: RuleDurations;
      }>;

      /**
       * Performances of the audit, with durations per rules and some common
       * durations.
       */
      Durations: CommonDurations;
    }

    /**
     * Prepare payload with metadata for creating pre-signed URL.
     *
     * @remarks
     * The timestamp must be formated as an ISO 8601 string.
     */
    export async function payload(
      audit: Audit | Audit.JSON,
      options: Partial<Options>,
      timestamp: string
    ): Promise<Payload> {
      const page: Thunk<Page> = () =>
        Page.isPage(audit.page)
          ? audit.page
          : Page.from(audit.page).getUnsafe("Could not deserialize the page");

      const url = options.pageURL ?? page().response.url.toString();
      const PageUrl = typeof url === "string" ? url : url(page());

      const title =
        options.pageTitle ??
        Query.getElementDescendants(page().document)
          .filter(Element.isElement)
          .find(Element.hasName("title"))
          .map((title) => title.textContent())
          .getOr(Defaults.Title);
      const PageTitle =
        typeof title === "string"
          ? title
          : title !== undefined
          ? title(page())
          : title;

      const gitInfo = await getCommitInformation();

      const name = options.testName ?? Defaults.Name;
      const TestName =
        // If the name is a string, using, otherwise call the function on the
        // gitInfo, defaulting to the error if any.
        typeof name === "string"
          ? name
          : name !== undefined
          ? gitInfo.map(name).getOrElse(() => gitInfo.getErrOr(Defaults.Name))
          : Defaults.Name;

      const result: Payload = {
        RequestTimestamp: timestamp,
        Version: audit.alfaVersion,
        PageUrl,
        PageTitle,
        TestName,
        ResultAggregates: (Map.isMap(audit.resultAggregates)
          ? audit.resultAggregates.toJSON()
          : audit.resultAggregates
        ).map(([RuleId, data]) => ({
          RuleId,
          ...toCamelCase(data),
          Durations: toCamelCase(audit.durations.rules[RuleId]),
        })),
        Durations: toCamelCase(audit.durations.common),
      };

      if ((options.includeGitInfo ?? true) && gitInfo.isOk()) {
        result.CommitInformation = gitInfo.get();
      }

      return result;
    }

    /**
     * Configure parameters of axios request
     */
    export function params(
      url: string,
      apiKey: string,
      httpsAgent?: HttpsAgent
    ): AxiosRequestConfig {
      const config: AxiosRequestConfig = {
        method: "post",
        maxBodyLength: Infinity,
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + Buffer.from(apiKey).toString("base64"),
        },
      };

      if (httpsAgent !== undefined) {
        config.httpsAgent = httpsAgent;
      }

      return config;
    }

    /**
     * Prepare the configuration for the axios request
     */
    export async function axiosConfig(
      audit: Audit | Audit.JSON,
      options: Options,
      override: { url?: string; timestamp?: string; httpsAgent?: HttpsAgent }
    ): Promise<AxiosRequestConfig> {
      const { url = Defaults.URL, timestamp = new Date().toISOString() } =
        override;

      return {
        ...params(
          url,
          // If one of them is missing, the parent upload call should already
          // have filtered it out. It is easier to not assume so. In any case,
          // the upload itself should ultimately fail on a 403.
          `${options?.userName}:${options?.apiKey}`,
          override.httpsAgent
        ),
        data: JSON.stringify(await payload(audit, options, timestamp)),
      };
    }
  }

  /**
   * Handling the data request to the pre-signed S3 URL.
   *
   * @internal
   */
  export namespace S3 {
    interface Payload {
      Id: string;
      CheckResult: string;
      Aspects: string;
    }

    /**
     * Prepare payload with metadata for creating pre-signed URL.
     */
    /**
     * Prepare payload with Alfa page and results
     *
     * @internal
     */
    export function payload(Id: string, audit: Audit | Audit.JSON): Payload {
      const serialisedAudit = Audit.isAudit(audit) ? audit.toJSON() : audit;

      return {
        Id,
        CheckResult: JSON.stringify(serialisedAudit.outcomes),
        Aspects: JSON.stringify(serialisedAudit.page),
      };
    }

    /**
     * Configure parameters of axios request
     */
    export function params(url: string): AxiosRequestConfig {
      return {
        method: "put",
        maxBodyLength: Infinity,
        url,
        headers: { "Content-Type": "application/json" },
      };
    }

    /**
     * Prepare the configuration for the axios request
     */
    export function axiosConfig(
      id: string,
      url: string,
      audit: Audit | Audit.JSON
    ): AxiosRequestConfig {
      return {
        ...params(url),
        data: new Blob([JSON.stringify(payload(id, audit))], {
          type: "application/json",
        }),
      };
    }
  }
}

type CamelCase<T extends string> = T extends `${infer F}-${infer R}`
  ? `${CamelCase<F>}${CamelCase<R>}`
  : Capitalize<T>;

function toCamelCase<Keys extends string>(object: { [K in Keys]: number }): {
  [K in CamelCase<Keys>]: number;
} {
  // Between the weird type, the regexs and `Object.entries`, TypeScript is
  // just unable to do its magic.
  // @ts-ignore
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key
        // Uppercase every letter after a dash, removing the dash.
        .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
        // Uppercase the first letter.
        .replace(/^([a-z])/, (_, letter) => letter.toUpperCase()),
      value,
    ])
  );
}
