import React from 'react';
import { Link } from 'react-router-dom';

export const TurfCard = ({ turf }) => {
  return (
    <div className="venue-card">
      <div className="venue-img-wrapper">
        <img src={turf.images?.[0] || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80'} alt={turf.name} loading="lazy" />
        <span className="badge badge-primary" style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(255, 255, 255, 0.95)', color: 'var(--primary-color)' }}>
          🏆 {turf.sport}
        </span>
        <button className="fav-btn" title="Add to favorites">
          🤍
        </button>
      </div>

      <div className="venue-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span className="badge badge-warning" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
            ★ {turf.rating || '4.9'} ({turf.reviewsCount || 12})
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            📍 {turf.distance || '1.5 km'}
          </span>
        </div>

        <h3 className="venue-name">{turf.name}</h3>
        <div className="venue-meta">
          <span>📍 {turf.location}, {turf.city}</span>
          <span>•</span>
          <span>{turf.turfType || 'Outdoor'} Turf</span>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {(turf.facilities || ['Flood Lights', 'Parking', 'Washroom']).slice(0, 3).map((f, i) => (
            <span key={i} style={{ fontSize: '0.75rem', background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px', color: 'var(--text-body)' }}>
              ✓ {f}
            </span>
          ))}
        </div>

        <div className="venue-footer">
          <div className="price-tag">
            <span className="amount">₹{turf.pricePerHour}</span>
            <span className="unit">per hour slot</span>
          </div>
          <Link to={`/venues/${turf.id}`} className="btn btn-primary btn-sm">
            Book Slot ➔
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;
