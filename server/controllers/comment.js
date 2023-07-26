const db = require("../config/connect");
const moment = require("moment");

const getComments = (req, res) => {
  const { id } = req.user;
  if (!id) res.sendStatus(401);
  const q =
    "SELECT comments.*,users.id as user_id,sex,username,profile_picture FROM comments JOIN users ON (users.id = comments.user_id) WHERE comments.post_id = ? ORDER BY comments.created_at DESC";

  db.query(q, [req.query.post_id], (err, data) => {
    if (err) return res.status(500).json(err);

    res.status(200).json(data);
  });
};

const postComment = (req, res) => {
  const { id } = req.user;

  if (!id) {
    return res.status(401).send("Not logged in");
  }

  const q =
    "INSERT INTO comments(description,user_id,post_id,created_at) VALUES (?)";

  const values = [
    req.body.description,
    id,
    req.body.post_id,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  ];

  db.query(q, [values], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).send("comment has been created");
  });
};

const delComment = (req, res) => {
  const { id } = req.user;

  if (!id) return res.sendStatus(401);

  const q = "DELETE FROM comments WHERE user_id =? AND comments.id =?";

  db.query(q, [id, req.query.comment_id], (err) => {
    if (err) return res.status(500).send(err);

    res.sendStatus(200);
  });
};

module.exports = { getComments, postComment, delComment };
