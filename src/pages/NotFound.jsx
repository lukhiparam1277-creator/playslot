import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: '4.5rem', marginBottom: '16px' }}>⚽</div>
      <h1 style={{ fontSize: '2.8rem', fontWeight: '900', marginBottom: '10px' }}>404 - Out of Bounds!</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 30px auto' }}>
        The page you are looking for has been moved or doesn't exist. Let's get you back on the field.
      </p>
      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          Back to Home 🏠
        </Link>
        <Link to="/venues" className="btn btn-outline-dark">
          Explore Turfs 🏟️
        </Link>
      </div>
    </div>
  );
};
