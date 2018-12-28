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

getAllSurveysOfUser = (req, res) => {
  let userID = req.userID;
  DB.selectAllSurveysOfUser(userID, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send(result);
    }
  });
};

getAllSurveys = (req, res) => {
  DB.selectAll("surveys", (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send("----Error in: surveyHelpers- getAllSurveys");
    }
  });
};

module.exports.saveSurvey = saveSurvey;
module.exports.getAllSurveys = getAllSurveys;
module.exports.getAllSurveysOfUser = getAllSurveysOfUser;
