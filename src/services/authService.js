import apiClient from './apiClient';
import './interceptors'; // Import interceptors to initialize them

const authService = {
  /**
   * Generate OTP for mobile number
   * @param {string} mobile - Mobile number
   * @returns {Promise} Response with OTP sent status
   */
  async generateOTP(mobile) {
    try {
      const response = await apiClient.post('/generateOTP', { mobile });
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
      const response = await apiClient.post('/validateOTP', { mobile, otp });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem ('user');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Get stored token
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('authToken');
  },

  /**
   * Get stored user data
   * @returns {object|null}
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;
