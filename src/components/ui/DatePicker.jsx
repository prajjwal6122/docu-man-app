import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

/**
 * Date Picker Component
 * Wrapper around react-datepicker
 */
const DatePicker = ({
  label,
  selected,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder = 'Select date',
  dateFormat = 'dd/MM/yyyy',
  maxDate,
  minDate,
  ...props
}) => {
  const inputId = label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      <ReactDatePicker
        id={inputId}
        selected={selected}
        onChange={onChange}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        maxDate={maxDate}
        minDate={minDate}
        disabled={disabled}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        {...props}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default DatePicker;
