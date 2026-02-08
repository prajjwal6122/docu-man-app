import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize authentication state from cookies
  useEffect(() => {
    const storedToken = authService.getToken();
    const storedUser = authService.getUser();
    
    console.log("Auth initialization:", {
      hasToken: !!storedToken,
      hasUser: !!storedUser,
      user: storedUser,
    });
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  /**
   * Login user and store credentials in cookies
   * @param {string} authToken - Authentication token
   * @param {object} userData - User data
   */
  const login = (authToken, userData) => {
    authService.saveAuth(authToken, userData);
    setToken(authToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  /**
   * Logout user and clear cookies
   */
  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
