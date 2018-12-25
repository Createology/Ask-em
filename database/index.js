const mysql = require("mysql");
const dbconnection = require("./config.js");

const selectAll = function(tableName, callback) {
    dbconnection.query(`SELECT * FROM ${tableName}`, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;