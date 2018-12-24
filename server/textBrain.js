const brain = require('brain.js');
const fs = require('fs');
const data = require('./data.json')

const network = new brain.recurrent.LSTM();

/*
const trainingData = data.map(item => (
    {input: { text: item.text, age: item.age }, output: { category: item.category }}
))
*/

const trainingData = data.map(item => (
    {input: item.text, output: item.category}
))

/*
network.train([
    {input: { r: 0, g: 0, b: 0 }, output: { light: 1 }},
    {input: { r: 0.03, g: 0.7, b: 0.5 }, output: { dark: 1 }},
    {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { light: 1 }},
    {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { light: 1 }},
    {input: { r: 1, g: 1, b: 1 }, output: { dark: 1 }},
], {
    errorThresh: 0.001,  // error threshold to reach
    iterations: 20000,   // maximum training iterations
    log: false,           // console.log() progress periodically
    logPeriod: 10,       // number of iterations between logging
    learningRate: 0.3,    // learning rate
    activation: 'relu'
  });
let output = network.run({ r: 0.5, g: 0, b: 0 }); // { white: 0.81, dark: 0.18 }
*/

network.train(trainingData, {
    iterations: 20000,
    activation: 'relu'
});

const run = network.toFunction();
// const textOutput = run({text: 'she is deleting code', age: 44});
const textOutput = run('she is deleting code');
fs.writeFileSync('./net.json', JSON.stringify(network.toJSON(), null, '  '));
//const textOutput = network.fromJSON(JSON.parse(fs.readFileSync('./net.json', 'utf8')));
console.log(textOutput)

module.exports.textOutput = textOutput;