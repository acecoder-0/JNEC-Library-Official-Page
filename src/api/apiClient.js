import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============= USER APIS =============

export const userAPI = {
  register: (data) => API.post('/users/register', data),
  login: (data) => API.post('/users/login', data),
  getAll: () => API.get('/users'),
  getById: (id) => API.get(`/users/${id}`),
  update: (id, data) => API.put(`/users/${id}`, data),
  delete: (id) => API.delete(`/users/${id}`),
};

// ============= BOOK APIS =============

export const bookAPI = {
  getAll: (params) => API.get('/books', { params }),
  getById: (id) => API.get(`/books/${id}`),
  create: (data) => API.post('/books', data),
  update: (id, data) => API.put(`/books/${id}`, data),
  delete: (id) => API.delete(`/books/${id}`),
  issue: (data) => API.post('/books/issue', data),
  return: (issueId) => API.post(`/books/return/${issueId}`),
  getIssued: () => API.get('/books/issued'),
};

export default API;
