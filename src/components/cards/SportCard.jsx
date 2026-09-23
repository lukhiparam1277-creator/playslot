import React from 'react';
import { Link } from 'react-router-dom';

export const SportCard = ({ sport }) => {
  return (
    <Link to={`/venues?sport=${encodeURIComponent(sport.name)}`} className="sport-card">
      <div className="sport-img-wrapper">
        <img
          src={sport.image || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80'}
          alt={sport.name}
          loading="lazy"
        />
        <div className="sport-icon-badge">{sport.icon || '🏅'}</div>
      </div>
      <div className="sport-info">
        <h3>{sport.name}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', flex: 1 }}>
          {sport.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)' }}>
            {sport.turfsCount || 10}+ Venues
          </span>
          <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary-color)' }}>
            From ₹{sport.startingPrice || 1000}/hr
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SportCard;
