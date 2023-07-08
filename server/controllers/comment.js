const db = require("../config/connect");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const getComments = (req, res) => {
  const q =
    "SELECT comments.*,users.id as user_id,sex,username,profile_picture FROM comments JOIN users ON (users.id = comments.user_id) WHERE comments.post_id = ? ORDER BY comments.created_at DESC";

  db.query(q, [req.query.post_id], (err, data) => {
    if (err) return res.status(500).json(err);

    res.status(200).json(data);
  });
};

const postComment = (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send("Not logged in");
  }
  jwt.verify(token, "secret", (err, data) => {
    if (err) return res.sendStatus(403);

    const q =
      "INSERT INTO comments(description,user_id,post_id,created_at) VALUES (?)";

    const values = [
      req.body.description,
      data.id,
      req.body.post_id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        // console.log(err);
        return res.status(500).json(err);
      }

      res.status(201).send("comment has been created");
    });
  });
};

const delComment = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "secret", (err, data) => {
    if (err) return res.status(403).send(err);

    const q = "DELETE FROM comments WHERE user_id =? AND comments.id =?";

    db.query(q, [data.id, req.query.comment_id], (err) => {
      if (err) return res.status(500).send(err);

      res.sendStatus(200);
    });
  });
};

module.exports = { getComments, postComment, delComment };
