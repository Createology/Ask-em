const mysql = require("mysql");
const dbconnection = require("./config.js");

const selectAll = (tableName, callback) => {
  dbconnection.query(`SELECT * FROM ${tableName}`, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const selectAllSurveys = (userID, callback) => {
  dbconnection.query(
    `SELECT * FROM surveys where id_users = ${userID}`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const selectAllAnsweredSurveys = (userID, callback) => {
  dbconnection.query(
    `SELECT * FROM answers where id_users = ${userID}`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        dbconnection.query(
          `SELECT * FROM surveys where id = ${results.id_surveys}`,
          function(err, results) {
            callback(null, results);
          }
        );
      }
    }
  );
};

//enhance query to save for a specific user
const insertSurvey = (
  surveyName,
  surveyCategory,
  surveyDescription,
  callback
) => {
  callback(null, { success: "done inserting survey!" });
  // dbconnection.query(
  //   `INSERT INTO SURVEYS(survey_name, category, description) VALUES(\"${surveyName}\",\"${surveyCategory}\",\"${surveyDescription}\")`,
  //   (err, result) => {
  //     if (err) {
  //       callback(err, null);
  //     } else {
  //       callback(null, result);
  //     }
  //   }
  // );
};

/*
get id from users table using email
get answers
*/

module.exports.selectAll = selectAll;
module.exports.selectAllSurveys = selectAllSurveys;
module.exports.insertSurvey = insertSurvey;
