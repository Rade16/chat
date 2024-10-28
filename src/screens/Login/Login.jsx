import React from "react";
import "./Login.scss";

import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="login">
      {" "}
      <div className="login__container">
        <form className="login__form">
          <h1 className="login__form-title">Авторизация</h1>

          <input
            type="email"
            className="login__form-input"
            placeholder="Email"
          />
          <input
            type="password"
            className="login__form-input"
            placeholder="Введите пароль"
          />

          <button className="login__form-button">Войти</button>
        </form>
        <p className="login__text">Еще нет аккаунта?</p>
        <Link to="/reg">
          <p className="login__link">Зарегистрироваться</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
