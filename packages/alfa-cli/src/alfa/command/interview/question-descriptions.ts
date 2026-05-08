/**
 * Human-friendly elaborations for question URIs shown during `alfa interview`.
 *
 * The default messages from alfa-rules are often terse or use placeholder
 * syntax (e.g. "[audio/video]"). Entries here replace or supplement them with
 * plain-language descriptions that help non-technical users answer correctly.
 *
 * @internal
 */
export const QUESTION_DESCRIPTIONS: Readonly<Record<string, string>> = {
  "first-tabbable-is-internal-link":
    "Is the first element reachable by pressing Tab a link that jumps to another section of the same page (a 'skip to content' or 'skip navigation' link)?",

  "first-tabbable-is-visible":
    "When the first tabbable element receives keyboard focus (e.g. by pressing Tab), does it become visible on screen?",

  "first-tabbable-reference":
    "Which element on the page does the first tabbable link point to? Provide the XPath of the target element.",

  "first-tabbable-reference-is-main":
    "Does the first tabbable link on the page skip directly to the main content area?",

  "has-audio":
    "Does this video element have an audio track (i.e. is there any sound when it plays)?",

  "has-audio-track":
    "Does this video element have a separate audio description track that narrates the visual content for people who cannot see it?",

  "has-captions":
    "Does this video element have captions or subtitles that describe the spoken dialogue and relevant sounds?",

  "has-description":
    "Is all the important visual information in this audio/video conveyed through its audio track, or is there a separate audio description?",

  "is-audio-streaming":
    "Is this audio element a live stream (as opposed to a pre-recorded file)?",

  "is-video-streaming":
    "Is this video element a live stream (as opposed to a pre-recorded file)?",

  "is-playing":
    "Does this media element start playing automatically when the page loads, without the user pressing play?",

  "text-alternative":
    "Which element on the page serves as the text alternative (transcript, caption element, or description) for this audio/video? Provide its XPath.",

  "track-describes-video":
    "Does the captions/subtitles track accurately and completely describe the content of the video?",

  "transcript-link":
    "Is there a link near this audio/video element that leads to a full transcript of its content?",

  "play-button":
    "Which element is the play/pause button for this media element? Provide its XPath.",

  "reference-equivalent-resources":
    "Do the links or iframes in this group all point to the same destination or resource?",

  "name-describes-purpose":
    "Does the accessible name of this element clearly describe what it does or where it leads?",

  "audio-control-mechanism":
    "Is there a mechanism on the page that lets users stop or mute any audio that plays automatically?",

  "is-above-duration-threshold":
    "Does this audio/video element play for more than 3 seconds?",

  "is-below-audio-duration-threshold":
    "Does this audio element play for less than 3 seconds in total?",

  "is-content-equivalent":
    "Does this element provide content that is equivalent to the related element it is paired with?",

  "has-focus-indicator":
    "When this element receives keyboard focus, is there a visible focus indicator (e.g. an outline or highlight)?",

  "background-colors":
    "What is/are the background color(s) behind this text? Provide CSS color values (e.g. #ffffff).",

  "foreground-colors":
    "What is/are the foreground (text) color(s) of this text? Provide CSS color values (e.g. #000000).",

  "ignored-interposed-elements":
    "Which of the overlapping descendant elements (listed by XPath) should be ignored when checking color contrast for this text?",

  "error-indicators":
    "Which elements on the page indicate that this form field has a validation error? Provide their XPaths.",

  "error-indicator-describing-resolution":
    "Does the error message explain how the user can fix the problem?",

  "error-indicator-identifying-form-field":
    "Does the error message clearly identify which form field it relates to?",

  "internal-reference":
    "Does this link point to an element within the same page (an in-page anchor)?",

  "is-start-of-main":
    "Does this element mark the beginning of the main content area of the page?",

  "is-visible-when-focused":
    "Is this element visible when it receives keyboard focus?",

  "main-landmark-elements":
    "Which elements serve as the main content landmark(s) on this page? Provide their XPaths.",

  "has-repeated-content-before-main":
    "Does the page contain repeated navigational content (e.g. a nav menu) appearing before the main content?",

  "document-language":
    "What is the primary language of the document? Provide a BCP 47 language tag (e.g. 'en', 'fr', 'nl').",

  "is-title-descriptive":
    "Does the page <title> accurately describe the topic or purpose of the page?",

  "is-heading-descriptive":
    "Does this heading clearly describe the content that follows it?",

  "is-image-accessible-name-descriptive":
    "Does the accessible name of this image (alt text or aria-label) accurately convey what the image shows?",
};
