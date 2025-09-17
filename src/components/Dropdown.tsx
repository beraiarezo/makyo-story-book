import { createPortal } from "react-dom";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { iconClose, iconDownArrow } from "~/assets";
import { DropdownMenu } from "./DropdownMenu";

type Option = { id: string; label: string };

interface DropdownProps {
  id?: string;
  withSearch?: boolean;
  options: Option[];
  multiple?: boolean;
  optionLabel?: string;
  outlined?: boolean;
  withPortal?: boolean;
  onChange?: (arg: string | string[]) => void;
}

const Dropdown = ({
  id,
  withSearch,
  options,
  multiple,
  outlined,
  optionLabel,
  withPortal,
  onChange,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>([]);
  const [menuPos, setMenuPos] = useState<{
    top: number;
    left: number;
    width: number;
  }>({
    top: 0,
    left: 0,
    width: 0,
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const updateMenuPosition = () => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 6, left: rect.left, width: rect.width });
  };

  useLayoutEffect(() => {
    if (open) updateMenuPosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const reposition = () => updateMenuPosition();
    const ro = new ResizeObserver(reposition);
    if (triggerRef.current) ro.observe(triggerRef.current);

    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [open]);

  useEffect(() => {
    const onDocKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onDocKey);
    return () => document.removeEventListener("keydown", onDocKey);
  }, []);

  const commitChange = (next: Option[]) => {
    setSelected(next);
    if (!onChange) return;
    if (multiple) onChange(next.map((n) => n.id));
    else onChange(next[0]?.id ?? null);
  };

  const toggleSelect = (opt: Option) => {
    if (multiple) {
      const exists = selected.some((o) => o.id === opt.id);
      const next = exists
        ? selected.filter((o) => o.id !== opt.id)
        : [...selected, opt];
      commitChange(next);
    } else {
      commitChange([opt]);
      setOpen(false);
    }
  };

  const removeOption = (opt: Option) => {
    const next = selected.filter((o) => o.id !== opt.id);
    commitChange(next);
  };

  const toggleOpen = (isOpen: boolean) => setOpen(isOpen);

  return (
    <div className="grid grid-cols-12 items-center gap-2" ref={rootRef}>
      <label className="col-span-2 text-sm text-gray-700" htmlFor={id}>
        {optionLabel ? optionLabel : "Label"}
      </label>

      <div
        ref={triggerRef}
        id={id}
        aria-expanded={open}
        aria-haspopup="listbox"
        role="tab"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen((v) => !v);
          if (e.key === "Escape") setOpen(false);
        }}
        className={[
          "col-span-9 flex justify-between items-center cursor-pointer rounded-md px-2.5 py-1.5 border border-gray-300",
          outlined ? "border border-gray-300 bg-gray-400" : "",
        ].join(" ")}
      >
        <div className="flex flex-wrap gap-1.5 min-h-6">
          {selected.map((option) => (
            <div
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              key={option.id}
              onClick={(e) => e.stopPropagation()}
              className="text-xs flex items-center px-2 py-1 bg-gray-200 rounded-md"
            >
              {option.label}
              <button onClick={() => removeOption(option)}>
                <img
                  src={iconClose}
                  className="w-4 h-4 ml-1 cursor-pointer"
                  alt="remove"
                />
              </button>
            </div>
          ))}
        </div>
        <img
          src={iconDownArrow}
          className={`w-4 h-4 ml-1.5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          alt="toggle dropdown"
        />
      </div>
      {open &&
        (withPortal ? (
          createPortal(
            <DropdownMenu
              toggleOpen={toggleOpen}
              menuPos={menuPos}
              toggleSelect={toggleSelect}
              selected={selected}
              options={options}
              withSearch={withSearch}
            />,
            document.body
          )
        ) : (
          <DropdownMenu
            toggleOpen={toggleOpen}
            menuPos={menuPos}
            toggleSelect={toggleSelect}
            selected={selected}
            options={options}
            withSearch={withSearch}
          />
        ))}
    </div>
  );
};

export default Dropdown;
