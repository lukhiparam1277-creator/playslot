import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

export const OwnerLogin = () => {
  const { login } = useAuth();
  const { owners } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('owner@playslot.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password, 'turf_owner');

    if (res.success) {
      showToast('Logged into Turf Owner Console! 🏟️', 'success');
      navigate('/owner/dashboard');
    } else if (res.pending) {
      showToast('Your owner account is pending approval by Administrator.', 'warning');
      navigate(`/owner/status?email=${encodeURIComponent(email)}`);
    } else {
      showToast(res.message || 'Unable to log into Owner Console.', 'error');
    }
  };

  const handleQuickDemo = (demoEmail) => {
    setEmail(demoEmail);
    login(demoEmail, 'password', 'turf_owner').then((res) => {
      if (res.success) {
        showToast('Logged in as Turf Owner (Demo Mode)', 'success');
        navigate('/owner/dashboard');
      } else if (res.pending) {
        showToast('This owner account is currently PENDING approval.', 'warning');
        navigate(`/owner/status?email=${encodeURIComponent(demoEmail)}`);
      }
    });
  };

  return (
    <div className="auth-wrapper" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'linear-gradient(180deg, #F0FDF4 0%, #F8FAFC 100%)' }}>
      <div className="auth-card" style={{ maxWidth: '480px', width: '100%', background: '#FFFFFF', padding: '40px', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 20px 48px rgba(15, 23, 42, 0.08)' }}>
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', margin: '0 auto 16px auto', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
            🏟️
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)' }}>Turf Owner Sign In</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
            Manage your arenas, time slots, customer bookings, and revenue
          </p>
        </div>

        {/* Demo Credentials Helper */}
        <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '14px 16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
            Demo Verified Owners
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => handleQuickDemo('owner@playslot.com')}
              className="btn btn-sm"
              style={{ background: '#10B981', color: '#FFFFFF', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '6px' }}
            >
              Vikram (Thunderbolts)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('ananya@playslot.com')}
              className="btn btn-sm"
              style={{ background: '#059669', color: '#FFFFFF', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '6px' }}
            >
              Ananya (Casa Arena)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px', display: 'block' }}>Owner Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@arena.com"
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.95rem' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px', display: 'block' }}>Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #CBD5E1', fontSize: '0.95rem' }}
            />
          </div>

          <button type="submit" className="btn btn-emerald btn-lg" style={{ width: '100%', padding: '14px', fontWeight: '800', fontSize: '1rem', borderRadius: '12px' }}>
            Access Turf Console ➔
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Haven't listed your venue yet? <Link to="/owner/register" style={{ color: '#10B981', fontWeight: '800' }}>Register as Partner</Link>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
