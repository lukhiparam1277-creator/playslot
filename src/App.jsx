import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Sports } from './pages/Sports';
import { Venues } from './pages/Venues';
import { VenueDetail } from './pages/VenueDetail';
import { BookingSuccess } from './pages/BookingSuccess';
import { MyBookings } from './pages/MyBookings';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

// Owner Pages
import { OwnerApply } from './pages/owner/OwnerApply';
import { OwnerStatus } from './pages/owner/OwnerStatus';
import { OwnerLogin } from './pages/owner/OwnerLogin';
import { OwnerDashboard } from './pages/owner/OwnerDashboard';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOwnerRequests from './pages/admin/AdminOwnerRequests';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <Routes>
          {/* Public & Customer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Protected Routes */}
          <Route
            path="/booking-success"
            element={
              <ProtectedRoute>
                <BookingSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/success"
            element={
              <ProtectedRoute>
                <BookingSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Turf Owner Routes */}
          <Route path="/owner/apply" element={<OwnerApply />} />
          <Route path="/owner/status" element={<OwnerStatus />} />
          <Route path="/owner/login" element={<OwnerLogin />} />
          <Route
            path="/owner/dashboard"
            element={
              <ProtectedRoute allowedRoles={['turf_owner', 'admin']}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Super Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/owner-requests"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminOwnerRequests />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
