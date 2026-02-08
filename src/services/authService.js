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
    return getCookie('authToken');
  },

  /**
   * Get stored user data from cookies
   * @returns {object|null}
   */
  getUser() {
    const userStr = getCookie('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data from cookie:', error);
      return null;
    }
  }
};

export default authService;
