const bcrypt = require("bcrypt-nodejs");
const DB = require("../database/index");

const authenticateUser = (req, res) => {
  console.log("===login===");
  const { username, password } = req.body;
  DB.selectUser(username, (err, result) => {
    if (result) {
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
      res.status(404).send("Invalid login");
    }
  });
};

module.exports = authenticateUser;
