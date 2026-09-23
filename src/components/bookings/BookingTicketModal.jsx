import React from 'react';
import { Modal } from '../common/Modal';

export const BookingTicketModal = ({ isOpen, onClose, booking }) => {
  if (!booking) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Ticket #${booking.bookingId}`}>
      <div className="ticket-card" style={{ boxShadow: 'none', border: 'none', padding: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div className="logo-badge" style={{ margin: '0 auto 12px auto', width: '48px', height: '48px', fontSize: '1.5rem' }}>
            ⚡
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>{booking.turfName}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Official Slot Reservation Pass</p>
          <div style={{ marginTop: '8px' }}>
            <span className={`badge ${booking.status === 'Confirmed' ? 'badge-success' : (booking.status === 'Completed' ? 'badge-primary' : 'badge-danger')}`}>
              ● {booking.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div style={{ background: 'var(--bg-color)', padding: '20px', borderRadius: '12px', fontSize: '0.92rem', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Booking Reference:</span>
            <strong style={{ color: 'var(--primary-color)' }}>{booking.bookingId}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Customer Name:</span>
            <strong>{booking.userName}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Sport Category:</span>
            <strong>🏆 {booking.sport}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Date & Slot:</span>
            <strong>📅 {booking.date} • ⏰ {booking.timeSlot}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Team Players:</span>
            <strong>👥 {booking.playersCount || 6} Players</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Payment Mode:</span>
            <span>{booking.paymentMethod || 'UPI Paid'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1.5px dashed var(--border-color)', marginTop: '8px' }}>
            <span style={{ fontWeight: '800', fontSize: '1rem' }}>Total Paid:</span>
            <strong style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>₹{booking.totalAmount}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={() => window.print()} className="btn btn-outline-dark btn-sm">
            Print Pass 🖨️
          </button>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingTicketModal;
