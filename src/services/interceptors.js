import apiClient from './apiClient';
import { getCookie, clearAuthCookies } from '../utils/cookies';

// Request interceptor - Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const cookieToken = getCookie('authToken');
    // Fallback to localStorage for development
    const token = cookieToken || localStorage.getItem('authToken');
    
    if (token) {
      // Ensure headers object exists
      if (!config.headers) {
        config.headers = {};
      }
      // Add token header (this will be preserved even with custom headers)
      config.headers.token = token;
      console.log('✅ Request with token to:', config.url, '| Token:', token.substring(0, 15) + '...');
    } else {
      console.error('❌ NO TOKEN FOUND for request:', config.url);
      console.log('Cookies:', document.cookie);
      console.log('LocalStorage token:', localStorage.getItem('authToken'));
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Response from:', response.config.url, '| Status:', response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      console.error('❌ Response error:', {
        url: error.config?.url,
        status,
        data,
        headers: error.config?.headers
      });
      
      if (status === 401) {
        console.error('🚫 UNAUTHORIZED - Clearing auth and redirecting to login');
        // Unauthorized - clear cookies and redirect to login
        clearAuthCookies();
        // Also clear localStorage as fallback
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else if (status === 500) {
        console.error('Server error:', data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - No response:', error.message);
    } else {
      // Error in request configuration
      console.error('Request configuration error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
