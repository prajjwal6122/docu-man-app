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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white border-bottom shadow-sm">
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
        <div className="navbar-nav ms-auto">
          <div className="nav-item dropdown">
            <button
              className="btn btn-link nav-link dropdown-toggle text-dark text-decoration-none"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="me-2">{user?.name || user?.mobile || 'User'}</span>
              <span className="badge bg-primary rounded-circle">
                {(user?.name || 'U')[0].toUpperCase()}
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li>
                <span className="dropdown-item-text">
                  <strong>{user?.name || 'User'}</strong>
                  <br />
                  <small className="text-muted">{user?.mobile || ''}</small>
                </span>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
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
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
