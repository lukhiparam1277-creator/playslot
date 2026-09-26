import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

export const AdminOwnerRequests = () => {
  const { owners, updateOwnerStatus, deleteOwner } = useData();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('PENDING'); // PENDING | ALL | APPROVED | REJECTED | SUSPENDED
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const filteredOwners = owners.filter(o => {
    if (activeTab === 'ALL') return true;
    return (o.status || '').toUpperCase() === activeTab;
  });

  const handleApprove = (owner) => {
    // Crucial rule: Approving an owner ONLY sets owner.status = APPROVED.
    // It must NOT automatically create a turf!
    updateOwnerStatus(owner.id, 'APPROVED');
    showToast(`Owner "${owner.name}" has been approved! Approved Owners count increased.`, 'success');
  };

  const handleReject = () => {
    if (!selectedOwner) return;
    updateOwnerStatus(selectedOwner.id, 'REJECTED', rejectReason || 'Did not meet partner criteria.');
    showToast(`Owner "${selectedOwner.name}" has been rejected.`, 'info');
    setRejectModalOpen(false);
    setRejectReason('');
    setSelectedOwner(null);
  };

  const handleSuspend = (owner) => {
    updateOwnerStatus(owner.id, 'SUSPENDED');
    showToast(`Owner "${owner.name}" has been suspended.`, 'warning');
  };

  const handleReactivate = (owner) => {
    updateOwnerStatus(owner.id, 'APPROVED');
    showToast(`Owner "${owner.name}" has been reactivated.`, 'success');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Owner Onboarding Requests</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Review merchant credential submissions. Approving grants login access to the Owner Console.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['PENDING', 'ALL', 'APPROVED', 'REJECTED', 'SUSPENDED'].map(tab => {
          const count = owners.filter(o => tab === 'ALL' || (o.status || '').toUpperCase() === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="btn btn-sm"
              style={{
                background: activeTab === tab ? '#EF4444' : '#FFFFFF',
                color: activeTab === tab ? '#FFFFFF' : 'var(--text-dark)',
                border: '1px solid ' + (activeTab === tab ? '#EF4444' : '#CBD5E1'),
                padding: '8px 18px',
                borderRadius: '10px',
                fontWeight: '700'
              }}
            >
              {tab === 'PENDING' ? '⏳ Pending Review' : tab} ({count})
            </button>
          );
        })}
      </div>

      {/* Requests Table */}
      <div className="table-card">
        {filteredOwners.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📋</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>No {activeTab !== 'ALL' ? activeTab : ''} Owner Requests</h3>
            <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '4px auto 0 auto' }}>
              When new turf merchants register, their applications will appear here for operational verification.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>OWNER NAME</th>
                  <th>BUSINESS ENTITY</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>REGISTRATION DATE</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOwners.map((owner) => (
                  <tr key={owner.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={owner.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                          alt={owner.name}
                          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: '800' }}>{owner.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>📍 {owner.city}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: '600' }}>
                      {owner.businessName || '—'}
                    </td>
                    <td style={{ fontSize: '0.88rem' }}>
                      {owner.email}
                    </td>
                    <td style={{ fontSize: '0.88rem' }}>
                      {owner.phone}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {owner.registeredDate || 'Recent'}
                    </td>
                    <td>
                      <span className={`badge ${owner.status === 'APPROVED' ? 'badge-success' : (owner.status === 'PENDING' ? 'badge-warning' : 'badge-danger')}`} style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '800' }}>
                        {owner.status || 'PENDING'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setSelectedOwner(owner)}
                          className="btn btn-outline-dark btn-sm"
                          style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                        >
                          👁️ View
                        </button>

                        {owner.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleApprove(owner)}
                              className="btn btn-sm"
                              style={{ background: '#10B981', color: '#FFFFFF', fontSize: '0.78rem', padding: '4px 12px', fontWeight: '700' }}
                            >
                              ✓ Approve
                            </button>
                            <button
                              onClick={() => { setSelectedOwner(owner); setRejectModalOpen(true); }}
                              className="btn btn-sm btn-danger"
                              style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                            >
                              ✕ Reject
                            </button>
                          </>
                        )}

                        {owner.status === 'APPROVED' && (
                          <button
                            onClick={() => handleSuspend(owner)}
                            className="btn btn-sm"
                            style={{ background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA', fontSize: '0.78rem', padding: '4px 10px' }}
                          >
                            Suspend
                          </button>
                        )}

                        {(owner.status === 'REJECTED' || owner.status === 'SUSPENDED') && (
                          <button
                            onClick={() => handleReactivate(owner)}
                            className="btn btn-sm"
                            style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', fontSize: '0.78rem', padding: '4px 10px' }}
                          >
                            Reactivate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      {selectedOwner && !rejectModalOpen && (
        <Modal isOpen={Boolean(selectedOwner)} onClose={() => setSelectedOwner(null)} title={`Owner Application: ${selectedOwner.name}`}>
          <div style={{ fontSize: '0.92rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Owner Name</span>
                <strong>{selectedOwner.name}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Business Name</span>
                <strong>{selectedOwner.businessName || '—'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Email Address</span>
                <strong>{selectedOwner.email}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Contact Phone</span>
                <strong>{selectedOwner.phone}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>City</span>
                <strong>{selectedOwner.city}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Current Status</span>
                <span className={`badge ${selectedOwner.status === 'APPROVED' ? 'badge-success' : (selectedOwner.status === 'PENDING' ? 'badge-warning' : 'badge-danger')}`}>
                  {selectedOwner.status}
                </span>
              </div>
            </div>

            {selectedOwner.address && (
              <div style={{ marginBottom: '20px' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Premises Address</span>
                <p style={{ margin: 0, background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  {selectedOwner.address}
                </p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              {selectedOwner.status === 'PENDING' && (
                <button
                  onClick={() => { handleApprove(selectedOwner); setSelectedOwner(null); }}
                  className="btn btn-emerald"
                  style={{ fontWeight: '700' }}
                >
                  ✓ Confirm Approval
                </button>
              )}
              <button onClick={() => setSelectedOwner(null)} className="btn btn-outline-dark">
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && selectedOwner && (
        <Modal isOpen={rejectModalOpen} onClose={() => setRejectModalOpen(false)} title={`Reject Application: ${selectedOwner.name}`}>
          <div>
            <p style={{ color: 'var(--text-body)', marginBottom: '16px' }}>
              Please specify reason for rejecting <strong>{selectedOwner.name}</strong>'s partner application:
            </p>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '6px', display: 'block' }}>Rejection Notes</label>
              <textarea
                className="form-textarea"
                rows="3"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Incomplete business KYC documentation, unable to reach contact..."
              ></textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn btn-outline-dark" onClick={() => setRejectModalOpen(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleReject}>Confirm Rejection</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminOwnerRequests;
