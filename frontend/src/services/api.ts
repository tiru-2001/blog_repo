import axios from "axios";
import config from "../config/config";
const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});
export const refreshApi = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshApi.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
