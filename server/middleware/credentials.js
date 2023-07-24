const allowedOrign = require("../config/allowedOrign");

const credentials = (req, res, next) => {
  const origin = req.headers.origins;

  if (allowedOrign.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
    // res.header("Access-Control-Expose-Headers", true);
  }
  next();
};
module.exports = credentials;
