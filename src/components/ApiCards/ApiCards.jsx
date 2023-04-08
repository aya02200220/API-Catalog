import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./ApiCards.css";
import { CardGroup } from "react-bootstrap";

function ApiCards(props) {
  const [apiList, setApiList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("");
  // setCategory(props.category);

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
    setCategory(props.category);
  }, []);

  const apiCards = filtered.map((card, key) => (
    <>
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
        <Card.Body>
          <Card.Link target="_blank" href={card.Link}>
            API Link
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  ));

  useEffect(() => {
    if (props.category === "All") {
      setFiltered(apiList);
      return;
    }
    const filtered = apiList.filter((card) =>
      card.Category.includes(props.category)
    );
    setFiltered(filtered);
  }, [props.category]);

  return (
    <>
      <p>Current Category: {props.category}</p>
      <p>Number of List: {apiCards.length}</p>
      <div className="cardList--fieldset">{apiCards}</div>
    </>
  );
}

export default ApiCards;
