const express = require("express");
// const cors = require('cors');
const bodyParser = require("body-parser");
const brain = require("./server/brain.js");
const db = require("./database/config");
const surveyHelpers = require("./server/surveyHelpers");
const bcrypt = require("bcrypt-nodejs");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/isa", function(req, res) {
  res.status(200).send({ dark: brain.output.dark });
});

app.post("/search", function(req, res) {
  console.log("search server", req.body);
  res.status(200).send({});
});

app.get("/surveys", surveyHelpers.getAllSurveys);

app.post("/surveys", surveyHelpers.saveSurvey);

app.post("/mysurveys", function(req, res) {
  console.log("search server", req.body);
  res.status(200).send({});
});

//NOTE: 0-->(Not save) 1-->(save correctly)
app.get("/user", function(req, res) {
  res.status(200).send({});
});

app.post("/signup", function(req, res) {
  console.log("===signup===");

  let firstName = req.body.firstName;
  let midname = req.body.midname;
  let lastName = req.body.lastName;
  let age = req.body.age;
  let gender = req.body.gender;
  let country = req.body.country;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let hashedPassword = bcrypt.hashSync(req.body.password);

  console.log(
    firstName,
    midname,
    lastName,
    age,
    gender,
    country,
    email,
    username,
    hashedPassword
  );

  var query = `insert into users values(null,\"${username}\",\"${firstName}\",\"${midname}\",\"${lastName}\",\"${age}\",\"${gender}\",\"${country}\",\"${email}\",\"${hashedPassword}\",CURRENT_TIMESTAMP)`;
  db.dbConnection.query(query, function(err, result) {
    if (result) {
      res.status(200).send("");
    } else {
      console.log(err);
      res.status(404).send("");
    }
  });

  // bcrypt.hash(password, 12).then(function(hashedPassword) {
  //   console.log("hashed password", hashedPassword);
  //   var query = `insert into users values(null,\"${firstName}\",\"${midname}\",\"${lastName}\",\"${age}\",\"${gender}\",\"${country}\",\"${email}\",\"${username}\",\"${hashedPassword}\",CURRENT_TIMESTAMP)`;
  //   db.dbConnection.query(query, function(err, result) {
  //     if (result) {
  //       res.status(200).send("");
  //     } else {
  //       console.log(err);
  //       res.status(404).send("");
  //     }
  //   });
  // });
});

app.post("/login", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var query = `select * from users where username=\"${username}\"`;
  db.dbConnection.query(query, function(err, result) {
    if (result) {
      bcrypt.compare(password, result[0].password, function(
        err,
        matchPassword
      ) {
        if (matchPassword) {
          var userId = result[0].id;
          var username = result[0].username;
          var userEmail = result[0].email;
          res.status(200).send([
            {
              userId: userId,
              username: username,
              userEmail: userEmail
            }
          ]);
        } else {
          res.status(404).send("");
        }
      });
    } else {
      res.status(404).send("");
    }
  });
});

app.get("/*", (req, res) => {
  res.status(404).send("");
});

//connection for everything except for Brain
app.listen(3000, function() {
  console.log("listening on port 3000!");
});
