import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export const OwnerStatus = () => {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get('email') || '';
  const initialId = searchParams.get('appId') || searchParams.get('id') || '';

  const { owners } = useData();
  const [query, setQuery] = useState(initialEmail || initialId);
  const [searched, setSearched] = useState(Boolean(initialEmail || initialId));

  const matchedOwner = owners.find(o => 
    (o.email && o.email.toLowerCase() === query.trim().toLowerCase()) ||
    (o.id && o.id.toLowerCase() === query.trim().toLowerCase()) ||
    (o.phone && o.phone.includes(query.trim()))
  );

  return (
    <div style={{ padding: '60px 0 100px 0', minHeight: '80vh', background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '900' }}>Partner Application Status</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '6px' }}>
            Check the verification and approval progress of your turf merchant account
          </p>
        </div>

        <div className="summary-card" style={{ padding: '36px', borderRadius: '20px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
          <form onSubmit={(e) => { e.preventDefault(); setSearched(true); }} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your registered email or Owner ID..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1, padding: '12px 16px', borderRadius: '10px' }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', fontWeight: '700' }}>
              Track 🔍
            </button>
          </form>

          {searched && matchedOwner ? (
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>{matchedOwner.businessName || matchedOwner.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>Owner: {matchedOwner.name} • {matchedOwner.city}</div>
                </div>
                <div>
                  {matchedOwner.status === 'APPROVED' && (
                    <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                      ✓ APPROVED & ACTIVE
                    </span>
                  )}
                  {matchedOwner.status === 'PENDING' && (
                    <span className="badge badge-warning" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                      ⏳ UNDER ADMIN REVIEW
                    </span>
                  )}
                  {(matchedOwner.status === 'REJECTED' || matchedOwner.status === 'SUSPENDED') && (
                    <span className="badge badge-danger" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                      ✕ {matchedOwner.status}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.9rem', marginBottom: '20px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Registered Email:</span>
                  <strong>{matchedOwner.email}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Submission Date:</span>
                  <strong>{matchedOwner.registeredDate || 'Recent'}</strong>
                </div>
              </div>

              {matchedOwner.status === 'APPROVED' ? (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                  <p style={{ color: '#065F46', fontWeight: '700', marginBottom: '12px' }}>
                    🎉 Your partner account is approved! You can now access your Owner Console.
                  </p>
                  <Link to="/owner/login" className="btn btn-emerald" style={{ padding: '10px 24px' }}>
                    Log into Owner Console ➔
                  </Link>
                </div>
              ) : matchedOwner.status === 'PENDING' ? (
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '16px', borderRadius: '12px' }}>
                  <p style={{ color: '#92400E', fontSize: '0.92rem', margin: 0 }}>
                    ℹ️ <strong>Status: Pending Admin Moderation.</strong> Our team is reviewing your registration details. As soon as the Super Administrator approves your account, you will be able to log in.
                  </p>
                </div>
              ) : (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '16px', borderRadius: '12px' }}>
                  <p style={{ color: '#991B1B', fontSize: '0.92rem', margin: 0 }}>
                    Your application status is <strong>{matchedOwner.status}</strong>. Please reach out to <a href="mailto:support@playslot.com" style={{ textDecoration: 'underline' }}>support@playslot.com</a> for details.
                  </p>
                </div>
              )}
            </div>
          ) : searched ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
              <h4>No matching owner application found</h4>
              <p style={{ fontSize: '0.9rem' }}>Please verify the email address or register as a new partner.</p>
              <Link to="/owner/register" className="btn btn-primary btn-sm" style={{ marginTop: '12px' }}>
                Register as Owner
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OwnerStatus;
