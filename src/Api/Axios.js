import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL || window.API_URL;

let Api = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    Accept: "*/*",
  },
});

Api.interceptors.response.use(
  (response) => {
    if (response.headers["content-type"] === "application/json") {
      response.data = JSON.parse(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
