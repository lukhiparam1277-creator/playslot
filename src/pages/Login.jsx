import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('user'); // 'user' | 'turf_owner' | 'admin'
  const [email, setEmail] = useState('user@playslot.com');
  const [password, setPassword] = useState('password123');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('admin@playslot.com');
    } else if (role === 'turf_owner') {
      setEmail('owner@playslot.com');
    } else {
      setEmail('user@playslot.com');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, selectedRole);
    showToast(`Welcome back, ${user.name}! ⚡`, 'success');

    if (selectedRole === 'admin') {
      navigate('/admin/dashboard');
    } else if (selectedRole === 'turf_owner') {
      navigate('/owner/dashboard');
    } else {
      navigate('/venues');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-badge" style={{ margin: '0 auto 12px auto', width: '48px', height: '48px', fontSize: '1.4rem' }}>
            ⚡
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)' }}>Sign in to PlaySlot</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Select your account type to access your dashboard
          </p>
        </div>

        {/* Role Selector Grid */}
        <div className="role-selector-grid">
          <div
            className={`role-btn ${selectedRole === 'user' ? 'active' : ''}`}
            onClick={() => handleRoleSelect('user')}
          >
            <span className="role-icon">👤</span>
            <span className="role-title">Athlete / Player</span>
          </div>

          <div
            className={`role-btn ${selectedRole === 'turf_owner' ? 'active' : ''}`}
            onClick={() => handleRoleSelect('turf_owner')}
          >
            <span className="role-icon">🏟️</span>
            <span className="role-title">Turf Owner</span>
          </div>

          <div
            className={`role-btn ${selectedRole === 'admin' ? 'active' : ''}`}
            onClick={() => handleRoleSelect('admin')}
          >
            <span className="role-icon">🛡️</span>
            <span className="role-title">Super Admin</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '22px' }}>
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '48px' }}>
            Sign In ➔
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account yet? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '700' }}>Register here</Link>
        </div>
      </div>
    </div>
  );
};
