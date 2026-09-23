import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BookingTicketModal } from '../components/bookings/BookingTicketModal';

export const MyBookings = () => {
  const { bookings, cancelBooking } = useData();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed' | 'cancelled'
  const [selectedTicket, setSelectedTicket] = useState(null);

  const userBookings = bookings.filter(b => b.userId === currentUser?.id || b.userEmail === currentUser?.email || !currentUser);

  const upcomingBookings = userBookings.filter(b => b.status === 'Confirmed');
  const completedBookings = userBookings.filter(b => b.status === 'Completed');
  const cancelledBookings = userBookings.filter(b => b.status === 'Cancelled');

  const currentList = activeTab === 'completed' ? completedBookings : (activeTab === 'cancelled' ? cancelledBookings : upcomingBookings);

  const handleCancel = (bookingId) => {
    if (confirm(`Are you sure you want to cancel booking #${bookingId}? Slot will be released.`)) {
      cancelBooking(bookingId);
      showToast(`Booking #${bookingId} cancelled.`, 'info');
    }
  };

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="badge badge-primary" style={{ marginBottom: '8px' }}>PLAYER DASHBOARD</div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '900' }}>My Slot Reservations</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Manage your upcoming arena matches and view digital passes
            </p>
          </div>
          <Link to="/venues" className="btn btn-primary">
            + Book New Slot
          </Link>
        </div>

        {/* Tab Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <button
            className={`btn btn-sm ${activeTab === 'upcoming' ? 'btn-primary' : 'btn-outline-dark'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'completed' ? 'btn-primary' : 'btn-outline-dark'}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({completedBookings.length})
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'cancelled' ? 'btn-primary' : 'btn-outline-dark'}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled ({cancelledBookings.length})
          </button>
        </div>

        {/* Bookings List */}
        {currentList.length > 0 ? (
          <div>
            {currentList.map(b => (
              <div
                key={b.id || b.bookingId}
                className="venue-card"
                style={{ flexDirection: 'row', padding: '22px', alignItems: 'center', gap: '24px', marginBottom: '20px', flexWrap: 'wrap' }}
              >
                <img
                  src={b.turfImage || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80'}
                  alt={b.turfName}
                  style={{ width: '130px', height: '100px', objectFit: 'cover', borderRadius: '12px' }}
                />

                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{b.turfName}</h3>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Booking ID: <strong style={{ color: 'var(--primary-color)' }}>{b.bookingId}</strong>
                      </div>
                    </div>
                    <span className={`badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}`}>
                      ● {b.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '18px', fontSize: '0.9rem', marginTop: '10px', color: 'var(--text-body)', flexWrap: 'wrap' }}>
                    <span>🏆 <strong>{b.sport}</strong></span>
                    <span>📅 <strong>{b.date}</strong></span>
                    <span>⏰ <strong>{b.timeSlot}</strong></span>
                    <span>👥 <strong>{b.playersCount || 6} Players</strong></span>
                    <span style={{ fontWeight: '800', color: 'var(--primary-color)', fontSize: '1.05rem' }}>₹{b.totalAmount}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                  <button onClick={() => setSelectedTicket(b)} className="btn btn-outline-dark btn-sm">
                    View Ticket 📄
                  </button>
                  {b.status === 'Confirmed' && (
                    <button onClick={() => handleCancel(b.bookingId)} className="btn btn-danger btn-sm">
                      Cancel Slot ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎟️</div>
            <h3>No {activeTab.toUpperCase()} Bookings</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '6px' }}>
              You do not have any {activeTab} slot reservations.
            </p>
            <Link to="/venues" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Explore Sports Turfs
            </Link>
          </div>
        )}
      </div>

      {/* Ticket Modal */}
      <BookingTicketModal
        isOpen={Boolean(selectedTicket)}
        onClose={() => setSelectedTicket(null)}
        booking={selectedTicket}
      />
    </div>
  );
};
