import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { SlotPicker } from '../components/turfs/SlotPicker';
import { Modal } from '../components/common/Modal';

export const VenueDetail = () => {
  const { id } = useParams();
  const { getTurfById, createBooking } = useData();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const turf = getTurfById(id);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [playersCount, setPlayersCount] = useState(6);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  if (!turf) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Turf Arena Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>The sports arena you are looking for does not exist or has been unlisted.</p>
        <button onClick={() => navigate('/venues')} className="btn btn-primary" style={{ marginTop: '20px' }}>
          Explore Other Turfs
        </button>
      </div>
    );
  }

  const basePrice = turf.pricePerHour || 1200;
  const convenienceFee = 49;
  const gstAmount = Math.round(basePrice * 0.18);
  const totalAmount = basePrice + convenienceFee + gstAmount;

  const handleProceedToBook = () => {
    if (!selectedSlot) {
      showToast('Please select an available time slot first.', 'error');
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const handleConfirmReservation = () => {
    const bookingPayload = {
      turfId: turf.id,
      turfName: turf.name,
      turfImage: turf.images?.[0] || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
      sport: turf.sport,
      date: selectedDate,
      timeSlot: selectedSlot,
      playersCount,
      basePrice,
      convenienceFee,
      gstAmount,
      totalAmount,
      userId: currentUser?.id || 'user-1',
      userName: currentUser?.name || 'Rahul Sharma',
      userEmail: currentUser?.email || 'user@playslot.com',
      userPhone: currentUser?.phone || '+91 98765 43210',
      paymentMethod: 'UPI Paid (Instant)'
    };

    const newBooking = createBooking(bookingPayload);
    setIsConfirmModalOpen(false);
    showToast(`Slot confirmed for ${turf.name}! 🎟️`, 'success');
    navigate('/booking-success', { state: { booking: newBooking } });
  };

  return (
    <div>
      {/* Venue Header */}
      <section className="venue-detail-hero">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <span className="badge badge-primary">🏆 {turf.sport}</span>
                <span className="badge badge-warning">★ {turf.rating || 4.9} ({turf.reviewsCount || 12} reviews)</span>
                <span className="badge badge-dark">{turf.turfType || 'Outdoor'} Turf</span>
              </div>
              <h1 style={{ fontSize: '2.4rem', fontWeight: '900', marginBottom: '8px' }}>{turf.name}</h1>
              <p style={{ color: '#94A3B8', fontSize: '1rem' }}>
                📍 {turf.address || `${turf.location}, ${turf.city}`} • Opens {turf.openingTime} - {turf.closingTime}
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px 24px', borderRadius: '16px', backdropFilter: 'blur(8px)', textAlign: 'right' }}>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Hourly Rate</span>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#10B981', fontFamily: 'var(--font-heading)' }}>
                ₹{turf.pricePerHour}
              </div>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>inclusive of ground equipment</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Gallery */}
        <div className="gallery-grid">
          <div className="gallery-main">
            <img
              src={turf.images?.[activeImageIndex] || turf.images?.[0] || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'}
              alt={turf.name}
            />
          </div>
          <div className="gallery-side">
            {(turf.images || []).slice(0, 2).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${turf.name} thumbnail`}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  border: activeImageIndex === idx ? '3px solid var(--primary-color)' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Layout Grid */}
        <div className="venue-detail-layout">
          {/* Left Column: Details & Amenities */}
          <div>
            <div className="table-card">
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px' }}>About the Sports Arena</h3>
              <p style={{ color: 'var(--text-body)', lineHeight: '1.8', fontSize: '0.96rem', marginBottom: '24px' }}>
                {turf.description}
              </p>

              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '14px' }}>Ground & Player Amenities</h4>
              <div className="facilities-grid">
                {(turf.facilities || ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water']).map((fac, i) => (
                  <div key={i} className="facility-card">
                    <span style={{ color: '#10B981' }}>✓</span>
                    <span>{fac}</span>
                  </div>
                ))}
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '12px' }}>Venue Rules & Guidelines</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {(turf.rules || ['Rubber studs or non-marking shoes required.', 'Report 10 mins before slot.']).map((rule, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>⚠️</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Slot Picker & Checkout summary */}
          <div>
            <SlotPicker
              turf={turf}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              setSelectedDate={setSelectedDate}
              setSelectedSlot={setSelectedSlot}
            />

            {/* Price Breakdown Card */}
            <div className="summary-card" style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '14px' }}>Booking Summary</h3>
              
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label>Expected Players</label>
                <select
                  className="form-select"
                  value={playersCount}
                  onChange={(e) => setPlayersCount(parseInt(e.target.value))}
                >
                  {[2, 4, 6, 8, 10, 12, 14, 16, 22].map(n => (
                    <option key={n} value={n}>{n} Players</option>
                  ))}
                </select>
              </div>

              <div className="summary-item">
                <span>Slot Timing:</span>
                <strong>{selectedSlot ? `⏰ ${selectedSlot}` : 'Please select slot'}</strong>
              </div>
              <div className="summary-item">
                <span>Base Slot Rate:</span>
                <span>₹{basePrice}</span>
              </div>
              <div className="summary-item">
                <span>Convenience Fee:</span>
                <span>₹{convenienceFee}</span>
              </div>
              <div className="summary-item">
                <span>GST (18%):</span>
                <span>₹{gstAmount}</span>
              </div>
              <div className="summary-item total">
                <span>Total Payable:</span>
                <span style={{ color: 'var(--primary-color)' }}>₹{totalAmount}</span>
              </div>

              <button
                onClick={handleProceedToBook}
                disabled={!selectedSlot}
                className="btn btn-emerald btn-lg"
                style={{ width: '100%', marginTop: '20px', opacity: selectedSlot ? 1 : 0.6 }}
              >
                {selectedSlot ? `Confirm & Reserve (₹${totalAmount}) ➔` : 'Choose a Slot to Book'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Slot Reservation"
      >
        <div>
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <div className="logo-badge" style={{ margin: '0 auto 10px auto', width: '44px', height: '44px', fontSize: '1.3rem' }}>
              ⚽
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>{turf.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{turf.location}, {turf.city}</p>
          </div>

          <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '12px', fontSize: '0.92rem', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Match Date:</span>
              <strong>📅 {selectedDate}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Reserved Slot:</span>
              <strong>⏰ {selectedSlot}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Player Name:</span>
              <strong>{currentUser?.name || 'Rahul Sharma'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px dashed var(--border-color)', marginTop: '8px' }}>
              <span style={{ fontWeight: '800' }}>Amount to Pay:</span>
              <strong style={{ color: 'var(--primary-color)', fontSize: '1.15rem' }}>₹{totalAmount}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setIsConfirmModalOpen(false)} className="btn btn-outline-dark" style={{ flex: 1 }}>
              Cancel
            </button>
            <button onClick={handleConfirmReservation} className="btn btn-emerald" style={{ flex: 2 }}>
              Pay & Confirm Pass ⚡
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
