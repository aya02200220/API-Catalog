import { useState, useContext, createContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import HomeNavbar from "./components/Navbar/Navbar";
import Categories from "./components/Categories/Categories";
import ApiCards from "./components/ApiCards/ApiCards";

import AddFavourites from "./components/AddFavourites/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites/RemoveFavourites";

import JsonData from "./components/JsonData.json";

export const MyCategory = createContext();

// function App() {
//   const [category, setCategory] = useState("");
//   const [start, setStart] = useState("");
//   const [searchKey, setSearchKey] = useState("");
//   const [apiList, setApiList] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   const fetchApiLists = async () => {
//     try {
//       const response = await axios.get(`https://api.publicapis.org/entries`);
//       const data = response.data;
//       setApiList(data.entries);
//       setFiltered(data.entries);
//       setStart("start");
//     } catch (error) {
//       console.log(`Error while fetching: ${error}`);
//     }
//   };

//   useEffect(() => {
//     console.log("フェッチ確認");
//     fetchApiLists();
//   }, []);

//   // useEffect(() => {
//   //   setApiList(JsonData.entries);
//   //   setFiltered(JsonData.entries);
//   // }, []);

//   return (
//     <>
//       <MyCategory.Provider value={[category, setCategory]}>
//         <HomeNavbar setSearchKey={setSearchKey} searchKey={searchKey} />
//         <Categories setCategory={setCategory} />
//         <ApiCards
//           apiList={apiList}
//           filtered={filtered}
//           searchKey={searchKey}
//           start={start}
//         />
//       </MyCategory.Provider>
//     </>
//   );
// }

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Home() {
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
function Favorite() {
  return (
    <>
      <h2>Favorites</h2>
    </>
  );
}

export default App;
