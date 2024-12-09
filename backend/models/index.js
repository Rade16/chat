const sequelize = require("../db");
const { User } = require("./User");
const { Message } = require("./Message");

// Настройка связей
User.hasMany(Message, { foreignKey: "senderId", as: "SentMessages" });
User.hasMany(Message, { foreignKey: "receiverId", as: "ReceivedMessages" });
Message.belongsTo(User, { foreignKey: "senderId", as: "Sender" });
Message.belongsTo(User, { foreignKey: "receiverId", as: "Receiver" });

module.exports = {
  sequelize,
  User,
  Message,
};
