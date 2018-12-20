var express = require('express');
// var router = express.Router();
// const cors = require('cors');

var app = express();
app.get('/isa', function(req, res){
    res.json({ "name": "I'm in server.js!" })
})

app.listen(3000, function () {
    console.log('listening on port 3000!');
});