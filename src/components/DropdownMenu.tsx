import { FC, useState } from "react";
import { iconSearch, iconCloseFilled } from "~/assets";
import Content from "./Content";
import { createSearchHighlightPattern } from "~/lib/utils";
import { Option } from "./Types";

interface DropdownMenuProps {
  withSearch?: boolean;
  toggleOpen: (open: boolean) => void;
  menuPos: {
    top: number;
    left: number;
    width: number;
  };
  toggleSelect: (option: Option) => void;
  selected: Option[];
  options: Option[];
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  menuPos,
  withSearch,
  toggleOpen,
  options,
  selected,
  toggleSelect,
}) => {
  const [query, setQuery] = useState("");

  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  return (
    <>
      <div
        className="fixed inset-0 z-[9998] bg-transparent"
        onClick={() => toggleOpen(false)}
        onKeyDown={() => toggleOpen(false)}
      />
      <div
        className="fixed z-[9999] rounded-lg border border-gray-200 bg-white shadow-lg max-h-72 overflow-auto animate-fade-in"
        style={{
          top: menuPos.top,
          left: menuPos.left,
          width: menuPos.width,
        }}
      >
        {withSearch && (
          <div className="sticky top-0 bg-white p-2 border-b border-gray-100 flex items-center">
            <img src={iconSearch} alt="search" className="w-4 h-4" />
            <input
              autoFocus
              className="w-full mx-1.5 rounded-md  px-2 py-1 text-sm outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query.length ? (
              <button onClick={() => setQuery("")}>
                <img
                  src={iconCloseFilled}
                  alt="Clear Search"
                  className="w-4 h-4 cursor-pointer"
                />
              </button>
            ) : null}
          </div>
        )}

        <ul className="py-1">
          {filtered.map((option) => {
            const active = selected.some((o) => o.id === option.id);
            return (
              <li key={option.id}>
                <button
                  type="button"
                  className={[
                    "w-full text-left px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-emerald-100 font-medium"
                      : "hover:bg-emerald-50",
                  ].join(" ")}
                  onClick={() => toggleSelect(option)}
                >
                  <div className="flex items-center gap-2">
                    <Content
                      content={option.label}
                      decoration={createSearchHighlightPattern(query)}
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
