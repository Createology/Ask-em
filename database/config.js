var mysql = require("mysql");

//Note: to insert tht the database credential
var dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  insecureAuth: true,
  database: "ask"
});

module.exports = dbConnection;
