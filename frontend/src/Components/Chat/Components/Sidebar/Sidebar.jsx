import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sidebar.scss";
import settings from "../../../../assets/settings.svg";
import { useAuth } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";
const Sidebar = ({ selectUser, currentUser, onSettingsClick }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [chatUsers, setChatUsers] = useState([]); // Состояние для пользователей с которыми есть сообщения
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/chats/${currentUser?.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Сервера данные:", response.data);
        setChatUsers(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных", error);
      }
    };

    if (currentUser?.id) fetchChatUsers();
  }, [currentUser?.id, token]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!search.trim()) {
        setUsers([]);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/find-users`,
          {
            params: { search },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Ошибка загрузки пользователей:", error);
      }
    };

    fetchUsers();
  }, [search, token]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img src={""} alt="" className="sidebar__header-avatar" />
        <div className="sidebar__header-user">
          <p className="sidebar__header-user-name">{currentUser?.username}</p>
        </div>

        <img
          src={settings}
          alt=""
          className="sidebar__header-settings"
          onClick={onSettingsClick}
        />
      </div>
      <input
        className="sidebar__search"
        type="text"
        placeholder="Поиск пользователей"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {/* Пользователи с активными чатами */}

        {/* Результаты поиска пользователей */}
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => selectUser(user)}
            className="sidebar__users"
          >
            <div className="sidebar__users-user">
              <img src={""} alt="" className="sidebar__users-user-avatar" />
              <p className="sidebar__users-user-name">{user.username}</p>
            </div>
          </li>
        ))}
        {chatUsers.map((user) => (
          <li
            key={user.id}
            onClick={() => selectUser(user)}
            className="sidebar__users"
          >
            <div className="sidebar__users-user">
              <img src={""} alt="" className="sidebar__users-user-avatar" />
              <p className="sidebar__users-user-name">{user.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
