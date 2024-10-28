import React from "react";
import "./Message.scss";
const Message = (obj) => {
  return (
    <div className="message">
      <p className="message__text">{obj.text}</p>
    </div>
  );
};

export default Message;
