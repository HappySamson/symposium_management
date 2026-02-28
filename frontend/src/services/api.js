import axios from "axios";

const API = axios.create({
  baseURL: "https://symposium-management.onrender.com/"
});

export default API;
