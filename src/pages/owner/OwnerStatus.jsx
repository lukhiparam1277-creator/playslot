import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export const OwnerStatus = () => {
  const [searchParams] = useSearchParams();
  const { getApplicationById, getApplicationByEmail } = useData();

  const [query, setQuery] = useState(searchParams.get('appId') || '');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const initialId = searchParams.get('appId');
    if (initialId) {
      const found = getApplicationById(initialId);
      if (found) {
        setResult(found);
        setSearched(true);
      }
    }
  }, [searchParams, getApplicationById]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const found = getApplicationById(query.trim()) || getApplicationByEmail(query.trim());
    setResult(found || null);
    setSearched(true);
  };

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '8px' }}>APPLICATION TRACKER</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '900' }}>Partner Application Status</h1>
          <p style={{ color: 'var(--text-muted)' }}>Enter your Application ID (e.g. PS-OWNER-10245) or registered email</p>
        </div>

        <div className="summary-card" style={{ marginBottom: '32px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Application ID or Email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
              Track Status 🔍
            </button>
          </form>
        </div>

        {searched && (
          result ? (
            <div className="summary-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{result.turfName}</h3>
                <span className={`badge ${result.status === 'Approved' ? 'badge-success' : (result.status === 'Pending' ? 'badge-warning' : 'badge-danger')}`}>
                  ● {result.status.toUpperCase()}
                </span>
              </div>

              <div style={{ background: 'var(--bg-color)', padding: '18px', borderRadius: '12px', fontSize: '0.92rem', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Application Reference:</span>
                  <strong>{result.applicationId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Applicant Name:</span>
                  <strong>{result.ownerName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Submitted Date:</span>
                  <strong>{result.submittedDate}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>City & Area:</span>
                  <strong>{result.area}, {result.city}</strong>
                </div>
              </div>

              {result.status === 'Approved' && (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                  <div style={{ fontWeight: '800', color: '#065F46', marginBottom: '4px' }}>🎉 Congratulations! Your turf is approved and live.</div>
                  <p style={{ color: '#047857', fontSize: '0.88rem' }}>
                    You can now log in to the Turf Owner Console to manage slot timings and pricing.
                  </p>
                  <Link to="/owner/login" className="btn btn-emerald btn-sm" style={{ marginTop: '12px' }}>
                    Go to Owner Sign In ➔
                  </Link>
                </div>
              )}

              {result.status === 'Pending' && (
                <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontWeight: '800', color: '#92400E', marginBottom: '4px' }}>⏳ Application Under Review</div>
                  <p style={{ color: '#B45309', fontSize: '0.88rem' }}>
                    Our team is verifying the ground details and quality standards. You will receive an update shortly.
                  </p>
                </div>
              )}

              {result.status === 'Rejected' && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontWeight: '800', color: '#991B1B', marginBottom: '4px' }}>✕ Application Not Approved</div>
                  <p style={{ color: '#B91C1C', fontSize: '0.88rem' }}>
                    Reason: {result.rejectionReason || 'Ground specifications did not meet platform safety requirements.'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No Application Found</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                We couldn't find an application matching "{query}".
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
