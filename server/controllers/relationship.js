const db = require("../config/connect");
const jwt = require("jsonwebtoken");

const followers = (req, res) => {
  const q =
    "SELECT follower_user_id FROM relationships WHERE followed_user_id =?";

  db.query(q, req.query.followed_user_id, (err, data) => {
    if (err) return res.status(401).json("not found");

    return res
      .status(200)
      .json(data.map((relationship) => relationship.follower_user_id));
  });
};
const follow = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, "secret", (err, data) => {
    if (err) return res.sendStatus(403);

    const q =
      "INSERT INTO relationships(follower_user_id,followed_user_id) VALUES(?)";

    const values = [data.id, req.body.user_id];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200);
    });
  });
};
const unFollow = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, "secret", (err, data) => {
    if (err) return res.sendStatus(403);

    const q =
      "DELETE FROM relationships WHERE follower_user_id =? AND followed_user_id =?";

    db.query(q, [data.id, req.query.user_id], (err, data) => {
      if (err) return res.json(err);

      return res.status(200);
    });
  });
};

module.exports = { followers, follow, unFollow };
