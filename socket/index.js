const { Server } = require("socket.io");

const io = new Server(3800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let socketUsers = [];

const addSocketUser = (userId, socketId) => {
  !socketUsers.some((user) => user.userId === userId) &&
    socketUsers.push({ userId, socketId });
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
    // console.log(socketUsers);
    addSocketUser(userId, socket.id);
    io.emit("getUsers", socketUsers);
  });

  // Send Message
  socket.on("sendMessage", ({ userId, receiverId, text }) => {
    // console.log(userId, receiverId, text);
    let usersk = getSocketUser(receiverId);

    console.log(usersk);

    io.to(usersk?.socketId).emit("getMessage", {
      userId,
      text,
    });
  });

  // remove a user when they disconnect
  socket.on("disconnect", () => {
    console.log(" a user disconnected");
    removeSocketUser(socket.id);
    io.emit("getUsers", socketUsers);
  });
});
