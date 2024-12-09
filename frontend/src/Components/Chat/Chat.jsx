import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import { useAuth } from "../../context/AuthContext";
import "./Chat.scss";

const Chat = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat">
      <Sidebar
        selectUser={setSelectedUser}
        currentUser={user}
        className="chat__sidebar"
      />
      {selectedUser ? (
        <ChatWindow
          className="chat-window"
          selectedUser={selectedUser}
          currentUser={user}
        />
      ) : (
        <div>Выберите пользователя для чата</div>
      )}
    </div>
  );
};

export default Chat;
