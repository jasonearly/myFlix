import React from "react";
import Button from "react-bootstrap/Button";
import LoginView from "./login-view";
import RegistrationView from "../registration-view/registration-view";

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

export class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    // let button;
    // let view;



    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />

        if (isLoggedIn) {
          <Button variant="primary" onClick={this.handleLogoutClick}>
            Sign in
          </Button>
        } else {
          <div>
            <Button variant="primary" onClick={this.handleLoginClick}>
              Register
            </Button>
            <RegistrationView />
          </div>
        }
      </div>
    );
  }
}

export default LoginControl;
