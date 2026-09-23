import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader-spinner"></div>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to appropriate login page based on target route
    const isOwnerRoute = location.pathname.startsWith('/owner');
    const isAdminRoute = location.pathname.startsWith('/admin');
    const loginRedirect = isAdminRoute ? '/admin/login' : (isOwnerRoute ? '/owner/login' : '/login');
    return <Navigate to={loginRedirect} state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    // Role not authorized
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
        <h2>Access Restricted</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Your current account role (<strong>{currentUser.role}</strong>) does not have permission to access this console.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="btn btn-primary"
          style={{ marginTop: '20px' }}
        >
          Return to Home
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
