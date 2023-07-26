const db = require("../config/connect");

const getCommentsLikes = (req, res) => {
  const q = "SELECT user_id FROM commentlikes WHERE comment_id =?";

  db.query(q, [req.query.comment_id], (err, data) => {
    if (err) return res.status(500).send(err);

    res.status(200).send(data.map((like) => like.user_id));
  });
};

const addCommentLikes = (req, res) => {
  const { id } = req.user;

  if (!id) return res.sendStatus(401);

  const q = "INSERT INTO commentlikes (user_id, comment_id ) VALUES(?) ";

  const values = [id, req.body.comment_id];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);

    res.status(200).send(data);
  });
};

const delCommentLikes = (req, res) => {
  const { id } = req.user;

  if (!id) return res.sendStatus(401);

  const q = "DELETE FROM commentlikes WHERE user_id = ? AND comment_id= ? ";

  db.query(q, [id, req.query.comment_id], (err) => {
    if (err) return res.status(500).json(err);

    res.sendStatus(200);
  });
};

module.exports = { getCommentsLikes, addCommentLikes, delCommentLikes };
