import React, { useState, useEffect } from 'react';
import Select from '../ui/Select';
import DatePicker from '../ui/DatePicker';
import TagInput from '../ui/TagInput';
import FileUpload from '../ui/FileUpload';
import Input from '../ui/Input';
import Button from '../ui/Button';
import validators from '../../utils/validators';

/**
 * Upload Document Form Component
 */
const UploadDocumentForm = ({
  onSubmit,
  existingTags = [],
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    documentDate: new Date(),
    majorHead: '',
    minorHead: '',
    tags: [],
    remarks: '',
    file: null,
  });

  const [errors, setErrors] = useState({});

  // Category options (major_head)
  const categoryOptions = [
    { value: 'Finance', label: 'Finance' },
    { value: 'HR', label: 'Human Resources' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Legal', label: 'Legal' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Administration', label: 'Administration' },
  ];

  // Sub-category options (minor_head) - dynamic based on category
  const subCategoryOptionsMap = {
    Finance: [
      { value: 'Invoices', label: 'Invoices' },
      { value: 'Receipts', label: 'Receipts' },
      { value: 'Budget', label: 'Budget Reports' },
      { value: 'Tax', label: 'Tax Documents' },
      { value: 'Audit', label: 'Audit Reports' },
    ],
    HR: [
      { value: 'Employment', label: 'Employment Contracts' },
      { value: 'Payroll', label: 'Payroll' },
      { value: 'Leave', label: 'Leave Records' },
      { value: 'Performance', label: 'Performance Reviews' },
    ],
    Operations: [
      { value: 'Procedures', label: 'Standard Operating Procedures' },
      { value: 'Reports', label: 'Operational Reports' },
      { value: 'Quality', label: 'Quality Assurance' },
    ],
    Legal: [
      { value: 'Contracts', label: 'Contracts' },
      { value: 'Compliance', label: 'Compliance Documents' },
      { value: 'Litigation', label: 'Litigation Records' },
    ],
    IT: [
      { value: 'Infrastructure', label: 'Infrastructure' },
      { value: 'Security', label: 'Security Policies' },
      { value: 'Projects', label: 'Project Documentation' },
    ],
    Marketing: [
      { value: 'Campaigns', label: 'Campaign Materials' },
      { value: 'Analytics', label: 'Analytics Reports' },
      { value: 'Creative', label: 'Creative Assets' },
    ],
    Sales: [
      { value: 'Proposals', label: 'Sales Proposals' },
      { value: 'Contracts', label: 'Sales Contracts' },
      { value: 'Reports', label: 'Sales Reports' },
    ],
    Administration: [
      { value: 'Policies', label: 'Company Policies' },
      { value: 'Memos', label: 'Internal Memos' },
      { value: 'Minutes', label: 'Meeting Minutes' },
    ],
  };

  const subCategoryOptions = formData.majorHead
    ? subCategoryOptionsMap[formData.majorHead] || []
    : [];

  // Reset minor_head when major_head changes
  useEffect(() => {
    if (formData.majorHead) {
      setFormData((prev) => ({ ...prev, minorHead: '' }));
    }
  }, [formData.majorHead]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (file, error) => {
    if (error) {
      setErrors((prev) => ({ ...prev, file: error }));
      setFormData((prev) => ({ ...prev, file: null }));
    } else {
      setFormData((prev) => ({ ...prev, file }));
      setErrors((prev) => ({ ...prev, file: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Validate date
    if (!formData.documentDate) {
      newErrors.documentDate = 'Document date is required';
    }

    // Validate category
    if (!formData.majorHead) {
      newErrors.majorHead = 'Category is required';
    }

    // Validate sub-category
    if (!formData.minorHead) {
      newErrors.minorHead = 'Sub-category is required';
    }

    // Validate tags (at least one required)
    if (formData.tags.length === 0) {
      newErrors.tags = 'Please add at least one tag';
    }

    // Validate file
    const fileError = validators.file(formData.file);
    if (fileError) {
      newErrors.file = fileError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      documentDate: new Date(),
      majorHead: '',
      minorHead: '',
      tags: [],
      remarks: '',
      file: null,
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <DatePicker
            label="Document Date"
            selected={formData.documentDate}
            onChange={(date) => handleChange('documentDate', date)}
            error={errors.documentDate}
            required
            maxDate={new Date()}
            disabled={loading}
          />
        </div>

        <div className="col-md-6">
          <Select
            label="Category"
            value={formData.majorHead}
            onChange={(e) => handleChange('majorHead', e.target.value)}
            options={categoryOptions}
            error={errors.majorHead}
            required
            disabled={loading}
          />
        </div>

        <div className="col-md-6">
          <Select
            label="Sub-Category"
            value={formData.minorHead}
            onChange={(e) => handleChange('minorHead', e.target.value)}
            options={subCategoryOptions}
            error={errors.minorHead}
            required
            disabled={loading || !formData.majorHead}
            placeholder={
              formData.majorHead
                ? 'Select sub-category'
                : 'Select category first'
            }
          />
        </div>

        <div className="col-md-6">
          <TagInput
            label="Tags"
            tags={formData.tags}
            onChange={(tags) => handleChange('tags', tags)}
            suggestions={existingTags}
            error={errors.tags}
            required
            disabled={loading}
            maxTags={10}
          />
        </div>

        <div className="col-12">
          <Input
            label="Remarks"
            type="textarea"
            value={formData.remarks}
            onChange={(e) => handleChange('remarks', e.target.value)}
            placeholder="Optional notes or comments about the document"
            disabled={loading}
            rows={3}
            as="textarea"
          />
        </div>

        <div className="col-12">
          <FileUpload
            label="Upload File"
            file={formData.file}
            onChange={handleFileChange}
            error={errors.file}
            required
            disabled={loading}
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={10}
          />
        </div>

        <div className="col-12">
          <div className="d-flex gap-2 justify-content-end">
            <Button
              type="button"
              variant="secondary"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              {loading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UploadDocumentForm;
