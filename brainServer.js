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

// save answers from specific surveys into json file
app.post("/surveys/save", (req, res) => {
    console.log("search brainServer", req.body.surveyID);
    var surveyID = req.body.surveyID;
    db.selectAllSurveyAnswers(surveyID, (err, result) => {
        if (result) {
            console.log(result)
            fs.writeFileSync(`./smartData/surveyID_${surveyID}_Answers.json`, JSON.stringify(result, null, '  '));
            res.status(200).send({})
        } else {
            res.status(404).send("Invalid userID");
        }
    })
});

// read specific json file for specific survey
app.post("/data/read", (req, res) => {
    console.log("search brainServer", req.body.surveyID);
    var surveyID = req.body.surveyID;
    data = require(`./smartData/surveyID_${surveyID}_Answers.json`)
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
network.train(trainingData, {
    iterations: 1000, // if you increase time of brain will increase, and accuracy will increase
    activation: 'relu' // to read bigger numbers than 1
});

// FINAL SMART VALUE
const smartAnswer = network.run( [('RAM').replace(/\s/g, ""), 70, "Issa"] )
console.log('data', data)
console.log('run answer =============', smartAnswer)

// get the smart value
app.get("/smart/read", (req, res) => {
    console.log("search brainServer", req.body.surveyID);
    var surveyID = req.body.surveyID;
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