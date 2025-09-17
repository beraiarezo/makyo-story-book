import { GenericReplacer } from "./GenericReplacer";
import { TDecoratedString } from "./Types";

export class DecorateReplacer extends GenericReplacer {
  constructor(regexp: RegExp) {
    super("decorated");
    const regex = regexp.toString();
    this.pattern = new RegExp(
      `(.*?)(${regex.substring(1, regex.length - 3)})`,
      "gsi"
    );
  }
  decorate(content: string | object) {
    const messageContent = !Array.isArray(content) ? [content] : content;

    return this.replace(messageContent);
  }

  replacement(name: string, _prefix: string) {
    return {
      type: "decorated",
      name: name,
      decorated: true,
    } as TDecoratedString;
  }
}
