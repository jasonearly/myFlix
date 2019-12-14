const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const morgan = require("morgan");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

let topMovies = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    description: "",
    genre: "",
    director: "",
    imageURL: "",
    featured: ""
  },
  {
    title: "Lord of the Rings",
    description: "",
    genre: "Fantasy",
    director: "Peter Jackson",
    imageURL: "",
    featured: ""
  },
  {
    title: "Fight Club",
    description: "",
    genre: "",
    director: "",
    imageURL: "",
    featured: ""
  },
  {
    title: "Taxi Driver",
    description: "",
    genre: "",
    director: "",
    imageURL: "",
    featured: ""
  },
  {
    title: "Goodfellas",
    description: "",
    genre: "",
    director: "",
    imageURL: "",
    featured: ""
  },
  {
    title: "Tron",
    description: "",
    genre: "",
    director: "",
    imageURL: "",
    featured: ""
  },
  {
    title: "Her",
    description: "",
    genre: "",
    director: "",
    imageURL: "",
    featured: ""
  },
  {
    title: "Casino",
    description: "",
    genre: "",
    director: "",
    imageURL: "",
    featured: ""
  },
  {
    title: "Star Wars",
    description: "",
    genre: "",
    director: "",
    imageURL: "",
    featured: ""
  },
  {
    title: "Wall-e",
    description: "",
    genre: "",
    director: "",
    imageURL: "",
    featured: ""
  }
];

let Users = [
  {
    username: "",
    password: "",
    email: "",
    dateOfBirth: "",
    favorites: []
  }
];

//Get Home destination
app.get("/", function(req, res) {
  res.send("Welcome to my movie app!");
});

//Get documentation of API
app.get("/documentation", function(req, res) {
  res.sendFile("public/documentation.html", { root: __dirname });
});

//Return a list of ALL movies to the user
app.get("/movies", function(req, res) {
  res.json(topMovies);
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get("/movies/:title", (req, res) => {
  res.json(
    topMovies.find(movie => {
      return movie.title === req.params.title;
    })
  );
  // res.send("Successful GET request returning data on a single movie");
});

//Return data about a genre (description) by name/title (e.g., “Thriller”)
// app.get("/movies/:genre", (req, res) => {
//   res.send("Successful GET request returning data on movies of the genre");
// });

//Return data about a director (bio, birth year, death year) by name
// app.get("/movies/:director", (req, res) => {
//   res.send("Successful GET request returning data on director");
// });

//Allow new users to register
// app.post("/users", (req, res) => {
//   let newUser = req.body;
//
//   if (!newUser.name) {
//     const message = "Missing name in request body";
//     res.status(400).send(message);
//   } else {
//     newUser.id = uuid.v4();
//     Users.push(newUser);
//     res.status(201).send(newUser);
//   }
// });

//Allow users to update their user info (username, password, email, date of birth)
// Update the "grade" of a student by student name/class name
// app.put("/students/:name/:class/:grade", (req, res) => {
//   let student = Students.find(student => {
//     return student.name === req.params.name;
//   });
//
//   if (student) {
//     student.classes[req.params.class] = req.params.grade;
//     res
//       .status(201)
//       .send(
//         "Student " +
//           req.params.name +
//           " was assigned a grade of " +
//           req.params.grade +
//           " in " +
//           req.params.class
//       );
//   } else {
//     res
//       .status(404)
//       .send("Student with the name " + req.params.name + " was not found.");
//   }
// });

//Allow users to add a movie to their list of favorites
// add the "grade" of a student by student name/class name
// app.post("/students/:name/:class/:grade", (req, res) => {
//   let student = Students.find(student => {
//     return student.name === req.params.name;
//   });
//
//   if (student) {
//     student.classes[req.params.class] = req.params.grade;
//     res
//       .status(201)
//       .send(
//         "Student " +
//           req.params.name +
//           " was assigned a grade of " +
//           req.params.grade +
//           " in " +
//           req.params.class
//       );
//   } else {
//     res
//       .status(404)
//       .send("Student with the name " + req.params.name + " was not found.");
//   }
// });

//Allow users to remove a movie from their list of favorites
// app.delete("/users/:id", (req, res) => {
//   let user = Users.find(user => {
//     return user.id === req.params.id;
//   });
//
//   if (user) {
//     Students.filter(function(obj) {
//       return obj.id !== req.params.id;
//     });
//     res.status(201).send("Student " + req.params.id + " was deleted.");
//   }
// });

//Allow existing users to deregister
// app.delete("/users/:id", (req, res) => {
//   let user = Users.find(user => {
//     return user.id === req.params.id;
//   });
//
//   if (user) {
//     Students.filter(function(obj) {
//       return obj.id !== req.params.id;
//     });
//     res.status(201).send("Student " + req.params.id + " was deleted.");
//   }
// });

app.listen(8080, () => {
  console.log(`Your app is listening on http://localhost:8080/`);
});
