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
      
      // Demo mode: Return mock tags if using test token
      const token = localStorage.getItem('authToken') || '';
      if (token.startsWith('test_token_')) {
        console.log('📦 Demo Mode: Returning mock tags');
        return {
          status: true,
          tags: [
            { tag_name: 'Invoice' },
            { tag_name: 'Contract' },
            { tag_name: '2024' },
            { tag_name: 'Important' },
            { tag_name: 'Finance' },
            { tag_name: 'HR' }
          ]
        };
      }
      
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
      
      // Demo mode: Return mock success if using test token
      const token = localStorage.getItem('authToken') || '';
      if (token.startsWith('test_token_')) {
        console.log('📦 Demo Mode: Simulating document upload');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        return {
          status: true,
          message: 'Document uploaded successfully',
          data: {
            document_id: 'DOC' + Date.now(),
            file_name: documentData.file.name,
            uploaded_at: new Date().toISOString()
          }
        };
      }
      
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
      
      // Demo mode: Return mock documents if using test token
      const token = localStorage.getItem('authToken') || '';
      if (token.startsWith('test_token_')) {
        console.log('📦 Demo Mode: Returning mock search results');
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
        
        const mockDocuments = [
          {
            id: 1,
            major_head: 'Finance',
            minor_head: 'Invoice',
            document_date: '15-12-2024',
            document_remarks: 'Q4 Invoice for vendor services',
            tags: ['Invoice', '2024', 'Finance'],
            uploaded_by: 'Test User',
            uploaded_at: '2024-12-15T10:30:00Z',
            file_name: 'invoice_q4_2024.pdf'
          },
          {
            id: 2,
            major_head: 'HR',
            minor_head: 'Contract',
            document_date: '01-11-2024',
            document_remarks: 'Employment contract for new hire',
            tags: ['Contract', 'HR', '2024'],
            uploaded_by: 'Test User',
            uploaded_at: '2024-11-01T09:15:00Z',
            file_name: 'employee_contract.pdf'
          },
          {
            id: 3,
            major_head: 'Legal',
            minor_head: 'Agreement',
            document_date: '20-10-2024',
            document_remarks: 'Vendor agreement renewal',
            tags: ['Agreement', 'Legal', 'Important'],
            uploaded_by: 'Test User',
            uploaded_at: '2024-10-20T14:45:00Z',
            file_name: 'vendor_agreement.pdf'
          }
        ];
        
        return {
          status: true,
          data: mockDocuments,
          recordsTotal: mockDocuments.length,
          recordsFiltered: mockDocuments.length
        };
      }
      
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
