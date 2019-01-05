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

const selectSearchsurvey = (surveyName, callback) => {
  dbconnection.query(`SELECT * FROM surveys where survey_name = "${surveyName}"`, (err, results) => {
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
  id_users,
  survey_name,
  category,
  description,
  activated,
  callback
) => {
  dbconnection.query(
    `INSERT INTO surveys (id, id_users, survey_name, category, description, activated, createdAt) VALUES (null, \"${id_users}\", \"${survey_name}\", \"${category}\", \"${description}\", \"${activated}\", CURRENT_TIMESTAMP)`,
    (err, result) => {
      if (err) {
        console.log('insert erorr', err)
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

const selectAllUsersAnsweredSurveys = (id_surveys, callback) => {
  dbconnection.query(
    `select * from smart where id_surveys=\"${id_surveys}\"`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const selectAllUserSmartAnswers = (userID, callback) => {
  dbconnection.query(
    `select * from smart where id_users=\"${userID}\"`,
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

//all surveys answerd by a specific user;
const selectAllSurveysAnsweredByUser = (userID, callback) => {
  dbconnection.query(
    `SELECT * FROM surveys where id IN (SELECT id_surveys FROM answers WHERE id_users = ${userID})`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

// select all answers for a specfic survey
const selectAllAnswersOfASurvey = (id_surveys, callback) => {
  dbconnection.query(
    `SELECT * from answers WHERE  id_surveys = ${id_surveys})`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

//select all answers for a specfic user
const selectAllAnswersOfAUser = (userID, callback) => {
  dbconnection.query(
    `SELECT * from answers WHERE id_surveys = ${userID})`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

//select all questions for a specfic survey
const selectAllQuestionsOfASurvey = (id_surveys, callback) => {
  dbconnection.query(
    `SELECT * from 	questions WHERE id_surveys = ${id_surveys})`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
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
        callback(null, results);
      }
    }
  );
};

const insertSmartAnswer = (
  dummyanswer,
  id_question,
  id_users,
  id_surveys,
  callback
) => {
  dbconnection.query(
    `INSERT INTO dummy (id, answer, id_questions, id_users, id_surveys) VALUES(null, \"${dummyanswer}\",\"${id_question}\",\"${id_users}\",\"${id_surveys}\")`,
    (err, result) => {
      if (err) {
        console.log('err', err)
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const insertAnswer = (values, callback) => {
  dbconnection.query(
    `INSERT INTO answers(answer, id_questions, id_users, id_surveys) VALUES ?`,
    [values],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const insertQuestion = (values, callback) => {
  dbconnection.query(
    `INSERT INTO questions (id, id_surveys, id_users, question, createdAt) VALUES (NULL, \"${values[0]}\", \"${values[1]}\", \"${values[2]}\", CURRENT_TIMESTAMP)`,
    (err, result) => {
      if (err) {
        console.log('db err', err)
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

// 1 >> wich is active and 0 >> is not active
const selectAllActiveSurveysNotAnswerd = (userID, callback) => {
  dbconnection.query(
    `SELECT * from surveys where (id NOT IN (SELECT id_surveys from answers where id_users = ${userID}) AND activated = '1') ORDER BY createdAt DESC `,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};


const saveContactUs = (
  id_user,
  username, 
  phonenumber, 
  survey_desc,
  callback
) => {
  dbconnection.query(
    `insert into custmoers values(null,\"${id_user}\",\"${username}\",\"${phonenumber}\",\"${survey_desc}\",CURRENT_TIMESTAMP)`,
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
module.exports.selectAllActiveSurveysNotAnswerd = selectAllActiveSurveysNotAnswerd;
module.exports.selectAllSurveysOfUser = selectAllSurveysOfUser;
module.exports.insertSurvey = insertSurvey;
module.exports.selectUser = selectUser;
module.exports.saveUser = saveUser;
module.exports.selectAllSurveyAnswers = selectAllSurveyAnswers;
module.exports.selectQuestionFromSurvey = selectQuestionFromSurvey;
module.exports.insertSmartAnswer = insertSmartAnswer;
module.exports.insertAnswer = insertAnswer;
module.exports.selectAllUserSmartAnswers = selectAllUserSmartAnswers;
module.exports.selectAllAnswersOfASurvey = selectAllAnswersOfASurvey;
module.exports.selectAllAnswersOfAUser = selectAllAnswersOfAUser;
module.exports.selectAllSurveysAnsweredByUser = selectAllSurveysAnsweredByUser;
module.exports.selectAllQuestionsOfASurvey = selectAllQuestionsOfASurvey;
module.exports.selectSearchsurvey = selectSearchsurvey;
module.exports.selectAllUsersAnsweredSurveys = selectAllUsersAnsweredSurveys;
module.exports.saveContactUs = saveContactUs;
module.exports.insertQuestion = insertQuestion;
