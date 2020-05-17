import Home from "./Home";
import Play from "./Play";
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Container>
      <header>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Go Variants
          </Navbar.Brand>
        </Navbar>
      </header>
      <main>
        <div className="container">
          <Switch>
            <Route exact path="/play/:id">
              <Play />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </main>
    </Container>
  );
}

export default App;
