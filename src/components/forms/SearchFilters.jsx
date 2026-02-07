import React, { useState, useEffect } from 'react';
import Select from '../ui/Select';
import DatePicker from '../ui/DatePicker';
import TagInput from '../ui/TagInput';
import Button from '../ui/Button';

/**
 * Search Filters Component
 * Provides filters for document search
 */
const SearchFilters = ({
  filters,
  onChange,
  onSearch,
  onClear,
  existingTags = [],
  loading = false,
}) => {
  // Category options (same as upload form)
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

  // Sub-category options map
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

  const subCategoryOptions = filters.majorHead
    ? subCategoryOptionsMap[filters.majorHead] || []
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const hasActiveFilters = () => {
    return (
      filters.majorHead ||
      filters.minorHead ||
      filters.tags.length > 0 ||
      filters.fromDate ||
      filters.toDate
    );
  };

  return (
    <form onSubmit={handleSubmit} className="search-filters">
      <div className="row">
        <div className="col-md-6">
          <Select
            label="Category"
            value={filters.majorHead}
            onChange={(e) => onChange('majorHead', e.target.value)}
            options={categoryOptions}
            placeholder="All categories"
            disabled={loading}
          />
        </div>

        <div className="col-md-6">
          <Select
            label="Sub-Category"
            value={filters.minorHead}
            onChange={(e) => onChange('minorHead', e.target.value)}
            options={subCategoryOptions}
            placeholder={
              filters.majorHead ? 'All sub-categories' : 'Select category first'
            }
            disabled={loading || !filters.majorHead}
          />
        </div>

        <div className="col-12">
          <TagInput
            label="Tags"
            tags={filters.tags}
            onChange={(tags) => onChange('tags', tags)}
            suggestions={existingTags}
            placeholder="Search by tags (optional)"
            disabled={loading}
            maxTags={5}
          />
        </div>

        <div className="col-md-6">
          <DatePicker
            label="From Date"
            selected={filters.fromDate}
            onChange={(date) => onChange('fromDate', date)}
            placeholderText="Select start date"
            maxDate={filters.toDate || new Date()}
            disabled={loading}
          />
        </div>

        <div className="col-md-6">
          <DatePicker
            label="To Date"
            selected={filters.toDate}
            onChange={(date) => onChange('toDate', date)}
            placeholderText="Select end date"
            minDate={filters.fromDate}
            maxDate={new Date()}
            disabled={loading}
          />
        </div>

        <div className="col-12">
          <div className="d-flex gap-2 justify-content-end">
            {hasActiveFilters() && (
              <Button
                type="button"
                variant="secondary"
                onClick={onClear}
                disabled={loading}
              >
                Clear Filters
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              {loading ? 'Searching...' : 'Search Documents'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchFilters;
