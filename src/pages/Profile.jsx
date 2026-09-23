import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

export const Profile = () => {
  const { currentUser } = useAuth();
  const { bookings, updateUser } = useData();
  const { showToast } = useToast();

  const [name, setName] = useState(currentUser?.name || 'Rahul Sharma');
  const [email, setEmail] = useState(currentUser?.email || 'user@playslot.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [city, setCity] = useState(currentUser?.city || 'Mumbai');

  const myBookings = bookings.filter(b => b.userId === currentUser?.id || b.userEmail === currentUser?.email);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (currentUser?.id) {
      updateUser(currentUser.id, { name, email, phone, city });
    }
    showToast('Profile updated successfully! ✓', 'success');
  };

  return (
    <div className="container" style={{ padding: '40px 20px 80px 20px', maxWidth: '800px' }}>
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
        <div className="badge badge-primary" style={{ marginBottom: '8px' }}>ATHLETE PROFILE</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900' }}>Account & Preferences</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your personal details and player credentials</p>
      </div>

      {/* Profile Overview Card */}
      <div className="table-card" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <img
          src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
          alt={name}
          style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-light)' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>{name}</h2>
            <span className="badge badge-success">ACTIVE PLAYER</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            {email} • {phone}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '32px' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}>🎟️</div>
          <div className="stat-info">
            <h4>Total Bookings</h4>
            <div className="value">{myBookings.length || 8} Slots</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ECFDF5', color: '#10B981' }}>🏆</div>
          <div className="stat-info">
            <h4>Favorite Sport</h4>
            <div className="value" style={{ fontSize: '1.2rem' }}>Box Cricket</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>📍</div>
          <div className="stat-info">
            <h4>Home City</h4>
            <div className="value" style={{ fontSize: '1.2rem' }}>{city}</div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="summary-card">
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px' }}>Edit Profile Information</h3>
        <form onSubmit={handleSaveProfile}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Home City</label>
              <input
                type="text"
                className="form-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Profile Changes
          </button>
        </form>
      </div>
    </div>
  );
};
