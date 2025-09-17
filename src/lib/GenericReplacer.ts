import { IGenericReplace, TContent, TContentElement } from "./Types";
import { mapStringElements } from "./utils";

export abstract class GenericReplacer implements IGenericReplace {
  pattern: RegExp;
  replaceType: string;
  active: boolean;

  constructor(replaceType: string) {
    this.pattern = new RegExp(`(.*?)()\\b`, "gsi");
    this.replaceType = replaceType;
    this.active = true;
  }
  replace(content: TContent): TContent {
    if (!this.active) return content;
    return mapStringElements(content, (element) => {
      let pattern = this.pattern;
      pattern.lastIndex = 0;
      let tokens: TContent = [];
      let m;
      let lastIndex = 0;
      while ((m = pattern.exec(element)) !== null) {
        let prefix = m[1];
        let found = m[2];
        if (prefix === "" && found === "") {
          return content;
        }
        lastIndex = pattern.lastIndex;
        let r;
        if (this.replaceType === "markdown") {
          r = this.replacement(m[3], found);
        } else {
          r = this.replacement(found, prefix);
        }
        if (typeof r === "string") {
          // replacement unsuccessful
          tokens = [...tokens, prefix + r];
        } else {
          tokens = [...tokens, prefix, r];
        }
      }
      if (tokens.length == 0) {
        return [element];
      } else {
        return [...tokens, element.slice(lastIndex)];
      }
    });
  }
  replacement(name: string, _prefix: string) {
    return name as TContentElement;
  }
}
