import axios from 'axios';

const API_BASE_URL = process.env.APP_URL || 'https://studentms-j6yd.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
