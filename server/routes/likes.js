const express = require("express");
const router = express.Router();
const { getLikes, addLike, delLike } = require("../controllers/like");

router.get("/", getLikes);
router.post("/", addLike);
router.delete("/", delLike);

module.exports = router;
