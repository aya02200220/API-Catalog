import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Background from "../Background/Background";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./ApiCards.css";
import { MyCategory } from "../../App";
import { CardGroup } from "react-bootstrap";

import Badge from "react-bootstrap/Badge";

import styled from "styled-components";

const Bookmark = styled.div`
  background-color: ${(props) => (props.active ? "orange" : "black")};
`;

function ApiCards(props) {
  const [category] = useContext(MyCategory);
  const [apiList, setApiList] = useState(props.apiList);
  const [filtered, setFiltered] = useState(props.apiList);
  const [searched, setSearched] = useState(props.apiList);
  const [searchKey, setSearchKey] = useState("");
  const [saved, setSaved] = useState(false);
  // const [category, setCategory] = useState("");

  useEffect(() => {
    setApiList(props.apiList);
    setFiltered(props.apiList);
  }, [props.start]);

  const activeToggle = (e) => {
    setSaved(!active);
  };

  const apiCards = filtered.map((card, key) => (
    <>
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className="listCard--body"
      >
        <Card className="card--container">
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="card--title">
              {card.Category.toUpperCase()}
            </ListGroup.Item>
            <Bookmark>
              <FontAwesomeIcon
                icon={faBookmark}
                className="icon--bookmark"
                active={false}
                onClick={activeToggle}
              />
            </Bookmark>
          </ListGroup>{" "}
          <a className="card-link" target="_blank" href={card.Link} key={key}>
            <Card.Body className="card-body">
              <Card.Title>{card.API}</Card.Title>
              <Card.Text>{card.Description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item className="first-item">
                Auth type : {card.Auth ? card.Auth : "---"}
              </ListGroup.Item>
              <ListGroup.Item className="last-item">
                Cors : {card.Cors.toUpperCase()}
              </ListGroup.Item>
            </ListGroup>
          </a>
        </Card>
      </motion.div>
    </>
  ));

  useEffect(() => {
    if (category === "All") {
      setApiList(props.apiList);
      setFiltered(props.apiList);
      setSearchKey("");
      return;
    }
    const filtered = apiList.filter((card) => card.Category.includes(category));
    setFiltered(filtered);
  }, [category]);

  useEffect(() => {
    setSearchKey(props.searchKey);
  }, [props.searchKey]);

  useEffect(() => {
    console.log(searchKey);
    if (searchKey === "") {
      if (category === "All") {
        setApiList(props.apiList);
        setFiltered(props.apiList);
        return;
      }
      const filtered = apiList.filter((card) =>
        card.Category.includes(category)
      );
      setFiltered(filtered);
      return;
    }
    const searched = filtered.filter((card) => {
      return (
        card.API.toLowerCase().includes(searchKey) ||
        card.Description.toLowerCase().includes(searchKey) ||
        card.Category.toLowerCase().includes(searchKey)
      );
    });
    setFiltered(searched);
  }, [searchKey]);
  return (
    <div className="card--container">
      <Background />
      <div className="card-list--info">
        <p className="--list --1">
          Current Category:
          <Badge className="badge-style" bg="warning" text="dark">
            {category}
          </Badge>
        </p>
        <p className="--list --2">
          Number of API:
          <Badge className="badge-style" bg="warning" text="dark">
            {apiCards.length}
          </Badge>
        </p>
      </div>

      <motion.div
        layout
        transition={{ duration: 0.3 }}
        className="cardList--fieldset"
      >
        {apiCards}
      </motion.div>
    </div>
  );
}

export default ApiCards;
