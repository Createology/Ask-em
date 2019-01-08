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



app.post("/smart/answer/think", async (req, res) => {
	var surveyID = req.body['surveyID'];
	const data = require(`./smartData/surveyID${surveyID}_Dummy.json`)

	function reform(data) {
		return data.map(item => {
			return {
				input: Object.values(item).slice(1).toString(),
				output: item["0"]
			}
		})
	}
	const trainingData = reform(data);

	let trainedNet;

	function fixLengths(data) {
		console.log('================ in fix ==================')
		let maxLengthInput = -1;
		for (let i = 0; i < data.length; i++) {
			if (data.length > maxLengthInput) {
				maxLengthInput = data.length;
			}
		}

		for (let i = 0; i < data.length; i++) {
			while (data.length < maxLengthInput) {
				data = data + 0;
				console.log('changed', data)
			}
		}

		return Number(data);
	}

	async function encode(arg) {
		var encoded = arg.split('').map(x => {
			var item = x.charCodeAt(0) / 255;
			return fixLengths(String(item))
		});
		return encoded;
	}

	function processTrainingData(data) {
		return data.map(d => {
			return {
				input: encode(d.input),
				output: d.output
			}
		})
	}

	function train(data) {
		let net = new brain.NeuralNetwork();
		var x = processTrainingData(data);
		console.log('finaldata', x)
		net.train(x, {
			iterations: 1500,
			log: true
		});
		trainedNet = net.toFunction();
		console.log('Finished training...');
	};

	function execute(input) {
		let results = trainedNet(encode(input));
		let output;
		console.log('results', results)
		results.yes > results.no ? output = 'yes' : output = 'no';
		return output;
	}

	train(trainingData);
	var smartAnswer = execute("Whether we are Republican or Democrat, we must now focus on strengthening Background Checks!");

	var input = req.body.input;
	
	try { // if this is NOT the first time brain Thinks
		// bring all the thinking data
		var array = require(`./smartData/surveyID${surveyID}_Answers.json`);

		if (array.length === 0) { // with dummy
			if (smartAnswer == "yes" || smartAnswer === "no") {
				input['0'] =  {[smartAnswer]: 1} 
				data.push(input);
				var array = data;
				fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(array, null, '  '));
				console.log('run answer =============', smartAnswer)
			} else {
				fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(data, null, '  '));
			}
		} else {
			if (smartAnswer == "yes" || smartAnswer === "no") {
				input['0'] =  {[smartAnswer]: 1} 
				data.push(input);
				var array = data;
				fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(array, null, '  '));
			} else {
				fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(array, null, '  '));
			}
		}
	} catch { // if this is the first time brain Thinks
		if (smartAnswer == "yes" || smartAnswer === "no") {
			// make a file of thinking data
			fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify([], null, '  '));
			var array = require(`./smartData/surveyID${surveyID}_Answers.json`);
			input['0'] =  {[smartAnswer]: 1} 
			data.push(input)
			array = data
			fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(array, null, '  '));
		} else {
			console.log('invalid answer')
			fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify([], null, '  '));
		}
	}
	res.sendStatus(200)
});





