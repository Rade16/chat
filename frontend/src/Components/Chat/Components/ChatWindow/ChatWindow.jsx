import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./ChatWindow.scss";
import { useAuth } from "../../../../context/AuthContext";
const socket = io("http://localhost:5000");

const ChatWindow = ({ selectedUser, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  if (!user) {
    return <p>Загрузка...</p>;
  }
  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser?.id || !selectedUser?.id) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/messages`,
          {
            params: { userId1: currentUser.id, userId2: selectedUser.id },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Ошибка при получении сообщений:", error);
      }
    };

    fetchMessages();

    const handleMessageReceive = (data) => {
      if (data.senderId !== currentUser.id) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    socket.on("receive_message", handleMessageReceive);

    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, [selectedUser, currentUser, token]);

  useEffect(() => {
    if (currentUser) {
      socket.emit("join_room", currentUser.id);
    }
  }, [currentUser]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      content: newMessage.trim(),
    };

    try {
      await axios.post(
        "http://localhost:5000/api/messages/messages",
        messageData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      socket.emit("send_message", messageData);

      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  const handleKeyPress = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="chatWindow">
      <div className="chatWindow__header">
        <div className="chatWindow__user">
          <img
            src={`http://localhost:5000${selectedUser.avatar}`}
            alt=""
            className="chatWindow__user-avatar"
          />
          <div className="chatWindow__user-info">
            <p className="chatWindow__user-info-name">
              {selectedUser.username}
            </p>
            <p className="chatWindow__user-info-bio">{selectedUser.bio}</p>
          </div>
        </div>
      </div>

      <div className="chatWindow__messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.senderId === currentUser.id ? "sent" : "received"}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chatWindow__send">
        <input
          type="text"
          value={newMessage}
          onKeyDown={handleKeyPress}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введите сообщение..."
          className="chatWindow__send-input"
        />
        <button onClick={handleSend} className="chatWindow__send-button">
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
