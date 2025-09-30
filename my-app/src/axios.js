// src/axios.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://srv1000765.hstgr.cloud/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("401 Unauthorized — consider redirecting to login.");
      // optional: window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
