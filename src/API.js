import axios from 'axios';
const API = axios.create({
  baseURL: 'https://portfolio-ai-chat-agent.onrender.com',
  withCredentials: true,
});

export default API;
