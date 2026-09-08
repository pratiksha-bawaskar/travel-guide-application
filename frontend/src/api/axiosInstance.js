import axios from "axios";
import logger from "../utils/logger";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    logger.info("HTTP Request", {
      method: config.method,
      url: config.url,
      params: config.params,
      data: config.data,
    });
    return config;
  },
  (error) => {
    logger.error("Request error", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (resp) => {
    logger.info("HTTP Response", {
      url: resp.config?.url,
      status: resp.status,
    });
    return resp;
  },
  (error) => {
    const resp = error.response;
    logger.error("HTTP Response error", {
      url: resp?.config?.url,
      status: resp?.status,
      data: resp?.data,
    });
    return Promise.reject(error);
  }
);

export default api;
