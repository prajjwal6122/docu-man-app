import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PageErrorBoundary from '../components/PageErrorBoundary';

// Placeholder pages (to be created)
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const UploadDocument = React.lazy(() => import('../pages/UploadDocument'));
const SearchDocuments = React.lazy(() => import('../pages/SearchDocuments'));
const AdminPage = React.lazy(() => import('../pages/AdminPage'));

/**
 * Main application routes
 */
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <React.Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <PageErrorBoundary pageName="Login">
                <LoginPage />
              </PageErrorBoundary>
            } 
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageErrorBoundary pageName="Dashboard">
                  <Dashboard />
                </PageErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <PageErrorBoundary pageName="Upload Document">
                  <UploadDocument />
                </PageErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <PageErrorBoundary pageName="Search Documents">
                  <SearchDocuments />
                </PageErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <PageErrorBoundary pageName="Admin Panel">
                  <AdminPage />
                </PageErrorBoundary>
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* 404 - Not Found */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
