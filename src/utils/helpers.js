/**
 * Helper utility functions
 */

/**
 * Safely convert error to string message
 * Handles various error types and formats
 */
export const getErrorMessage = (error) => {
  if (!error) return 'Unknown error';
  
  // If it's an Error object with a message
  if (error.message) {
    return error.message;
  }
  
  // If it's a string
  if (typeof error === 'string') {
    return error;
  }
  
  // If it's an object with a message property
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  // If it's an axios error
  if (error.response?.data) {
    return typeof error.response.data === 'string' 
      ? error.response.data 
      : JSON.stringify(error.response.data);
  }
  
  // Try to stringify safely
  try {
    return String(error);
  } catch (e) {
    return 'An error occurred';
  }
};

/**
 * Format date to YYYY-MM-DD   
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Download file from blob
 */
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Get file extension
 */
export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

/**
 * Check if file is image
 */
export const isImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  return imageExtensions.includes(getFileExtension(filename));
};

/**
 * Check if file is PDF
 */
export const isPDFFile = (filename) => {
  return getFileExtension(filename) === 'pdf';
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export default {
  getErrorMessage,
  formatDate,
  downloadFile,
  getFileExtension,
  isImageFile,
  isPDFFile,
  formatFileSize,
};
