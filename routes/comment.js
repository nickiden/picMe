// File :   comment.js
// Comment  :
//              manage comments and get comments .

const router = require("express").Router();
const auth = require("../auth");
let Comment = require("../models/comments");

// get request to get comments 
//
router.route("/:id").get(auth, (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) res.status(400).json("error: " + err);
    else res.status(200).json(comment);
  });
});
module.exports = router;