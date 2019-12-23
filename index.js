const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const morgan = require("morgan");
const app = express();

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

const passport = require("passport");
require("./passport");

const cors = require("cors");
app.use(cors());

const { check, validationResult } = require("express-validator");

// mongoose.connect("mongodb://localhost:27017/myFlixDB", {
//   useNewUrlParser: true
// });
mongoose.connect(
  "mongodb+srv://myFlixDBAdmin:R92rJChewaBdTKCm@myflixdb-nxdnb.mongodb.net/myFlixDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(morgan("common"));

const auth = require("./auth")(app);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

var allowedOrigins = ["http://localhost:1234"];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        var message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    }
  })
);

// let movies = [
//   {
//     title: "Harry Potter and the Sorcerer's Stone",
//     description: "",
//     genre: "",
//     director: "",
//     imageURL: "",
//     featured: ""
//   },
//   {
//     title: "Lord of the Rings",
//     description: "",
//     genre: "Fantasy",
//     director: "Peter Jackson",
//     imageURL: "",
//     featured: ""
//   },
//   {
//     title: "Fight Club",
//     description: "",
//     genre: "",
//     director: "",
//     imageURL: "",
//     featured: ""
//   },
//   {
//     title: "Taxi Driver",
//     description: "",
//     genre: "",
//     director: "",
//     imageURL: "",
//     featured: ""
//   },
//   {
//     title: "Goodfellas",
//     description: "",
//     genre: "",
//     director: "",
//     imageURL: "",
//     featured: ""
//   },
//   {
//     title: "Tron",
//     description: "",
//     genre: "",
//     director: "",
//     imageURL: "",
//     featured: ""
//   },
//   {
//     title: "Her",
//     description: "",
//     genre: "",
//     director: "",
//     imageURL: "",
//     featured: ""
//   },
//   {
//     title: "Casino",
//     description: "",
//     genre: "",
//     director: "",
//     imageURL: "",
//     featured: ""
//   },
//   {
//     title: "Star Wars",
//     description: "",
//     genre: "",
//     director: "",
//     imageURL: "",
//     featured: ""
//   },
//   {
//     title: "Wall-e",
//     description: "",
//     genre: "",
//     director: "",
//     imageURL: "",
//     featured: ""
//   }
// ];
//
// let users = [
//   {
//     username: "",
//     password: "",
//     email: "",
//     dateOfBirth: "",
//     favorites: []
//   }
// ];

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
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find(movie => {
      return movie.title === req.params.title;
    })
  );
  // res.send("Successful GET request returning data on a single movie");
});

//Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get("/movies/genre/:genre", (req, res) => {
  res.send("Successful GET request returning data on movies of the genre");
});

//Return data about a director (bio, birth year, death year) by name
app.get("/movies/director/:director", (req, res) => {
  res.send("Successful GET request returning data on director");
});

//Allow new users to register
//Add a user
/* We’ll expect JSON in this format
{
 ID : Integer,
 Username : String,
 Password : String,
 Email : String,
 Birthday : Date
}*/
app.post(
  "/users",
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  (req, res) => {
    // check the validation object for errors
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then(function(user) {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
            .then(function(user) {
              res.status(201).json(user);
            })
            .catch(function(error) {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// Get all users
app.get("/users", function(req, res) {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get a user by username
app.get("/users/:Username", function(req, res) {
  Users.findOne({ Username: req.params.Username })
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Allow users to update their user info (username, password, email, date of birth)
// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put("/users/:Username", function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Allow users to add a movie to their list of favorites
// Add a movie to a user's list of favorites
app.post("/users/:Username/Movies/:MovieID", function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Allow users to remove a movie from their list of favorites
// app.delete("/users/[ID]/movies/:title	", (req, res) => {
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

app.delete("/users/:Username/Movies/:MovieID", function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Allow existing users to deregister
// Delete a user by username
app.delete("/users/:Username", function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(function(user) {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// app.listen(8080, () => {
//   console.log(`Your app is listening on http://localhost:8080/`);
// });

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});
