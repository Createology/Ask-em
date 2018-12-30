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

const insertSurvey = (
  surveyName,
  surveyCategory,
  surveyDescription,
  callback
) => {
  callback(null, { success: "done inserting survey!" });
  dbconnection.query(
    `INSERT INTO SURVEYS(survey_name, category, description) VALUES(\"${surveyName}\",\"${surveyCategory}\",\"${surveyDescription}\")`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
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

// this is for statistics
const selectAllSurveyAnswers = (surveyID, callback) => {
  dbconnection.query(
    `select * from answers where id_surveys=\"${surveyID}\"`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};


const selectAllSurveySmartAnswers = (surveyID, callback) => {
  dbconnection.query(
    `select * from smartanswers where id_surveys=\"${surveyID}\"`,
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

const selectQuestionFromSurvey = (surveyID, questionID, callback) => {
  dbconnection.query(
    `SELECT ${questionID} FROM questions where id_surveys = ${surveyID}`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results)
      }
    }
  );
};

const insertSmartAnswer = (
  answer,
  id_questions,
  id_users,
  id_surveys,
  callback
) => {
  dbconnection.query(
    `INSERT INTO SMARTANSWERS(answer, id_questions, id_users, id_surveys) VALUES(\"${answer}\",\"${id_questions}\",\"${id_users}\",\"${id_surveys}\")`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const insertAnswer = (
  answer,
  id_questions,
  id_users,
  id_surveys,
  callback
) => {
  dbconnection.query(
    `INSERT INTO ANSWERS(answer, id_questions, id_users, id_surveys) VALUES(\"${answer}\",\"${id_questions}\",\"${id_users}\",\"${id_surveys}\")`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

module.exports.selectAll = selectAll;
module.exports.selectAllSurveysOfUser = selectAllSurveysOfUser;
module.exports.insertSurvey = insertSurvey;
module.exports.selectUser = selectUser;
module.exports.saveUser = saveUser;
module.exports.selectAllSurveyAnswers = selectAllSurveyAnswers;
module.exports.selectQuestionFromSurvey = selectQuestionFromSurvey;
module.exports.insertSmartAnswer = insertSmartAnswer;
module.exports.insertAnswer = insertAnswer;
module.exports.selectAllSurveySmartAnswers = selectAllSurveySmartAnswers;
