const express = require("express");
const router = express.Router();
const { followers, follow, unFollow } = require("../controllers/relationship");

router.get("/", followers);
router.post("/", follow);
router.delete("/", unFollow);

module.exports = router;
