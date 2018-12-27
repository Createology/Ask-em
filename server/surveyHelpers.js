let DB = require("../database/index");

const saveSurvey = (req, res) => {
  let surveyName = req.body.surveyName;
  let surveyDescription = req.body.surveyDescription;
  let surveyCategory = req.body.surveyCategory;
  DB.insertSurvey(
    surveyName,
    surveyDescription,
    surveyCategory,
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(result);
      }
    }
  );
};

getAllSurveys = (req, res) => {
  let userID = req.userID;
  DB.selectAllSurveys(userID, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send(result);
    }
  });
};

module.exports.saveSurvey = saveSurvey;
module.exports.getAllSurveys = getAllSurveys;
