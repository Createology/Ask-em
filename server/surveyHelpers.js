const db = require("../database/index");

const insertSurvey = (req, res) => {
  res.send({ status: "[----Success: Insert Survey!" });
  //   let surveyName = req.body.surveyName;
  //   let surveyDescription = req.body.surveyDescription;
  //   let surveyTargetAudience = req.body.surveyTargetAudience;

  //   let query = `INSERT INTO SURVEYS(name, category, description) VALUES(\"${surveyName}\",\"${surveyDescription}\",\"${surveyDescription}\")`;
  //   db.dbConnection.query(query, (err, result) => {
  //     if (result) {
  //       res.send({ status: "[----Success: Insert Survey!" });
  //     } else {
  //       console.log(err);
  //       res.send({ status: "[----Error: Insert Survey!" });
  //     }
  //   });
};

const selectAllSurveys = function(callback) {
  res.send({ status: "[----Success: Selected Surveys!" });
  //   db.dbConnection.query(`SELECT * FROM SURVEYS`, (err, results) => {
  //     if (err) {
  //       callback(err, null);
  //     } else {
  //       callback(null, results);
  //     }
  //   });
};

module.exports.selectAllSurveys = selectAllSurveys;
module.exports.insertSurvey = insertSurvey;
