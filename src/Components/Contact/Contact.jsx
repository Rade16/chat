import React from "react";
import "./Contact.scss";

import Avatar from "../../assets/user/avatar.jpg";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <Link to="/chat/1">
      <div className="contact">
        <div className="contact__container">
          <img src={Avatar} alt="" className="contact__avatar" />
          <div className="contact__user">
            <p className="contact__user-name">Алан Бекмурзов</p>
            <p className="contact__user-message">Привет, Ваня! Как дела?</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Contact;
