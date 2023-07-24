const db = require("../config/connect");
const jwt = require("jsonwebtoken");

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const q = "SELECT * FROM users WHERE refreshtoken = ? ";

  db.query(q, refreshToken, (err, data) => {
    if (err) res.sendStatus(403);

    jwt.verify(refreshToken, "secret", (err, decoded) => {
      if (err || data[0].id !== decoded.id) return res.sendStatus(403);

      const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "10m",
        }
      );

      res.json(accessToken);
    });
  });
};

module.exports = handleRefreshToken;
