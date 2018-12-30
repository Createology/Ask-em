const bcrypt = require("bcrypt-nodejs");
const DB = require("../database/index");

const authenticateUser = (req, res) => {
  console.log("===login===");
  if (req.body.username && req.body.password) {
    const { username, password } = req.body;
    DB.selectUser(username, (err, result) => {
      if (err) {
        res.status(404).send("Invalid login")
      } else {
        if (result.length > 0) {
          console.log(result)
          bcrypt.compare(password, result[0].password, (err, matchPassword) => {
            console.log("matchPassword", matchPassword);
            if (matchPassword) {
              const { userId, username, userEmail } = result[0];
              res.status(200).send({
                userId: userId,
                username: username,
                userEmail: userEmail
              });
            } else {
              res.status(404).send("username or password is wrong");
            }
          });
        } else {
          res.status(404).send("username is not valid")
        }
      }
    })
  } else {
    res.sendStatus(500)
  };
};

module.exports = authenticateUser;
