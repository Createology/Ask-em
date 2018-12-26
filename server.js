var express = require("express");
// var router = express.Router();
// const cors = require('cors');
var bodyParser = require("body-parser");
var brain = require("./server/brain.js");
var db = require("./database/index");

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/isa", function(req, res) {
  res.send({ dark: brain.output.dark });
});

app.post("/search", function(req, res) {
  console.log("search server", req.body);
  res.send({});
});

app.post("/surveys", function(req, res) {
  console.log("search server", req.body);
  res.send({});
});

app.post("/mysurveys", function(req, res) {
  console.log("search server", req.body);
  res.send({});
});

//NOTE: 0-->(Not save) 1-->(save correctly)
app.get("/user", function(req, res) {
  res.send({});
});

app.post("/signup", function(req, res) {
  var firstName = req.body.firstName;
  var midname = req.body.midname;
  var lastName = req.body.lastName;
  var age = req.body.age;
  var gender = req.body.gender;
  var country = req.body.country;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  bcrypt.hash(password, 12);

  bcrypt.hash(password, 12).then(function(hashedPassword) {
    console.log("hashed password", hashedPassword);
    var query = `insert into users values(null,\"${firstName}\",\"${midname}\",\"${lastName}\",\"${age}\",\"${gender}\",\"${country}\",\"${email}\",\"${username}\",\"${hashedPassword}\",null)`;
    db.dbConnection.query(query, function(err, result) {
      if (result) {
        res.send("1");
      } else {
        console.log(err);
        res.send("0");
      }
    });
  });
});

app.post("login",function(req,res){

  // var username = req.body.username;
  // var password = req.body.password;

  // var query = `select * from users where username=\"${username}\"`;
  // // 0 -> no username 
  // db.dbConnection.query(query,function(err,result){
  //   if(result){
  //       // make compare 
  //       // //  bcrypt.compare(password, result[0].password, function(err, data) {
  //         if (data) {
  //       //     var userId = result[0].id
  //       //     var user = result[0]
  //       //     var username=result[0].username
  //       //     console.log('User info-->',username)
  //   } else {
  //     res.send('0');
  //   }
  // })

});

//connection for everything except for Brain
app.listen(3000, function() {
  console.log("listening on port 3000!");
});
