const db = require("../config/connect");
const moment = require("moment");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");

const createPost = (req, res) => {
  const { description, image } = req.body;
  if (!description && !image)
    return res.status(401).json("cant submit blank field");
  console.log(req.body);
  const user = req.user;

  if (!user) {
    return res.status(401).send("Not logged in");
  }

  const q =
    "INSERT INTO posts(description,image,user_id,created_at) VALUES (?)";

  const values = [
    req.body.description,
    req.body.image,
    user,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  ];

  db.query(q, [values], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).send("post have been created");
  });
};

const getPost = (req, res) => {
  const user = req.user;

  const user_id = parseInt(req.query.user_id);

  if (!user) {
    return res.status(401).send("you are not logged in");
  }

  const q = user_id
    ? "SELECT posts.*,users.id as user_id,username,sex,profile_picture FROM posts JOIN users ON (users.id = posts.user_id) WHERE posts.user_id= ?  ORDER BY posts.created_at DESC"
    : "SELECT posts.*,users.id as user_id,sex,username,profile_picture FROM posts JOIN users ON (users.id = posts.user_id) LEFT JOIN relationships ON(posts.user_id = relationships.followed_user_id ) WHERE relationships.follower_user_id =? OR posts.user_id= ? ORDER BY posts.created_at DESC";

  const values = user_id ? [user_id] : [user, user];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    res.status(200).json(data);
  });
};

const getSinglePost = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).send("you are not logged in");
  }

  console.log(req.params);
  const q =
    "Select posts.*, users.id as user_id ,username,sex, profile_picture from posts JOIN users ON(users.id =posts.user_id)  where posts.id = ?";
  db.query(q, req.params.userId, (err, data) => {
    if (err) return console.log(err);

    res.status(200).json(data);
  });
};

const deletePost = (req, res) => {
  const user = req.user;

  if (!user) return res.sendStatus(401);

  const q1 = "SELECT * FROM posts WHERE id = ? and user_id = ?";
  db.query(q1, [req.params.id, user /* data.id */], async (err, info) => {
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
        if (info[0]?.image) {
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
      }

      const q = "DELETE FROM posts WHERE id = ? and user_id = ?";

      db.query(q, [req.params.id, user /* data.id */], (err) => {
        if (err) return res.status(500).json(err);

        return res.sendStatus(200);
      });
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = { createPost, getPost, deletePost, getSinglePost };
