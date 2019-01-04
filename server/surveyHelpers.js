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
  const { id } = req.body;
  DB.selectAllSurveysOfUser(id, (err, result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Error getting user surveys!");
    }
  });
};

getAllSurveys = (req, res) => {
  DB.selectAllActiveSurveysNotAnswerd(req.body.id, (err, result) => {
    if (result) {
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting all surveys!");
    }
  });
};

const fillSmartAnswer = (req, res) => {
  if (req.body.answer) {
    const { answer, questionID, userID, surveyID } = req.body;
    DB.insertSmartAnswer(
      answer,
      questionID,
      userID,
      surveyID,
      (err, results) => {
        if (err) {
          res.sendStatus(404);
        } else {
          if (results.length > 0) {
            res.status(200).send(results);
          } else {
            res.status(401).send("no results");
          }
        }
      }
    );
  } else {
    res.status(402).send("no answer");
  }
  res.sendStatus(500);
};

const fillAnswer = (req, res) => {
  console.log("===saveAnswers===");
  const { answers } = req.body;
  if (answers) {
    DB.insertAnswer(answers, (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        if (results.affectedRows > 0) {
          console.log(results);
          res.status(200).send(results);
        } else {
          res.status(401).send("no results");
        }
      }
    });
  } else {
    res.status(402).send("no answer");
  }
};

const getAllQuestionsOfASurvey = (req, res) => {
  const { surveyID } = req.body;
  DB.selectAllQuestionsOfASurvey(surveyID, (err, result) => {
    if (result) {
      console.log("===selectQuestions===");
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting user surveys questions!");
    }
  });
};

getAllSurveysAnsweredByUser = (req, res) => {
  DB.selectAllSurveysAnsweredByUser(req.body.id, (err, results) => {
    if (err) throw err;
    res.status(200).send(results);
  });
};

module.exports.saveSurvey = saveSurvey;
module.exports.getAllSurveys = getAllSurveys;
module.exports.getAllSurveysOfUser = getAllSurveysOfUser;
module.exports.fillSmartAnswer = fillSmartAnswer;
module.exports.fillAnswer = fillAnswer;
module.exports.getAllQuestionsOfASurvey = getAllQuestionsOfASurvey;
module.exports.getAllSurveysAnsweredByUser = getAllSurveysAnsweredByUser;
