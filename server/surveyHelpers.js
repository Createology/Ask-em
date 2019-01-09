const DB = require("../database/index");

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
  DB.selectAllActiveSurveysNotAnswerdByUser(req.body.id, (err, result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting all surveys!");
    }
  });
};

getAllSurveysAnsweredByUser = (req, res) => {
  DB.selectAllSurveysAnsweredByUser(req.body.id, (err, results) => {
    if (err) throw err;
    res.status(200).send(results);
  });
};
//;-----------------------;/------------------]
//;-----------------------;/------------------]
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

const getAllSmartQuestionsOfASurvey = (req, res) => {
  const { surveyID } = req.body;
  DB.selectAllSmartQuestionsOfASurvey(surveyID, (err, result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting user surveys questions!");
    }
  });
};
//;-----------------------;/------------------]
//;-----------------------;/------------------]
const getAllAnswOfASurvey = (req, res) => {
  const { surveyID } = req.body;
  DB.selectAllAnsOfASurvey(surveyID, (err, result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting user surveys questions!");
    }
  });
};

const getAllSmartAnswOfASurvey = (req, res) => {
  const { surveyID } = req.body;
  DB.selectAllSmartAnsOfASurvey(surveyID, (err, result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting user surveys questions!");
    }
  });
};

const getAllDummyAnswer = (req, res) => {
  const { surveyID } = req.body;
  DB.selectAllAnswerOfADummy(surveyID, (err, result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting getAllDummyAnswer!");
    }
  });
};
//;-----------------------;/------------------]
//;-----------------------;/------------------]
const fillAnswer = (req, res) => {
  console.log("fillAnswer", req.body);
  const { answer, id_question, id_users, id_surveys } = req.body;
  if (answer) {
    DB.insertAnswer(
      answer,
      id_question,
      id_users,
      id_surveys,
      (err, results) => {
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
      }
    );
  } else {
    res.status(402).send("no answer");
  }
};
// INSERT INTO `smart` (`id`, `smartanswer`, `Truth`, `id_smartquestions`, `id_users`, `id_surveys`) VALUES (NULL, 'asd', '1', '6', '6', '22');
// modifaied
const fillSmartAnswer = (req, res) => {
  if (req.body) {
    const {
      smartanswer,
      Truth,
      id_smartquestions,
      id_users,
      id_surveys
    } = req.body;
    DB.insertSmartAnswer(
      smartanswer,
      Truth,
      id_smartquestions,
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
// modifaied
const fillDummyAnswer = (req, res) => {
  if (req.body) {
    const {
      dummyanswer,
      result,
      id_smartquestions,
      id_users,
      id_surveys
    } = req.body;
    DB.insertDummyAnswer(
      dummyanswer,
      result,
      id_smartquestions,
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
//;-----------------------;/------------------]
//;-----------------------;/------------------]
const fillQuestion = (req, res) => {
  if (req.body.question) {
    const { id_surveys, id_users, question } = req.body;
    DB.insertQuestion([id_surveys, id_users, question], (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      }
      if (results) {
        res.status(200).send(results);
      }
    });
  } else {
    res.status(402).send("no question");
  }
};
// modifa
const fillSmartQuestion = (req, res) => {
  if (req.body.question) {
    const { id_surveys, id_users, question } = req.body;
    DB.insertSmartQuestion([id_surveys, id_users, question], (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      }
      if (results) {
        res.status(200).send(results);
      }
    });
  } else {
    res.status(402).send("no question");
  }
};
//;-----------------------;/------------------]
//;-----------------------;/------------------]
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
        console.log("err");
        res.status(404).send("Error saving survey!");
      }
    }
  );
};
//;-----------------------;/------------------]
//;-----------------------;/------------------]
const getAllLastNames = (req, res) => {
  const { surveyID } = req.body;
  console.log(surveyID);
  DB.selectAllLastNames(surveyID, (err, result) => {
    if (result) {
      console.log("===selectLastNames===");
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting user survey lastnames!");
    }
  });
};

const getAllGenders = (req, res) => {
  const { surveyID } = req.body;
  DB.selectAllGenders(surveyID, (err, result) => {
    if (result) {
      console.log("===selectGenders===");
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting user survey lastnames!");
    }
  });
};

const getAllBirthdays = (req, res) => {
  const { surveyID } = req.body;
  DB.selectAllBirthdays(surveyID, (err, result) => {
    if (result) {
      console.log("===selectBirthdays===");
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting user survey lastnames!");
    }
  });
};

const getAllActiveSurveysNotAnswerdByUser = (req, res) => {
  const { id_users } = req.body;
  DB.selectAllActiveSurveysNotAnswerdByUser(id_users, (err, result) => {
    if (result) {
      console.log("===selectAllActiveSurveysNotAnswerdByUser===");
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting AllActiveSurveysNotAnswerdByUser!");
    }
  });
};

const getAllChoicesOfQuestion = (req, res) => {
  const { questionID } = req.body;
  DB.selectAllChoicesOfQuestion(questionID, (err, result) => {
    if (result) {
      console.log("=== getAllChoicesOfQuestion ===");
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting AllChoicesOfQuestion!");
    }
  });
};

// const getAllChoicesOfSurveyQuestions = (req, res) => {
//   const { surveyID } = req.body;
//   DB.selectAllChoicesOfSurveyQuestions(surveyID, (err, result) => {
//     if (result) {
//       console.log("=== getAllChoicesOfSurveyQuestions ===");
//       console.log(result);
//       res.status(200).send(result);
//     } else {
//       console.log(err);
//       res.status(404).send("Error getting AllChoicesOfSurveyQuestions!");
//     }
//   });
// };
//get surveys
module.exports.getAllSurveys = getAllSurveys;
module.exports.getAllSurveysOfUser = getAllSurveysOfUser;
module.exports.getAllSurveysAnsweredByUser = getAllSurveysAnsweredByUser;
module.exports.getAllActiveSurveysNotAnswerdByUser = getAllActiveSurveysNotAnswerdByUser;
// module.exports.getAllChoicesOfSurveyQuestions = getAllChoicesOfSurveyQuestions;

//get questions
module.exports.getAllQuestionsOfASurvey = getAllQuestionsOfASurvey;
module.exports.getAllSmartQuestionsOfASurvey = getAllSmartQuestionsOfASurvey;
module.exports.getAllChoicesOfQuestion = getAllChoicesOfQuestion;

//get answers
module.exports.getAllAnswOfASurvey = getAllAnswOfASurvey;
module.exports.getAllSmartAnswOfASurvey = getAllSmartAnswOfASurvey;
module.exports.getAllDummyAnswer = getAllDummyAnswer;
//;-----------------------;/------------------]

//fill answer
module.exports.fillAnswer = fillAnswer;
module.exports.fillDummyAnswer = fillDummyAnswer;
module.exports.fillSmartAnswer = fillSmartAnswer;

//fill question
module.exports.fillQuestion = fillQuestion;
module.exports.fillSmartQuestion = fillSmartQuestion;
//;-----------------------;/------------------]

//insert survey
module.exports.saveSurvey = saveSurvey;
//;-----------------------;/------------------]

//dumb statistics
module.exports.getAllLastNames = getAllLastNames;
module.exports.getAllGenders = getAllGenders;
module.exports.getAllBirthdays = getAllBirthdays;
