import axios from 'axios';

// Configuração base da API
const api = axios.create({
  baseURL: 'http://localhost:8080', // Substitua com a URL do seu backend
});

export default api;
