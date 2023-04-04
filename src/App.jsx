import { useState } from "react";
import "./App.css";

import HomeNavbar from "./components/Navbar/Navbar";
import AccordionMenu from "./components/Accordion/Accordion";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <HomeNavbar />
      <AccordionMenu />
    </>
  );
}

export default App;
