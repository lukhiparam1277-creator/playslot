import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layouts
import UserLayout from './layouts/UserLayout';
import OwnerLayout from './layouts/OwnerLayout';
import AdminLayout from './layouts/AdminLayout';

// Route Protectors
import { ProtectedRoute, AdminRoute, OwnerRoute } from './components/common/ProtectedRoute';

// Public & Customer Pages
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
import OwnerLogin from './pages/owner/OwnerLogin';
import OwnerRegister from './pages/owner/OwnerRegister';
import OwnerStatus from './pages/owner/OwnerStatus';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import OwnerTurfs from './pages/owner/OwnerTurfs';
import OwnerTurfForm from './pages/owner/OwnerTurfForm';
import OwnerSlots from './pages/owner/OwnerSlots';
import OwnerBookings from './pages/owner/OwnerBookings';
import OwnerCustomers from './pages/owner/OwnerCustomers';
import OwnerRevenue from './pages/owner/OwnerRevenue';
import OwnerProfile from './pages/owner/OwnerProfile';
import OwnerSettings from './pages/owner/OwnerSettings';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOwnerRequests from './pages/admin/AdminOwnerRequests';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOwners from './pages/admin/AdminOwners';
import AdminTurfModeration from './pages/admin/AdminTurfModeration';
import AdminBookings from './pages/admin/AdminBookings';
import AdminSports from './pages/admin/AdminSports';
import AdminFinancialReports from './pages/admin/AdminFinancialReports';
import AdminSettings from './pages/admin/AdminSettings';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ========================================= */}
        {/* 1. PUBLIC & ATHLETE USER WEBSITE          */}
        {/* ========================================= */}
        <Route element={<UserLayout />}>
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
              <ProtectedRoute allowedRoles={['user', 'turf_owner', 'admin']}>
                <BookingSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/success"
            element={
              <ProtectedRoute allowedRoles={['user', 'turf_owner', 'admin']}>
                <BookingSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute allowedRoles={['user', 'turf_owner', 'admin']}>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['user', 'turf_owner', 'admin']}>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Standalone Owner Registration & Status inside User layout */}
          <Route path="/owner/apply" element={<OwnerRegister />} />
          <Route path="/owner/register" element={<OwnerRegister />} />
          <Route path="/owner/status" element={<OwnerStatus />} />
          <Route path="/owner/login" element={<OwnerLogin />} />
        </Route>

        {/* ========================================= */}
        {/* 2. TURF OWNER CONSOLE (OwnerLayout)       */}
        {/* ========================================= */}
        <Route
          path="/owner"
          element={
            <OwnerRoute>
              <OwnerLayout />
            </OwnerRoute>
          }
        >
          <Route index element={<OwnerDashboard />} />
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="turfs" element={<OwnerTurfs />} />
          <Route path="turfs/add" element={<OwnerTurfForm />} />
          <Route path="turfs/edit/:id" element={<OwnerTurfForm />} />
          <Route path="slots" element={<OwnerSlots />} />
          <Route path="bookings" element={<OwnerBookings />} />
          <Route path="customers" element={<OwnerCustomers />} />
          <Route path="revenue" element={<OwnerRevenue />} />
          <Route path="profile" element={<OwnerProfile />} />
          <Route path="settings" element={<OwnerSettings />} />
        </Route>

        {/* ========================================= */}
        {/* 3. SUPER ADMIN CONSOLE (AdminLayout)      */}
        {/* ========================================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="owner-requests" element={<AdminOwnerRequests />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="owners" element={<AdminOwners />} />
          <Route path="turfs" element={<AdminTurfModeration />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="sports" element={<AdminSports />} />
          <Route path="financial-reports" element={<AdminFinancialReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* ========================================= */}
        {/* 4. 404 FALLBACK CATCH-ALL                 */}
        {/* ========================================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
