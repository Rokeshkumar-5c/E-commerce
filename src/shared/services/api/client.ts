import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';

/**
 * API Client Configuration
 * Centralized axios instance with interceptors for authentication and error handling
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    // Log error for monitoring
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    
    return Promise.reject(error);
  }
);
