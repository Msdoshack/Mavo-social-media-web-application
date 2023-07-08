const express = require("express");
const router = express.Router();

const {
  addStory,
  getStories,
  delStory,
  getSingleStory,
} = require("../controllers/story");

router.route("/").get(getStories).post(addStory).delete(delStory);
router.get("/:user_id", getSingleStory);

module.exports = router;
