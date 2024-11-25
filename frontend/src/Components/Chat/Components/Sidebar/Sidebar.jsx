import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
const Sidebar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("responseNewUser", (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="sidebar">
      <h1 className="sidebar__title">Люди</h1>
      <ul className="sidebar__users">
        {users.map((element) => (
          <li className="sidebar__users-user" key={element.socketID}>
            {element.user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
