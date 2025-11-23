import axios from 'axios';
import { API_BASE_URL } from './api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - automatically add auth token
apiClient.interceptors.request.use(
  (config) => {
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

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API service methods
export const api = {
  // Auth
  login: (email, password) => apiClient.post('/api/auth/login', { email, password }),
  signup: (username, email, password) => apiClient.post('/api/auth/signup', { username, email, password }),
  getMe: () => apiClient.get('/api/auth/me'),

  // User
  getProgress: () => apiClient.get('/api/user/progress'),
  updateProgress: (chapter, verse, completed) => apiClient.post('/api/user/progress', { chapter, verse, completed }),
  getBookmarks: () => apiClient.get('/api/user/bookmarks'),
  addBookmark: (chapter, verse, note) => apiClient.post(`/api/user/bookmark/${chapter}/${verse}`, { note }),
  deleteBookmark: (chapter, verse) => apiClient.delete(`/api/user/bookmark/${chapter}/${verse}`),
  deleteAllBookmarks: () => apiClient.delete('/api/user/bookmarks'),
  getUserVerseOfDay: () => apiClient.get('/api/user/verse-of-day'),
  getGlobalVerseOfDay: () => apiClient.get('/api/user/verse-of-day/global'),

  // Gita content
  getVerse: (chapter, verse) => apiClient.get(`/api/gita/${chapter}/${verse}`),
  getSlok: (chapter, verse) => apiClient.get(`/api/gita/slok/${chapter}/${verse}`),
  getRandomVerse: () => apiClient.get('/api/gita/random'),
  getChapters: () => apiClient.get('/api/gita/chapters'),
};

export default apiClient;
