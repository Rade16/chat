import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./ChatWindow.scss";
import { useAuth } from "../../../../context/AuthContext";
import socket from "../../../socket/socket";
const ChatWindow = ({ selectedUser, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const token = localStorage.getItem("token");
  const { user } = useAuth();

  const messagesEndRef = useRef(null);

  if (!user) {
    return <p>Загрузка...</p>;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  // useEffect(() => {
  //   setMessages([]);
  // }, [selectedUser]);

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
        scrollToBottom();
      } catch (error) {
        console.error("Ошибка при получении сообщений:", error);
      }
    };

    fetchMessages();

    const handleMessageReceive = (data) => {
      if (
        data.senderId !== currentUser.id &&
        !messages.some((msg) => msg.id === data.id)
      ) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    socket.connect();
    socket.on("receive_message", handleMessageReceive);

    return () => {
      socket.off("receive_message", handleMessageReceive);
      socket.disconnect();
    };
  }, [selectedUser, currentUser, token]);

  useEffect(() => {
    if (currentUser) {
      socket.emit("leave_room", currentUser.id);
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
      socket.emit("send_message", messageData);

      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  const handleKeyPress = (e) => {
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
        <div ref={messagesEndRef} />
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
        <button
          onClick={() => handleSend()}
          className="chatWindow__send-button"
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
