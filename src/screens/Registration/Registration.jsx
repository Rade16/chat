import React from "react";
import "./Registration.scss";
import { Link } from "react-router-dom";
const Registration = () => {
  return (
    <div className="registration">
      <div className="registration__container">
        <form className="registration__form">
          <h1 className="registration__form-title">Регистрация</h1>
          <input
            type="text"
            className="registration__form-input"
            placeholder="Имя пользователя"
          />
          <input
            type="email"
            className="registration__form-input"
            placeholder="Email"
          />
          <input
            type="password"
            className="registration__form-input"
            placeholder="Придумте пароль"
          />
          <input
            type="password"
            className="registration__form-input"
            placeholder="Повторите пароль"
          />

          <button className="registration__form-button">
            Зарегистрироваться
          </button>
        </form>
        <p className="registration__text">Уже есть аккаунт?</p>
        <Link to="/log">
          <p className="registration__link">Войти</p>
        </Link>
      </div>
    </div>
  );
};

export default Registration;
