import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import "./registration-view.css";

export function RegistrationView(props) {
  const [username, createUsername] = useState("");
  const [password, createPassword] = useState("");
  const [email, createEmail] = useState("");
  const [birthday, createDob] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
    // send a request to the server for authentication
    // workaround for authentication
    props.onSignedIn(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => createEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => createUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Passwordy"
                value={password}
                onChange={e => createPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="01/01/1985"
                value={birthday}
                onChange={e => createDob(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Register me!
            </Button>
            <Button variant="link" onClick={() => props.onClick()}>
              Already a member?
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    /*
    <form>
      <label>
        Input Username:
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Input Password:
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type='button' onClick={handleSubmit}>Register</button>
    </form>
    */
  );
}
