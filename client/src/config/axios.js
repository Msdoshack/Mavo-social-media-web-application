import axios from "axios";

const URL = "http://localhost:3700/api";

export const baseUrl = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export const baseUrlPrivate = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
