import axios from "axios";

export const api = axios.create({
  baseURL: "https://todo-task-4qt6.onrender.com",
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
