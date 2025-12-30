import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
//   withCredentials: true, // keep if you use auth cookies
});

export default api;
