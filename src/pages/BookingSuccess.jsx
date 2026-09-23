import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>No Active Booking Found</h2>
        <Link to="/venues" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Explore Sports Turfs
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 20px' }}>
      <div className="ticket-card">
        <div className="ticket-header">
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎉</div>
          <h2 style={{ color: '#FFFFFF', fontSize: '1.8rem', fontWeight: '900', marginBottom: '6px' }}>
            Slot Booking Confirmed!
          </h2>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
            Your slot at {booking.turfName} has been locked in.
          </p>
        </div>

        <div className="ticket-body">
          <div style={{ background: 'var(--bg-color)', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Booking ID:</span>
              <strong style={{ color: 'var(--primary-color)', fontSize: '1.1rem' }}>{booking.bookingId}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Turf Arena:</span>
              <strong>{booking.turfName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Sport Format:</span>
              <strong>🏆 {booking.sport}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Date & Slot:</span>
              <strong>📅 {booking.date} • ⏰ {booking.timeSlot}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Players Count:</span>
              <strong>👥 {booking.playersCount} Players</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1.5px dashed var(--border-color)' }}>
              <span style={{ fontWeight: '800', fontSize: '1.05rem' }}>Total Paid:</span>
              <strong style={{ color: '#059669', fontSize: '1.25rem' }}>₹{booking.totalAmount}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => window.print()} className="btn btn-outline-dark" style={{ flex: 1 }}>
              Print Receipt 🖨️
            </button>
            <Link to="/my-bookings" className="btn btn-primary" style={{ flex: 1 }}>
              My Bookings 🎟️
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
