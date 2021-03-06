const router = require("express").Router();
const auth = require("../auth");
let Comment = require("../models/comments");
let Post = require("../models/posts");
let User = require("../models/user");

// get all posts when users post page is displayed
router.get("/", auth, (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("error: " + err));
});
// allow user to add a post
router.route("/add/:id").post(auth, async (req, res) => {
  const { caption, image } = req.body;
  const { id } = req.params;
  const user = await User.findById(id);
  const newPost = new Post({
    caption,
    image,
    username: user.username
  });
  newPost
    .save()
    .then(() => res.json("Post Added"))
    .catch((err) => res.status(400).json(err));
});
//allow user to add a comment to post
router.route("/add-comment/:id/:userId").post(auth, async (req, res) => {
  const { id, userId } = req.params;
  const { content } = req.body;
  const user = await User.findById(userId);
  
  const newContent = new Comment({
    content,
    username: user.username
  });
  newContent.save().then(() => res.json("Comment Added"));
  Post.findByIdAndUpdate(
    { _id: id },
    { $push: { comments: newContent } },
    (err, data) => {
      if (err) res.status(400).json("error: " + err);
      else res.status(200).json(data);
    }
  );
});

// get a post by user
router.route("/:id").get(auth, (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) res.status(400).json("error: " + err);
    else res.status(200).json(post);
  });
});

// get all comments for a post
router.route("/comments/:id").get(auth, (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) res.status(400).json("error: " + err);
    else res.status(200).json(post.comments);
  });
});

// delete a post
router.delete("/deletepost/:id").get(auth, (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if(post.postedBy._id.toString() === req.user._id.toString()){
      post.remove()
      .then(result=>{
          res.json(result)
      }).catch(err=>{
          console.log(err)
      })
    }
  });
});

module.exports = router;