const mysql = require("mysql");

//Note: to insert tht the database credential
const dbConnection = mysql.createConnection({
  host: "db4free.net",
  user: "user_askem77",
  password: "FXtc4xuW8MAJE5w",
  database: "askem_77"
});

module.exports = dbConnection;
