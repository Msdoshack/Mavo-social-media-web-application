const db = require("../config/connect");

const getLikes = (req, res) => {
  const q = "SELECT user_id FROM likes WHERE post_id =? ";

  db.query(q, [req.query.post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.user_id));
  });
};
const addLike = (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(403).send("you are not logged in");
  }

  const q = " INSERT INTO likes(user_id,post_id) VALUES (?) ";

  const values = [user, req.body.post_id];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.sendStatus(200);
  });
};

const delLike = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(403).json("you are not logged in");
  }

  if (err) return res.status(500).json(err);

  const q = "DELETE FROM likes WHERE user_id = ? AND post_id = ? ";

  db.query(q, [user, req.query.post_id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.sendStatus(200);
  });
};

module.exports = { getLikes, addLike, delLike };
