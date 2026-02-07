import React from 'react';
import './Toast.css';

/**
 * Toast Notification Component
 * @param {string} type - Toast type: 'success', 'error', 'warning', 'info'
 * @param {string} message - Toast message
 * @param {function} onClose - Close handler
 */
const Toast = ({ id, type, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  const getBackgroundClass = () => {
    switch (type) {
      case 'success':
        return 'bg-success';
      case 'error':
        return 'bg-danger';
      case 'warning':
        return 'bg-warning';
      case 'info':
        return 'bg-info';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className={`toast show align-items-center text-white ${getBackgroundClass()} border-0`} role="alert">
      <div className="d-flex">
        <div className="toast-body">
          <span className="me-2 fw-bold">{getIcon()}</span>
          {message}
        </div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          onClick={() => onClose(id)}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

/**
 * Toast Container Component
 * Renders all toasts in a fixed position
 */
export const ToastContainer = ({ toasts, onClose }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

export default Toast;
