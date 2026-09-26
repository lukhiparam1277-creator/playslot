import React, { useState } from 'react';
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const OwnerLayout = () => {
  const { currentUser, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    showToast('Logged out from Owner Console', 'info');
    navigate('/owner/login');
  };

  const navItems = [
    { to: '/owner/dashboard', label: 'Dashboard', icon: '📊', end: true },
    { to: '/owner/turfs', label: 'My Turfs', icon: '🏟️', end: true },
    { to: '/owner/turfs/add', label: 'Add Turf', icon: '➕' },
    { to: '/owner/slots', label: 'Slot Schedules', icon: '⏰' },
    { to: '/owner/bookings', label: 'Bookings', icon: '🎟️' },
    { to: '/owner/customers', label: 'Customers', icon: '👥' },
    { to: '/owner/revenue', label: 'Revenue & Payouts', icon: '💰' },
    { to: '/owner/profile', label: 'Owner Profile', icon: '👤' },
    { to: '/owner/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="owner-layout" style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Sidebar */}
      <aside className={`owner-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`} style={{
        background: '#0B132B',
        color: '#FFFFFF',
        padding: '24px 18px',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 1200
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <Link to="/owner/dashboard" className="owner-logo" style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontWeight: '800' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              🏟️
            </div>
            <span>PlaySlot <span style={{ color: '#10B981', fontSize: '0.8rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>OWNER</span></span>
          </Link>
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileSidebarOpen(false)}
            style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: '1.4rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Owner Profile Snippet */}
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '14px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
            alt="Owner"
            style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #10B981' }}
          />
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser?.name || 'Vikram Malhotra'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser?.businessName || 'Turf Partner'}
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <ul className="owner-nav" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {navItems.map((item) => (
            <li key={item.to} className="owner-nav-item">
              <NavLink
                to={item.to}
                end={item.end}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) => `owner-nav-link ${isActive ? 'active' : ''}`}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  background: isActive ? '#10B981' : 'transparent',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                })}
              >
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Sidebar Footer */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '8px',
              color: '#94A3B8',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}
          >
            <span>🌐</span>
            <span>View Public Website</span>
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#EF4444',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <header style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              style={{
                display: 'none',
                background: '#F1F5F9',
                border: '1px solid #CBD5E1',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              className="mobile-header-toggle"
            >
              ☰
            </button>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>Turf Partner Console</h2>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Commercial Turf Management & Schedules</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" className="btn btn-outline-dark btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🌐</span> Public Site
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 12px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                alt={currentUser?.name}
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0F172A' }}>{currentUser?.name || 'Owner'}</div>
                <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: '700' }}>● Active Partner</div>
              </div>
            </div>
          </div>
        </header>

        {/* Child Routes */}
        <main className="owner-main" style={{ padding: '32px', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