// think about new smart answer
app.post("/smart/answer/thinks", async (req, res) => {
	surveyID = req.body.surveyID;

	data = require(`./smartData/surveyID${surveyID}_Dummy.json`)
	function reform(data) {
		var trainingData = data.map(item => {
			var isa = item["0"]
			for (var key in isa) {
				key = String(key)
			}
			return {
				input: String(item["39"]),
				output: item["0"]
			}
		})
		fs.writeFileSync(`./smartData/reform.json`, JSON.stringify(trainingData, null, '  '));
		return trainingData;
	}
	var trainingData = reform(data)
	let trainedNet;
	console.log('traingindata=================', typeof trainingData[0].output.isa)


	function encode(arg) {
		return arg.split('').map(x => (x.charCodeAt(0) / 255));
	}

	function processTrainingData(data) {
		var x = data.map(d => {
			console.log('d', d)
			return {
				input: encode(d.input),
				output: d.output
			}
		})

		return x
	}

	function train(data) {
		let net = new brain.NeuralNetwork();
		var x = processTrainingData(data)
		console.log('before train', x)
		//fs.writeFileSync(`./smartData/TDE.json`, JSON.stringify(x, null, '  '));
		net.train(fixLengths(x));

		function fixLengths(data) {
			let maxLengthInput = -1;
			for (let i = 0; i < data.length; i++) {
				if (data[i].input.length > maxLengthInput) {
					maxLengthInput = data[i].input.length;
				}
			}

			for (let i = 0; i < data.length; i++) {
				while (data[i].input.length < maxLengthInput) {
					data[i].input.push(0);
				}
			}

			return data;
		}

		console.log('after train')
		trainedNet = net.toFunction();
		console.log('Finished training...');
	};

	function execute(input) {
		var x = encode(String(input))
		console.log('encode=======================', x)
		let results = trainedNet(x);
		let output;
		results.trump > results.kardashian ? output = 'Trump' : output = 'Kardashian';
		return output;
	}

	await train(trainingData)
	console.log(execute("These aren't real. Kanye would never write Yeezy on the side"))


















	if (data) {
		function encode(arg) {
			return arg.split('').map(x => (x.charCodeAt(0) / 255));
		}

		function processTrainingData(items) {
			//console.log('items', items)
			return items.map(item => {
				console.log('item', item)
				return {
					input: encode(item.input),
					output: item.output
				}
			})
		}
		// make up data for training
		var trainingData = processTrainingData(data.map(item => {
			return {
				input: Object.values(item).slice(1).join(""),
				output: item['0']

			}
		}))

		console.log('trainingData', trainingData)
		fs.writeFileSync(`./smartData/TDME.json`, JSON.stringify(trainingData, null, '  '));
		// train data with some options
		network.train(trainingData, {
			iterations: 500, // if you increase time of brain will increase, and accuracy will increase
			//errorThresh: 0.005,   // the acceptable error percentage from training data --> number between 0 and 1
			activation: 'relu', // to read bigger numbers than 1
			log: true
		});

		trainedNet = network.toFunction();

		// make up new data input	where req.body.input is an object, 
		// key is questionID and value is smartAnswer	
		var input = req.body.input;

		// editedInput is an array of only input values
		var editedInput = (Object.values(input).join(""))
		console.log('editedInput', editedInput)

		// THINK
		var x = encode(editedInput)
		console.log('x', x)
		const smartAnswer = await network.run(x)
		console.log('smartAnswer', trainedNet(x))
		//const smartAnswer = await network.run(x)//[('Khalda').replace(/\s/g, ""), 5])


		try { // if this is NOT the first time brain Thinks
			// bring all the thinking data
			var array = require(`./smartData/surveyID${surveyID}_Answers.json`);
			if (smartAnswer == "0.34901960784313724") {
				input['0'] = 'Yes';
			}
			if (smartAnswer === "0.3058823529411765") {
				input['0'] = 'No';
			}

			if (array.length === 0) { // with dummy
				if (smartAnswer == "0.34901960784313724" || smartAnswer === "0.3058823529411765") {
					data.push(input)
					array = data
					fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(array, null, '  '));
					console.log('run answer =============', smartAnswer)
				} else {
					fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(data, null, '  '));
				}
			} else {
				if (smartAnswer == "0.34901960784313724" || smartAnswer === "0.3058823529411765") {
					array.push(input)
					fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(array, null, '  '));
					console.log('run answer =============', smartAnswer)
				} else {
					console.log('invalid answer')
					fs.writeFileSync(`./smartData/surveyID${surveyID}_Answers.json`, JSON.stringify(array, null, '  '));
				}
			}
		} catch { // if this is the first time brain Thinks
			if (smartAnswer == "0.34901960784313724" || smartAnswer === "0.3058823529411765") {
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
