const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.static("public"));

app.use(morgan("common"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

let topMovies = [
  {
    title: "Harry Potter and the Sorcerer's Stone"
  },
  {
    title: "Lord of the Rings"
  },
  {
    title: "Fight Club"
  },
  {
    title: "Taxi Driver"
  },
  {
    title: "Goodfellas"
  },
  {
    title: "Tron"
  },
  {
    title: "Her"
  },
  {
    title: "Casino"
  },
  {
    title: "Star Wars"
  },
  {
    title: "Wall-e"
  }
];

app.get("/", function(req, res) {
  res.send("Welcome to my movie app!");
});

app.get("/movies", function(req, res) {
  res.json(topMovies);
});

app.get("/documentation", function(req, res) {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.listen(8080);
