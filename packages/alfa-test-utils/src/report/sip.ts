import { Array } from "@siteimprove/alfa-array";
import { Element, Query } from "@siteimprove/alfa-dom";
import { Serializable } from "@siteimprove/alfa-json";
import { Err } from "@siteimprove/alfa-result";
import { Sequence } from "@siteimprove/alfa-sequence";

import type { AxiosRequestConfig } from "axios";
import axios from "axios";

import type { Audit, Performance } from "../audit/index.js";
import { type CommitInformation, getCommitInformation } from "./git.js";

const { Verbosity } = Serializable;

/**
 * Interacting with Siteimprove Intelligence Platform (SIP) API.
 *
 * @public
 */
export namespace SIP {
  /**
   * @internal
   */
  export namespace Defaults {
    export const URL =
      "https://api.siteimprove.com/v2/a11y/AlfaDevCheck/CreateReport";
    export const Title = "Unnamed page";
    export const Name = "Accessibility Code Checker";
  }

  /**
   * Upload the results of an accessibility check to the Siteimprove Intelligence
   * Platform (SIP) API.
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
   * * mocking timestamp (timestamp stability in tests).
   *
   * @internal
   */
  export async function upload(
    audit: Audit.Result,
    options: Options,
    override: { url?: string; timestamp?: string }
  ): Promise<string>;

  export async function upload(
    audit: Audit.Result,
    options: Options,
    override: { url?: string; timestamp?: string } = {}
  ): Promise<string> {
    const config = await Metadata.axiosConfig(audit, options, override);

    try {
      const axiosResponse = await axios.request(config);
      const { pageReportUrl, preSignedUrl, id } = axiosResponse.data;

      const response = await axios.request(
        S3.axiosConfig(id, preSignedUrl, audit)
      );

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
     * The title of the page. Defaults to the content of the first `<title>` element,
     * if any.
     */
    pageTitle?: string;

    /**
     * Whether to upload git commit information to the Siteimprove Intelligence Platform
     * (default: yes).
     *
     * @remarks
     * If the directory is not in a git repository, or git is not installed,
     * this will silently fail and not send any information.
     */
    includeGitInfo?: boolean;

    /**
     * A unique identifier for the test run, e.g. a git commit hash, branch name, …
     *
     * @remarks
     * Unicity is not required but is recommended to help separating unrelated runs.
     * Defaults to the generic "Accessibility Code Checker" if none is provided.
     */
    testName?: string;
  }

  /**
   * Handling the metadata request to the Siteimprove API.
   *
   * @internal
   */
  export namespace Metadata {
    interface Payload {
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
       * The title of the page checked, defaults to the first `<title>` element
       * if any, or "Unnamed page" if none.
       */
      PageTitle: string;

      /**
       * The URL of the page. Defaults to the URL but can be overwritten to
       * avoid `localhost` addresses in local tests, …
       */
      // Defaults to the URL, but should be overridable to avoid localhost:3000
      // PageUrl: string;

      // I'm not sure I understand what this should represent in the end.
      // I thought it was "Unique identifier for the test run, e.g. git hash" but
      // since git info is somewhere else, maybe not…
      // string | CommitInfo => string
      TestName: string;

      ResultAggregates: Array<Audit.RuleAggregate>;

      // Is this the only performance info we want, or do we want the same breakdown
      // that dory gets? (https://github.com/Siteimprove/dory/blob/main/packages/dory-audit/src/performance.ts)
      CheckDurations: Performance.Durations;
    }

    /**
     * Prepare payload with metadata for creating pre-signed URL.
     *
     * @remarks
     * The timestamp must be formated as an ISO 8601 formatted string.
     */
    export async function payload(
      audit: Audit.Result,
      options: Partial<Options>,
      timestamp: string,
      defaultTitle = Defaults.Title,
      defaultName = Defaults.Name
    ): Promise<Payload> {
      const title =
        options.pageTitle ??
        Query.getElementDescendants(audit.page.document)
          .filter(Element.isElement)
          .find(Element.hasName("title"))
          .map((title) => title.textContent())
          .getOr(defaultTitle);

      const name = options.testName ?? defaultName;
      const gitInfo =
        options.includeGitInfo ?? true
          ? await getCommitInformation()
          : Err.of("Skip git information as per configuration options");

      const result: Payload = {
        RequestTimestamp: timestamp,
        Version: audit.alfaVersion,
        PageTitle: title,
        TestName: name,
        ResultAggregates: Array.from(audit.resultAggregates),
        CheckDurations: audit.durations,
      };

      for (const git of gitInfo) {
        result.CommitInformation = git;
      }

      return result;
    }

    /**
     * Configure parameters of axios request
     */
    export function params(url: string, apiKey: string): AxiosRequestConfig {
      return {
        method: "post",
        maxBodyLength: Infinity,
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + Buffer.from(apiKey).toString("base64"),
        },
      };
    }

    /**
     * Prepare the configuration for the axios request
     */
    export async function axiosConfig(
      audit: Audit.Result,
      options: Options,
      override: { url?: string; timestamp?: string }
    ): Promise<AxiosRequestConfig> {
      const { url = Defaults.URL, timestamp = new Date().toISOString() } =
        override;

      return {
        ...params(url, `${options.userName}:${options.apiKey}`),
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
          Sequence.from(audit.outcomes).toJSON({
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
