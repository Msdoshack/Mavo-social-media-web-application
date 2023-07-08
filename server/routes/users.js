const express = require("express");
const router = express.Router();
const {
  getUser,
  /*   updateUserInfo, */
  getAllUsers,
  getSuggestedUser,
  myFollowers,
  iamFollowing,
} = require("../controllers/user");

const {
  updateCoverPicture,
  updateProfilePicture,
} = require("../controllers/updateProfile");

router.get("/find/:user_id", getUser);
router.get("/find", getAllUsers);
router.get("/followers", myFollowers);
router.get("/following", iamFollowing);
router.get("/suggestedUsers", getSuggestedUser);
router.patch("/profilePicture", updateProfilePicture);
router.patch("/coverPicture", updateCoverPicture);

module.exports = router;
