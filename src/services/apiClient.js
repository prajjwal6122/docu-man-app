import axios from 'axios';

// Get base URL from environment
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://apis.allsoft.co/api/documentManagement';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
