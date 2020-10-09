import axios from "axios";
import baseURL from "../config";

const headers = {
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  baseURL,
  headers,
});

export default axiosInstance;
