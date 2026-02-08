import apiClient from './apiClient';
import './interceptors'; // Import interceptors to initialize them

const documentService = {
  /**
   * Get all available tags
   * @param {string} term - Optional search term for filtering tags
   * @returns {Promise} Response with tags array
   */
  async getTags(term = '') {
    try {
      console.log('🏷️ Fetching tags with term:', term);
      const response = await apiClient.post('/documentTags', { term });
      console.log('✅ Tags received:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Tags error:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Upload a document with metadata
   * @param {object} documentData - Document data object containing file and metadata
   * @param {File} documentData.file - The document file to upload
   * @param {string} documentData.major_head - Category (major head)
   * @param {string} documentData.minor_head - Subcategory (minor head)
   * @param {string} documentData.document_date - Document date
   * @param {string} documentData.document_remarks - Document remarks
   * @param {Array} documentData.tags - Array of tag objects with tag_name
   * @param {string} documentData.user_id - User ID
   * @returns {Promise} Response with upload status
   */
  async uploadDocument(documentData) {
    try {
      const formData = new FormData();
      formData.append('file', documentData.file);
      
      // Create data object matching API expectations
      const data = {
        major_head: documentData.major_head,
        minor_head: documentData.minor_head,
        document_date: documentData.document_date,
        document_remarks: documentData.document_remarks,
        tags: documentData.tags || [],
        user_id: documentData.user_id
      };
      
      formData.append('data', JSON.stringify(data));
      
      console.log('📤 Uploading document:', {
        major_head: data.major_head,
        minor_head: data.minor_head,
        tags: data.tags,
        user_id: data.user_id
      });
      
      // Don't manually set Content-Type - axios will set it with boundary for FormData
      // The interceptor will add the token header automatically
      const response = await apiClient.post('/saveDocumentEntry', formData);
      
      console.log('✅ Upload response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Upload error:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Search documents with filters
   * @param {object} filters - Search filters
   * @param {string} filters.major_head - Category filter
   * @param {string} filters.minor_head - Sub-category filter
   * @param {Array} filters.tags - Array of tag objects with tag_name
   * @param {string} filters.from_date - Start date filter
   * @param {string} filters.to_date - End date filter
   * @param {string} filters.uploaded_by - Uploaded by filter
   * @param {number} filters.start - Start index (default 0)
   * @param {number} filters.length - Number of items (default 10)
   * @param {string} filters.filterId - Filter ID
   * @param {object} filters.search - Search object with value property
   * @returns {Promise} Response with documents array
   */
  async searchDocuments(filters = {}) {
    try {
      const searchPayload = {
        major_head: filters.major_head || '',
        minor_head: filters.minor_head || '',
        from_date: filters.from_date || '',
        to_date: filters.to_date || '',
        tags: filters.tags || [],
        uploaded_by: filters.uploaded_by || '',
        start: filters.start || 0,
        length: filters.length || 10,
        filterId: filters.filterId || '',
        search: {
          value: filters.search?.value || ''
        }
      };
      
      console.log('🔍 Searching documents with filters:', searchPayload);
      const response = await apiClient.post('/searchDocumentEntry', searchPayload);
      console.log('✅ Search results:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Search error:', error.response?.data || error.message);
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
