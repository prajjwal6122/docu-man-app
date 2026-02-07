import React from 'react';
import './PageHeader.css';

/**
 * Page Header Component
 * Displays page title and optional breadcrumbs or actions
 */
const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div className="page-header">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3 className="page-title mb-1">{title}</h3>
          {subtitle && <p className="page-subtitle text-muted mb-0">{subtitle}</p>}
        </div>
        {children && <div className="page-actions">{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
