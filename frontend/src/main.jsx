import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/main.scss";

import socketIO from "socket.io-client";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  redirect,
} from "react-router-dom";

import Login from "./screens/Login/Login.jsx";
import Registration from "./screens/Registration/Registration.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import Home from "./screens/Home/Home.jsx";

const socket = socketIO.connect("http://localhost:5000");
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home socket={socket} />,
  },
  {
    path: "/chat",
    element: <Chat socket={socket} />,
  },
  {
    path: "/reg",
    element: <Registration />,
  },
  {
    path: "/log",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
