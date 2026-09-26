import React, { useState } from 'react';
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

export const AdminLayout = () => {
  const { currentUser, logout } = useAuth();
  const { owners, turfs } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingOwnersCount = owners.filter(o => o.status === 'PENDING' || o.status === 'Pending').length;
  const pendingTurfsCount = turfs.filter(t => t.status === 'PENDING' || t.status === 'Pending').length;

  const handleLogout = () => {
    logout();
    showToast('Signed out from Super Admin Console', 'info');
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', label: 'Overview', icon: '📊', end: true },
    { to: '/admin/owner-requests', label: 'Owner Requests', icon: '📋', badge: pendingOwnersCount },
    { to: '/admin/users', label: 'Athletes & Users', icon: '👤' },
    { to: '/admin/owners', label: 'Turf Owners', icon: '👔' },
    { to: '/admin/turfs', label: 'Turfs Moderation', icon: '🏟️', badge: pendingTurfsCount },
    { to: '/admin/bookings', label: 'All Bookings', icon: '🎟️' },
    { to: '/admin/sports', label: 'Sports Management', icon: '🏆' },
    { to: '/admin/financial-reports', label: 'Financial Reports', icon: '💳' },
    { to: '/admin/settings', label: 'Platform Settings', icon: '⚙️' }
  ];

  return (
    <div className="admin-layout" style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Admin Sidebar */}
      <aside className={`admin-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`} style={{
        background: '#0F172A',
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
          <Link to="/admin/dashboard" className="admin-logo" style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontWeight: '800' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.35)' }}>
              🛡️
            </div>
            <span>PlaySlot <span style={{ color: '#EF4444', fontSize: '0.8rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>ADMIN</span></span>
          </Link>
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileSidebarOpen(false)}
            style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: '1.4rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Super Admin Badge */}
        <div style={{ background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', padding: '14px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt="Admin"
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #EF4444' }}
          />
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#FFFFFF' }}>Super Administrator</div>
            <div style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: '700' }}>Platform Governance</div>
          </div>
        </div>

        {/* Navigation items */}
        <ul className="admin-nav" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {navItems.map((item) => (
            <li key={item.to} className="admin-nav-item">
              <NavLink
                to={item.to}
                end={item.end}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  background: isActive ? '#EF4444' : 'transparent',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {Boolean(item.badge) && item.badge > 0 && (
                  <span style={{
                    background: '#F59E0B',
                    color: '#000',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    padding: '2px 7px',
                    borderRadius: '999px'
                  }}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Admin Footer */}
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

      {/* Admin Content View */}
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
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>Super Admin Governance</h2>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Master Platform Operations & Verification</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" className="btn btn-outline-dark btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🌐</span> Public Site
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 12px', borderRadius: '10px', background: '#FEF2F2', border: '1px solid #FCA5A5' }}>
              <span style={{ fontSize: '1.2rem' }}>🛡️</span>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#991B1B' }}>Admin Console</div>
                <div style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: '700' }}>● Super User</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="admin-main" style={{ padding: '32px', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
