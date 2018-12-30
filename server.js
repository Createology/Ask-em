const express = require("express");
// const cors = require('cors');
const bodyParser = require("body-parser");
const brain = require("./server/brain.js");
const db = require("./database/index");
const surveyHelpers = require("./server/surveyHelpers");
const signIn = require("./server/signIn");
const signUp = require("./server/signUp");
const bcrypt = require("bcrypt-nodejs");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/isa", (req, res) => {
  res.status(200).send({ dark: brain.output.dark });
});

app.post("/search", (req, res) => {
  console.log("search server", req.body);
  res.status(200).send({});
});

app.post("/signup", signUp);

app.post("/login", signIn);

app.get("/surveys", surveyHelpers.getAllSurveys);

app.post("/surveys", surveyHelpers.saveSurvey);

app.post("/mysurveys", (req, res) => {
  console.log("search server", req.body);
  res.status(200).send({});
});

//NOTE: 0-->(Not save) 1-->(save correctly)
app.get("/user", (req, res) => {
  res.status(200).send({});
});

app.get("/*", (req, res) => {
  res.status(404).send("");
});

//connection for everything except for Brain
app.listen(3000, () => {
  console.log("listening on port 3000!");
});
