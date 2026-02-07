import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

/**
 * Mobile Number Form Component
 * Handles mobile number input and validation
 */
const MobileNumberForm = ({ onSubmit, loading }) => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const validateMobile = (value) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!value) {
      return 'Mobile number is required';
    }
    if (!mobileRegex.test(value)) {
      return 'Please enter a valid 10-digit mobile number';
    }
    return '';
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(value);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateMobile(mobile);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSubmit(mobile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="tel"
        label="Mobile Number"
        placeholder="Enter 10-digit mobile number"
        value={mobile}
        onChange={handleChange}
        error={error}
        required
        maxLength={10}
        disabled={loading}
      />
      <Button
        type="submit"
        variant="primary"
        loading={loading}
        className="w-100"
      >
        {loading ? 'Sending OTP...' : 'Send OTP'}
      </Button>
    </form>
  );
};

export default MobileNumberForm;
