// File :   posts.js
// Comment  :
//              model for posts created by user. Based on tutorial https://dev.to/tylerasa/learn-the-mern-stack-by-building-an-instagram-clone-part-one-188h


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  caption: {
    type: String
  },
  image: {
    type: String
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  username: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;