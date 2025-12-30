// Frontend/src/Apis/Api.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // yaha apna backend base url
});


// har request se pehle token add karega (agar ho to)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default api;
