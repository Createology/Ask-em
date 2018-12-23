var express = require('express');
// var router = express.Router();
// const cors = require('cors');
var textBrain = require('./server/textBrain.js');
var data = require('./server/data.json')

var app = express();

data.push({
    "text": "issa",
    "category": "try"
})
console.log('textBrain', textBrain)
console.log('data', data)

app.listen(4000, function () {
    console.log('listening on port 4000!');
});