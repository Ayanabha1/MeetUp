import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL || window.API_URL;

let Api = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}` },
});

let resetApiHeaders = (token) => {
  if (!token || token === "") {
    axios.defaults.headers.common["Authorization"] = null;
    Api = axios.create({
      baseURL: baseURL,
    });
  }
  Api = axios.create({
    baseURL: baseURL,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { Api, resetApiHeaders };
