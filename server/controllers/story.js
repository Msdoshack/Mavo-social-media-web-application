const db = require("../config/connect");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");

const addStory = (req, res) => {
  const token = req.cookies.jwt;
  const user = req.user;

  if (!user) return res.sendStatus(403);

  q = "INSERT INTO stories (image, user_id, user_name) VALUES(?)";
  const values = [req.body.image, user, data.username];

  db.query(q, [values], (err, data) => {
    if (err) return console.log(err);

    res.json(data);
  });
};

const getStories = (req, res) => {
  const user = req.user;

  if (!user) return res.sendStatus(403);

  q =
    "SELECT stories.*, users.id as user_id,sex, profile_picture,username FROM stories JOIN users ON (users.id = stories.user_id) LEFT JOIN relationships ON(stories.user_id = relationships.followed_user_id ) WHERE relationships.follower_user_id = ? OR stories.user_id=? GROUP BY stories.user_id ORDER BY stories.created_at ASC";

  db.query(q, [user, user], (err, data) => {
    if (err) return res.status(500).send(err);

    res.json(data);
  });
};
const getSingleStory = (req, res) => {
  const user = req.user;

  if (!user) return res.sendStatus(403);

  q =
    "SELECT stories.*, users.id as user_id,sex, profile_picture,username FROM stories JOIN users ON (users.id = stories.user_id) WHERE stories.user_id=?";

  db.query(q, [req.params.user_id], (err, data) => {
    if (err) return res.status(500).send(err);

    res.status(200).json(data);
  });
};

const delStory = (req, res) => {
  const user = req.user;

  if (!user) return res.sendStatus(403);

  const q1 = "Select * FROM stories WHERE user_id=? AND id=?";

  db.query(q1, [user, req.query.story_id], async (err, info) => {
    if (err) return res.status(500).send(err);
    try {
      if (
        fsSync.existsSync(
          path.join(
            __dirname,
            "..",
            "..",
            "client",
            "public",
            "upload",
            `${info[0].image}`
          )
        )
      ) {
        await fs.unlink(
          path.join(
            __dirname,
            "..",
            "..",
            "client",
            "public",
            "upload",
            `${info[0].image}`
          )
        );
      }

      const q = "DELETE FROM stories WHERE user_id=? AND id=?";
      db.query(q, [user, req.query.story_id], (err) => {
        if (err) return res.status(500).send(err);

        res.sendStatus(200);
      });
    } catch (err) {
      throw new Error(err);
    }
  });
};
module.exports = { addStory, getStories, delStory, getSingleStory };
