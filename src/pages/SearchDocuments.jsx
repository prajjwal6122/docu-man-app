import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import PageHeader from '../components/layout/PageHeader';
import SearchFilters from '../components/forms/SearchFilters';
import DocumentTable from '../components/features/DocumentTable';
import DocumentCard from '../components/features/DocumentCard';
import DocumentPreviewModal from '../components/features/DocumentPreviewModal';
import EmptyState from '../components/ui/EmptyState';
import useToast from '../hooks/useToast';
import documentService from '../services/documentService';
import { formatDate, downloadFile } from '../utils/helpers';

const SearchDocuments = () => {
  const [filters, setFilters] = useState({
    majorHead: '',
    minorHead: '',
    tags: [],
    fromDate: null,
    toDate: null,
  });
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [existingTags, setExistingTags] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const toast = useToast();

  // Fetch existing tags on mount
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await documentService.getTags();
      if (Array.isArray(response.tags)) {
        setExistingTags(response.tags);
      } else if (Array.isArray(response)) {
        setExistingTags(response);
      }
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [field]: value };
      // Reset minor_head if major_head changes
      if (field === 'majorHead' && value !== prev.majorHead) {
        updated.minorHead = '';
      }
      return updated;
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);
    
    try {
      // Build search params
      const params = {};
      if (filters.majorHead) params.major_head = filters.majorHead;
      if (filters.minorHead) params.minor_head = filters.minorHead;
      if (filters.tags.length > 0) params.tags = filters.tags.join(',');
      if (filters.fromDate) params.from_date = formatDate(filters.fromDate);
      if (filters.toDate) params.to_date = formatDate(filters.toDate);

      const response = await documentService.searchDocuments(params);
      
      // Assuming response.data is an array or response.documents
      const results = response.documents || response.data || response || [];
      setDocuments(Array.isArray(results) ? results : []);
      
      if (results.length === 0) {
        toast.info('No documents found matching your search criteria');
      } else {
        toast.success(`Found ${results.length} document(s)`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to search documents. Please try again.';
      toast.error(errorMessage);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      majorHead: '',
      minorHead: '',
      tags: [],
      fromDate: null,
      toDate: null,
    });
    setDocuments([]);
    setSearched(false);
  };

  const handlePreview = (document) => {
    setSelectedDocument(document);
    setShowPreview(true);
  };

  const handleDownload = async (document) => {
    try {
      toast.info('Downloading file...');
      const blob = await documentService.downloadDocument(document.id || document.document_id);
      const filename = document.file_name || document.document_name || 'document.pdf';
      downloadFile(blob, filename);
      toast.success('File downloaded successfully');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to download file. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Search Documents"
        subtitle="Find documents using filters and tags"
      />

      <div className="container-fluid">
        {/* Search Filters */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <SearchFilters
              filters={filters}
              onChange={handleFilterChange}
              onSearch={handleSearch}
              onClear={handleClearFilters}
              existingTags={existingTags}
              loading={loading}
            />
          </div>
        </div>

        {/* Search Results */}
        {searched && (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  Search Results
                  {documents.length > 0 && (
                    <span className="badge bg-primary ms-2">{documents.length}</span>
                  )}
                </h5>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-muted mt-3">Searching documents...</p>
                </div>
              ) : documents.length === 0 ? (
                <EmptyState
                  title="No Documents Found"
                  message="Try adjusting your search filters or clear them to see all documents"
                  action={handleClearFilters}
                  actionLabel="Clear Filters"
                />
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="d-none d-md-block">
                    <DocumentTable
                      documents={documents}
                      onPreview={handlePreview}
                      onDownload={handleDownload}
                    />
                  </div>

                  {/* Mobile Card View */}
                  <div className="d-md-none">
                    {documents.map((doc) => (
                      <DocumentCard
                        key={doc.id || doc.document_id}
                        document={doc}
                        onPreview={handlePreview}
                        onDownload={handleDownload}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        show={showPreview}
        onClose={() => setShowPreview(false)}
        document={selectedDocument}
      />
    </MainLayout>
  );
};

export default SearchDocuments;
