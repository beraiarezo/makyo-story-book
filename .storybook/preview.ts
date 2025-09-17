import React from "react";
import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        "div",
        { className: "min-h-screen min-w-screen" },
        React.createElement(Story)
      ),
  ],
};

export default preview;
