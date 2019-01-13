const DB = require("../database/index");

const feedback = (req, res) => {
  console.log("===feedback===");
  const { id_user,feedback, starCount } = req.body;

  console.log(id_user,feedback, starCount);

  DB.saveFeedback(id_user,feedback, starCount, (err, result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error");
    }
  });
};

module.exports = feedback;
