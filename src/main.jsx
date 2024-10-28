import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/main.scss";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  redirect,
} from "react-router-dom";

import Login from "./screens/Login/Login.jsx";
import Registration from "./screens/Registration/Registration.jsx";
import Layout from "./screens/Layout/Layout.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import Settings from "./screens/Settings/Settings.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/chat/:chatId",
        element: <Chat />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
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
