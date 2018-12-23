const brain = require('brain.js');
var network = new brain.NeuralNetwork();

network.train([
    {input: { r: 0, g: 0, b: 0 }, output: { light: 1 }},
    {input: { r: 0.03, g: 0.7, b: 0.5 }, output: { dark: 1 }},
    {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { light: 1 }},
    {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { light: 1 }},
    {input: { r: 1, g: 1, b: 1 }, output: { dark: 1 }},
]);
let output = network.run({ r: 0.5, g: 0, b: 0 }); // { white: 0.81, dark: 0.18 }

module.exports.output = output;