import React, { useState, useEffect } from "react";
import "./Chat.scss";
import Sidebar from "./Components/Sidebar/Sidebar";
import Body from "./Components/Body/Body";
import MessageBlock from "./Components/MessageBlock/MessageBlock";

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("response", (data) => setMessages([...messages, data]));
  }, [messages, socket]);
  return (
    <div className="chat">
      <Sidebar socket={socket} />
      <main className="chat__main">
        <Body messages={messages} />
        <MessageBlock socket={socket} />
      </main>
    </div>
  );
};

export default Chat;
