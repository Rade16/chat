import React from "react";
import "./Body.scss";
import { useNavigate } from "react-router-dom";
const Body = ({ messages }) => {
  const navigate = useNavigate();
  const handleLeave = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <header className="body__header">
        <button className="body__header-button" onClick={handleLeave}>
          Покинуть чат
        </button>
      </header>
      <div className="body__container">
        {messages.map((element) => {
          return element.name === localStorage.getItem("user") ? (
            <div className="body__chats" key={element.id}>
              <p className="body__chats-sendername">{element.name}</p>
              <div className="body__chats-message-sender">
                <p>{element.text}</p>
              </div>
            </div>
          ) : (
            <div className="body__chats" key={element.id}>
              <p className="body__chats-recipientname">{element.name}</p>
              <div className="body__chats-message-recipient">
                <p>{element.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Body;
