import axios from "axios";
import constants from "./constants";

const api = axios.create({
  baseURL: constants.backendUrl,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
