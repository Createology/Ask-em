const DB = require("../database/index");

const saveSurvey = (req, res) => {
  const { id_users, survey_name, category, description, activated } = req.body;
  DB.insertSurvey(
    id_users,
    survey_name,
    category,
    description,
    activated,
    (err, result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        console.log('err')
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
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting all surveys!");
    }
  });
};

const fillSmartAnswer = (req, res) => {
  if (req.body) {

    const { smartanswer, id_question, id_users, id_surveys } = req.body;
    DB.insertSmartAnswer(
      smartanswer,
      id_question,
      id_users,
      id_surveys,
      (err, results) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.status(200).send(results);
        }
      }
    );
  } else {
    res.status(402).send("no answer");
  }
};

const fillSmartQuestion = (req, res) => {
  if (req.body.question) {
    const { id_surveys, id_users, question } = req.body;
    DB.insertQuestion(
      [id_surveys,
        id_users,
        question],
      (err, results) => {
        if (err) {
          console.log(err)
          res.sendStatus(404);
        }
        if (results) {
          res.status(200).send(results);
        }
      }
    );
  } else {
    res.status(402).send("no question");
  }
};

const fillAnswer = (req, res) => {
  const { answers } = req.body;
  if (answers) {
    DB.insertAnswer(answers, (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        if (results.affectedRows > 0) {
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
module.exports.fillSmartQuestion = fillSmartQuestion;