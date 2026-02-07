import React from 'react';
import Button from '../ui/Button';
import { format } from 'date-fns';
import './DocumentCard.css';

/**
 * Document Card Component
 * Displays search results in card format (mobile)
 */
const DocumentCard = ({ document, onPreview, onDownload }) => {
  const tags = document.tags?.split(',') || [];

  return (
    <div className="document-card card border-0 shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h6 className="card-title mb-1">{document.major_head}</h6>
            <p className="text-muted small mb-0">{document.minor_head}</p>
          </div>
          <span className="badge bg-light text-dark">
            {format(new Date(document.document_date), 'dd/MM/yyyy')}
          </span>
        </div>

        {tags.length > 0 && (
          <div className="mb-3">
            <div className="d-flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span key={index} className="badge bg-primary">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {document.document_remarks && (
          <p className="card-text text-muted small mb-3">
            {document.document_remarks}
          </p>
        )}

        <div className="document-card-footer">
          <small className="text-muted">
            {document.file_name || document.document_name}
          </small>
          <div className="d-flex gap-2">
            <Button
              variant="info"
              size="sm"
              onClick={() => onPreview(document)}
            >
              Preview
            </Button>
            <Button
              variant="success"
              size="sm"
              onClick={() => onDownload(document)}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
