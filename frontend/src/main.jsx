import React, { useEffect } from "react";
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
import Settings from "./screens/Settings/Settings.jsx";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";

const socket = socketIO.connect("http://localhost:5000");

const App = () => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          "http://localhost:5000/api/auth/auth",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error("Ошибка аутентификации:", error);
      }
    };

    fetchUserData();
  }, [setUser]);

  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
