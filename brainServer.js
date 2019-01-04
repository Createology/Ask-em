var express = require('express');
const fs = require('fs');
const brain = require('brain.js');
var data = require('./server/data.json')
var db = require('./database/index')
const bodyParser = require("body-parser");
//var data;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// nueral network declaration
const network = new brain.recurrent.LSTM();
var userID;
var surveyID;

// save answers from specific surveys into json file
app.post("/answers/smart/save", (req, res) => {
    // console.log("search brainServer", req.body.userID);
    console.log("search brainServer", req.body.surveyID);
    // userID = req.body.userID;
    surveyID = req.body.surveyID;
    db.selectAllUsersAnsweredSurveys(surveyID, (err, result) => {
        if (result) {
            console.log(result)
            var results = {}
            for (var i = 0; i < result.length; i++) {
                console.log('result[i]', result[i])
                results[result[i].id_users] = {}
            }
            for (var i = 0; i < result.length; i++) {
                console.log('result[i]', result[i])
                results[result[i].id_users][result[i].id_questions] = result[i].smartanswer
            }
            var array = [];
            for (var key in results) {
                array.push(results[key])
            }
            console.log("results", array)
            fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(array, null, '  '));
            res.sendStatus(200)
        } else {
            res.status(404).send("Invalid surveyID");
        }
    })
});

// read specific json file for specific survey
app.post("/data/read", (req, res) => {
    console.log("search brainServer", req.body.userID);
    userID = req.body.userID;
    data = require(`./smartData/questionID${userID}_Answers.json`)
    if (data) {
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
    
});

// make up data for training
var trainingData = data.map(item => (
    { input: [(item.text).replace(/\s/g, ""), item.age, (item.name).replace(/\s/g, "")], output: item.major }
))

// train data with some options
// network.train(trainingData, {
//     iterations: 1000, // if you increase time of brain will increase, and accuracy will increase
//     activation: 'relu' // to read bigger numbers than 1
// });

// FINAL SMART VALUE
// const smartAnswer = network.run( [('he').replace(/\s/g, ""), 70, "Issa"] )
// console.log('data', data)
// console.log('run answer =============', smartAnswer)

// get the smart value
app.get("/answer/smart/get", (req, res) => {
    console.log("search brainServer", req.body.surveyID);
    if (req.body.surveyID === surveyID)
    res.status(200).send(smartAnswer)
});


app.listen(4000, function () {
    console.log('listening on port 4000!');
});

// data.push({
//     "text": "issa",
//     "category": "try"
// })

// fs.writeFileSync('./net.json', JSON.stringify(network.toJSON(), null, '  '));
// const textOutput = network.fromJSON(JSON.parse(fs.readFileSync('./net.json', 'utf8')));