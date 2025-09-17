export type Option = { id: string; label: string };

export interface DropdownProps {
  id?: string;
  withSearch?: boolean;
  options: Array<Option>;
  multiple?: boolean;
  optionLabel?: string;
  outlined?: boolean;
  withPortal?: boolean;
  onChange?: (arg: string | string[]) => void;
}
