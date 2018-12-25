const brain = require('brain.js');
const fs = require('fs');
const data = require('./data.json')

const network = new brain.recurrent.LSTM();

var trainingData = data.map(item => (
    {input: [(item.text).replace(/\s/g, ""), item.age], output: item.category}
))

network.train(trainingData, {
    iterations: 150,
    activation: 'relu'
});

const run = network.toFunction();
const textOutput = run( [('mouse').replace(/\s/g, ""), 50] );
// fs.writeFileSync('./net.json', JSON.stringify(network.toJSON(), null, '  '));
// const textOutput = network.fromJSON(JSON.parse(fs.readFileSync('./net.json', 'utf8')));

module.exports.textOutput = textOutput;