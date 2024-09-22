import axios from "axios";

const API_KEY = "1e94b677";
const BASE_URL = "https://www.omdbapi.com/";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.Error || "Something went wrong. Please try again.";
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
