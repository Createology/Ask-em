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
  dbconnection.query(
    `SELECT * FROM surveys where survey_name = "${surveyName}"`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
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
        console.log("insert erorr", err);
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
const selectAllQuestionsOfASurvey = (surveyID, callback) => {
  dbconnection.query(
    `SELECT * from 	questions WHERE id_surveys = ${surveyID}`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const selectAllSmartQuestionsOfASurvey = (surveyID, callback) => {
  dbconnection.query(
    `SELECT * from 	smartquestions WHERE id_surveys = ${surveyID}`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const selectAllAnsOfASurvey = (surveyID, callback) => {
  dbconnection.query(
    `SELECT * from 	answers WHERE id_surveys = ${surveyID}`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const selectAllSmartAnsOfASurvey = (surveyID, callback) => {
  dbconnection.query(
    `SELECT * from 	smart WHERE id_surveys = ${surveyID}`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const selectAllAnsOfQus = (questionID, callback) => {
  dbconnection.query(
    `SELECT * from answers WHERE id_questions = ${questionID}`,
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
  values,
  callback
) => {
  var sql = `INSERT INTO smart (smartanswer,Truth, id_smartquestions, id_users, id_surveys) VALUES ?`;
  var editedValues = values.map(answer => Object.values(answer));

  dbconnection.query(sql, [editedValues],
    (err, result) => {
      if (err) {
        console.log("err", err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const insertDummyAnswer = (
  dummyanswer,
  result,
  id_smartquestions,
  id_users,
  id_surveys,
  callback
) => {
  dbconnection.query(
    `INSERT INTO dummy (id, answer,result, id_smartquestions, id_users, id_surveys) VALUES(null, \"${dummyanswer}\",\"${result}\",\"${id_smartquestions}\",\"${id_users}\",\"${id_surveys}\")`,
    (err, result) => {
      if (err) {
        console.log("err", err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const insertAnswer = (answer, id_question, id_users, id_surveys, callback) => {
  console.log("insertAnswer");
  dbconnection.query(
    `INSERT INTO answers(id, answer, id_questions, id_users, id_surveys) VALUES (null, \"${answer}\",\"${id_question}\",\"${id_users}\",\"${id_surveys}\")`,
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
    `INSERT INTO questions (id, id_surveys, id_users, question, createdAt) VALUES (NULL, \"${
      values[0]
    }\", \"${values[1]}\", \"${values[2]}\", CURRENT_TIMESTAMP)`,
    (err, result) => {
      if (err) {
        console.log("db err", err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const insertSmartQuestion = (values, callback) => {
  dbconnection.query(
    `INSERT INTO smartquestions (id, id_surveys, id_users, question, createdAt) VALUES (NULL, \"${
      values[0]
    }\", \"${values[1]}\", \"${values[2]}\", CURRENT_TIMESTAMP)`,
    (err, result) => {
      if (err) {
        console.log("db err", err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

// 1 >> wich is active and 0 >> is not active
const selectAllActiveSurveysNotAnswerdByUser = (userID, callback) => {
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

const selectAllAnswerOfADummy = (surveyID, callback) => {
  dbconnection.query(
    `SELECT * from dummy where id_surveys = ${surveyID}`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const selectAnswerOfAResult = (id_suervey, callback) => {
  dbconnection.query(
    `SELECT * from result where id_suervey = ${id_suervey}`,
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

// const fillAnswerOfAResult = (id_suervey, answer, callback) => {
//   dbconnection.query(
//     `INSERT INTO result (id,id_suervey,answer,createdAt) VALUES (NULL, , , CURRENT_TIMESTAMP)`,
//     (err, results) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, results);
//       }
//     }
//   );
// };

const addAnswerOfAResult = (id_suervey, answer, callback) => {
  dbconnection.query(
    `INSERT INTO result (id, id_suervey, answer, createdAt) VALUES(null, \"${id_suervey}\",\"${answer}\",CURRENT_TIMESTAMP)`,
    (err, result) => {
      if (err) {
        console.log("err", err);
        callback(err, null);
      } else {
        callback(null, result);
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

const selectAllLastNames = (surveyID, callback) => {
  dbconnection.query(
    `SELECT lastname from users inner join surveys on users.id = surveys.id_users where users.id in (select id_users from answers where answers.id_surveys = ${surveyID})`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const selectAllGenders = (surveyID, callback) => {
  dbconnection.query(
    `SELECT gender from users inner join surveys on users.id = surveys.id_users where users.id in (select id_users from answers where answers.id_surveys = ${surveyID})`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const selectAllBirthdays = (surveyID, callback) => {
  dbconnection.query(
    `SELECT birthday from users inner join surveys on users.id = surveys.id_users where users.id in (select id_users from answers where answers.id_surveys = ${surveyID})`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

const selectAllChoicesOfQuestion = (questionID, callback) => {
  dbconnection.query(
    `SELECT choice from choices where id_qustions = ${questionID}`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

// const selectAllChoicesOfSurveyQuestions = (surveyID, callback) => {
//   dbconnection.query(
//     `select choice, questions.id from choices inner join questions on choices.id_qustions = questions.id and choices.id_suerveys = ${surveyID}`,
//     (err, result) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, result);
//       }
//     }
//   );
// };

module.exports.selectAll = selectAll;
module.exports.selectAllActiveSurveysNotAnswerdByUser = selectAllActiveSurveysNotAnswerdByUser;
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
module.exports.insertDummyAnswer = insertDummyAnswer;
module.exports.insertSmartQuestion = insertSmartQuestion;
module.exports.selectAllSmartQuestionsOfASurvey = selectAllSmartQuestionsOfASurvey;
module.exports.selectAllAnsOfASurvey = selectAllAnsOfASurvey;
module.exports.selectAllSmartAnsOfASurvey = selectAllSmartAnsOfASurvey;
module.exports.selectAllAnsOfQus = selectAllAnsOfQus;
module.exports.selectAllAnswerOfADummy = selectAllAnswerOfADummy;
module.exports.selectAllLastNames = selectAllLastNames;
module.exports.selectAllGenders = selectAllGenders;
module.exports.selectAllBirthdays = selectAllBirthdays;
module.exports.selectAllChoicesOfQuestion = selectAllChoicesOfQuestion;
// module.exports.selectAllChoicesOfSurveyQuestions = selectAllChoicesOfSurveyQuestions;
module.exports.selectAnswerOfAResult = selectAnswerOfAResult;
module.exports.addAnswerOfAResult = addAnswerOfAResult;
