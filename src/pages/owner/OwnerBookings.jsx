import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/statistics';
import { Modal } from '../../components/common/Modal';

export const OwnerBookings = () => {
  const { bookings, turfs, sports, updateBookingStatus, cancelBooking } = useData();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const ownerId = currentUser?.id || 'owner-1';
  const myTurfs = turfs.filter(t => t.ownerId === ownerId);
  const myTurfIds = myTurfs.map(t => t.id);

  // Strictly filter owner's bookings only
  const myBookings = bookings.filter(b => myTurfIds.includes(b.turfId) || b.ownerId === ownerId);

  // Filters
  const [filterDate, setFilterDate] = useState('');
  const [filterTurf, setFilterTurf] = useState('ALL');
  const [filterSport, setFilterSport] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = myBookings.filter(b => {
    if (filterDate && b.date !== filterDate) return false;
    if (filterTurf !== 'ALL' && b.turfId !== filterTurf) return false;
    if (filterSport !== 'ALL' && b.sport !== filterSport) return false;
    if (filterStatus !== 'ALL' && b.status !== filterStatus) return false;
    return true;
  });

  const handleStatusChange = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, newStatus);
    showToast(`Booking ${bookingId} status updated to ${newStatus}`, 'success');
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleCancel = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking? The slot will be released back to available inventory.')) {
      cancelBooking(bookingId);
      showToast('Booking cancelled and slot released.', 'info');
      setSelectedBooking(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Customer Bookings</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Monitor and manage all match slot reservations for your arenas
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="summary-card" style={{ padding: '20px', borderRadius: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
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
            <label style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Turf / Arena</label>
            <select className="form-select" value={filterTurf} onChange={(e) => setFilterTurf(e.target.value)}>
              <option value="ALL">All My Turfs ({myTurfs.length})</option>
              {myTurfs.map(t => (
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

      {/* Bookings Table */}
      <div className="table-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>
            Reservations ({filteredBookings.length} found)
          </h3>
        </div>

        {filteredBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📋</div>
            <p style={{ margin: 0 }}>No bookings match the selected filters.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="owner-table">
              <thead>
                <tr>
                  <th>BOOKING ID</th>
                  <th>CUSTOMER</th>
                  <th>TURF & SPORT</th>
                  <th>DATE & TIME</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: '700', fontFamily: 'monospace', color: '#2563EB' }}>
                      {b.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: '700' }}>{b.userName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.userPhone || b.userEmail}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '600' }}>{b.turfName}</div>
                      <span className="badge badge-dark" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                        {b.sport}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>{b.date}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.timeSlot || b.slot}</div>
                    </td>
                    <td style={{ fontWeight: '800', color: '#10B981', fontSize: '1rem' }}>
                      {formatCurrency(b.totalAmount || b.amount)}
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
                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'Completed')}
                            className="btn btn-sm"
                            style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', fontSize: '0.78rem', padding: '4px 10px' }}
                            title="Mark as Completed"
                          >
                            ✓ Check-In
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

      {/* Booking Details Modal */}
      {selectedBooking && (
        <Modal isOpen={Boolean(selectedBooking)} onClose={() => setSelectedBooking(null)} title={`Booking Receipt: ${selectedBooking.id}`}>
          <div style={{ fontSize: '0.92rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status</div>
                <span className={`badge ${selectedBooking.status === 'Confirmed' ? 'badge-success' : 'badge-danger'}`} style={{ marginTop: '4px' }}>
                  {selectedBooking.status}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Amount</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#10B981' }}>
                  {formatCurrency(selectedBooking.totalAmount || selectedBooking.amount)}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Customer</span>
                <strong>{selectedBooking.userName}</strong>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{selectedBooking.userPhone}</div>
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
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Payment Method</span>
                <strong>{selectedBooking.paymentMethod || 'UPI Paid'}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '18px' }}>
              {selectedBooking.status === 'Confirmed' && (
                <button onClick={() => handleCancel(selectedBooking.id)} className="btn btn-danger btn-sm">
                  Cancel Reservation
                </button>
              )}
              <button onClick={() => setSelectedBooking(null)} className="btn btn-outline-dark btn-sm" style={{ marginLeft: 'auto' }}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OwnerBookings;
