import React from 'react';
import classNames from 'classnames';

/**
 * Reusable Button Component
 * @param {string} variant - Button style variant: 'primary', 'secondary', 'danger', 'success'
 * @param {string} size - Button size: 'sm', 'md', 'lg'
 * @param {boolean} loading - Show loading spinner
 * @param {boolean} disabled - Disable button
 * @param {string} type - Button type: 'button', 'submit', 'reset'
 * @param {function} onClick - Click handler
 * @param {ReactNode} children - Button content
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  children,
  ...props
}) => {
  const buttonClasses = classNames(
    'btn',
    {
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
      'btn-danger': variant === 'danger',
      'btn-success': variant === 'success',
      'btn-warning': variant === 'warning',
      'btn-info': variant === 'info',
      'btn-light': variant === 'light',
      'btn-dark': variant === 'dark',
      'btn-sm': size === 'sm',
      'btn-lg': size === 'lg',
    },
    className
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        ></span>
      )}
      {children}
    </button>
  );
};

export default Button;
