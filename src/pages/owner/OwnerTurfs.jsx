import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

export const OwnerTurfs = () => {
  const { turfs, deleteTurf, updateTurfStatus } = useData();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const ownerId = currentUser?.id || 'owner-1';
  const myTurfs = turfs.filter(t => t.ownerId === ownerId);

  const [deleteConfirmTurf, setDeleteConfirmTurf] = useState(null);

  const handleDelete = (id) => {
    deleteTurf(id);
    showToast('Turf arena deleted successfully.', 'info');
    setDeleteConfirmTurf(null);
  };

  const handleToggleActive = (turf) => {
    const nextStatus = turf.status === 'ACTIVE' || turf.status === 'APPROVED' ? 'INACTIVE' : 'APPROVED';
    updateTurfStatus(turf.id, nextStatus);
    showToast(`Turf status changed to ${nextStatus}`, 'success');
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>My Listed Turfs</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Manage arena listings, rates, photos, and live availability
          </p>
        </div>
        <Link to="/owner/turfs/add" className="btn btn-emerald" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>➕</span> Add New Turf
        </Link>
      </div>

      {myTurfs.length === 0 ? (
        <div className="empty-state" style={{ background: '#FFFFFF', padding: '60px 20px', borderRadius: '16px', border: '1px dashed #CBD5E1' }}>
          <div className="empty-icon">🏟️</div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>No Turfs Listed Yet</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '8px auto 20px auto' }}>
            Start accepting bookings by submitting your sports arena details for verification.
          </p>
          <Link to="/owner/turfs/add" className="btn btn-emerald">
            Add Your First Turf
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {myTurfs.map((turf) => (
            <div key={turf.id} className="summary-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '180px' }}>
                <img
                  src={turf.images?.[0] || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80'}
                  alt={turf.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  <span className={`badge ${turf.status === 'APPROVED' || turf.status === 'Approved' ? 'badge-success' : (turf.status === 'PENDING' || turf.status === 'Pending' ? 'badge-warning' : 'badge-danger')}`} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)', fontSize: '0.78rem', fontWeight: '800' }}>
                    {turf.status}
                  </span>
                </div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                  <span className="badge badge-dark" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
                    🏆 {turf.sport}
                  </span>
                </div>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '6px' }}>{turf.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                  📍 {turf.address || `${turf.location}, ${turf.city}`}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: '#F8FAFC', padding: '12px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Rate / Hour</span>
                    <strong style={{ color: '#10B981', fontSize: '1rem' }}>₹{turf.pricePerHour}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Operating Hours</span>
                    <strong>{turf.openingTime} - {turf.closingTime}</strong>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                  <Link to={`/owner/turfs/edit/${turf.id}`} className="btn btn-outline-dark btn-sm" style={{ flex: 1 }}>
                    ✏️ Edit Details
                  </Link>
                  <Link to={`/venues/${turf.id}`} className="btn btn-outline-dark btn-sm" title="Preview Public Page">
                    👁️
                  </Link>
                  <button
                    onClick={() => setDeleteConfirmTurf(turf)}
                    className="btn btn-sm"
                    style={{ background: '#FEE2E2', color: '#EF4444', border: '1px solid #FCA5A5' }}
                    title="Delete Turf"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmTurf && (
        <Modal
          isOpen={Boolean(deleteConfirmTurf)}
          onClose={() => setDeleteConfirmTurf(null)}
          title={`Delete "${deleteConfirmTurf.name}"?`}
        >
          <div>
            <p style={{ color: 'var(--text-body)', marginBottom: '20px' }}>
              Are you sure you want to permanently delete this sports arena? Existing booking records will remain preserved.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn btn-outline-dark" onClick={() => setDeleteConfirmTurf(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirmTurf.id)}>
                Confirm Deletion
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OwnerTurfs;
