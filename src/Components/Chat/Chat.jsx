import React from "react";
import "./Chat.scss";
import Avatar from "../../assets/user/avatar.jpg";
import send from "../../assets/icons/send.svg";

import Message from "../Message/Message";
const Chat = () => {
  return (
    <div className="chat">
      <header className="chat__header">
        <div className="chat__header-container">
          <img src={Avatar} alt="" className="chat__header-avatar" />
          <div className="chat__header-user">
            <p className="chat__header-user-name">Алан Бекмурзов</p>
            <p className="chat__header-user-status">Онлайн</p>
          </div>
        </div>
      </header>

      <div className="chat__messages">
        <Message text="Привет, Ваня! Как дела?" />
      </div>
      <div className="chat__messageField">
        <input
          type="text"
          className="chat__messageField-input"
          placeholder="Написать сообщение..."
        />
        <button className="chat__messageField-button">
          <img src={send} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
