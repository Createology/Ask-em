const express = require("express");
// const cors = require('cors');
const bodyParser = require("body-parser");
const brain = require("./server/brain.js");
const surveyHelpers = require("./server/surveyHelpers");
const signIn = require("./server/signIn");
const signUp = require("./server/signUp");
const db = require("./database/index");
const contact = require("./server/contactUs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/isa", (req, res) => {
  res.status(200).send({ dark: brain.output.dark });
});

app.post("/search", (req, res) => {
  db.selectSearchsurvey(req.body.text, function(err, results){
    if (err) throw err;
    res.status(200).send(JSON.stringify({results, results}))
  })
})

//;-----------------------;
app.post("/signup", signUp);

app.post("/login", signIn);
//;-----------------------;
app.post("/surveys/retrieve", surveyHelpers.getAllSurveys);

app.post("/surveys/save", surveyHelpers.saveSurvey);
//;-----------------------;
app.post("/mysurveys/retrieve", surveyHelpers.getAllSurveysOfUser);

app.post("/mysurveys/answered", surveyHelpers.getAllSurveysAnsweredByUser);
//;-----------------------;
app.post("/answer/smart/add", surveyHelpers.fillSmartAnswer);

app.post("/answer/dumb/add", surveyHelpers.fillAnswer);

app.post("/answer/dumb/questions", surveyHelpers.getAllQuestionsOfASurvey);
//;-----------------------;

app.post("/mysurveys", (req, res) => {
  res.status(200).send({});
});

app.get("/user", (req, res) => {
  res.status(200).send({});
});

app.post("/contact", contact);

app.get("/*", (req, res) => {
  res.sendStatus(404);
});


//connection for everything except for Brain
app.listen(3000, () => {
  console.log("listening on port 3000!");
});
