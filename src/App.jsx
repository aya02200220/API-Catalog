import { useState, useContext, createContext } from "react";
import "./App.css";
import HomeNavbar from "./components/Navbar/Navbar";
import Categories from "./components/Categories/Categories";
import ApiCards from "./components/ApiCards/ApiCards";

// const CategoryContext = createContext(category);
function App() {
  const [category, setCategory] = useState("");

  return (
    <>
      <HomeNavbar />
      <Categories setCategory={setCategory} />
      <ApiCards category={category} />
    </>
  );
}

export default App;
