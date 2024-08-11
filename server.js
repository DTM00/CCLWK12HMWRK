const express = require("express"); //import express
const app = express(); //creates app that allows to create entire server
const path = require("path");
const { LocalStorage } = require("node-localstorage");
//const cors = require("cors");
const axios = require("axios");

app.use(express.json()); //middleware
//app.use(cors()); //middleware

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

//app.use(express.static("public"));

app.get("/", (req, res) => {
  //app.get takes 2 parameters request & response
  console.log("You're Amazing");
  res.send("Hello!!!!");
  //response.download("server.js");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});
//This route gets a list of courses:  /api/courses
//courses in the array

// app.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.query);
// });

// year and month are parameters accessed.Get the parameters year and month for
//the request, response.send to send the request.parameters.year.month,
// these are Route parameters used to get essential information vs Query parameters
//used to get optional information.

// app.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.query);
// });
// localhost:3000/api/posts/2018/1?sortBy=name
//?sortBy=name  is a query string parameter used to get optional
// information.

// app.get("/", (req, res) => {
//   console.log("Request received for /");
//   res.sendFile(path.join(__dirname, "index.html"));
// });

app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    //400 bad Request if the req.body.name does not exist,
    //is less than 3, send a 400 error code BAD REQUEST
    res.status(400).send("Name is required and should be minimum 3 characters");
    return;
  }

  const course = { id: courses.length + 4, name: req.body.name };
  courses.push(course);
  res.send(course);
});

//courses is plural bc we are referring to collection of courses.

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course)
    res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

//app.get("/api/courses/:id", (req, res) => {
// res.send(req.params.id);
//});

// To get a single course, the id needs to be in the endpoint
// ex: /api/courses/1  1 is the id of the course we want to get
//res.status allows chaining of a message
// wont use response.send as much. Will mostly use res.sendStatus or res.status to
//send the response back to the one accessing the API.
// ex: response.sendStatus(500);

app.listen(3000); // app is listening on port 3000 for requests
//also can use: app.listen(3000, () => console.log ("Listening on port 3000..."))
//Port Listening is dynamic real world. Need to use an Environment Variable.
//Environment Variable is part of the environment that runs the listening process
//use: process.env.PORT
//syntax:
//const port =process.env.PORT || 3000;
// app.listen(port, ()=> console.log (`Listening on port ${port}...`}))
