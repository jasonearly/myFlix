import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
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

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      return (
        <LoginView
          onLoggedIn={user => this.onLoggedIn(user)}
          onClick={() => this.onLoggedIn(null)}
        />
      );

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Container>
        <Row>
          <Col>
            <div className="main-view">
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
