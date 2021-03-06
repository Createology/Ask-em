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
      res.status(404).send("Error getting survey smart answers!");
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
  if (req.body.surveyData) {
    DB.insertAnswer(req.body.surveyData, (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        res.status(200).send(results);
      }
    });
  } else {
    res.status(402).send("no answer");
  }
};
// INSERT INTO `smart` (`id`, `smartanswer`, `Truth`, `id_smartquestions`, `id_users`, `id_surveys`) VALUES (NULL, 'asd', '1', '6', '6', '22');
// modifaied
const fillSmartAnswer = (req, res) => {
  if (req.body) {
    DB.insertSmartAnswer(req.body, (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        res.status(200).send(results);
      }
    });
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
  console.log("surveyID: ", surveyID);
  DB.selectAllLastNames(surveyID, (err, result) => {
    if (result) {
      console.log("===selectLastNames===");
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting user survey lastnames!");
    }
  });
};

const getAllGenders = (req, res) => {
  const { surveyID } = req.body;
  console.log("surveyID: ", surveyID);
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
  console.log("surveyID: ", surveyID);
  DB.selectAllBirthdays(surveyID, (err, result) => {
    if (result) {
      console.log("===selectBirthdays===" + "\t Survey ID: " + surveyID);
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting user survey lastnames!");
    }
  });
};

const getAllEducationLevels = (req, res) => {
  const { surveyID } = req.body;
  console.log("surveyID: ", surveyID);
  DB.selectAllEducationLevels(surveyID, (err, result) => {
    if (result) {
      console.log("===selectAllEducationLevels===");
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting user survey education levels!");
    }
  });
};

const getAllMaritalStatuses = (req, res) => {
  const { surveyID } = req.body;
  console.log("surveyID: ", surveyID);
  DB.selectAllMaritalStatuses(surveyID, (err, result) => {
    if (result) {
      console.log("===selectAllMaritalStatuses===");
      console.log(result);
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error getting user survey marital statuses!");
    }
  });
};
//;-----------------------;/------------------]
//;-----------------------;/------------------]
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
getAnswerOfAResult = (req, res) => {
  console.log("enter ");
  const { id_suervey } = req.body;
  DB.selectAnswerOfAResult(id_suervey, (err, results) => {
    if (results) {
      res.status(200).send(results);
    } else {
      res.status(404).send("Error getting getAnswerOfAResult!");
    }
  });
};

addAnswerOfAResult = (req, res) => {
  const { id_suervey, answer } = req.body;
  DB.addAnswerOfAResult(id_suervey, answer, (err, results) => {
    if (results) {
      res.status(200).send(results);
    } else {
      res.status(404).send("Error getting addAnswerOfAResult!");
    }
  });
};

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
module.exports.getAllEducationLevels = getAllEducationLevels;
module.exports.getAllMaritalStatuses = getAllMaritalStatuses;

//;-----------------------;/------------------]
// brain result
module.exports.getAnswerOfAResult = getAnswerOfAResult;
module.exports.addAnswerOfAResult = addAnswerOfAResult;
