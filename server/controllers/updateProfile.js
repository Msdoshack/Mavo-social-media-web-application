const db = require("../config/connect");

const updateProfilePicture = (req, res) => {
  const { id } = req.user;

  if (!id) return res.sendStatus(401);

  const q = "UPDATE users SET profile_picture=? WHERE id =?";

  db.query(q, [req.body.profile_picture, id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("updated");
    return res.status(403).json("something went wrong");
  });
};

const updateCoverPicture = (req, res) => {
  const { id } = req.user;

  if (!id) return res.sendStatus(401);

  const q = "UPDATE users SET cover_picture=? WHERE id =?";

  db.query(q, [req.body.cover_picture, id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("updated");
    return res.status(403).json("you can update only your post");
  });
};

const updateUserInfo = (req, res) => {
  const { id } = req.user;

  if (!id) return res.sendStatus(401);

  const q =
    "UPDATE users SET username=?,country=?,city=?,website=?,cover_picture=?,profile_picture=? WHERE id =? ";

  const values = [
    req.body.name,
    req.body.country,
    req.body.city,
    req.body.website,
    id,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("updated");

    return res.status(403).json("something went wrong");
  });
};

module.exports = {
  updateUserInfo,
  updateCoverPicture,
  updateProfilePicture,
};
