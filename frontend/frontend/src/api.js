import axios from 'axios';

// Configuração base da API
const api = axios.create({
  baseURL: 'http://localhost:8080', // URL do backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir o token JWT nas requisições
api.interceptors.request.use(
  (config) => {
    // Substitua 'token' pelo nome real da chave que guarda o JWT
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas ou erros globais
api.interceptors.response.use(
  (response) => {
    // Você pode fazer algo com as respostas antes de retornar
    return response;
  },
  (error) => {
    // Trata erros globais, como expiração de token
    if (error.response && error.response.status === 401) {
      console.error('Não autorizado. Faça login novamente.');
      // Opcional: Redirecionar para login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
