const express = require("express");
// const cors = require('cors');
const bodyParser = require("body-parser");
const brain = require("./server/brain.js");
const db = require("./database/index");
const surveyHelpers = require("./server/surveyHelpers");

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
  let firstName = req.body.firstName;
  let midname = req.body.midname;
  let lastName = req.body.lastName;
  let age = req.body.age;
  let gender = req.body.gender;
  let country = req.body.country;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  bcrypt.hash(password, 12).then(function(hashedPassword) {
    console.log("hashed password", hashedPassword);
    var query = `insert into users values(null,\"${firstName}\",\"${midname}\",\"${lastName}\",\"${age}\",\"${gender}\",\"${country}\",\"${email}\",\"${username}\",\"${hashedPassword}\",null)`;
    db.dbConnection.query(query, function(err, result) {
      if (result) {
        res.status(200).send("1");
      } else {
        console.log(err);
        res.status(404).send("");
      }
    });
  });
});

// app.post("login",function(req,res)){

//   // var username = req.body.username;
//   // var password = req.body.password;

//   // var query = `select * from users where username=\"${username}\"`;
//   // // 0 -> no username
//   // db.dbConnection.query(query,function(err,result){
//   //   if(result){
//   //       // make compare
//   //       // //  bcrypt.compare(password, result[0].password, function(err, data) {
//   //         if (data) {
//   //       //     var userId = result[0].id
//   //       //     var user = result[0]
//   //       //     var username=result[0].username
//   //       //     console.log('User info-->',username)
//   //   } else {
//   //     res.send('0');
//   //   }
//   // })

// }


app.get('/*', (req, res) => {
  res.status(404).send('');
 });

//connection for everything except for Brain
app.listen(3000, function() {
  console.log("listening on port 3000!");
});
