import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const Navbar = () => {
  const { currentUser, logout, switchRole } = useAuth();
  const { showToast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/');
  };

  return (
    <>
      <header className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="logo">
            <div className="logo-badge">⚡</div>
            <span>PlaySlot<span className="brand-dot">.</span></span>
          </Link>

          <ul className={`nav-menu ${mobileOpen ? 'active' : ''}`}>
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/sports" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                Sports
              </NavLink>
            </li>
            <li>
              <NavLink to="/venues" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                Turfs & Arenas
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-bookings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                My Bookings
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="nav-actions">
            {/* Quick Demo Role Switcher */}
            <select
              value={currentUser?.role || 'guest'}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'admin') {
                  switchRole('admin');
                  navigate('/admin/dashboard');
                  showToast('Switched to Super Admin Console 🛡️', 'success');
                } else if (val === 'turf_owner') {
                  switchRole('turf_owner');
                  navigate('/owner/dashboard');
                  showToast('Switched to Turf Owner Console 🏟️', 'success');
                } else {
                  switchRole('user');
                  navigate('/my-bookings');
                  showToast('Switched to Athlete User 👤', 'success');
                }
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem',
                fontWeight: '700',
                background: '#F8FAFC',
                cursor: 'pointer'
              }}
            >
              <option value="user">👤 Athlete (User)</option>
              <option value="turf_owner">🏟️ Turf Owner</option>
              <option value="admin">🛡️ Super Admin</option>
            </select>

            {currentUser ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Link to={currentUser.role === 'admin' ? '/admin/dashboard' : (currentUser.role === 'turf_owner' ? '/owner/dashboard' : '/profile')} className="user-profile-menu">
                  <img src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'} alt={currentUser.name} className="avatar-sm" />
                  <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-dark)' }}>
                    {currentUser.name.split(' ')[0]}
                  </span>
                </Link>
                <button onClick={handleLogout} className="btn btn-outline-dark btn-sm" title="Log Out">
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/login" className="btn btn-outline-dark btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
              </div>
            )}

            <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Bar */}
      <nav className="mobile-bottom-nav">
        <NavLink to="/" className={({ isActive }) => `mobile-bottom-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">🏠</span>
          <span>Home</span>
        </NavLink>
        <NavLink to="/sports" className={({ isActive }) => `mobile-bottom-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">🏆</span>
          <span>Sports</span>
        </NavLink>
        <NavLink to="/venues" className={({ isActive }) => `mobile-bottom-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">🏟️</span>
          <span>Turfs</span>
        </NavLink>
        <NavLink to="/my-bookings" className={({ isActive }) => `mobile-bottom-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">🎟️</span>
          <span>Bookings</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `mobile-bottom-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon">👤</span>
          <span>Profile</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;
