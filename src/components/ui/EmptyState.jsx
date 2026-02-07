import React from 'react';
import './EmptyState.css';

/**
 * Empty State Component
 * Shown when no results or data is available
 */
const EmptyState = ({
  icon,
  title = 'No Results Found',
  message = 'Try adjusting your search filters',
  action,
  actionLabel = 'Clear Filters',
}) => {
  const defaultIcon = (
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
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
      <line x1="11" y1="8" x2="11" y2="14"></line>
      <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>
  );

  return (
    <div className="empty-state text-center py-5">
      <div className="empty-state-icon mb-3">{icon || defaultIcon}</div>
      <h5 className="empty-state-title mb-2">{title}</h5>
      <p className="empty-state-message text-muted mb-4">{message}</p>
      {action && (
        <button onClick={action} className="btn btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
