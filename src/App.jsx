import { useState, useContext, createContext, useEffect } from "react";
import "./App.css";
import axios from "axios";
import HomeNavbar from "./components/Navbar/Navbar";
import Categories from "./components/Categories/Categories";
import ApiCards from "./components/ApiCards/ApiCards";

function App() {
  const [category, setCategory] = useState("");
  const [apiList, setApiList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchApiLists = async () => {
      try {
        const response = await axios.get(`https://api.publicapis.org/entries`);
        const data = response.data;
        setApiList(data.entries);
        setFiltered(data.entries);
      } catch (error) {
        console.log(`Error while fetching: ${error}`);
      }
    };
    fetchApiLists();
  }, []);

  return (
    <>
      <HomeNavbar />
      <Categories setCategory={setCategory} />
      <ApiCards category={category} apiList={apiList} filtered={filtered} />
    </>
  );
}

export default App;
