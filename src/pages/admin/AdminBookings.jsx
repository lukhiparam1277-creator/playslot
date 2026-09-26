import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/statistics';
import { Modal } from '../../components/common/Modal';

export const AdminBookings = () => {
  const { bookings, turfs, sports, updateBookingStatus, deleteBooking } = useData();
  const { showToast } = useToast();

  const [filterTurf, setFilterTurf] = useState('ALL');
  const [filterSport, setFilterSport] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterDate, setFilterDate] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = bookings.filter(b => {
    if (filterTurf !== 'ALL' && b.turfId !== filterTurf) return false;
    if (filterSport !== 'ALL' && b.sport !== filterSport) return false;
    if (filterStatus !== 'ALL' && b.status !== filterStatus) return false;
    if (filterDate && b.date !== filterDate) return false;
    return true;
  });

  const handleStatusChange = (bookingId, status) => {
    updateBookingStatus(bookingId, status);
    showToast(`Booking ${bookingId} status changed to ${status}`, 'success');
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking(prev => ({ ...prev, status }));
    }
  };

  const handleDelete = (bookingId) => {
    if (window.confirm(`Delete booking record "${bookingId}"?`)) {
      deleteBooking(bookingId);
      showToast('Booking deleted.', 'info');
      setSelectedBooking(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>All Platform Bookings</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Single source of truth ledger for all athlete reservations ({bookings.length} total matches)
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="summary-card" style={{ padding: '20px', borderRadius: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Date Filter</label>
            <input
              type="date"
              className="form-input"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Turf Venue</label>
            <select className="form-select" value={filterTurf} onChange={(e) => setFilterTurf(e.target.value)}>
              <option value="ALL">All Turfs ({turfs.length})</option>
              {turfs.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Sport</label>
            <select className="form-select" value={filterSport} onChange={(e) => setFilterSport(e.target.value)}>
              <option value="ALL">All Sports</option>
              {sports.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Status</label>
            <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="ALL">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={() => { setFilterDate(''); setFilterTurf('ALL'); setFilterSport('ALL'); setFilterStatus('ALL'); }}
              className="btn btn-outline-dark"
              style={{ width: '100%', height: '44px', fontSize: '0.85rem' }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Ledger Table */}
      <div className="table-card">
        {filteredBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎟️</div>
            <p>No booking records found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>BOOKING ID</th>
                  <th>ATHLETE / USER</th>
                  <th>VENUE & OWNER</th>
                  <th>SPORT</th>
                  <th>DATE & TIME</th>
                  <th>AMOUNT</th>
                  <th>PAYMENT</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: '800', fontFamily: 'monospace', color: '#EF4444' }}>
                      {b.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: '700' }}>{b.userName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.userEmail}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '700' }}>{b.turfName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ID: {b.turfId}</div>
                    </td>
                    <td>
                      <span className="badge badge-dark">{b.sport}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>{b.date}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.timeSlot || b.slot}</div>
                    </td>
                    <td style={{ fontWeight: '800', color: '#10B981', fontSize: '1rem' }}>
                      {formatCurrency(b.totalAmount || b.amount)}
                    </td>
                    <td>
                      <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                        {b.paymentStatus || 'PAID'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}`}>
                        {b.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="btn btn-outline-dark btn-sm"
                          style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
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

      {/* Booking Modal */}
      {selectedBooking && (
        <Modal isOpen={Boolean(selectedBooking)} onClose={() => setSelectedBooking(null)} title={`Booking Ledger: ${selectedBooking.id}`}>
          <div style={{ fontSize: '0.92rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status</div>
                <span className={`badge ${selectedBooking.status === 'Confirmed' ? 'badge-success' : 'badge-danger'}`} style={{ marginTop: '4px' }}>
                  {selectedBooking.status}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gross Value</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#10B981' }}>
                  {formatCurrency(selectedBooking.totalAmount || selectedBooking.amount)}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Athlete</span>
                <strong>{selectedBooking.userName}</strong>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{selectedBooking.userEmail} • {selectedBooking.userPhone}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Turf Arena</span>
                <strong>{selectedBooking.turfName}</strong>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{selectedBooking.sport}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Date & Slot</span>
                <strong>{selectedBooking.date}</strong>
                <div style={{ fontSize: '0.82rem' }}>{selectedBooking.timeSlot || selectedBooking.slot}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Created At</span>
                <strong>{new Date(selectedBooking.createdAt || Date.now()).toLocaleString()}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              {selectedBooking.status === 'Confirmed' && (
                <>
                  <button onClick={() => handleStatusChange(selectedBooking.id, 'Completed')} className="btn btn-emerald btn-sm">
                    Mark Completed
                  </button>
                  <button onClick={() => handleStatusChange(selectedBooking.id, 'Cancelled')} className="btn btn-danger btn-sm">
                    Cancel Booking
                  </button>
                </>
              )}
              <button onClick={() => setSelectedBooking(null)} className="btn btn-outline-dark btn-sm">
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminBookings;
