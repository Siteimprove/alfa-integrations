import { Array } from "@siteimprove/alfa-array";
import { Element, Query } from "@siteimprove/alfa-dom";
import { Map } from "@siteimprove/alfa-map";
import { None, Option } from "@siteimprove/alfa-option";
import { Err, Ok } from "@siteimprove/alfa-result";
import { Result } from "@siteimprove/alfa-result";
import { Selective } from "@siteimprove/alfa-selective";
import type { Thunk } from "@siteimprove/alfa-thunk";
import { Page } from "@siteimprove/alfa-web";

import type { AxiosRequestConfig } from "axios";
import axios, { AxiosError } from "axios";
import type { Agent as HttpsAgent } from "https";

import { Audit, type Performance } from "../audit/index.js";
import type { CommitInformation } from "./commit-information.js";

/**
 * Interacting with Siteimprove Intelligence Platform (SIP) API.
 *
 * @public
 */
export namespace SIP {
  /** @internal */
  export namespace Defaults {
    export const URL = "https://api.siteimprove.com/v2/a11y/AlfaDevCheck";
    export const Title = "";
    export const Name = undefined;

    export function missingOptions(missing: Array<string>): string {
      return `The following mandatory option${
        missing.length === 1 ? " is" : "s are"
      } missing: ${missing.join(", ")}`;
    }

    export const badCredentials =
      "Unauthorized request: the request was made with invalid credentials, verify your username and API key";
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
    const missing: Array<string> = [];

    if (options.userName === undefined) {
      missing.push("User name");
    }

    if (options.apiKey === undefined) {
      missing.push("API key");
    }

    if (options.siteID === undefined) {
      missing.push("Site ID");
    }

    if (missing.length > 0) {
      return Err.of(Defaults.missingOptions(missing));
    }

    const config = Metadata.axiosConfig(audit, options, override);

    if (config.isErr()) {
      return config;
    }

    try {
      // The request fail on 4XX and 5XX responses, plus anything that can possibly
      // go wrong with axios.
      // We could accept all and handle the errors directly, but since we would
      // still need a try…catch for the "anything that can possibly go wrong" part,
      // the benefit would be minimal.
      const axiosResponse = await axios.request({
        // The get is guarded by the test before the try.
        ...config.getUnsafe(),
        // We do not want to throw on 3XX redirections.
        validateStatus: (status) => status < 400,
      });

      const { pageReportUrl, preSignedUrl, id } = axiosResponse.data;

      await axios.request({
        ...S3.axiosConfig(id, preSignedUrl, audit),
        // We do not want to throw on 3XX redirections.
        validateStatus: (status) => status < 400,
      });

      return Ok.of(pageReportUrl);
    } catch (error) {
      return inspectAxiosError(error);
    }
  }

  function inspectAxiosError(error: any): Result<string, string> {
    if ((error.response ?? undefined) !== undefined) {
      const { status } = error.response;

      if (status === 401) {
        // 401 are handled by the generic server, and we don't get custom error message
        return Err.of(Defaults.badCredentials);
      }

      if (status >= 400 && status < 500) {
        // This is a client error, we can get our custom error message
        return Err.of(
          `Bad request (${status}): ${error.response.data.details[0].issue}`
        );
      }

      if (status >= 500) {
        // This is a server error, we probably don't have a custom message,
        // but hopefully axios did the work for us.
        return Err.of(`Server error (${status}): ${error.message}`);
      }
    }

    if (error instanceof AxiosError && error.message !== undefined) {
      // This is another axios error, we hope they provide meaningful messages.
      return Err.of(`${error.message}`);
    }

    // This is something else. It should really not happen since only axios
    // should have thrown something.
    return Err.of(`Unexpected error: ${error}`);
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
     * The site ID in the Siteimprove Intelligence Platform.
     */
    siteID?: number;

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
     * test name from the commit information (e.g. the commit hash, or the branch name).
     */
    testName?: string | ((commit: CommitInformation) => string);

    /**
     * Information about the latest commit of a Version Control System.
     */
    commitInformation?:
      | CommitInformation
      | Option<CommitInformation>
      | Result<CommitInformation, unknown>;
  }

  /**
   * Handling the metadata request to the Siteimprove API.
   *
   * @internal
   */
  export namespace Metadata {
    // We need to capitalize names for the API calls.
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

      /**
       * The site ID to which the page belongs in the Siteimprove Intelligence Platform.
       */
      SiteId?: number;

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
    export function payload(
      audit: Audit | Audit.JSON,
      options: Partial<Options>,
      timestamp: string
    ): Result<Payload, string> {
      // Even though we may not need to deserialize the page, error handling
      // get messy if done upon need.
      return (
        // Retrieve or deserialize the page
        // We may waste a bit of time deserializing a page we won't need (if URL
        // and title are provided), but this streamlines error handling.
        (
          Page.isPage(audit.page) ? Ok.of(audit.page) : Page.from(audit.page)
        ).map((page) => {
          const url = options.pageURL ?? page.response.url.toString();
          const PageUrl = typeof url === "string" ? url : url(page);

          const title =
            options.pageTitle ??
            Query.getElementDescendants(page.document)
              .filter(Element.isElement)
              .find(Element.hasName("title"))
              .map((title) => title.textContent())
              .getOr(Defaults.Title);
          const PageTitle =
            typeof title === "string"
              ? title
              : title !== undefined
              ? title(page)
              : title;

          const commitInfo = Selective.of(options.commitInformation)
            .if(Option.isOption<CommitInformation>, (info) => info)
            .if(Result.isResult<CommitInformation, unknown>, (info) =>
              info.ok()
            )
            .else(Option.from)
            .get();

          const name = options.testName ?? Defaults.Name;
          const TestName =
            // If the name is a string, use it, otherwise call the function on the
            // commit info, defaulting to the default name.
            typeof name === "string"
              ? name
              : name !== undefined
              ? commitInfo.map(name).getOr(Defaults.Name)
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
            })),
            Durations: toCamelCase(audit.durations),
          };

          commitInfo.forEach((info) => (result.CommitInformation = info));

          if (options.siteID !== undefined) {
            result.SiteId = options.siteID;
          }

          return result;
        })
      );
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
    export function axiosConfig(
      audit: Audit | Audit.JSON,
      options: Options,
      override: { url?: string; timestamp?: string; httpsAgent?: HttpsAgent }
    ): Result<AxiosRequestConfig, string> {
      const { url = Defaults.URL, timestamp = new Date().toISOString() } =
        override;

      return payload(audit, options, timestamp).map((payload) => ({
        ...params(
          url,
          // If one of them is missing, the parent upload call should already
          // have filtered it out. It is easier to not assume so. In any case,
          // the upload itself should ultimately fail on a 403.
          `${options?.userName}:${options?.apiKey}`,
          override.httpsAgent
        ),
        data: JSON.stringify(payload),
      }));
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
