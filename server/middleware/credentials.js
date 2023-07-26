const allowedOrign = require("../config/allowedOrign");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrign.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
module.exports = credentials;
