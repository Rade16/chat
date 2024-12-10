import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import { useAuth } from "../../context/AuthContext";
import "./Chat.scss";
import Settings from "./../../screens/Settings/Settings";
const Chat = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const handleSettingsClick = () => {
    setShowSettings(true);
    setSelectedUser(null);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowSettings(false);
  };
  return (
    <div className="chat">
      <Sidebar
        selectUser={handleUserSelect}
        currentUser={user}
        className="chat__sidebar"
        onSettingsClick={handleSettingsClick}
      />

      {showSettings ? (
        <Settings /> // Отображение компонента настроек
      ) : selectedUser ? (
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
