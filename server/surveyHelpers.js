const DB = require("../database/index");

const saveSurvey = (req, res) => {
  const { surveyName, surveyDescription, surveyCategory } = req.body;
  DB.insertSurvey(
    surveyName,
    surveyDescription,
    surveyCategory,
    (err, result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Error saving survey!");
      }
    }
  );
};

getAllSurveysOfUser = (req, res) => {
  const { userID } = req.body;
  DB.selectAllSurveysOfUser(userID, (err, result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Error getting user surveys!");
    }
  });
};

getAllSurveys = (req, res) => {
  DB.selectAll("surveys", (err, result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Error getting all surveys!");
    }
  });
};

module.exports.saveSurvey = saveSurvey;
module.exports.getAllSurveys = getAllSurveys;
module.exports.getAllSurveysOfUser = getAllSurveysOfUser;
