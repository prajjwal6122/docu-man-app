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
        // Don't redirect on auth endpoints - they handle their own errors
        const isAuthEndpoint = error.config?.url?.includes('generateOTP') || 
                              error.config?.url?.includes('validateOTP');
        
        // Don't redirect if using demo mode test token
        const token = error.config?.headers?.token || '';
        const isDemoMode = token.startsWith('test_token_');
        
        if (!isAuthEndpoint && !isDemoMode) {
          console.error('🚫 UNAUTHORIZED - Token invalid or expired');
          console.error('Token used:', error.config?.headers?.token?.substring(0, 20) + '...');
          
          // Clear auth and redirect after a short delay to show the message
          setTimeout(() => {
            clearAuthCookies();
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }, 100);
        } else if (isDemoMode) {
          console.log('📦 Demo Mode: Ignoring 401 error (using mock data)');
        } else {
          console.log('Auth endpoint error - let component handle it');
        }
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
);;

export default apiClient;
