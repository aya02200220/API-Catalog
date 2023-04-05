import { useState } from "react";
import "./App.css";
import HomeNavbar from "./components/Navbar/Navbar";
import AccordionMenu from "./components/Accordion/Accordion";

function App() {
  const [category, setCategory] = useState("");

  return (
    <>
      <HomeNavbar />
      <AccordionMenu setCategory={setCategory} />
      現在のカテゴリーは：{category}
    </>
  );
}

export default App;
