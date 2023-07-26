const db = require("../config/connect");

const getLikes = (req, res) => {
  const q = "SELECT user_id FROM likes WHERE post_id =? ";

  db.query(q, [req.query.post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.user_id));
  });
};

const addLike = (req, res) => {
  const { id } = req.user;

  if (!id) return res.sendStatus(401);

  const q = "INSERT INTO likes(user_id,post_id) VALUES (?) ";

  const values = [id, req.body.post_id];

  db.query(q, [values], (err) => {
    if (err) return res.status(500).json(err);
    return res.sendStatus(200);
  });
};

const delLike = (req, res) => {
  const { id } = req.user;

  if (!id) return res.sendStatus(401);

  const q = "DELETE FROM likes WHERE user_id = ? AND post_id = ? ";

  db.query(q, [id, req.query.post_id], (err) => {
    if (err) return res.status(500).json(err);

    return res.sendStatus(200);
  });
};

module.exports = { getLikes, addLike, delLike };
