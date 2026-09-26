import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

export const OwnerRegister = () => {
  const { registerOwner } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [ownerName, setOwnerName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('password123');
  const [city, setCity] = useState('Mumbai');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ownerName || !email || !phone || !businessName) {
      showToast('Please fill all required owner details.', 'error');
      return;
    }

    const newOwner = registerOwner({
      name: ownerName,
      businessName,
      email,
      phone,
      password,
      city,
      address
    });

    setSubmitted(true);
    showToast('Your owner account has been submitted for admin approval.', 'success');
  };

  if (submitted) {
    return (
      <div style={{ padding: '80px 20px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="summary-card" style={{ maxWidth: '580px', width: '100%', textAlign: 'center', padding: '48px 36px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem', margin: '0 auto 20px auto' }}>
            ⏳
          </div>
          <div className="badge badge-warning" style={{ marginBottom: '12px', fontSize: '0.85rem' }}>APPLICATION SUBMITTED • STATUS: PENDING</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', marginBottom: '12px' }}>
            Application Under Review
          </h2>
          <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
            Your owner account has been submitted for admin approval. Our operations team will review your business credentials within 24 hours.
          </p>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', textAlign: 'left', marginBottom: '28px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Registered Email</div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{email}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>Business Entity</div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{businessName}</div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={`/owner/status?email=${encodeURIComponent(email)}`} className="btn btn-primary">
              Check Review Status ➔
            </Link>
            <Link to="/" className="btn btn-outline-dark">
              Return to Public Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px 0 80px 0', background: 'linear-gradient(180deg, #F0FDF4 0%, #F8FAFC 100%)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="badge badge-success" style={{ marginBottom: '10px' }}>PARTNER WITH PLAYSLOT</div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '900' }}>Turf Owner & Merchant Registration</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Expand your sports business and reach thousands of athletes in your city.
          </p>
        </div>

        <div className="summary-card" style={{ padding: '40px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 20px 48px rgba(15, 23, 42, 0.06)' }}>
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '18px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>👤</span> 1. Owner & Business Profile
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Owner Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Vikram Malhotra"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Business / Entity Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Apex Sports Arena LLP"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Official Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="owner@arena.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Phone Number *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="+91 98201 23456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>City *</label>
                <select className="form-select" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Delhi">Delhi / NCR</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
              <div className="form-group">
                <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Portal Password *</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '28px' }}>
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Registered Business Address</label>
              <textarea
                className="form-textarea"
                rows="2"
                placeholder="Office / ground premises address with pin code..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '14px 18px', borderRadius: '12px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.4rem' }}>🛡️</span>
              <p style={{ fontSize: '0.85rem', color: '#1E40AF', margin: 0, lineHeight: '1.5' }}>
                <strong>Admin Approval Process:</strong> Submitted accounts undergo operational verification. Once approved by the administrator, you can log in, create turfs, and set up slot schedules.
              </p>
            </div>

            <button type="submit" className="btn btn-emerald btn-lg" style={{ width: '100%', padding: '16px', fontWeight: '800', fontSize: '1.05rem', borderRadius: '12px' }}>
              Submit Owner Application 🚀
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Already have an approved owner account? <Link to="/owner/login" style={{ color: '#10B981', fontWeight: '800' }}>Sign In here ➔</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerRegister;
