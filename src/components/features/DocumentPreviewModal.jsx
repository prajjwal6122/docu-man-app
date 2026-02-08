import React from "react";
import Modal from "../ui/Modal";
import "./DocumentPreviewModal.css";

/**
 * Document Preview Modal Component
 * Shows document preview in a modal
 */
const DocumentPreviewModal = ({ show, onClose, document }) => {
  if (!document) return null;

  const isPDF = document.file_name?.toLowerCase().endsWith(".pdf");
  const isImage = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(
    document.file_name || "",
  );

  // Construct preview URL (adjust based on your API)
  const getPreviewUrl = () => {
    if (document.preview_url) return document.preview_url;
    if (document.file_url) return document.file_url;
    if (document.document_id) {
      return `https://apis.allsoft.co/api/documentManagement/previewDocument/${document.document_id}`;
    }
    return null;
  };

  const previewUrl = getPreviewUrl();

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={document.file_name || document.document_name || "Document Preview"}
      size="xl"
    >
      <div className="document-preview-container">
        {!previewUrl ? (
          <div className="text-center py-5">
            <p className="text-muted">Preview not available</p>
          </div>
        ) : isPDF ? (
          <iframe
            src={previewUrl}
            className="document-preview-iframe"
            title="Document Preview"
          />
        ) : isImage ? (
          <div className="text-center">
            <img
              src={previewUrl}
              alt={document.file_name}
              className="img-fluid document-preview-image"
            />
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <p className="text-muted mb-3">
              Preview not supported for this file type
            </p>
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open in New Tab
            </a>
          </div>
        )}
      </div>

      {/* Document Info */}
      <div className="document-info mt-3 p-3 bg-light rounded">
        <div className="row g-2">
          {document.major_head && (
            <div className="col-md-6">
              <small className="text-muted d-block">Category</small>
              <strong>{document.major_head}</strong>
            </div>
          )}
          {document.minor_head && (
            <div className="col-md-6">
              <small className="text-muted d-block">Subcategory</small>
              <strong>{document.minor_head}</strong>
            </div>
          )}
          {document.document_date && (
            <div className="col-md-6">
              <small className="text-muted d-block">Date</small>
              <strong>{document.document_date}</strong>
            </div>
          )}
          {document.uploaded_by && (
            <div className="col-md-6">
              <small className="text-muted d-block">Uploaded By</small>
              <strong>{document.uploaded_by}</strong>
            </div>
          )}
          {document.tags && (
            <div className="col-12">
              <small className="text-muted d-block mb-1">Tags</small>
              <div className="d-flex flex-wrap gap-1">
                {document.tags.split(",").map((tag, i) => (
                  <span key={i} className="badge bg-secondary">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          {document.document_remarks && (
            <div className="col-12">
              <small className="text-muted d-block">Remarks</small>
              <p className="mb-0">{document.document_remarks}</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DocumentPreviewModal;
