import axios from "axios";
// import store from "../store";

const API = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
  },
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status !== 401) {
      throw err;
    }
  }
);

export default API;
