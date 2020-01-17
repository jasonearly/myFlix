import React from "react";
import axios from "axios";

import { LoginControl } from "../login-view/login-control";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view-2";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false
    };
  }
  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios
      .get("https://myflix-moviedb.herokuapp.com/movies")
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  //button to return back
  onButtonClick() {
    this.setState({
      selectedMovie: null
    });
  }

  // onRegister(register) {
  //   this.setState({
  //     register: false
  //   });
  // }

  //testing
  onSignedIn(user) {
    this.setState({
      user: user,
      register: false
    });
  }
  //testing
  register() {
    this.setState({
      register: true
    });
  }

  //testing
  alreadyMember() {
    this.setState({
      register: false
    });
  }

  render() {
    //  const { movies, selectedMovie, user } = this.state;

    //if no user return the LoginView
    // if (!user)
    //   return (
    //     <div>
    //       <LoginView
    //         onLoggedIn={user => this.onLoggedIn(user)}
    //         onClick={() => this.onRegister(register)}
    //       />
    //     </div>
    //   );

    //if the state isn't initialized, this will throw on runtime
    //before the data is initially loaded
    const { movies, selectedMovie, user, register } = this.state;

    if (!user && register === false)
      return (
        <LoginView
          onLoggedIn={user => this.onLoggedIn(user)}
          onClick={() => this.register()}
        />
      );

    if (register)
      return (
        <RegistrationView
          onClick={() => this.alreadyMember()}
          onSignedIn={user => this.onSignedIn(user)}
        />
      );
    // if (!user && register === false) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // if (register) return <RegistrationView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Container>
        <Row>
          <Col>
            <div className="main-view">
              <Button
                type="button"
                variant="link"
                onClick={() => this.onLoggedIn(null)}
              >
                Sign Out
              </Button>

              {selectedMovie ? (
                <MovieView
                  movie={selectedMovie}
                  onClick={() => this.onMovieClick(null)}
                />
              ) : (
                movies.map(movie => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onClick={movie => this.onMovieClick(movie)}
                  />
                ))
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
