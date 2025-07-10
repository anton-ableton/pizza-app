import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://shift-intensive.ru/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;