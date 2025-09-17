import { TContent, ElementIterator } from "./Types";

export const mapStringElements = (
  content: TContent,
  iterator: ElementIterator
): TContent => {
  let parsed = content.map((element) =>
    typeof element !== "string" ? [element] : iterator(element)
  );
  let flatParsed = parsed.flat();
  let cleaned = flatParsed.filter(
    (element) => typeof element !== "string" || element.length > 0
  );
  return cleaned;
};

const escapeRegexSpecialChars = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const parseSearchWords = (query: string): string[] => {
  return query.split(/\s+/).filter((word) => word.trim().length > 0);
};

export const createSearchHighlightPattern = (
  query: string
): RegExp | undefined => {
  if (!query || query.trim().length === 0) {
    return undefined;
  }

  const words = parseSearchWords(query);

  if (words.length === 0) {
    return undefined;
  }

  const escapedWords = words.map(escapeRegexSpecialChars);
  return new RegExp(`(${escapedWords.join("|")})`, "gi");
};
