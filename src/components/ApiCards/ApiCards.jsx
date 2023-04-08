import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./ApiCards.css";
import { CardGroup } from "react-bootstrap";

function ApiCards(props) {
  const [apiList, setApiList] = useState(props.apiList);
  const [filtered, setFiltered] = useState(props.apiList);
  const [category, setCategory] = useState("");

  useEffect(() => {
    setApiList(props.apiList);
    setFiltered(props.apiList);
    console.log("---------useEffect---------");
    console.log(apiList);
    console.log(filtered);
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
    if (props.category === "All") {
      setApiList(props.apiList);
      setFiltered(props.apiList);
      return;
    }
    const filtered = apiList.filter((card) =>
      card.Category.includes(props.category)
    );
    setFiltered(filtered);
  }, [props.category]);

  return (
    <>
      {/* <p>Current Category: {apiList[1].Category}</p> */}
      <p>Current Category: {props.category}</p>
      <p>Number of API: {apiCards.length}</p>
      <div className="cardList--fieldset">{apiCards}</div>
    </>
  );
}

export default ApiCards;
