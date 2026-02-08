import apiClient from './apiClient';
import './interceptors'; // Import interceptors to initialize them
import { getCookie, setCookie, clearAuthCookies } from '../utils/cookies';

const authService = {
  /**
   * Generate OTP for mobile number
   * @param {string} mobile - Mobile number
   * @returns {Promise} Response with OTP sent status
   */
  async generateOTP(mobile) {
    try {
      const response = await apiClient.post('/generateOTP', { mobile_number: mobile });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Validate OTP and get authentication token
   * @param {string} mobile - Mobile number
   * @param {string} otp - OTP code
   * @returns {Promise} Response with token and user data
   */
  async validateOTP(mobile, otp) {
    try {
      const response = await apiClient.post('/validateOTP', { mobile_number: mobile, otp });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Store authentication token and user data in cookies
   * @param {string} token - Authentication token
   * @param {object} userData - User data object
   */
  saveAuth(token, userData) {
    setCookie('authToken', token, 7); // Store for 7 days
    setCookie('user', JSON.stringify(userData), 7);
    
    // Also store in localStorage as fallback for development
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    console.log('Auth saved:', { token: token.substring(0, 20) + '...', user: userData });
  },

  /**
   * Logout user and clear cookies
   */
  logout() {
    clearAuthCookies();
    // Also clear localStorage as fallback for any legacy data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = getCookie('authToken');
    return !!token;
  },

  /**
   * Get stored token from cookies
   * @returns {string|null}
   */
  getToken() {
    const cookieToken = getCookie('authToken');
    // Fallback to localStorage in development
    const token = cookieToken || localStorage.getItem('authToken');
    return token;
  },

  /**
   * Get stored user data from cookies
   * @returns {object|null}
   */
  getUser() {
    const cookieUserStr = getCookie('user');
    // Fallback to localStorage in development
    const userStr = cookieUserStr || localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
};

export default authService;
