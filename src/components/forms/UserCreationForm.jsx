import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateRequired, validateUsername, validatePassword } from '../../utils/validators';

/**
 * User Creation Form Component (Static/UI-only)
 * This is a static form - no API integration
 */
const UserCreationForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'username':
        error = validateRequired(value, 'Username') || validateUsername(value);
        break;
      case 'password':
        error = validateRequired(value, 'Password') || validatePassword(value);
        break;
      case 'confirmPassword':
        error = validateRequired(value, 'Confirm Password');
        if (!error && value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    
    newErrors.username = validateRequired(formData.username, 'Username') || validateUsername(formData.username);
    newErrors.password = validateRequired(formData.password, 'Password') || validatePassword(formData.password);
    newErrors.confirmPassword = validateRequired(formData.confirmPassword, 'Confirm Password');
    
    if (!newErrors.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    setTouched({
      username: true,
      password: true,
      confirmPassword: true,
    });

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        username: formData.username,
        password: formData.password,
      });
    }
  };

  const handleReset = () => {
    setFormData({
      username: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setTouched({});
  };

  return (
    <form onSubmit={handleSubmit} className="user-creation-form">
      <div className="row g-3">
        {/* Username Field */}
        <div className="col-12">
          <Input
            label="Username"
            type="text"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            onBlur={() => handleBlur('username')}
            error={touched.username ? errors.username : ''}
            placeholder="Enter username (4-20 characters)"
            required
            disabled={loading}
          />
          <small className="text-muted">
            Username must be 4-20 characters long and contain only letters, numbers, and underscores
          </small>
        </div>

        {/* Password Field */}
        <div className="col-12">
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            error={touched.password ? errors.password : ''}
            placeholder="Enter password (minimum 6 characters)"
            required
            disabled={loading}
          />
          <small className="text-muted">
            Password must be at least 6 characters long
          </small>
        </div>

        {/* Confirm Password Field */}
        <div className="col-12">
          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            error={touched.confirmPassword ? errors.confirmPassword : ''}
            placeholder="Re-enter password"
            required
            disabled={loading}
          />
        </div>

        {/* Form Actions */}
        <div className="col-12">
          <div className="d-flex gap-2 justify-content-end">
            <Button
              type="button"
              variant="secondary"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading}
            >
              Create User
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserCreationForm;
