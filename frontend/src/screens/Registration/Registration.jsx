import React, { useState } from "react";
import "./Registration.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/registration`,
        {
          username,
          password,
          email,
        }
      );
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        const { errors } = error.response.data;
        if (Array.isArray(errors)) {
          alert(errors.join("\n"));
        } else {
          alert(error.response.data.message);
        }
      }
    }
  };
  return (
    <div className="registration">
      <div className="registration__container">
        <form className="registration__form" onSubmit={handleSubmit}>
          <h1 className="registration__form-title">Регистрация</h1>
          <input
            type="text"
            className="registration__form-input"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className="registration__form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="registration__form-input"
            placeholder="Придумте пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="registration__form-button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p className="registration__text">Уже есть аккаунт?</p>
        <Link to="/login">
          <p className="registration__link">Войти</p>
        </Link>
      </div>
    </div>
  );
};

export default Registration;
