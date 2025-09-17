import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "~/components";

const meta = {
  title: "Form",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["!autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectDropdownField: Story = {
  args: {
    id: "id",
    withSearch: true,
    options: [
      { id: "option1", label: "Option 1" },
      { id: "Optionwithicon", label: "Option with Icon" },
      { id: "longlongoption3", label: "Lon long Option 3" },
      { id: "longlonglongoption4", label: "Long Long Long Option 4" },
      { id: "longlonglonglongoption4", label: "Long Long Long Long Option 5" },
      {
        id: "longlonglonglonglongoption4",
        label: "Long Long Long Long Long Option 5",
      },
    ],
    multiple: false,
    optionLabel: "",
    outlined: false,
    withPortal: true,
  },
};
