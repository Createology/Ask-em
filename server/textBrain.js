// const brain = require('brain.js');
// const fs = require('fs');
// const data = require('./data.json')
// const brainServer = require("../brainServer");

// const network = new brain.recurrent.LSTM();

// var trainingData = data.map(item => (
//     { input: [(item.text).replace(/\s/g, ""), item.age, (item.name).replace(/\s/g, "")], output: item.major }
// ))

// network.train(trainingData, {
//     iterations: 150,
//     activation: 'relu'
// });

// const run = network.toFunction();

// module.exports.run = run;
