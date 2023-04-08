import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import Pagination from "../Pagination/Pagination";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./ApiCards.css";
import { MyCategory } from "../../App";
import { CardGroup } from "react-bootstrap";

function ApiCards(props) {
  const [category] = useContext(MyCategory);
  const [apiList, setApiList] = useState(props.apiList);
  const [filtered, setFiltered] = useState(props.apiList);
  const [searchKey, setSearchKey] = useState("");
  // const [category, setCategory] = useState("");

  useEffect(() => {
    setApiList(props.apiList);
    setFiltered(props.apiList);
    // console.log("---------useEffect---------");
    // console.log(apiList);
    // console.log(filtered);
  }, []);

  const apiCards = filtered.map((card, key) => (
    <>
      <a className="listCard--body" target="_blank" href={card.Link}>
        <Card className="card--container">
          <ListGroup className="list-group-flush">
            <ListGroup.Item key={key}>
              {card.Category.toUpperCase()}
            </ListGroup.Item>
          </ListGroup>{" "}
          <Card.Body>
            <Card.Title>{card.API}</Card.Title>
            <Card.Text>{card.Description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Auth type : {card.Auth ? card.Auth : "---"}
            </ListGroup.Item>
            {/* <ListGroup.Item>HTTPS : {Card.HTTPS}</ListGroup.Item> */}
            <ListGroup.Item>Cors : {card.Cors.toUpperCase()}</ListGroup.Item>
          </ListGroup>
          {/* <Card.Body>
            <Card.Link target="_blank" href={card.Link}>
              API Link
            </Card.Link>
          </Card.Body> */}
        </Card>
      </a>
    </>
  ));

  useEffect(() => {
    if (category === "All") {
      setApiList(props.apiList);
      setFiltered(props.apiList);
      return;
    }
    const filtered = apiList.filter((card) => card.Category.includes(category));
    setFiltered(filtered);
  }, [category]);

  useEffect(() => {
    setSearchKey(props.searchKey);
  }, [props.searchKey]);

  return (
    <>
      <p>さーちきー：{searchKey}</p>
      <p>Current Category: {category}</p>
      <p>Number of API: {apiCards.length}</p>
      <div className="cardList--fieldset">{apiCards}</div>
    </>
  );
}

export default ApiCards;
