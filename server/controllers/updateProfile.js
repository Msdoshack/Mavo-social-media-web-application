const db = require("../config/connect");
const jwt = require("jsonwebtoken");

const updateProfilePicture = (req, res) => {
  const token = req.cookies.jwt;
  const user = req.user;

  if (!user) return res.sendStatus(403);

  const q = "UPDATE users SET profile_picture=? WHERE id =?";

  db.query(q, [req.body.profile_picture, user], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("updated");
    return res.status(403).json("you can update only your post");
  });
};

const updateCoverPicture = (req, res) => {
  const token = req.cookies.jwt;
  const user = req.user;

  const q = "UPDATE users SET cover_picture=? WHERE id =?";

  db.query(q, [req.body.cover_picture, user], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("updated");
    return res.status(403).json("you can update only your post");
  });
};

const updateUserInfo = (req, res) => {
  const token = req.cookies.jwt;
  const user = req.user;

  if (!user) return res.status(403).json("not authenticated");

  const q =
    "UPDATE users SET username=?,country=?,city=?,website=?,cover_picture=?,profile_picture=? WHERE id =? ";

  const values = [
    req.body.name,
    req.body.country,
    req.body.city,
    req.body.website,
    user,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("updated");
    return res.status(403).json("you can update only your post");
  });
};

module.exports = {
  updateUserInfo,
  updateCoverPicture,
  updateProfilePicture,
};
