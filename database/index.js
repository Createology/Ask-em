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

const selectAllSurveys = function(userID, callback) {
  dbconnection.query(`SELECT * FROM surveys where id_users = ${userID}`, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const selectAllAnsweredSurveys = function(userID, callback) {
  dbconnection.query(`SELECT * FROM answers where id_users = ${userID}`, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      dbconnection.query(`SELECT * FROM surveys where id = ${results.id_surveys}`, function(err, results) {
        callback(null, results);
      })
    }
  })
};

module.exports.selectAll = selectAll;
module.exports.selectAllSurveys = selectAllSurveys;