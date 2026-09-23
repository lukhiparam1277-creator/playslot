import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: 'admin@playslot.com',
    password: 'password'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(formData.email, formData.password, 'admin');
    if (res.success) {
      addToast('Super Admin access granted! Welcome back.', 'success');
      navigate('/admin/dashboard');
    } else {
      addToast(res.message || 'Invalid administrator credentials.', 'error');
    }
  };

  const handleQuickDemo = () => {
    login('admin@playslot.com', 'password', 'admin');
    addToast('Logged in as Super Admin (Demo Mode)', 'success');
    navigate('/admin/dashboard');
  };

  return (
    <div className="auth-page-wrapper">
      <div className="container" style={{ maxWidth: '480px', padding: '60px 20px' }}>
        <div className="card glass-card" style={{ padding: '36px', border: '1px solid rgba(239, 68, 68, 0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #ef4444, #f59e0b)' }}></div>
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', margin: '0 auto 16px auto', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <i className="fas fa-shield-alt"></i>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '6px' }}>Master Admin Portal</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>PlaySlot Operations & Super Governance Console</p>
          </div>

          <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demo Admin Credentials</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '2px' }}>admin@playslot.com / password</div>
            </div>
            <button type="button" onClick={handleQuickDemo} className="btn btn-sm" style={{ background: '#ef4444', color: '#fff', fontSize: '0.8rem', padding: '6px 12px' }}>
              Auto Login
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                <i className="fas fa-user-shield" style={{ color: '#ef4444' }}></i> Admin Email
              </label>
              <input
                type="email"
                className="form-control"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@playslot.com"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                <i className="fas fa-key" style={{ color: '#ef4444' }}></i> Security Password
              </label>
              <input
                type="password"
                className="form-control"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-block" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff', padding: '14px', fontSize: '1rem', fontWeight: 700, boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)' }}>
              <i className="fas fa-lock-open" style={{ marginRight: '8px' }}></i> Unlock Super Admin Console
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Looking for standard user portal? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>User Login</Link> • <Link to="/owner/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Turf Owner</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
