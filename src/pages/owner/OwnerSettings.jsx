import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

export const OwnerSettings = () => {
  const { showToast } = useToast();
  const [autoConfirm, setAutoConfirm] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [bufferMins, setBufferMins] = useState(15);

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Arena preferences saved successfully!', 'success');
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Console & Operations Settings</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Configure automated slot booking policies and dispatch alerts
        </p>
      </div>

      <div className="summary-card" style={{ padding: '36px', borderRadius: '20px' }}>
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '14px', color: '#10B981' }}>
              Booking Policies
            </h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>Auto-Confirm Reservations</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Automatically issue tickets upon customer UPI payment completion</span>
              </div>
              <input
                type="checkbox"
                checked={autoConfirm}
                onChange={(e) => setAutoConfirm(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>Buffer Time Between Matches</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Cool-down / groundskeeping window between consecutive bookings</span>
              </div>
              <select
                className="form-select"
                value={bufferMins}
                onChange={(e) => setBufferMins(Number(e.target.value))}
                style={{ width: '130px', padding: '8px 12px' }}
              >
                <option value={0}>0 Minutes</option>
                <option value={10}>10 Minutes</option>
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '14px', color: '#10B981' }}>
              Dispatch & Alert Channels
            </h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>Instant SMS / WhatsApp Alerts</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Receive immediate alert on your phone whenever a player books a slot</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>Daily Morning Schedule Digest</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Daily email summary with day's booked slots and expected revenue</span>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-emerald" style={{ padding: '12px 28px', fontWeight: '800' }}>
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerSettings;
