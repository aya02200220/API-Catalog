import { useState, useContext, createContext, useEffect } from "react";
import "./App.css";
import axios from "axios";
import HomeNavbar from "./components/Navbar/Navbar";
import Categories from "./components/Categories/Categories";
import ApiCards from "./components/ApiCards/ApiCards";
import Background from "./components/Background/Background";

import JsonData from "./components/JsonData.json";

export const MyCategory = createContext();

function App() {
  const [category, setCategory] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [apiList, setApiList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // useEffect(() => {
  //   const fetchApiLists = async () => {
  //     try {
  //       const response = await axios.get(`https://api.publicapis.org/entries`);
  //       const data = response.data;
  //       setApiList(data.entries);
  //       setFiltered(data.entries);
  //     } catch (error) {
  //       console.log(`Error while fetching: ${error}`);
  //     }
  //   };
  //   fetchApiLists();
  // }, []);
  useEffect(() => {
    setApiList(JsonData.entries);
    setFiltered(JsonData.entries);
  }, []);

  return (
    <>
      <MyCategory.Provider value={[category, setCategory]}>
        <HomeNavbar setSearchKey={setSearchKey} />
        <Categories setCategory={setCategory} />

        <ApiCards apiList={apiList} filtered={filtered} searchKey={searchKey} />
      </MyCategory.Provider>
    </>
  );
}

export default App;
