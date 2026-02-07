import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/layout/PageHeader";
import useAuth from "../hooks/useAuth";

/**
 * Dashboard Page
 * Main landing page after login
 */
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Upload Document",
      description: "Upload a new document with metadata",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      ),
      action: () => navigate("/upload"),
      color: "primary",
    },
    {
      title: "Search Documents",
      description: "Find documents using filters",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      ),
      action: () => navigate("/search"),
      color: "success",
    },
    {
      title: "Admin Panel",
      description: "Manage users and settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      action: () => navigate("/admin"),
      color: "warning",
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        title={`Welcome${user?.name ? ", " + user.name : ""}!`}
        subtitle="Manage your documents efficiently"
      />

      <div className="container-fluid">
        {/* Welcome Card */}
        <div className="row mb-4">
          <div className="col-12">
            <div
              className="card border-0 shadow-sm bg-gradient"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <div className="card-body p-4 text-white">
                <h3 className="mb-2">Document Management Made Easy</h3>
                <p className="mb-0 opacity-75">
                  Upload, search, and manage your documents with ease. Get
                  started by selecting a quick action below.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row g-4 mb-4">
          {quickActions.map((action, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div
                className="card border-0 shadow-sm h-100 cursor-pointer"
                onClick={action.action}
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="card-body p-4 text-center">
                  <div className={`text-${action.color} mb-3`}>
                    {action.icon}
                  </div>
                  <h5 className="card-title mb-2">{action.title}</h5>
                  <p className="card-text text-muted">{action.description}</p>
                  <button className={`btn btn-${action.color} mt-2`}>
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Info */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title mb-3">
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  System Information
                </h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block mb-1">Status</small>
                      <strong className="text-success">
                        <span className="badge bg-success">Online</span>
                      </strong>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block mb-1">Version</small>
                      <strong>1.0.0</strong>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block mb-1">
                        Environment
                      </small>
                      <strong>{import.meta.env.MODE}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
