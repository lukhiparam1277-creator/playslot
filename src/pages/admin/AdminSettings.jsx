import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

export const AdminSettings = () => {
  const { resetToDefaults } = useData();
  const { showToast } = useToast();

  const [platformFee, setPlatformFee] = useState(15);
  const [gstRate, setGstRate] = useState(18);
  const [convenienceFee, setConvenienceFee] = useState(49);
  const [autoApproveOwners, setAutoApproveOwners] = useState(false);
  const [autoApproveTurfs, setAutoApproveTurfs] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Platform settings saved successfully!', 'success');
  };

  const handleResetData = () => {
    if (window.confirm('Reset the entire application dataset to initial clean demo state (3 users, 4 owners, 4 turfs, 1 booking)?')) {
      resetToDefaults();
      showToast('PlaySlot restored to clean initial demo state!', 'success');
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Platform Governance & Settings</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Global commission rates, taxation rules, moderation toggles, and system resets
        </p>
      </div>

      <div className="summary-card" style={{ padding: '36px', borderRadius: '20px', marginBottom: '28px' }}>
        <form onSubmit={handleSave}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '16px', color: '#EF4444' }}>
            1. Commercial Rates & Taxation
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Platform Commission (%)</label>
              <input
                type="number"
                className="form-input"
                value={platformFee}
                onChange={(e) => setPlatformFee(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>GST Rate (%)</label>
              <input
                type="number"
                className="form-input"
                value={gstRate}
                onChange={(e) => setGstRate(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Convenience Fee (₹)</label>
              <input
                type="number"
                className="form-input"
                value={convenienceFee}
                onChange={(e) => setConvenienceFee(parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '16px', color: '#EF4444' }}>
            2. Automation & Moderation Rules
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>Auto-Approve Owner Onboarding</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Skip manual review for new merchant registrations (default: OFF)</span>
              </div>
              <input
                type="checkbox"
                checked={autoApproveOwners}
                onChange={(e) => setAutoApproveOwners(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>Auto-Approve New Turfs</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Publish turfs immediately upon submission by owner (default: OFF)</span>
              </div>
              <input
                type="checkbox"
                checked={autoApproveTurfs}
                onChange={(e) => setAutoApproveTurfs(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px', fontWeight: '800' }}>
              Save Platform Settings
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="summary-card" style={{ padding: '32px', borderRadius: '20px', border: '1px solid #FECACA', background: '#FEF2F2' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '8px', color: '#991B1B' }}>
          ⚠️ Test Environment State Reset
        </h3>
        <p style={{ color: '#7F1D1D', fontSize: '0.88rem', marginBottom: '18px' }}>
          Reset all storage state back to baseline: 3 athletes, 4 approved owners, 0 pending owners, 4 approved turfs, and 1 booking.
        </p>
        <button onClick={handleResetData} className="btn btn-danger" style={{ fontWeight: '800' }}>
          🔄 Reset Application Data to Baseline State
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
