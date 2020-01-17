import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import { RegistrationView } from "../registration-view/registration-view";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="button" onClick={handleSubmit} variant="primary">
              Sign In
            </Button>

            <Button variant="link" onClick={() => props.onClick()}>
              Register
            </Button>

            {/*button changes state of MainView to display RegistrationView*/}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
