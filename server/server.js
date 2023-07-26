require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Expose-Headers", true);
//   next();
// });
// app.use(cors({ origin: "http://localhost:3000" }));

app.use(credentials);

app.use(cors(corsOptions));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const auth = require("./routes/auth");
const likes = require("./routes/likes");
const posts = require("./routes/posts");
const singlePost = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");
const relationships = require("./routes/relationships");
const stories = require("./routes/stories");
const CommentLikes = require("./routes/commentLikes");
const conversations = require("./routes/messenger");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const PORT = process.env.PORT || 3700;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", auth);

app.use("/api/refreshtoken", require("./routes/refreshtoken"));

app.use(require("./middleware/VerifyJwt"));

app.use("/api/likes", likes);
app.use("/api/posts", posts);
app.use("/api/post", singlePost);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/relationships", relationships);
app.use("/api/stories", stories);
app.use("/api/story", stories);
app.use("/api/commentlikes", CommentLikes);
app.use("/api/", conversations);

let socketUsers = [];

const addSocketUser = (userId, socketId) => {
  const existingUser = socketUsers.find((user) => user.userId === userId);
  if (!existingUser) {
    socketUsers.push({ userId, socketId });
  } else {
    // Update the socketId if the user already exists
    existingUser.socketId = socketId;
  }
};

const removeSocketUser = (socketId) => {
  socketUsers = socketUsers.filter((user) => user.socketId !== socketId);
};

const getSocketUser = (userId) => {
  return socketUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");

  // take socket id and user id when a user connect
  socket.on("addUser", (userId) => {
    addSocketUser(userId, socket.id);
    io.emit("getUsers", socketUsers);
  });

  // Send Message
  socket.on("sendMessage", ({ userId, receiverId, text }) => {
    const receiver = getSocketUser(receiverId);
    // const sender = getSocketUser(userId);

    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", {
        userId,
        text,
      });
    } else {
      console.log("Receiver not connected");
    }
  });

  // remove a user when they disconnect
  socket.on("disconnect", () => {
    console.log(" a user disconnected");
    removeSocketUser(socket.id);
    io.emit("getUsers", socketUsers);
  });
});

server.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
