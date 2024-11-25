import React, { useState } from "react";
import "./MessageBlock.scss";
const MessageBlock = ({ socket }) => {
  const [message, setMessage] = useState("");
  const handleSend = (e) => {
    e.preventDefault();
    console.log({ user: localStorage.getItem("user"), message });
    if (message.trim() && localStorage.getItem("user")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("user"),
        id: `${socket.id}-${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="messageBlock">
      <form action="" className="messageBlock__form" onSubmit={handleSend}>
        <input
          type="text"
          className="messageBlock__form-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="messageBlock__form-button">Отправить</button>
      </form>
    </div>
  );
};

export default MessageBlock;
