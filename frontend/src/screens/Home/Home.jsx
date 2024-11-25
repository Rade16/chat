import React, { useEffect, useState } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", user);
    socket.emit("newUser", { user, socketID: socket.id });
    navigate("/chat");
  };

  return (
    <div className="home">
      <form onSubmit={handleSubmit} className="home__form">
        <h2 className="home__title">Вход в чат</h2>
        <label htmlFor="user"></label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="home__input"
          placeholder="Введите имя пользователя"
        />
        <button className="home__button">Войти</button>
      </form>
    </div>
  );
};

export default Home;
