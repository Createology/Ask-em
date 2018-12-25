var express = require('express');
// var router = express.Router();
// const cors = require('cors');
var bodyParser = require('body-parser')
var brain = require('./server/brain.js');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



app.get('/isa', function (req, res) {
    res.send({ dark: brain.output.dark})
})

app.post('/search', function (req, res) {
    console.log('search server', req.body)
    res.send({ dark: "hello"})
})

app.listen(3000, function () {
    console.log('listening on port 3000!');
});