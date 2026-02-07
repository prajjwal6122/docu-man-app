import React from 'react';
import classNames from 'classnames';

/**
 * Reusable Select Dropdown Component
 * @param {string} label - Select label
 * @param {string} value - Selected value
 * @param {function} onChange - Change handler
 * @param {Array} options - Array of {value, label} objects
 * @param {string} error - Error message
 * @param {boolean} required - Mark as required
 * @param {boolean} disabled - Disable select
 */
const Select = ({
  label,
  value,
  onChange,
  options = [],
  error,
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  className = '',
  name,
  id,
  ...props
}) => {
  const selectClasses = classNames(
    'form-select',
    {
      'is-invalid': error,
    },
    className
  );

  const selectId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        className={selectClasses}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default Select;
