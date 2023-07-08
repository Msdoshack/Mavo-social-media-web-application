const express = require("express");
const router = express.Router();
const {
  getCommentsLikes,
  addCommentLikes,
  delCommentLikes,
} = require("../controllers/commentLike");

router.get("/", getCommentsLikes);
router.post("/", addCommentLikes);
router.delete("/", delCommentLikes);

module.exports = router;
