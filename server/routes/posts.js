const express = require("express");
const router = express.Router();
const {
  createPost,
  getPost,
  deletePost,
  getSinglePost,
} = require("../controllers/post");

router.get("/", getPost);
router.get("/:userId", getSinglePost);
router.post("/", createPost);
router.delete("/:id", deletePost);

module.exports = router;
