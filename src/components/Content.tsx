import { memo } from "react";
import { parser } from "~/lib/TextConverter";

const Content = ({
  content,
  decoration,
}: {
  content: string;
  decoration?: RegExp;
}) => {
  let tContent = decoration ? parser.decorate(content, decoration) : content;

  const text =
    typeof tContent !== "string"
      ? tContent.map((content, index) => {
          if (typeof content === "string") return content;
          else {
            return (
              <span key={`${content.name}-${index}`} className="bg-emerald-200">
                {content.name}
              </span>
            );
          }
        })
      : tContent;

  return <span>{text}</span>;
};

export default memo(Content);
