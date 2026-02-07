import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import PageHeader from '../components/layout/PageHeader';
import UserCreationForm from '../components/forms/UserCreationForm';
import useToast from '../hooks/useToast';

/**
 * Admin Page - Static User Creation
 * This is a UI-only page for creating user accounts
 * Note: The OTP-based login system allows any mobile number to register/login
 */
const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [createdUsers, setCreatedUsers] = useState([]);
  const toast = useToast();

  const handleCreateUser = async (userData) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Add user to local state (static)
      const newUser = {
        id: Date.now(),
        username: userData.username,
        createdAt: new Date().toISOString(),
      };
      
      setCreatedUsers((prev) => [newUser, ...prev]);
      toast.success(`User "${userData.username}" created successfully!`);
      setLoading(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <PageHeader
        title="User Management"
        subtitle="Create and manage user accounts"
      />

      <div className="container-fluid">
        <div className="row g-4">
          {/* User Creation Form */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="me-2"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <line x1="19" y1="8" x2="19" y2="14"></line>
                    <line x1="22" y1="11" x2="16" y2="11"></line>
                  </svg>
                  Create New User
                </h5>
                <p className="text-muted mb-4">
                  Fill in the form below to create a new user account. This is a static interface - in production, this would be connected to a backend API.
                </p>
                <UserCreationForm onSubmit={handleCreateUser} loading={loading} />
              </div>
            </div>
          </div>

          {/* Recently Created Users */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="me-2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Recently Created Users
                </h5>
                
                {createdUsers.length === 0 ? (
                  <div className="text-center py-5">
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
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <p className="text-muted mb-0">No users created yet</p>
                    <small className="text-muted">
                      Create your first user using the form
                    </small>
                  </div>
                ) : (
                  <div className="list-group">
                    {createdUsers.map((user) => (
                      <div
                        key={user.id}
                        className="list-group-item list-group-item-action"
                      >
                        <div className="d-flex w-100 justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{user.username}</h6>
                            <small className="text-muted">
                              Created: {new Date(user.createdAt).toLocaleString()}
                            </small>
                          </div>
                          <span className="badge bg-success">Active</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Info Card */}
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body p-4">
                <h6 className="card-title">
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Note
                </h6>
                <p className="text-muted small mb-0">
                  <strong>Note:</strong> This is a static demonstration interface. Users can login/register directly using OTP-based authentication on the login page. In a production environment, this interface would be connected to backend APIs for user management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
