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
      console.log("🔄 Calling generateOTP API for:", mobile);
      console.log("📍 API URL:", import.meta.env.VITE_API_BASE_URL + '/generateOTP');
      
      const requestBody = { mobile_number: mobile };
      console.log("📤 Request body:", requestBody);
      
      const response = await apiClient.post('/generateOTP', requestBody);
      
      console.log("✅ generateOTP API Success:", response.status);
      console.log("📥 Response data:", response.data);
      
      return response.data;
    } catch (error) {
      console.error("❌ generateOTP API Error:", error.message);
      
      if (error.response) {
        console.error("📥 Error response status:", error.response.status);
        console.error("📥 Error response data:", error.response.data);
      } else if (error.request) {
        console.error("❌ No response received from server");
        console.error("Request details:", error.request);
      } else {
        console.error("❌ Error setting up request:", error.message);
      }
      
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
      console.log("🔄 Calling validateOTP API for:", mobile);
      console.log("📍 API URL:", import.meta.env.VITE_API_BASE_URL + '/validateOTP');
      
      const requestBody = { mobile_number: mobile, otp: otp };
      console.log("📤 Request body:", requestBody);
      
      const response = await apiClient.post('/validateOTP', requestBody);
      
      console.log("✅ validateOTP API Success:", response.status);
      console.log("📥 Response data:", response.data);
      
      return response.data;
    } catch (error) {
      console.error("❌ validateOTP API Error:", error.message);
      
      if (error.response) {
        console.error("📥 Error response status:", error.response.status);
        console.error("📥 Error response data:", error.response.data);
      } else if (error.request) {
        console.error("❌ No response received from server");
        console.error("Request details:", error.request);
      } else {
        console.error("❌ Error setting up request:", error.message);
      }
      
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
