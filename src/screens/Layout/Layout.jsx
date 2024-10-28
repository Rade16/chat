import React from "react";
import "./Layout.scss";

import Aside from "../../Components/Aside/Aside";
import Chat from "../../Components/Chat/Chat";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <Aside />
      <Outlet />
    </div>
  );
};

export default Layout;
