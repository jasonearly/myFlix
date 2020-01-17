import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import "./login-view.css";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const registration = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
    // send a request to the server for authentication
    // workaround for authentication
    props.onLoggedIn(username);
  };

  // register () {
  //   this.setState({RegistrationView})
  // }

  return (
    <Container className="loginContainer">
      <h1>Welcome to some HealthyPotatoes!</h1>
      <form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
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
            placeholder="Passwordy"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Log in
        </Button>

        <Form.Group controlId="newUser">
          <Form.Text>
            New User? Click{" "}
            <Button id="registerButton" onClick={() => props.onClick()}>
              {" "}
              Meh!{" "}
            </Button>
          </Form.Text>
        </Form.Group>
      </form>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

//      <Form.Text>New User? Click <Button id='registerButton' onClick={() => this.register()}> Meh! </Button>
