const express = require("express");
const router = express.Router();

const {
  newCoversation,
  getMessages,
  newMessage,
  getInbox,
  getUserConversation,
} = require("../controllers/messenger");

router.post("/conversation/", newCoversation);
router.post("/message/:conversation_id", newMessage);
router.get("/conversation/", getUserConversation);
router.get("/message/:conversation_id", getMessages);
router.get("/inbox/", getInbox);

module.exports = router;
