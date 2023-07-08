const jwt = require("jsonwebtoken");
const db = require("../config/connect");

const newMessage = (req, res) => {
  const token = req.cookies.jwt;

  if (!token) return res.sendStatus(401);

  jwt.verify(token, "secret", (err, data) => {
    if (err) return res.sendStatus(404);

    try {
      const q =
        "INSERT INTO messages (conversation_id, sender_id, content) values(?,?,?) ";

      const { message } = req.body;

      db.query(
        q,
        [req.params.conversation_id, data.id, message],
        (err, data) => {
          if (err) return res.status(500).send(err);

          res.send(data);
        }
      );
    } catch (err) {
      res.send(err);
    }
  });
};

const getMessages = (req, res) => {
  const token = req.cookies.jwt;

  if (!token) return res.sendStatus(401);

  jwt.verify(token, "secret", (err, data) => {
    if (err) return res.status(404).send(err);

    try {
      const q =
        "SELECT messages.id, messages.content, messages.created_at,users.profile_picture,users.id AS sender_id, users.username AS sender_username FROM messages INNER JOIN users ON messages.sender_id = users.id WHERE messages.conversation_id = ? ORDER BY messages.created_at ASC ";

      db.query(q, [req.params.conversation_id], (err, data) => {
        if (err) return res.status(500).send(err);

        res.send(data);
      });
    } catch (err) {
      res.send(err);
    }
  });
};

const newCoversation = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "secret", async (err, user) => {
    if (err) return res.sendStatus(404);
    try {
      const { conversation_name, participants } = req.body;
      const q1 = "INSERT INTO conversations (name) VALUES (?)";

      db.query(q1, [conversation_name], (err, data) => {
        if (err) return res.status(500).send(err);
        const conversationId = data.insertId;
        q2 =
          "INSERT INTO conversation_participants(conversation_id, user_id) VALUES ?";

        const values = participants.map((user_id) => [conversationId, user_id]);
        console.log(participants.map((user_id) => user_id));

        db.query(q2, [values], (err, result) => {
          if (err) return res.status(500).send(err);

          const q3 =
            "INSERT INTO messages (conversation_id, sender_id, content) values(?,?,?)";

          db.query(
            q3,
            [conversationId, user.id, req.body.message],
            (err, data) => {
              if (err) return res.status(500).send(err);

              res.send(data);
            }
          );
        });
      });
    } catch (err) {
      return res.send(err);
    }
  });
};

const getInbox = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "secret", async (err, user) => {
    if (err) return res.sendStatus(404);
    try {
      const q =
        "SELECT conversations.id AS conversation_id, conversations.name AS conversation_name,users.profile_picture,users.username AS other_participant,users.id AS receiver_id,messages.content AS last_message_content,messages.created_at AS last_message_timestamp FROM conversations JOIN conversation_participants ON conversations.id = conversation_participants.conversation_id JOIN users ON conversation_participants.user_id = users.id AND users.id !=? LEFT JOIN messages ON conversations.id = messages.conversation_id AND messages.created_at = (SELECT MAX(created_at) FROM  messages WHERE  messages.conversation_id = conversations.id)WHERE conversations.id IN (SELECT conversation_id FROM messages WHERE conversation_id IN ( SELECT conversation_id FROM  conversation_participants WHERE user_id =?)GROUP BY conversation_id HAVING COUNT(*) > 0 )ORDER BY last_message_timestamp DESC";

      db.query(q, [user.id, user.id], (err, data) => {
        if (err) return res.send(err);

        res.status(200).json(data);
      });
    } catch (err) {
      return res.send(err);
    }
  });
};

const getUserConversation = (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "secret", (err, user) => {
    if (err) return sendStatus(403);

    q =
      "SELECT conversations.id, conversations.name FROM CONVERSATIONS INNER JOIN CONVERSATION_PARTICIPANTS ON conversations.id = conversation_participants.conversation_id WHERE conversation_participants.user_id = ?";

    db.query(q, user.id, (err, data) => {
      if (err) return res.status(500).send(err);

      return res.send(data);
    });
  });
};

module.exports = {
  newCoversation,
  getMessages,
  newMessage,
  getInbox,
  getUserConversation,
};
