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
  const [start, setStart] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [apiList, setApiList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const fetchApiLists = async () => {
    try {
      const response = await axios.get(`https://api.publicapis.org/entries`);
      const data = response.data;
      setApiList(data.entries);
      setFiltered(data.entries);
      setStart("start");
    } catch (error) {
      console.log(`Error while fetching: ${error}`);
    }
  };

  useEffect(() => {
    console.log("フェッチ確認");
    fetchApiLists();
  }, []);

  // useEffect(() => {
  //   setApiList(JsonData.entries);
  //   setFiltered(JsonData.entries);
  // }, []);

  return (
    <>
      <MyCategory.Provider value={[category, setCategory]}>
        <HomeNavbar setSearchKey={setSearchKey} searchKey={searchKey} />
        <Categories setCategory={setCategory} />
        <ApiCards
          apiList={apiList}
          filtered={filtered}
          searchKey={searchKey}
          start={start}
        />
      </MyCategory.Provider>
    </>
  );
}

export default App;
