import Accordion from "react-bootstrap/Accordion";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import "./Categories.css";

const Input = styled.input`
  display: none;
`;

function AccordionMenu(props) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("All");
  const handleChange = (e) => {
    setSelected(e.target.value);
    {
      props.setCategory(e.target.value);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `https://api.publicapis.org/categories`
        );
        const data = response.data;
        setCategories(data.categories);
      } catch (error) {
        console.log(`Error while fetching: ${error}`);
      }
    };
    fetchCategory();
    props.setCategory(selected);
    console.log("カテゴリ確認", categories);
  }, []);

  const mapCategory = categories.map((category, key) => (
    <>
      <input
        className="radio-inline__input"
        key={key + 1}
        type="radio"
        name="selectCategory"
        id={category}
        value={category}
        checked={category === selected}
        onChange={handleChange}
      />
      <label className="radio-inline__label" for={category}>
        {category}
      </label>
    </>
  ));

  return (
    <Accordion
      defaultActiveKey={["0"]}
      alwaysOpen
      className="main-accordion--header"
    >
      <Accordion.Item eventKey="0">
        <Accordion.Header>Select Category</Accordion.Header>
        <Accordion.Body>
          <fieldset className="radiobutton">
            <input
              className="radio-inline__input"
              key="0"
              type="radio"
              name="selectCategory"
              value="All"
              id="All"
              checked={"All" === selected}
              onChange={handleChange}
            />
            <label className="radio-inline__label" for="All">
              ALL
            </label>
            {mapCategory}
          </fieldset>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionMenu;
