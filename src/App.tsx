import { useState } from "react";
import { createSearchHighlightPattern } from "./lib/utils";
import MessageContent from "./components/Content";

import "./App.css";

const options = [
  { id: "1", title: "Hello World Hello World" },
  { id: "2", title: "Hello World Reziko" },
  { id: "3", title: "Hello World Reziko Beraia" },
];

function App() {
  const [text, setText] = useState("reziko");

  return (
    <>
      <input
        name="search"
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
      {options.map((option) => (
        <MessageContent
          key={option.id}
          content={option.title}
          decoration={createSearchHighlightPattern(text)}
        />
      ))}
    </>
  );
}

export default App;
