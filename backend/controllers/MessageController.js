const { Message, User } = require("../models");
const { Op } = require("sequelize");
class MessageController {
  async sendMessage(req, res) {
    try {
      const { senderId, receiverId, content } = req.body;
      const message = await Message.create({ senderId, receiverId, content });
      return res.status(201).json({ message: "Message sent", data: message });
    } catch (error) {
      return res.status(500).json({ message: "Failed to send message", error });
    }
  }

  async getMessages(req, res) {
    try {
      const { userId1, userId2 } = req.query;
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { senderId: userId1, receiverId: userId2 },
            { senderId: userId2, receiverId: userId1 },
          ],
        },
        order: [["createdAt", "ASC"]],
      });
      return res.json(messages);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch messages", error });
    }
  }
}

module.exports = new MessageController();
