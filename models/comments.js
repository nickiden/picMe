// File :   comments.js
// Comment  :
//              model for posts created by user. Based on tutorial https://dev.to/tylerasa/learn-the-mern-stack-by-building-an-instagram-clone-part-one-188h



const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;