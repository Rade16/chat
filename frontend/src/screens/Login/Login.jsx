import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      const userResponse = await axios.get(
        "http://localhost:5000/api/auth/auth",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(userResponse.data.user);
      navigate("/chat");
    } catch (e) {
      alert(e.response.data.message);
      setError("Ошибка входа: неверный email или пароль");
    }
  };
  return (
    <div className="login">
      {" "}
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1 className="login__form-title">Авторизация</h1>

          <input
            type="email"
            className="login__form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="login__form-input"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login__form-button">Войти</button>
        </form>
        <p className="login__text">Еще нет аккаунта?</p>
        <Link to="/registration">
          <p className="login__link">Зарегистрироваться</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
