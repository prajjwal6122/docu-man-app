import React, { createContext, useState, useCallback } from 'react';

export const ToastContext = createContext(null);

let toastIdCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * Show a toast notification
   * @param {string} type - Toast type: 'success', 'error', 'warning', 'info'
   * @param {string} message - Toast message
   * @param {number} duration - Duration in milliseconds (default: 3000)
   */
  const showToast = useCallback((type, message, duration = 3000) => {
    const id = toastIdCounter++;
    const newToast = {
      id,
      type,
      message,
      duration,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  /**
   * Remove a toast by ID
   * @param {number} id - Toast ID
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Clear all toasts
   */
  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  /**
   * Convenience methods for different toast types
   */
  const success = useCallback((message, duration) => {
    return showToast('success', message, duration);
  }, [showToast]);

  const error = useCallback((message, duration) => {
    return showToast('error', message, duration);
  }, [showToast]);

  const warning = useCallback((message, duration) => {
    return showToast('warning', message, duration);
  }, [showToast]);

  const info = useCallback((message, duration) => {
    return showToast('info', message, duration);
  }, [showToast]);

  const value = {
    toasts,
    showToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
