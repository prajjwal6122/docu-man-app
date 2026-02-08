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
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 401) {
        // Don't redirect on auth endpoints - they handle their own errors
        const isAuthEndpoint = error.config?.url?.includes('generateOTP') || 
                              error.config?.url?.includes('validateOTP');
        
        // Don't redirect if using demo mode test token
        const token = error.config?.headers?.token || '';
        const isDemoMode = token.startsWith('test_token_');
        
        if (!isAuthEndpoint && !isDemoMode) {
          // Clear auth and redirect after a short delay
          setTimeout(() => {
            clearAuthCookies();
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }, 100);
        }
      } else if (status === 500) {
        console.error('Server error:', data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error:', error.message);
    } else {
      // Error in request configuration
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);;

export default apiClient;
