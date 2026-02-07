import React, { useState, useRef } from 'react';
import './FileUpload.css';

/**
 * File Upload Component
 * Supports drag-and-drop and file preview
 */
const FileUpload = ({
  label,
  file,
  onChange,
  error,
  required = false,
  disabled = false,
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSize = 10, // MB
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile) => {
    // Validate file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      onChange(null, `File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
    if (accept && !accept.includes(fileExtension)) {
      onChange(null, 'Invalid file type. Please select a PDF or image file.');
      return;
    }

    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    onChange(selectedFile, null);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null, null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="mb-3">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      <div
        className={`file-upload-container ${dragActive ? 'drag-active' : ''} ${error ? 'is-invalid' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="file-input"
          onChange={handleChange}
          accept={accept}
          disabled={disabled}
        />

        {!file ? (
          <div className="file-upload-placeholder text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted mb-3"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p className="mb-2">
              <strong>Click to upload</strong> or drag and drop
            </p>
            <p className="text-muted small mb-2">
              PDF, JPG, PNG (max {maxSize}MB)
            </p>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleButtonClick}
              disabled={disabled}
            >
              Choose File
            </button>
          </div>
        ) : (
          <div className="file-upload-preview">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="file-preview-image mb-3"
              />
            )}
            <div className="d-flex align-items-center justify-content-between">
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-size text-muted small">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={handleRemove}
                disabled={disabled}
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default FileUpload;
