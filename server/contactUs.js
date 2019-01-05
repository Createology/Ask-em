const DB = require("../database/index");

const contactUs = (req, res) => {
  console.log("===contactUs===");
  const { id_user,username, phonenumber, survey_desc } = req.body;

  console.log(id_user,username, phonenumber, survey_desc);

  DB.saveContactUs(id_user,username, phonenumber, survey_desc, (err, result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(404).send("Error");
    }
  });
};

module.exports = contactUs;
