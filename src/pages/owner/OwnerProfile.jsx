import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

export const OwnerProfile = () => {
  const { currentUser } = useAuth();
  const { updateOwner } = useData();
  const { showToast } = useToast();

  const [name, setName] = useState(currentUser?.name || 'Vikram Malhotra');
  const [businessName, setBusinessName] = useState(currentUser?.businessName || 'Thunderbolt Sports Infra LLP');
  const [email] = useState(currentUser?.email || 'owner@playslot.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98201 23456');
  const [city, setCity] = useState(currentUser?.city || 'Mumbai');
  const [accountNumber, setAccountNumber] = useState('918237461928');
  const [ifscCode, setIfscCode] = useState('HDFC0001234');

  const handleSave = (e) => {
    e.preventDefault();
    if (currentUser?.id) {
      updateOwner(currentUser.id, { name, businessName, phone, city });
    }
    showToast('Owner profile and payout details saved!', 'success');
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Partner Profile & Settlements</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Merchant business entity information and direct bank payout coordinates
        </p>
      </div>

      <div className="summary-card" style={{ padding: '36px', borderRadius: '20px' }}>
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid #E2E8F0' }}>
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
              alt="Owner"
              style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #10B981' }}
            />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>{name}</h3>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{businessName}</div>
              <span className="badge badge-success" style={{ marginTop: '6px' }}>✓ Verified Partner</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px', color: '#10B981' }}>
            1. Business Contact Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Owner Name</label>
              <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Business Name</label>
              <input type="text" className="form-input" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '28px' }}>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Email Address</label>
              <input type="email" className="form-input" value={email} disabled style={{ background: '#F1F5F9' }} />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Phone</label>
              <input type="text" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>City</label>
              <input type="text" className="form-input" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px', color: '#10B981' }}>
            2. Bank Settlement Account
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Bank Account Number</label>
              <input type="text" className="form-input" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>IFSC Code</label>
              <input type="text" className="form-input" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-emerald" style={{ padding: '12px 28px', fontWeight: '800' }}>
              Save Profile Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerProfile;
