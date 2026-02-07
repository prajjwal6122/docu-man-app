import React from 'react';
import classNames from 'classnames';

/**
 * Reusable Input Component
 * @param {string} type - Input type
 * @param {string} label - Input label
 * @param {string} placeholder - Input placeholder
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} error - Error message
 * @param {boolean} required - Mark as required
 * @param {boolean} disabled - Disable input
 */
const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = '',
  name,
  id,
  ...props
}) => {
  const inputClasses = classNames(
    'form-control',
    {
      'is-invalid': error,
    },
    className
  );

  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={name}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        {...props}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default Input;
