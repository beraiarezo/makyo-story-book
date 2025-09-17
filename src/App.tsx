import { Dropdown } from "~/components";
import "./App.css";

const options = [
  { id: "1", label: "Hello World Hello World" },
  { id: "2", label: "Hello World Reziko" },
  { id: "3", label: "Hello World Reziko Beraia" },
];

function App() {
  const handleChange = (option: string | string[]) => {
    console.debug(option, "option");
  };

  return (
    <Dropdown
      options={options}
      onChange={handleChange}
      withSearch
      multiple
      withPortal
    />
  );
}

export default App;
