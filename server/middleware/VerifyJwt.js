const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie) return res.sendStatus(401);

  // const token = authHeader.split(" ")[1];

  jwt.verify(cookie.jwt, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);

    req.user = { id: decoded.id, username: decoded.username };

    next();
  });
};

module.exports = verifyJwt;
