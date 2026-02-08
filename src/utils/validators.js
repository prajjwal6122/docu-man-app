/**
 * Validation utility functions
 */

export const validators = {
  /**
   * Validate required field
   */
  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`;
    }
    return '';
  },

  /**
   * Validate email
   */
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  },

  /**
   * Validate mobile number
   */
  mobile: (value) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!value) {
      return 'Mobile number is required';
    }
    if (!mobileRegex.test(value)) {
      return 'Please enter a valid 10-digit mobile number';
    }
    return '';
  },

  /**
   * Validate date
   */
  date: (value, fieldName = 'Date') => {
    if (!value) {
      return `${fieldName} is required`;
    }
    if (!(value instanceof Date) && isNaN(Date.parse(value))) {
      return `Please enter a valid ${fieldName.toLowerCase()}`;
    }
    return '';
  },

  /**
   * Validate file
   */
  file: (file, options = {}) => {
    const {
      required = true,
      maxSize = 10, // MB
      allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'],
    } = options;

    if (required && !file) {
      return 'Please select a file';
    }

    if (!file) return '';

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      return `File type must be one of: ${allowedTypes.join(', ')}`;
    }

    return '';
  },

  /**
   * Validate minimum length
   */
  minLength: (value, min, fieldName = 'This field') => {
    if (value && value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return '';
  },

  /**
   * Validate maximum length
   */
  maxLength: (value, max, fieldName = 'This field') => {
    if (value && value.length > max) {
      return `${fieldName} must not exceed ${max} characters`;
    }
    return '';
  },

  /**
   * Validate array (for tags, etc.)
   */
  arrayMinLength: (array, min, fieldName = 'This field') => {
    if (!Array.isArray(array) || array.length < min) {
      return `Please add at least ${min} ${fieldName.toLowerCase()}`;
    }
    return '';
  },
};

/**
 * Validate required field (named export for convenience)
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return '';
};

/**
 * Validate username (4-20 characters, alphanumeric and underscore)
 */
export const validateUsername = (value) => {
  if (!value) return '';
  
  if (value.length < 4 || value.length > 20) {
    return 'Username must be between 4 and 20 characters';
  }
  
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(value)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  
  return '';
};

/**
 * Validate password (minimum 6 characters)
 */
export const validatePassword = (value) => {
  if (!value) return '';
  
  if (value.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  
  return '';
};

export default validators;
