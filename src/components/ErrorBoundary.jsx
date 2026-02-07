import React from 'react';
import { getErrorMessage } from '../utils/helpers';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Logs error information and displays a fallback UI
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error Boundary Caught:', error);
    console.error('Error Info:', errorInfo);

    // Store error details in state
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    // Reset error boundary state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Optionally reload the page
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="error-boundary-container">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-10">
                <div className="card border-0 shadow-lg mt-5">
                  <div className="card-body p-5 text-center">
                    {/* Error Icon */}
                    <div className="mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#dc3545"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>

                    {/* Error Title */}
                    <h2 className="text-danger mb-3">Oops! Something Went Wrong</h2>
                    
                    {/* Error Message */}
                    <p className="text-muted mb-4">
                      We apologize for the inconvenience. An unexpected error has occurred in the application.
                    </p>

                    {/* Error Details (Development Mode) */}
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                      <div className="alert alert-danger text-start mb-4">
                        <h6 className="alert-heading">Error Details:</h6>
                        <hr />
                        <p className="mb-2">
                          <strong>Message:</strong> {getErrorMessage(this.state.error)}
                        </p>
                        {this.state.errorInfo && (
                          <details className="mt-2">
                            <summary style={{ cursor: 'pointer' }} className="text-primary">
                              View Stack Trace
                            </summary>
                            <pre className="mt-2 p-2 bg-light rounded small text-start" style={{ maxHeight: '200px', overflow: 'auto' }}>
                              {this.state.errorInfo.componentStack}
                            </pre>
                          </details>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="d-flex gap-2 justify-content-center flex-wrap">
                      <button
                        className="btn btn-primary px-4"
                        onClick={this.handleReset}
                      >
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
                          <polyline points="23 4 23 10 17 10"></polyline>
                          <polyline points="1 20 1 14 7 14"></polyline>
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                        Return to Home
                      </button>
                      
                      <button
                        className="btn btn-outline-secondary px-4"
                        onClick={() => window.location.reload()}
                      >
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
                          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
                        </svg>
                        Reload Page
                      </button>
                    </div>

                    {/* Help Text */}
                    <div className="mt-4 pt-3 border-top">
                      <small className="text-muted">
                        If this problem persists, please contact support or try again later.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inline Styles */}
          <style>{`
            .error-boundary-container {
              min-height: 100vh;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              display: flex;
              align-items: center;
              padding: 20px;
            }
            
            .error-boundary-container .card {
              animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @media (max-width: 576px) {
              .error-boundary-container {
                padding: 10px;
              }
              
              .error-boundary-container .card-body {
                padding: 2rem !important;
              }
              
              .error-boundary-container svg {
                width: 60px;
                height: 60px;
              }
            }
          `}</style>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
