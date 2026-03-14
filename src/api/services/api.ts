import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// Get API URL from environment variables with proper fallback
const getApiBaseUrl = (): string => {
  // Check for explicit API base URL first
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Check for local URL
  if (import.meta.env.VITE_LOCAL_URL) {
    return import.meta.env.VITE_LOCAL_URL;
  }
  
  // Fallback - this should not happen if .env.development is set correctly
  console.warn('⚠️ No API URL found in environment variables. Using fallback.');
  return 'http://localhost:5032';
};

const API_BASE_URL = getApiBaseUrl();

// Debug logging in development
if (import.meta.env.DEV) {
  console.log('🔗 API Base URL:', API_BASE_URL);
  console.log('📝 VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('📝 VITE_LOCAL_URL:', import.meta.env.VITE_LOCAL_URL);
}

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - add auth token
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle errors
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Unauthorized - clear token and redirect to login
          Cookies.remove('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const apiService = new ApiService();
export default apiService.getInstance();
