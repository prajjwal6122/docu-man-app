import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
import UploadDocumentForm from "../components/forms/UploadDocumentForm";
import useToast from "../hooks/useToast";
import useAuth from "../hooks/useAuth";
import documentService from "../services/documentService";

/**
 * Upload Document Page
 * Allows users to upload documents with metadata
 */
const UploadDocument = () => {
  const [existingTags, setExistingTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = useAuth();

  // Fetch existing tags on component mount
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await documentService.getTags();

      // Handle different response formats
      if (Array.isArray(response.tags)) {
        setExistingTags(response.tags);
      } else if (Array.isArray(response)) {
        setExistingTags(response);
      }
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      // Don't show error toast for tag fetching, it's not critical
    }
  };

  const handleUpload = async (formData) => {
    setLoading(true);

    try {
      // Format date as DD-MM-YYYY (API expects this format)
      const date = new Date(formData.documentDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      
      // Transform form data to match API expectations
      const documentData = {
        file: formData.file,
        major_head: formData.majorHead,
        minor_head: formData.minorHead,
        document_date: formattedDate, // Format as DD-MM-YYYY
        document_remarks: formData.remarks,
        tags: formData.tags.map(tag => ({ tag_name: tag })), // Convert tags to array of objects
        user_id: user?.mobile || user?.id || 'unknown' // Use mobile number or user ID
      };
      
      console.log('📋 Upload form data:', documentData);

      const response = await documentService.uploadDocument(documentData);

      toast.success("Document uploaded successfully!");

      // Refresh tags in case new ones were added
      fetchTags();

      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.data ||
        "Failed to upload document. Please try again.";
      toast.error(errorMessage);
      console.error('Upload error details:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Upload Document"
        subtitle="Upload a document with metadata for easy retrieval"
      />

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <UploadDocumentForm
                  onSubmit={handleUpload}
                  existingTags={existingTags}
                  loading={loading}
                />
              </div>
            </div>

            {/* Help Card */}
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body p-4">
                <h6 className="card-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="me-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Upload Guidelines
                </h6>
                <ul className="small text-muted mb-0">
                  <li>Maximum file size: 10MB</li>
                  <li>Supported formats: PDF, Images, Word, Excel</li>
                  <li>Use meaningful tags for easier searching</li>
                  <li>Fill in the category and subcategory accurately</li>
                  <li>Add remarks for additional context</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UploadDocument;
