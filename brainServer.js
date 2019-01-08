var express = require('express');
const fs = require('fs');
const brain = require('brain.js');
//var data = require('./server/data.json')
var db = require('./database/index')
const bodyParser = require("body-parser");
var data;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// nueral network declaration
//const network = new brain.recurrent.LSTM();
let network = new brain.NeuralNetwork();

var userID;
var surveyID;

// save answers from specific surveys into json file
app.post("/answers/smart/create", (req, res) => {
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

/* try to add smart answer
{
	"surveyID": "7",
	"input": {
    "0": "Yes",
    "39": "Jandaweel",
    "40": "1",
    "41": "5",
    "42": "YES",
    "43": "suuuure I love KFC"
  }
}
*/
// think about new smart answer
app.post("/smart/answer/think", async (req, res) => {
	//req.body is an object of two keys (surveyID and input)
	surveyID = req.body.surveyID;

	data = require(`./smartData/surveyID${surveyID}_Dummy.json`)
	if (data) {
		// make up data for training
		var trainingData = data.map(item => (
			{
				input: Object.values(item).slice(1).join('').replace(/\s/g, "").toLowerCase(),
				output: item['0']
			}
		))

		console.log(trainingData)
		// train data with some options
		network.train(trainingData, {
			iterations: 2000, // if you increase time of brain will increase, and accuracy will increase
			//errorThresh: 0.005,   // the acceptable error percentage from training data --> number between 0 and 1
			activation: 'relu' // to read bigger numbers than 1
		});

		// make up new data input	where req.body.input is an object, 
		// key is questionID and value is smartAnswer	
		var input = req.body.input;
		// editedInput is an array of only input values
		var editedInput = Object.values(input).join('').replace(/\s/g, "").toLowerCase();

		// THINK
		const smartAnswer = await network.run(editedInput)//[('Khalda').replace(/\s/g, ""), 5])
 
		try { // if this is NOT the first time brain Thinks
			// bring all the thinking data
			var array = require(`./smartData/surveyID${surveyID}_Answers.json`);
			input['0'] = smartAnswer;
			if (array.length === 0) { // with dummy
				if (smartAnswer === "Yes" || smartAnswer === "No") {
					data.push(input)
					array = data
					fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(array, null, '  '));
					console.log('run answer =============', smartAnswer)
				} else {
					fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(data, null, '  '));
				}
			} else {
				if (smartAnswer === "Yes" || smartAnswer === "No") {
					array.push(input)
					fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(array, null, '  '));
					console.log('run answer =============', smartAnswer)
				} else {
					console.log('invalid answer')
					fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(array, null, '  '));
				}
			}
		} catch { // if this is the first time brain Thinks
			if (smartAnswer === "Yes" || smartAnswer === "No") {
				// make a file of thinking data
				fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify([], null, '  '));
				var array = require(`./smartData/surveyID${surveyID}_Answers.json`);
				input['0'] = smartAnswer;
				data.push(input)
				array = data
				fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(array, null, '  '));
				console.log('run answer =============', smartAnswer)
			} else {
				console.log('invalid answer')
				fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify([], null, '  '));
			}
		}
		res.status(200).send(smartAnswer)
	} else {
		res.sendStatus(404)
	}
});



// get the smart value
app.post("/answer/smart/get", async (req, res) => {
	surveyID = req.body.surveyID;

	data = require(`./smartData/surveyID${surveyID}_Answers.json`)
		// make up data for training
		var trainingData = data.map(item => (
			{
				input: Object.values(item).slice(1),
				output: item['0']
			}
		))

		// train data with some options
		network.train(trainingData, {
			iterations: 2000, // if you increase time of brain will increase, and accuracy will increase
			//errorThresh: 0.005,   // the acceptable error percentage from training data --> number between 0 and 1
			activation: 'relu' // to read bigger numbers than 1
		});

		// make up new data input	where req.body.input is an object, 
		// key is questionID and value is smartAnswer	
		var input = req.body.input;
		// editedInput is an array of only input values
		var editedInput = Object.values(input);

		// THINK
		const smartAnswer = await network.run(editedInput)
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
