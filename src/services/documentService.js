import apiClient from './apiClient';
import './interceptors'; // Import interceptors to initialize them

const documentService = {
  /**
   * Get all available tags
   * @returns {Promise} Response with tags array
   */
  async getTags() {
    try {
      const response = await apiClient.get('/documentTags');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload a document with metadata
   * @param {FormData} formData - Form data containing document and metadata
   * @returns {Promise} Response with upload status
   */
  async uploadDocument(formData) {
    try {
      const response = await apiClient.post('/saveDocumentEntry', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search documents with filters
   * @param {object} filters - Search filters
   * @param {string} filters.major_head - Category filter
   * @param {string} filters.minor_head - Sub-category filter
   * @param {string} filters.tags - Tags filter (comma-separated)
   * @param {string} filters.from_date - Start date filter
   * @param {string} filters.to_date - End date filter
   * @param {number} filters.page - Page number
   * @param {number} filters.limit - Items per page
   * @returns {Promise} Response with documents array
   */
  async searchDocuments(filters = {}) {
    try {
      const response = await apiClient.get('/searchDocumentEntry', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Download a single document
   * @param {string|number} documentId - Document ID
   * @returns {Promise} Response with file blob
   */
  async downloadDocument(documentId) {
    try {
      const response = await apiClient.get(`/downloadDocument/${documentId}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Download multiple documents as ZIP
   * @param {Array} documentIds - Array of document IDs
   * @returns {Promise} Response with ZIP file blob
   */
  async downloadMultipleAsZip(documentIds) {
    try {
      const response = await apiClient.post('/downloadMultiple', 
        { documentIds },
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get document preview URL
   * @param {string|number} documentId - Document ID
   * @returns {string} Preview URL
   */
  getPreviewUrl(documentId) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    return `${baseUrl}/previewDocument/${documentId}`;
  }
};

export default documentService;
