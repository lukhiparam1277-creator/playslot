import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

export const AdminTurfModeration = () => {
  const { turfs, updateTurfStatus, deleteTurf } = useData();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('ALL'); // ALL | PENDING | APPROVED | REJECTED | SUSPENDED
  const [selectedTurf, setSelectedTurf] = useState(null);

  const filteredTurfs = turfs.filter(t => {
    if (activeTab === 'ALL') return true;
    return (t.status || '').toUpperCase() === activeTab;
  });

  const handleStatusChange = (turf, status) => {
    updateTurfStatus(turf.id, status);
    showToast(`Turf "${turf.name}" status updated to ${status}!`, 'success');
    if (selectedTurf && selectedTurf.id === turf.id) {
      setSelectedTurf(prev => ({ ...prev, status }));
    }
  };

  const handleDelete = (turf) => {
    if (window.confirm(`Permanently delete turf arena "${turf.name}"?`)) {
      deleteTurf(turf.id);
      showToast(`Turf "${turf.name}" removed from platform.`, 'info');
      setSelectedTurf(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Turfs & Arenas Moderation</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Moderate sports ground listings. Only APPROVED venues appear on public user searches.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'].map(tab => {
          const count = turfs.filter(t => tab === 'ALL' || (t.status || '').toUpperCase() === tab).length;
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
              {tab === 'PENDING' ? '⏳ Pending Approval' : tab} ({count})
            </button>
          );
        })}
      </div>

      <div className="table-card">
        {filteredTurfs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏟️</div>
            <p>No turfs found in {activeTab} status.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>TURF ARENA</th>
                  <th>OWNER / MERCHANT</th>
                  <th>SPORT</th>
                  <th>LOCATION</th>
                  <th>PRICE / HR</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTurfs.map((turf) => (
                  <tr key={turf.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={turf.images?.[0] || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80'}
                          alt={turf.name}
                          style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>{turf.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>★ {turf.rating || 4.9} • {turf.turfType || 'Outdoor'}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '700' }}>{turf.ownerName || 'Verified Partner'}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{turf.contactPhone}</div>
                    </td>
                    <td>
                      <span className="badge badge-dark">
                        {turf.sport}
                      </span>
                    </td>
                    <td>
                      <div>{turf.city}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{turf.location || turf.area}</div>
                    </td>
                    <td style={{ fontWeight: '800', color: '#10B981', fontSize: '1rem' }}>
                      ₹{turf.pricePerHour}
                    </td>
                    <td>
                      <span className={`badge ${turf.status === 'APPROVED' || turf.status === 'Approved' ? 'badge-success' : (turf.status === 'PENDING' || turf.status === 'Pending' ? 'badge-warning' : 'badge-danger')}`} style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '800' }}>
                        {turf.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setSelectedTurf(turf)}
                          className="btn btn-outline-dark btn-sm"
                          style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                        >
                          👁️ Inspect
                        </button>

                        {(turf.status === 'PENDING' || turf.status === 'Pending') && (
                          <>
                            <button
                              onClick={() => handleStatusChange(turf, 'APPROVED')}
                              className="btn btn-sm"
                              style={{ background: '#10B981', color: '#FFFFFF', fontSize: '0.78rem', padding: '4px 10px', fontWeight: '700' }}
                            >
                              ✓ Approve
                            </button>
                            <button
                              onClick={() => handleStatusChange(turf, 'REJECTED')}
                              className="btn btn-sm btn-danger"
                              style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                            >
                              ✕ Reject
                            </button>
                          </>
                        )}

                        {(turf.status === 'APPROVED' || turf.status === 'Approved') && (
                          <button
                            onClick={() => handleStatusChange(turf, 'SUSPENDED')}
                            className="btn btn-sm"
                            style={{ background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA', fontSize: '0.78rem', padding: '4px 10px' }}
                          >
                            Suspend
                          </button>
                        )}

                        {(turf.status === 'SUSPENDED' || turf.status === 'REJECTED') && (
                          <button
                            onClick={() => handleStatusChange(turf, 'APPROVED')}
                            className="btn btn-sm"
                            style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', fontSize: '0.78rem', padding: '4px 10px' }}
                          >
                            Reactivate
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(turf)}
                          className="btn btn-sm btn-danger"
                          style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Turf Inspect Modal */}
      {selectedTurf && (
        <Modal isOpen={Boolean(selectedTurf)} onClose={() => setSelectedTurf(null)} title={`Inspect Venue: ${selectedTurf.name}`}>
          <div style={{ fontSize: '0.92rem' }}>
            <div style={{ height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
              <img
                src={selectedTurf.images?.[0] || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80'}
                alt={selectedTurf.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Turf Name</span>
                <strong>{selectedTurf.name}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Owner</span>
                <strong>{selectedTurf.ownerName}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Location</span>
                <strong>{selectedTurf.city} • {selectedTurf.address || selectedTurf.location}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Hourly Price</span>
                <strong style={{ color: '#10B981' }}>₹{selectedTurf.pricePerHour}</strong>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Description</span>
              <p style={{ margin: 0, fontSize: '0.88rem', background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                {selectedTurf.description || 'No description provided.'}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              {(selectedTurf.status === 'PENDING' || selectedTurf.status === 'Pending') && (
                <button onClick={() => handleStatusChange(selectedTurf, 'APPROVED')} className="btn btn-emerald">
                  ✓ Approve & Publish Publicly
                </button>
              )}
              <button onClick={() => setSelectedTurf(null)} className="btn btn-outline-dark">
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminTurfModeration;
