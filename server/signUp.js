const bcrypt = require("bcrypt-nodejs");
const DB = require("../database/index");

const createUser = (req, res) => {
  console.log("===signup===");
  const {
    firstName,
    midname,
    lastName,
    age,
    gender,
    country,
    email,
    username,
    password
  } = req.body;
  const hashedPassword = bcrypt.hashSync(req.body.password);

  console.log(
    firstName,
    midname,
    lastName,
    age,
    gender,
    country,
    email,
    username,
    hashedPassword
  );

  DB.saveUser(
    username,
    firstName,
    midname,
    lastName,
    age,
    gender,
    country,
    email,
    hashedPassword,
    (err, result) => {
      if (result) {
        res.status(200).send({ done: 1 });
      } else {
        console.log(err);
        res.status(404).send("");
      }
    }
  );
};

module.exports = createUser;

// bcrypt.hash(password, 12).then((hashedPassword) => {
//   console.log("hashed password", hashedPassword);
//   const query = `insert into users values(null,\"${firstName}\",\"${midname}\",\"${lastName}\",\"${age}\",\"${gender}\",\"${country}\",\"${email}\",\"${username}\",\"${hashedPassword}\",CURRENT_TIMESTAMP)`;
//   db.query(query, (err, result) => {
//     if (result) {
//       res.status(200).send("");
//     } else {
//       console.log(err);
//       res.status(404).send("");
//     }
//   });
// });
