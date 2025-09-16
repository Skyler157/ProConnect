// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Base URL from .env
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
