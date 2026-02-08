import axios from 'axios';

// Get base URL from environment
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://apis.allsoft.co/api/documentManagement';

console.log("🌐 API Client initialized");
console.log("📍 Base URL:", baseURL);
console.log("🔧 Environment:", import.meta.env.MODE);

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log("✅ API Client ready");

export default apiClient;
