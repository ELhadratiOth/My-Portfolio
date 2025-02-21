import axios from 'axios';
const API = axios.create({
  baseURL: 'https://portfolio-ai-chat-agent.onrender.com',
});

export default API;
