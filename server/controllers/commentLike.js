const jwt = require("jsonwebtoken");
const db = require("../config/connect");

const getCommentsLikes = (req, res) => {
  const q = "SELECT user_id FROM commentlikes WHERE comment_id =?";

  db.query(q, [req.query.comment_id], (err, data) => {
    if (err) return console.log(err);
    // console.log(data[0]);

    res.status(200).send(data.map((like) => like.user_id));
  });
};

const addCommentLikes = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, "secret", (err, data) => {
    if (err) return res.status(401).send(err);

    const q = "INSERT INTO commentlikes (user_id, comment_id ) VALUES(?) ";

    const values = [data.id, req.body.comment_id];

    db.query(q, [values], (err, data) => {
      if (err) return console.log(err);

      res.status(200).send(data);
    });
  });
};

const delCommentLikes = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, "secret", (err, data) => {
    if (err) return res.sendStatus(403);

    const q = "DELETE FROM commentlikes WHERE user_id = ? AND comment_id= ? ";

    db.query(q, [data.id, req.query.comment_id], (err, data) => {
      if (err) return res.status(500).send(err);

      res.sendStatus(200);
    });
  });
};

module.exports = { getCommentsLikes, addCommentLikes, delCommentLikes };
