import React from 'react';

export const BookingCard = ({ booking, onViewPass, onCancel }) => {
  const isConfirmed = booking.status === 'Confirmed' || booking.status === 'confirmed';
  const isCancelled = booking.status === 'Cancelled' || booking.status === 'cancelled';

  return (
    <div className="card glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <img
            src={booking.turfImage || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80'}
            alt={booking.turfName}
            style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>{booking.sport}</span>
              <span className={`badge ${isConfirmed ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.72rem' }}>
                {booking.status}
              </span>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '4px 0' }}>{booking.turfName}</h4>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Pass: <strong>{booking.bookingId || booking.id}</strong>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary-color)' }}>
            ₹{booking.totalAmount || booking.amount || 1200}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {booking.paymentMethod || 'Paid Online'}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', background: 'var(--bg-color)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.86rem' }}>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Match Date:</span>
          <div style={{ fontWeight: 700 }}>📅 {booking.date}</div>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Slot Time:</span>
          <div style={{ fontWeight: 700 }}>⏰ {booking.timeSlot || booking.slot}</div>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)' }}>Player:</span>
          <div style={{ fontWeight: 700 }}>👤 {booking.userName || 'Rahul Sharma'}</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        {onViewPass && (
          <button onClick={() => onViewPass(booking)} className="btn btn-sm btn-outline-dark">
            View Digital Pass 🎟️
          </button>
        )}
        {onCancel && isConfirmed && (
          <button onClick={() => onCancel(booking.bookingId || booking.id)} className="btn btn-sm btn-outline-danger">
            Cancel Slot
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
