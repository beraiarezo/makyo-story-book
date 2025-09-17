export type TDecoratedString = {
  type: "decorated";
  name: string;
  decorated: boolean;
};

export type TContentElement = string | TDecoratedString;

export type TContent = TContentElement[];
export type ElementIterator = (element: string) => TContent;
export type DecoratedElementIterator = (element: TContentElement) => TContent;

export interface IGenericReplace {
  replace(content: TContent): TContent;
  replacement(name: string, prefix: string): TContentElement;
}
