import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/common/Modal';

export default function AdminOwnerRequests() {
  const { applications, updateApplicationStatus, addTurf } = useData();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('all'); // all, pending, approved, rejected
  const [selectedApp, setSelectedApp] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [approveModalOpen, setApproveModalOpen] = useState(false);

  const filteredApps = applications.filter(app => {
    if (activeTab === 'all') return true;
    return app.status?.toLowerCase() === activeTab;
  });

  const handleApprove = (app) => {
    updateApplicationStatus(app.id, 'Approved', 'Application verified and approved by Administrator');
    
    // Also auto-provision or link turf if not exists
    addTurf({
      name: app.turfName || 'New Partner Turf',
      city: app.city || 'Bangalore',
      area: app.address || 'Central District',
      address: app.address || 'Main Stadium Road',
      sports: app.sports || ['Football', 'Cricket'],
      price: Number(app.price || 1200),
      rating: 5.0,
      reviewsCount: 1,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
      description: `${app.turfName} managed by verified partner ${app.ownerName}. Premium facilities with floodlights and parking.`,
      amenities: ['Floodlights', 'Changing Rooms', 'Parking', 'First Aid'],
      ownerId: 'owner-auto',
      status: 'active'
    });

    addToast(`Approved application for "${app.turfName}". Turf is now live!`, 'success');
    setApproveModalOpen(false);
  };

  const handleReject = () => {
    if (!selectedApp) return;
    updateApplicationStatus(selectedApp.id, 'Rejected', rejectReason || 'Did not meet compliance criteria.');
    addToast(`Rejected application for "${selectedApp.turfName}".`, 'info');
    setRejectModalOpen(false);
    setRejectReason('');
  };

  return (
    <div className="admin-page-wrapper" style={{ minHeight: 'calc(100vh - 180px)', padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* Breadcrumb & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <Link to="/admin/dashboard" style={{ color: '#ef4444', fontWeight: 600 }}>Super Admin</Link>
              <i className="fas fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
              <span>Partner Applications</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Turf Owner Onboarding Requests</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Review and verify commercial venue partner submissions</p>
          </div>
          <Link to="/admin/dashboard" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-arrow-left"></i> Back to Super Admin
          </Link>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {['all', 'pending', 'approved', 'rejected'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="btn btn-sm"
              style={{
                textTransform: 'capitalize',
                background: activeTab === tab ? '#ef4444' : 'var(--card-bg)',
                color: activeTab === tab ? '#fff' : 'var(--text-main)',
                border: '1px solid ' + (activeTab === tab ? '#ef4444' : 'var(--card-border)'),
                padding: '8px 18px',
                borderRadius: '8px',
                fontWeight: 600
              }}
            >
              {tab} ({applications.filter(a => tab === 'all' || a.status?.toLowerCase() === tab).length})
            </button>
          ))}
        </div>

        {/* Applications List / Table */}
        <div className="card glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          {filteredApps.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <i className="fas fa-clipboard-check" style={{ fontSize: '3rem', opacity: 0.3, marginBottom: '16px' }}></i>
              <h3>No {activeTab !== 'all' ? activeTab : ''} applications found</h3>
              <p>Applications submitted by prospective turf owners will appear here for review.</p>
            </div>
          ) : (
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--card-border)' }}>
                    <th style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>APP ID</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>TURF & LOCATION</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>APPLICANT</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>SPORTS</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>STATUS</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>DATE</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((app) => (
                    <tr key={app.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                      <td style={{ padding: '16px 20px', fontFamily: 'monospace', fontWeight: 700, color: '#ef4444' }}>
                        {app.id}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{app.turfName}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}><i className="fas fa-map-marker-alt" style={{ marginRight: '4px' }}></i> {app.city} • {app.address}</div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: 600 }}>{app.ownerName}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{app.email} • {app.phone}</div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {(Array.isArray(app.sports) ? app.sports : [app.sports]).map((s, idx) => (
                            <span key={idx} className="badge badge-primary" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>{s}</span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span className={`badge ${app.status === 'Approved' ? 'badge-success' : app.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`} style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
                          {app.status || 'Pending'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'Recent'}
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          {app.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => { setSelectedApp(app); setApproveModalOpen(true); }}
                                className="btn btn-sm"
                                style={{ background: '#10b981', color: '#fff', padding: '6px 12px', fontSize: '0.8rem' }}
                                title="Approve & Publish Turf"
                              >
                                <i className="fas fa-check" style={{ marginRight: '4px' }}></i> Approve
                              </button>
                              <button
                                onClick={() => { setSelectedApp(app); setRejectModalOpen(true); }}
                                className="btn btn-sm btn-outline"
                                style={{ color: '#ef4444', borderColor: '#ef4444', padding: '6px 12px', fontSize: '0.8rem' }}
                                title="Reject Application"
                              >
                                <i className="fas fa-times" style={{ marginRight: '4px' }}></i> Reject
                              </button>
                            </>
                          )}
                          {app.status === 'Approved' && (
                            <span style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600 }}>
                              <i className="fas fa-check-circle" style={{ marginRight: '4px' }}></i> Verified & Live
                            </span>
                          )}
                          {app.status === 'Rejected' && (
                            <button
                              onClick={() => { setSelectedApp(app); setApproveModalOpen(true); }}
                              className="btn btn-sm btn-outline"
                              style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                            >
                              Re-evaluate
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
      </div>

      {/* Approve Modal */}
      {approveModalOpen && selectedApp && (
        <Modal
          isOpen={approveModalOpen}
          onClose={() => setApproveModalOpen(false)}
          title={`Approve Partner: ${selectedApp.turfName}`}
        >
          <div>
            <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
              Are you sure you want to approve this application? This will create a verified Turf profile on PlaySlot and activate the partner account for <strong>{selectedApp.ownerName}</strong>.
            </p>
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '16px', borderRadius: '10px', marginBottom: '24px' }}>
              <div><strong>Turf Name:</strong> {selectedApp.turfName}</div>
              <div><strong>Location:</strong> {selectedApp.city}, {selectedApp.address}</div>
              <div><strong>Base Rate:</strong> ₹{selectedApp.price || 1200} / hr</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setApproveModalOpen(false)}>Cancel</button>
              <button className="btn btn-success" onClick={() => handleApprove(selectedApp)}>
                <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i> Confirm Approval
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && selectedApp && (
        <Modal
          isOpen={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
          title={`Reject Application: ${selectedApp.turfName}`}
        >
          <div>
            <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
              Please specify the reason for rejecting this partner registration:
            </p>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Rejection Reason / Notes</label>
              <textarea
                className="form-control"
                rows="3"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="E.g., Incomplete address documentation, invalid phone number..."
              ></textarea>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setRejectModalOpen(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleReject}>
                Confirm Rejection
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
