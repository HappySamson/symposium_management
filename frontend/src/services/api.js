import axios from "axios";

const API = axios.create({
  baseURL: "https://symposium-management.onrender.com/api"
});

export default API;
