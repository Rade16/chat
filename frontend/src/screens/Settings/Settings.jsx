import React from "react";
import "./Settings.scss";

import Avatar from "../../assets/user/avatar.jpg";

import Sidebar from "../../Components/Chat/Components/Sidebar/Sidebar";
import { useAuth } from "../../context/AuthContext";
const Settings = () => {
  const { user } = useAuth();
  return (
    <div className="settings">
      <div className="settings__container">
        <h1 className="settings__title">Настройки аккаунта</h1>
        <div className="settings__user">
          <img src={Avatar} alt="" className="settings__user-avatar" />
          <label htmlFor="image" className="settings__user-upload">
            <input
              id="image"
              type="file"
              accept="image/*"
              className="settings__user-upload-input"
            />
          </label>
          <div className="settings__user-info">
            <p className="settings__user-info-name">{user.username}</p>
            <p className="settings__user-info-bio"></p>
          </div>
        </div>
        <form className="settings__edit">
          <div className="settings__edit-container">
            <div className="settings__edit-info">
              <p className="settings__edit-info-title">О себе</p>
              <label htmlFor="name" className="settings__edit-label">
                Имя
              </label>
              <input type="text" id="name" className="settings__edit-input" />
              <label htmlFor="email" className="settings__edit-label">
                Почта
              </label>
              <input type="email" id="email" className="settings__edit-input" />
              <label htmlFor="bio" className="settings__edit-label">
                О себе
              </label>
              <input type="" id="bio" className="settings__edit-input" />
            </div>
            <div className="settings__edit-password">
              {" "}
              <p className="settings__edit-password-title">Пароль</p>
              <label htmlFor="password" className="settings__edit-label">
                Старый пароль
              </label>
              <input
                type="password"
                id="password"
                className="settings__edit-input"
              />
              <label htmlFor="newPassword" className="settings__edit-label">
                Новый пароль
              </label>
              <input
                type="password"
                id="newPassword"
                className="settings__edit-input"
              />
              <label
                htmlFor="repeatNewPassword"
                className="settings__edit-label"
              >
                Повторите новый пароль
              </label>
              <input
                type="password"
                id="repeatNewPassword"
                className="settings__edit-input"
              />
            </div>
          </div>
          <button className="settings__edit-button">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
