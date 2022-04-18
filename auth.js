// FILE :   auth.js
// DATE :   March 17th,2022
// Comment  :
//              manage  user, posts, and comments by authenticated users

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token === null) return res.sendStatus(401);

  // verify that the token sent back is Secret_token
  jwt.verify(token, "af7a02a65d9c7c90645399134760542a00188697c5f1f7995c3362921ba79580a82d9880a0153eb716a90b617a591bd24be0bbab3d78bd57d8a8f38005cf3ee7", (err, user) => {
    
    // if an error forbidden
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};