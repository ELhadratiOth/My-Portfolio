import axios from 'axios';
const API = axios.create({
  // baseURL: 'https://portfolio-ai-chat-agent.onrender.com',
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

export default API;
