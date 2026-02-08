/**
 * Cookie utility functions for secure token storage
 * Using httpOnly-like approach with secure and sameSite attributes
 */

/**
 * Set a cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Days until expiration (default: 7)
 */
export const setCookie = (name, value, days = 7) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  
  // Use Secure flag in production and SameSite for CSRF protection
  const isProduction = import.meta.env.PROD;
  const secureFlag = isProduction ? '; Secure' : '';
  
  document.cookie = name + '=' + (value || '') + expires + '; path=/' + secureFlag + '; SameSite=Strict';
};

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
export const getCookie = (name) => {
  const nameEQ = name + '=';
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  
  return null;
};

/**
 * Delete a cookie
 * @param {string} name - Cookie name
 */
export const deleteCookie = (name) => {
  document.cookie = name + '=; Max-Age=-99999999; path=/';
};

/**
 * Clear all auth-related cookies
 */
export const clearAuthCookies = () => {
  deleteCookie('authToken');
  deleteCookie('user');
};

export default {
  setCookie,
  getCookie,
  deleteCookie,
  clearAuthCookies
};
