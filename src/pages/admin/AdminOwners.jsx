import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

export const AdminOwners = () => {
  const { owners, turfs, updateOwnerStatus, deleteOwner } = useData();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOwner, setSelectedOwner] = useState(null);

  const filteredOwners = owners.filter(o => 
    (o.name && o.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (o.businessName && o.businessName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (o.email && o.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (o.phone && o.phone.includes(searchTerm))
  );

  const handleStatusUpdate = (owner, status) => {
    updateOwnerStatus(owner.id, status);
    showToast(`Owner ${owner.name} status updated to ${status}`, 'success');
    if (selectedOwner && selectedOwner.id === owner.id) {
      setSelectedOwner(prev => ({ ...prev, status }));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Turf Owners Directory</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Registered commercial turf partners and venue operators ({owners.length} total merchants)
          </p>
        </div>

        <input
          type="text"
          className="form-input"
          placeholder="Search by owner, business, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '320px' }}
        />
      </div>

      <div className="table-card">
        {filteredOwners.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>👔</div>
            <p>No turf owners found matching your criteria.</p>
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
                  <th>TURFS LISTED</th>
                  <th>STATUS</th>
                  <th>REGISTRATION</th>
                  <th style={{ textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOwners.map((owner) => {
                  const ownerTurfCount = turfs.filter(t => t.ownerId === owner.id).length;
                  return (
                    <tr key={owner.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={owner.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                            alt={owner.name}
                            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: '800' }}>{owner.name}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>📍 {owner.city}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: '600' }}>{owner.businessName || '—'}</td>
                      <td style={{ fontSize: '0.88rem' }}>{owner.email}</td>
                      <td style={{ fontSize: '0.88rem' }}>{owner.phone}</td>
                      <td>
                        <span className="badge badge-dark" style={{ fontWeight: '700' }}>
                          🏟️ {ownerTurfCount} Turfs
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${owner.status === 'APPROVED' ? 'badge-success' : (owner.status === 'PENDING' ? 'badge-warning' : 'badge-danger')}`} style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '800' }}>
                          {owner.status || 'PENDING'}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {owner.registeredDate || 'Recent'}
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
                            <button
                              onClick={() => handleStatusUpdate(owner, 'APPROVED')}
                              className="btn btn-sm"
                              style={{ background: '#10B981', color: '#FFFFFF', fontSize: '0.78rem', padding: '4px 10px' }}
                            >
                              Approve
                            </button>
                          )}

                          {owner.status === 'APPROVED' && (
                            <button
                              onClick={() => handleStatusUpdate(owner, 'SUSPENDED')}
                              className="btn btn-sm"
                              style={{ background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA', fontSize: '0.78rem', padding: '4px 10px' }}
                            >
                              Suspend
                            </button>
                          )}

                          {(owner.status === 'SUSPENDED' || owner.status === 'REJECTED') && (
                            <button
                              onClick={() => handleStatusUpdate(owner, 'APPROVED')}
                              className="btn btn-sm"
                              style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', fontSize: '0.78rem', padding: '4px 10px' }}
                            >
                              Reactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Owner Modal */}
      {selectedOwner && (
        <Modal isOpen={Boolean(selectedOwner)} onClose={() => setSelectedOwner(null)} title={`Merchant Profile: ${selectedOwner.name}`}>
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
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Account Status</span>
                <span className={`badge ${selectedOwner.status === 'APPROVED' ? 'badge-success' : 'badge-danger'}`}>
                  {selectedOwner.status}
                </span>
              </div>
            </div>

            {selectedOwner.address && (
              <div style={{ marginBottom: '20px' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Address</span>
                <p style={{ margin: 0, background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  {selectedOwner.address}
                </p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <button onClick={() => setSelectedOwner(null)} className="btn btn-outline-dark">
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminOwners;
