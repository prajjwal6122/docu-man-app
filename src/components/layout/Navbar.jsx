import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Navbar.css';

/**
 * Navbar Component
 * Top navigation bar with user info and logout
 */
const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Check if in demo mode
  const token = localStorage.getItem("authToken") || "";
  const isDemoMode = token.startsWith("test_token_");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div
          className="bg-warning text-dark py-2 px-3 d-flex align-items-center justify-content-center"
          style={{ fontSize: "14px" }}
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
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <strong>DEMO MODE</strong>
          <span className="ms-2">
            Using mock data for testing • Not connected to real backend
          </span>
        </div>
      )}

      <nav className="navbar navbar-expand navbar-light bg-white">
        <div className="container-fluid">
          {/* Mobile Menu Toggle */}
          <button
            className="btn btn-link d-lg-none text-dark"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Spacer */}
          <div className="flex-grow-1"></div>

          {/* User Info & Logout */}
          <div className="navbar-nav ms-auto d-flex align-items-center">
            <div className="d-flex align-items-center gap-3">
              {/* User Info */}
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-primary rounded-circle" style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                  {(user?.name || "U")[0].toUpperCase()}
                </span>
                <div className="d-none d-md-block">
                  <div className="fw-semibold" style={{ fontSize: '14px', lineHeight: '1.2' }}>
                    {user?.name || "User"}
                  </div>
                  {user?.mobile && (
                    <small className="text-muted" style={{ fontSize: '12px' }}>
                      {user.mobile}
                    </small>
                  )}
                </div>
              </div>
              
              {/* Logout Button */}
              <button 
                className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                onClick={handleLogout}
                title="Logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span className="d-none d-md-inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};;

export default Navbar;
