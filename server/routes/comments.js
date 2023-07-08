const express = require("express");
const router = express.Router();
const {
  getComments,
  postComment,
  delComment,
} = require("../controllers/comment");

router.get("/", getComments);
router.post("/", postComment);
router.delete("/", delComment);

module.exports = router;
