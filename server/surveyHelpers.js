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

const fillSmartAnswer = (req, res) => {
  console.log("===fillSmartAnswer===");
  if (req.body.answer) {
    const { answer, questionID, userID, surveyID} = req.body;
    console.log(result)
    DB.insertSmartAnswer(answer, questionID, userID, surveyID, (err, results) => {
      if (err) {res.sendStatus(404)} else {
        if (results.length > 0) {
          res.status(200).send(results)
        } else {
          res.status(401).send("no results")
        }
      }
    })
  } else {
    res.status(402).send("no answer")
  }
  res.sendStatus(500)
};

const fillAnswer = (req, res) => {
  console.log("===fillAnswer===");
  if (req.body.answer) {
    const { answer, questionID, userID, surveyID} = req.body;
    console.log(result)
    DB.insertAnswer(answer, questionID, userID, surveyID, (err, results) => {
      if (err) {res.sendStatus(404)} else {
        if (results.length > 0) {
          res.status(200).send(results)
        } else {
          res.status(401).send("no results")
        }
      }
    })
  } else {
    res.status(402).send("no answer")
  }
  res.sendStatus(500)
};

module.exports.saveSurvey = saveSurvey;
module.exports.getAllSurveys = getAllSurveys;
module.exports.getAllSurveysOfUser = getAllSurveysOfUser;
module.exports.fillSmartAnswer = fillSmartAnswer;
module.exports.fillAnswer = fillAnswer;