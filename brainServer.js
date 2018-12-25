var express = require('express');
// var router = express.Router();
// const cors = require('cors');
var textBrain = require('./server/textBrain.js');
var data = require('./server/data.json')

var app = express();

// data.push({
//     "text": "issa",
//     "category": "try"
// })

// fs.writeFileSync('./net.json', JSON.stringify(network.toJSON(), null, '  '));
// const textOutput = network.fromJSON(JSON.parse(fs.readFileSync('./net.json', 'utf8')));
console.log('data', data)
console.log('run answer =============', textBrain.run( [('RAM').replace(/\s/g, ""), 64, "Issa"] ))


app.listen(4000, function () {
    console.log('listening on port 4000!');
});