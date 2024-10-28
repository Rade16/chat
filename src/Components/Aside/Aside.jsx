import React from "react";
import "./Aside.scss";

import Avatar from "../../assets/user/avatar.jpg";
import Settings from "../../assets/icons/settings.svg";
import Contact from "../../Components/Contact/Contact";

import { Link } from "react-router-dom";
const Aside = () => {
  return (
    <div className="aside">
      <header className="aside__header">
        <h1 className="aside__header-container">
          <img src={Avatar} alt="" className="aside__header-avatar" />
          <div className="aside__header-user">
            <p className="aside__header-user-name">Иван Дмитриев</p>
            <p className="aside__header-user-status">Онлайн</p>
          </div>
          <Link to="/settings" className="aside__header-settings">
            <img src={Settings} alt="" />
          </Link>
        </h1>
      </header>
      <Contact />
      <Contact />
    </div>
  );
};

export default Aside;
