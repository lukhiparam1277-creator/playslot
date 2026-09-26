import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminLogin = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@playslot.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password, 'admin');
    if (res.success) {
      showToast('Super Admin access granted! 🛡️', 'success');
      navigate('/admin/dashboard');
    } else {
      showToast(res.message || 'Invalid administrator credentials.', 'error');
    }
  };

  const handleQuickDemo = () => {
    login('admin@playslot.com', 'password', 'admin').then(() => {
      showToast('Super Admin access granted! (Demo Mode) 🛡️', 'success');
      navigate('/admin/dashboard');
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F172A', padding: '40px 20px' }}>
      <div style={{ maxWidth: '460px', width: '100%', background: '#1E293B', borderRadius: '24px', padding: '40px', border: '1px solid rgba(239, 68, 68, 0.3)', boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #EF4444, #F59E0B)' }}></div>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 16px auto', border: '1px solid rgba(239, 68, 68, 0.3)', boxShadow: '0 8px 24px rgba(239, 68, 68, 0.25)' }}>
            🛡️
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFFFFF', margin: '0 0 6px 0' }}>Super Admin Portal</h1>
          <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0 }}>PlaySlot Master Governance & Operational Moderation</p>
        </div>

        {/* Demo Quick Access */}
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '12px', padding: '12px 16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demo Administrator</div>
            <div style={{ fontSize: '0.85rem', color: '#F1F5F9', marginTop: '2px' }}>admin@playslot.com</div>
          </div>
          <button type="button" onClick={handleQuickDemo} className="btn btn-sm" style={{ background: '#EF4444', color: '#FFFFFF', fontSize: '0.78rem', padding: '6px 14px', borderRadius: '8px' }}>
            Instant Access
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#E2E8F0', marginBottom: '6px', display: 'block' }}>Admin Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#0F172A', color: '#FFFFFF', border: '1.5px solid #334155' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#E2E8F0', marginBottom: '6px', display: 'block' }}>Security Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#0F172A', color: '#FFFFFF', border: '1.5px solid #334155' }}
            />
          </div>

          <button type="submit" className="btn btn-block" style={{ width: '100%', background: 'linear-gradient(135deg, #EF4444, #DC2626)', color: '#FFFFFF', padding: '14px', fontSize: '1rem', fontWeight: '800', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)' }}>
            Unlock Super Admin Console 🛡️
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: '#94A3B8' }}>
          <Link to="/" style={{ color: '#60A5FA', fontWeight: '700' }}>← Return to Public Website</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
