// File :   user.js
// Comment  :
//              model for posts created by user. Based on tutorial https://dev.to/tylerasa/learn-the-mern-stack-by-building-an-instagram-clone-part-one-188h




const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trime: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    trime: true,
    minlength: 3
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;