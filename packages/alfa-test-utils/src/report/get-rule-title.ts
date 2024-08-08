// TODO: Add a script to generate titles from translation tool

export function getRuleTitle(rule: string): string {
  switch (rule) {
    case "sia-r1":
      return "Page missing a title";
    case "sia-r2":
      return "Image missing a text alternative";
    case "sia-r3":
      return "Element IDs are not unique";
    case "sia-r4":
      return "Page language has not been identified";
    case "sia-r5":
      return "Page language not recognized";
    case "sia-r7":
      return "Content language not recognized";
    case "sia-r8":
      return "Form field missing a label";
    case "sia-r9":
      return "Page refreshes or redirects without warning (within 20 hours)";
    case "sia-r10":
      return "Autocomplete does not work as intended";
    case "sia-r11":
      return "Link missing a text alternative";
    case "sia-r12":
      return "Button missing a text alternative";
    case "sia-r13":
      return "Inline frame missing a text alternative";
    case "sia-r14":
      return "Visible label and accessible name do not match";
    case "sia-r15":
      return "Multiple inline frames with the same text alternative";
    case "sia-r16":
      return "Required ARIA attribute is missing";
    case "sia-r17":
      return "Hidden element has focusable content";
    case "sia-r18":
      return "ARIA attribute unsupported or prohibited";
    case "sia-r19":
      return "Invalid state or property";
    case "sia-r20":
      return "ARIA attribute does not exist";
    case "sia-r21":
      return "Some roles are invalid";
    case "sia-r22":
      return "Captions have not been provided";
    case "sia-r23":
      return "A transcript has not been provided";
    case "sia-r24":
      return "A transcript hasn't been provided";
    case "sia-r25":
      return "The audio doesn't contain all information in the video";
    case "sia-r26":
      return "The video is not a media alternative for text";
    case "sia-r27":
      return "Video missing captions";
    case "sia-r28":
      return "Image button missing a text alternative";
    case "sia-r29":
      return "The audio isn't a media alternative for text";
    case "sia-r30":
      return "Audio missing a transcript";
    case "sia-r31":
      return "The video is not a media alternative for text";
    case "sia-r32":
      return "A separate audio alternative has not been provided";
    case "sia-r33":
      return "A transcript hasn't been provided";
    case "sia-r34":
      return "The video doesn't have a description track";
    case "sia-r35":
      return "Video without audio missing an accessible alternative";
    case "sia-r36":
      return "Description track is incomplete";
    case "sia-r37":
      return "Video missing an audio-description";
    case "sia-r38":
      return "Video with audio missing an accessible alternative";
    case "sia-r39":
      return "Image file name is not an appropriate text alternative";
    case "sia-r40":
      return "Page region missing an accessible name";
    case "sia-r41":
      return "Links on the same page with the same text alternative";
    case "sia-r42":
      return "Role not inside the required context";
    case "sia-r43":
      return "Vector image missing a text alternative";
    case "sia-r44":
      return "Page orientation is locked";
    case "sia-r45":
      return "Table headers aren't referenced correctly";
    case "sia-r46":
      return "No data cells assigned to table header";
    case "sia-r47":
      return "Page zoom is restricted";
    case "sia-r48":
      return "Audio plays for longer than 3 seconds";
    case "sia-r49":
      return "Audio has no control mechanism";
    case "sia-r50":
      return "Audio plays automatically and can't be switched off";
    case "sia-r53":
      return "Headings are not structured";
    case "sia-r54":
      return "Field input error is not announced in full";
    case "sia-r55":
      return "Page sections with the same name do not serve the same purpose";
    case "sia-r56":
      return "Landmarks are not uniquely identifiable";
    case "sia-r57":
      return "Text not included in an ARIA landmark";
    case "sia-r59":
      return "Page missing headings";
    case "sia-r60":
      return "Grouped form controls missing an accessible name";
    case "sia-r61":
      return "Page does not start with a level 1 heading";
    case "sia-r62":
      return "Links are not clearly identifiable";
    case "sia-r63":
      return "Object missing a text alternative";
    case "sia-r64":
      return "Empty headings";
    case "sia-r65":
      return "Keyboard focus indicator is missing";
    case "sia-r66":
      return "Color contrast does not meet enhanced requirement";
    case "sia-r67":
      return "Decorative image is exposed to assistive technologies";
    case "sia-r68":
      return "Container element is empty";
    case "sia-r69":
      return "Color contrast does not meet minimum requirement";
    case "sia-r70":
      return "HTML element is deprecated or obsolete";
    case "sia-r71":
      return "Uneven spacing in text";
    case "sia-r72":
      return "Text in all caps";
    case "sia-r73":
      return "Line height is below minimum value";
    case "sia-r74":
      return "Font size is fixed";
    case "sia-r75":
      return "Font size is too small";
    case "sia-r76":
      return "Table header cell is missing a header role";
    case "sia-r77":
      return "Table cell missing context";
    case "sia-r78":
      return "Content missing after heading";
    case "sia-r79":
      return "Improper use of preformatted text element";
    case "sia-r80":
      return "Line height is fixed";
    case "sia-r81":
      return "Links in the same context with the same text alternative";
    case "sia-r82":
      return "Form error indicators are not sufficient";
    case "sia-r83":
      return "Text is clipped when resized";
    case "sia-r84":
      return "Scrollable element is not keyboard accessible";
    case "sia-r85":
      return "Overuse of italics";
    case "sia-r86":
      return "Presentational element is exposed to assistive technologies";
    case "sia-r87":
      return "Skip to main content link is missing";
    case "sia-r90":
      return "Role with implied hidden content has keyboard focus";
    case "sia-r91":
      return "Letter spacing does not meet minimum requirement";
    case "sia-r92":
      return "Word spacing does not meet minimum requirement";
    case "sia-r93":
      return "Line height does not meet minimum requirement";
    case "sia-r94":
      return "Menu item missing a text alternative";
    case "sia-r95":
      return "Interactive content excluded from keyboard navigation";
    case "sia-r96":
      return "Page refreshes or redirects without warning";
    case "sia-r110":
      return "All roles are invalid";
    case "sia-r111":
      return "Interactive element does not meet enhanced size";
    case "sia-r113":
      return "Interactive element does not meet minimum size nor spacing";
    default:
      return "";
  }
}
