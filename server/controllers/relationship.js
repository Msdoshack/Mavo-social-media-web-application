const db = require("../config/connect");

const followers = (req, res) => {
  const { id } = req.user;

  if (!id) return res.sendStatus(401);

  const q =
    "SELECT follower_user_id FROM relationships WHERE followed_user_id =?";

  db.query(q, req.query.followed_user_id, (err, data) => {
    if (err) return res.status(500).json(err);

    return res
      .status(200)
      .json(data.map((relationship) => relationship.follower_user_id));
  });
};

const follow = (req, res) => {
  const { id } = req.user;

  if (!id) return res.sendStatus(401);

  const q =
    "INSERT INTO relationships(follower_user_id,followed_user_id) VALUES(?)";

  const values = [id, req.body.user_id];

  db.query(q, [values], (err) => {
    if (err) return res.status(500).json(err);

    return res.status(200);
  });
};

const unFollow = (req, res) => {
  const { id } = req.user;

  if (!id) return res.sendStatus(401);

  const q =
    "DELETE FROM relationships WHERE follower_user_id =? AND followed_user_id =?";

  db.query(q, [id, req.query.user_id], (err, data) => {
    if (err) return res.json(err);

    return res.status(200);
  });
};

module.exports = { followers, follow, unFollow };
