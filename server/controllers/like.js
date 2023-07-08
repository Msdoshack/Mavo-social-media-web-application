const db = require("../config/connect");
const jwt = require("jsonwebtoken");

const getLikes = (req, res) => {
  const q = "SELECT user_id FROM likes WHERE post_id =? ";

  db.query(q, [req.query.post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    // console.log(data);
    return res.status(200).json(data.map((like) => like.user_id));
  });
};
const addLike = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(403).send("you are not logged in");
  }
  jwt.verify(token, "secret", (err, data) => {
    if (err) {
      res.status(500).json(err);
    }

    const q = " INSERT INTO likes(user_id,post_id) VALUES (?) ";

    const values = [data.id, req.body.post_id];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      // console.log(data);
      return res.sendStatus(200);
    });
  });
};
const delLike = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).json("you are not logged in");
  }

  jwt.verify(token, "secret", (err, data) => {
    if (err) return res.status(500).json(err);

    const q = "DELETE FROM likes WHERE user_id = ? AND post_id = ? ";

    // const values = [data.id, req.params.post_id];

    // console.log(data);
    db.query(q, [data.id, req.query.post_id], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      //   console.log(data.id);
      return res.sendStatus(200);
    });
  });
};

module.exports = { getLikes, addLike, delLike };
