//users.js
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require("../models/user");



// Function : generateAccessToken()
// Date     : March 17th,2022
// Comment  : This function generates an access token to user for 1 hour. 
function generateAccessToken(id, username) {
  return jwt.sign({ id, username }, "af7a02a65d9c7c90645399134760542a00188697c5f1f7995c3362921ba79580a82d9880a0153eb716a90b617a591bd24be0bbab3d78bd57d8a8f38005cf3ee7", {
    expiresIn: "3600s"
  });
}

// register route
// Comment  : Check that username and password filled out. If so procesed to saving signup data.

router.route("/register").post((req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res.status(400).json({ msg: "Please Fill All Fields" });
  }

  const newUser = new User({ username, password });
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      res.send({ message: "User Already Exist" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            const token = generateAccessToken(user.id, user.username);
            res.json({
              token,
              user
            });
          });
        });
      });
    }
  });
});

// login route
// Comment  : Check that username and password filled out. If so procesed to saving signup data.

router.route("/login").post((req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res.status(400).json({ msg: "Please Fill All Fields" });
  }
  User.findOne({ username: username.toLowerCase() }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid Credentials" });

        const token = generateAccessToken(user.id, user.username);

        res.json({
          token,
          user
        });
      });
    }
  });
});

module.exports = router;