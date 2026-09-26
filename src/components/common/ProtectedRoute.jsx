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
    // Role not authorized - redirect to respective portal
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (currentUser.role === 'turf_owner') {
      return <Navigate to="/owner/dashboard" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['admin']}>
    {children}
  </ProtectedRoute>
);

export const OwnerRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['turf_owner', 'admin']}>
    {children}
  </ProtectedRoute>
);

export const UserRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['user', 'turf_owner', 'admin']}>
    {children}
  </ProtectedRoute>
);

export default ProtectedRoute;
