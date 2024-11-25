const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("api", (req, res) => {
  res.json({ message: "Hello World" });
});

const users = [];

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} New client connected`);
  socket.on("message", (data) => {
    socketIO.emit("response", data);
  });

  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit("responseNewUser", users);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} Client disconnected`);
  });
});
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
