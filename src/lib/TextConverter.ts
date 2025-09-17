import { DecorateReplacer } from "./DecorateReplacer";
import { TContent } from "./Types";

interface IConverter {
  decorate(content: string, regexp: RegExp): TContent;
}

class TextConverter implements IConverter {
  decorate(content: string, regexp: RegExp) {
    return new DecorateReplacer(regexp).decorate(content);
  }
}

export const parser = new TextConverter();
