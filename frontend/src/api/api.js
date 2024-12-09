import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const register = (data) => axios.post(`${API_URL}/registration`, data);

export const login = (data) => axios.post(`${API_URL}/login`, data);

export const getUsers = (token) =>
  axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const findUsers = (search, token) =>
  axios.get(`${API_URL}/auth/find-users`, {
    params: { search },
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMessages = (userId1, userId2, token) =>
  axios.get(`${API_URL}/messages`, {
    params: { userId1, userId2 },
    headers: { Authorization: `Bearer ${token}` },
  });

export const sendMessage = (data, token) =>
  axios.post(`${API_URL}/messages`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
