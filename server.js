var express = require('express');
// var router = express.Router();
// const cors = require('cors');
var brain = require('./server/brain.js');

var app = express();


app.get('/isa', function (req, res) {
    res.send({ dark: brain.output.dark})
})
console.log('brain', brain.output)

app.listen(3000, function () {
    console.log('listening on port 3000!');
});