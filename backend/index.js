require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db");
const router = require("./routes/index");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { Message } = require("./models");

const PORT = process.env.PORT || 5000;

const app = express();

// Настройка CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Настройка middleware
app.use(express.json());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Создание HTTP сервера и подключение Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket.IO: обработка событий
io.on("connection", (socket) => {
  console.log("Пользователь подключен:", socket.id);

  // Присоединение к комнате
  socket.on("join_room", (userId) => {
    socket.join(userId);
    console.log(`Пользователь с ID ${userId} присоединился к комнате.`);
  });

  // Отправка сообщения
  socket.on("send_message", async (data) => {
    const { senderId, receiverId, content } = data;

    try {
      // Сохранить сообщение в базе данных
      const message = await Message.create({ senderId, receiverId, content });

      // Отправить сообщение отправителю
      socket.emit("receive_message", message);

      // Отправить сообщение получателю
      io.to(receiverId).emit("receive_message", message);
    } catch (error) {
      console.error("Ошибка при сохранении сообщения:", error);
    }
  });

  // Обработка отключения
  socket.on("disconnect", () => {
    console.log("Пользователь отключился:", socket.id);
  });
});

// Запуск сервера
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.error("Error starting server:", e);
  }
};

start();
