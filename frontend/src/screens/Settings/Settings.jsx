import React, { useState, useEffect } from "react";
import "./Settings.scss";

import Avatar from "../../assets/user/avatar.jpg";

import Sidebar from "../../Components/Chat/Components/Sidebar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import img from "../../assets/user/img.svg";
import { use } from "react";
import axios from "axios";
const Settings = () => {
  const { user } = useAuth();
  if (!user) {
    return <p>Загрузка...</p>;
  }

  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");
  const formData = new FormData();

  formData.append("username", username);
  formData.append("email", email);
  formData.append("currentPassword", currentPassword);
  formData.append("newPassword", newPassword);
  formData.append("bio", bio);
  if (avatar) {
    formData.append("avatar", avatar);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/update-user/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
    const file = e.target.files[0];
    setPreviewAvatar(URL.createObjectURL(file));
  };

  return (
    <div className="settings">
      <div className="settings__container">
        <h1 className="settings__title">Настройки аккаунта</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="settings__user">
            <div className="settings__user-avatar"></div>
            <img
              src={previewAvatar || `http://localhost:5000${user.avatar}`}
              alt=""
              className="settings__user-avatar-img"
            />
            <label htmlFor="image" className="settings__user-upload">
              <img src={img} alt="" className="settings__user-upload-img" />
              <input
                id="image"
                type="file"
                accept="image/*"
                className="settings__user-upload-input"
                onChange={handleFileChange}
              />
            </label>
            <div className="settings__user-info">
              <p className="settings__user-info-name">{user.username}</p>
              <p className="settings__user-info-bio">{user.bio}</p>
            </div>
          </div>

          <div className="settings__edit-container">
            <div className="settings__edit-info">
              <p className="settings__edit-info-title">О себе</p>
              <label htmlFor="name" className="settings__edit-label">
                Имя
              </label>
              <input
                type="text"
                id="name"
                className="settings__edit-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="email" className="settings__edit-label">
                Почта
              </label>
              <input
                type="email"
                id="email"
                className="settings__edit-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="bio" className="settings__edit-label">
                О себе
              </label>
              <input
                type=""
                id="bio"
                className="settings__edit-input"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="settings__edit-password">
              <p className="settings__edit-password-title">Пароль</p>
              <label htmlFor="password" className="settings__edit-label">
                Старый пароль
              </label>
              <input
                type="password"
                id="password"
                className="settings__edit-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <label htmlFor="newPassword" className="settings__edit-label">
                Новый пароль
              </label>
              <input
                type="password"
                id="newPassword"
                className="settings__edit-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="settings__edit-line">
            <button className="settings__edit-button" type="submit">
              Сохранить
            </button>
            <button
              className="settings__edit-button-logout"
              onClick={handleLogout}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
