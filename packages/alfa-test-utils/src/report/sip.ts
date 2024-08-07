import { Array } from "@siteimprove/alfa-array";
import { Element, Query } from "@siteimprove/alfa-dom";
import { Serializable } from "@siteimprove/alfa-json";
import { Sequence } from "@siteimprove/alfa-sequence";
import type { Page } from "@siteimprove/alfa-web";

import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import type { Agent as HttpsAgent } from "https";

import type { Audit, Performance } from "../audit/index.js";
import { type CommitInformation, getCommitInformation } from "./git.js";

const { Verbosity } = Serializable;

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
    export const Title = "Unnamed page";
    export const Name = "Accessibility Code Checker";
  }

  /**
   * Upload the results of an accessibility check to the Siteimprove Intelligence
   * Platform (SIP) API. Returns the URL of a Page Report showing the audit results.
   *
   * @public
   */
  export async function upload(
    audit: Audit.Result,
    options: Options
  ): Promise<string>;

  /**
   * Internal overload for tests, allowing
   * * a custom upload URL (use stage / dev URLs); and
   * * mocking timestamp (timestamp stability in tests); and
   * * a custom HTTPS agent (use self-signed certificates in local tests).
   *
   * @internal
   */
  export async function upload(
    audit: Audit.Result,
    options: Options,
    override: { url?: string; timestamp?: string; httpsAgent?: HttpsAgent }
  ): Promise<string>;

  export async function upload(
    audit: Audit.Result,
    options: Options,
    override: { url?: string; timestamp?: string; HttpsAgent?: HttpsAgent } = {}
  ): Promise<string> {
    const config = await Metadata.axiosConfig(audit, options, override);

    try {
      const axiosResponse = await axios.request(config);
      const { pageReportUrl, preSignedUrl, id } = axiosResponse.data;

      await axios.request(S3.axiosConfig(id, preSignedUrl, audit));

      return pageReportUrl;
    } catch (error) {
      console.error(error);
    }

    return "Could not retrieve a page report URL";
  }

  /**
   * @public
   */
  export interface Options {
    /**
     * The username to connect to the Siteimprove Intelligence Platform
     */
    userName: string;

    /**
     * The API key to connect to Siteimprove Intelligence Platform
     */
    apiKey: string;

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
       * Defaults to "Accessibility Code Checker".
       */
      TestName: string;

      /**
       * Aggregated data for the results with number of Passed, Failed, and
       * CantTell occurrences per rule.
       */
      ResultAggregates: Array<{
        RuleId: string;
        Failed: number;
        Passed: number;
        CantTell: number;
        // Durations: Performance.RuleDurations
      }>;

      /**
       * Performances of the audit, with durations per rules and some common
       * durations.
       */
      Durations: Performance.Durations; // only common, CamelCase
    }

    /**
     * Prepare payload with metadata for creating pre-signed URL.
     *
     * @remarks
     * The timestamp must be formated as an ISO 8601 string.
     */
    export async function payload(
      audit: Audit.Result,
      options: Partial<Options>,
      timestamp: string,
      defaultTitle = Defaults.Title,
      defaultName = Defaults.Name
    ): Promise<Payload> {
      const url = options.pageURL ?? audit.page.response.url.toString();
      const PageUrl = typeof url === "string" ? url : url(audit.page);

      const title =
        options.pageTitle ??
        Query.getElementDescendants(audit.page.document)
          .filter(Element.isElement)
          .find(Element.hasName("title"))
          .map((title) => title.textContent())
          .getOr(defaultTitle);
      const PageTitle = typeof title === "string" ? title : title(audit.page);

      const gitInfo = await getCommitInformation();

      const name = options.testName ?? defaultName;
      const TestName =
        // If the name is a string, using, otherwise call the function on the
        // gitInfo, defaulting to the error if any.
        typeof name === "string"
          ? name
          : gitInfo.map(name).getOrElse(() => gitInfo.getErrOr(defaultName));

      const result: Payload = {
        RequestTimestamp: timestamp,
        Version: audit.alfaVersion,
        PageUrl,
        PageTitle,
        TestName,
        ResultAggregates: audit.resultAggregates
          .toArray()
          .map(([RuleId, data]) => ({ RuleId, ...data })),
        Durations: audit.durations,
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
      audit: Audit.Result,
      options: Options,
      override: { url?: string; timestamp?: string; httpsAgent?: HttpsAgent }
    ): Promise<AxiosRequestConfig> {
      const { url = Defaults.URL, timestamp = new Date().toISOString() } =
        override;

      return {
        ...params(
          url,
          `${options.userName}:${options.apiKey}`,
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
    export function payload(Id: string, audit: Audit.Result): Payload {
      return {
        Id,
        CheckResult: JSON.stringify(
          Sequence.from(audit.outcomes.values()).flatten().toJSON({
            verbosity: Verbosity.Minimal,
          })
        ),
        Aspects: JSON.stringify(
          audit.page.toJSON({ verbosity: Verbosity.High })
        ),
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
      audit: Audit.Result
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
