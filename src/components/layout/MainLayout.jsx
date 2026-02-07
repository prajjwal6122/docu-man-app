import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './MainLayout.css';

/**
 * Main Layout Component
 * Wraps all authenticated pages with navbar and sidebar
 */
const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="main-layout">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="main-wrapper">
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
