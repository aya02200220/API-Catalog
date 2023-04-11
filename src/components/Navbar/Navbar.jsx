import { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MyCategory } from "../../App";
import styled from "styled-components";
import "./Navbar.css";

function HomeNavbar(props) {
  const [category] = useContext(MyCategory);
  const [text, setText] = useState("");
  const ref = useRef();

  const handleSearch = () => {
    console.log("入力確認：", ref.current.value.toLowerCase());
    {
      props.setSearchKey(ref.current.value.toLowerCase());
    }
  };

  function hitEnter(key) {
    if (key == "Enter") {
      {
        props.setSearchKey("");
      }
      {
        props.setSearchKey(ref.current.value.toLowerCase());
      }
    }
  }

  useEffect(() => {
    setText("");
  }, [props.searchKey]);

  useEffect(() => {
    setText("");
    {
      props.setSearchKey("");
    }
  }, [category]);

  return (
    // <Navbar bg="light" expand="lg">
    <Navbar fixed="top" expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand href="#">Public API Catalog</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* <Nav.Link href="#action1">Home</Nav.Link> */}
            {/* <Nav.Link href="#action2">Favorite</Nav.Link> */}

            {/* <Link className="nav-link" to="/">
              Home
            </Link>

            <Link className="nav-link" to="/favorite">
              Favorite
            </Link> */}

            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              ref={ref}
              onKeyUp={(e) => hitEnter(e.key)}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <Button
              className="search-btn"
              variant="outline"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNavbar;
