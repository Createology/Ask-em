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

const selectAllSurveysOfUser = (userID, callback) => {
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
          (err, results) => {
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

const selectUser = (username, callback) => {
  dbconnection.query(
    `select * from users where username=\"${username}\"`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const saveUser = (
  username,
  firstName,
  midname,
  lastName,
  age,
  gender,
  country,
  email,
  hashedPassword,
  callback
) => {
  dbconnection.query(
    `insert into users values(null,\"${username}\",\"${firstName}\",\"${midname}\",\"${lastName}\",\"${age}\",\"${gender}\",\"${country}\",\"${email}\",\"${hashedPassword}\",CURRENT_TIMESTAMP)`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};
// get all servery has been answerd from him;
const selectAllServeyHasBeenAnswerd = (userID, callback) => {
  dbconnection.query(
    `SELECT * FROM surveys where id IN (SELECT id_surveys FROM answers WHERE id_users = ${userID})`,
    (err, results) => {
      callback(null, results);
    }
  );
};

// select all answers for specfic serveys
const selectAllAnswersForSpecServey = (id_surveys, callback) => {
  dbconnection.query(
    `SELECT * from answers WHERE  id_surveys = ${id_surveys})`,
    (err, results) => {
      callback(null, results);
    }
  );
};
//select all answer for specfic user
const selectAllAnswersForSpecUser = (userID, callback) => {
  dbconnection.query(
    `SELECT * from answers WHERE id_surveys = ${userID})`,
    (err, results) => {
      callback(null, results);
    }
  );
};

//select all qus for specfic survey
const selectAllQustionForSpecServey = (id_surveys, callback) => {
  dbconnection.query(
    `SELECT * from 	questions WHERE id_surveys = ${id_surveys})`,
    (err, results) => {
      callback(null, results);
    }
  );
};

/*
get id from users table using email
get answers
*/

module.exports.selectAll = selectAll;
module.exports.selectAllSurveysOfUser = selectAllSurveysOfUser;
module.exports.insertSurvey = insertSurvey;
module.exports.selectUser = selectUser;
module.exports.saveUser = saveUser;
module.exports.selectAllAnswersForSpecServey = selectAllAnswersForSpecServey;
module.exports.selectAllAnswersForSpecUser = selectAllAnswersForSpecUser;
module.exports.selectAllServeyHasBeenAnswerd = selectAllServeyHasBeenAnswerd;
module.exports.selectAllQustionForSpecServey = selectAllQustionForSpecServey;