import axios from "axios";

export const baseUrl = axios.create({
  baseURL: "http://localhost:3700/api",
  withCredentials: true,
});

export const baseUrlPrivate = axios.create({
  baseURL: "http://localhost:3700/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
