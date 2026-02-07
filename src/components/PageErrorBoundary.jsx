import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../utils/helpers';

/**
 * Page Error Boundary
 * A smaller error boundary for individual pages
 * Allows navigation without breaking the entire app
 */
class PageErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Page Error:', error);
    console.error('Error Info:', errorInfo);
    this.setState({ error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <PageErrorFallback 
          error={this.state.error}
          pageName={this.props.pageName}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Page Error Fallback UI
 */
function PageErrorFallback({ error, pageName }) {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card border-danger">
            <div className="card-body text-center p-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc3545"
                strokeWidth="2"
                className="mb-3"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              
              <h4 className="text-danger mb-3">Page Error</h4>
              
              <p className="text-muted mb-4">
                This {pageName || 'page'} encountered an error and couldn't load properly.
              </p>

              {process.env.NODE_ENV === 'development' && error && (
                <div className="alert alert-danger text-start mb-3">
                  <small>
                    <strong>Error:</strong> {getErrorMessage(error)}
                  </small>
                </div>
              )}

              <div className="d-flex gap-2 justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageErrorBoundary;
