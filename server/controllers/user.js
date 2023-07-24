const db = require("../config/connect");

const getAllUsers = (req, res) => {
  const q = "SELECT id,sex,profile_picture FROM users";

  db.query(q, (err, data) => {
    if (err) return res.status(401).send(err);

    res.status(200).json(data);
  });
};

const getSuggestedUser = (req, res) => {
  const user = req.user;

  if (!user) return res.status(403).send("not authorized");

  const q = `select users.id, users.username,profile_picture,sex from users where users.id NOT IN(select relationships.followed_user_id from relationships where relationships.follower_user_id =?) and users.country = "Nigeria" and users.id != ?`;

  db.query(q, [user, user], (err, data) => {
    if (err) return res.status(500).send(err);

    res.status(200).send(data);
  });
};

const getUser = (req, res) => {
  const user_id = req.params.user_id;

  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, user_id, async (err, data) => {
    if (err) return res.status(401).send("user not found");
    try {
      const { password, ...info } = data[0];
      res.status(200).json(info);
    } catch (err) {
      res.send(err);
    }
  });
};

const iamFollowing = (req, res) => {
  const user = req.user;

  if (!user) return res.sendStatus(401);

  const q =
    "select users.id as user_id, relationships.id as id,username,bio,sex,profile_picture, follower_user_id from users left join relationships on(users.id = relationships.followed_user_id) where relationships.follower_user_id= ? ORDER BY relationships.created_at DESC ";

  db.query(q, req.query.id, (err, data) => {
    if (err) return res.status(500).send(err);

    res.status(200).send(data);
  });
};

const myFollowers = (req, res) => {
  const user = req.user;

  if (!user) return res.sendStatus(401);

  const q =
    "select users.id as user_id, relationships.id as id,username,sex,bio, profile_picture, followed_user_id from users left join relationships on(users.id = relationships.follower_user_id) where relationships.followed_user_id= ? ORDER BY relationships.created_at DESC";
  db.query(q, req.query.id, (err, data) => {
    if (err) return res.status(500).send(err);

    res.send(data);
  });
};

module.exports = {
  getUser,
  getAllUsers,
  getSuggestedUser,
  iamFollowing,
  myFollowers,
};
