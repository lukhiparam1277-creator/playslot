import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              <div className="logo-badge">⚡</div>
              <span>PlaySlot<span className="brand-dot">.</span></span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '20px' }}>
              India's premier sports turf and slot booking marketplace. Find nearby venues, check live slot availability, and play without hassles.
            </p>
            <div style={{ display: 'flex', gap: '12px', fontSize: '1.2rem' }}>
              <span style={{ cursor: 'pointer' }}>📱</span>
              <span style={{ cursor: 'pointer' }}>📸</span>
              <span style={{ cursor: 'pointer' }}>💬</span>
              <span style={{ cursor: 'pointer' }}>✉️</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Marketplace</Link></li>
              <li><Link to="/sports">Sports Categories</Link></li>
              <li><Link to="/venues">All Sports Arenas</Link></li>
              <li><Link to="/my-bookings">My Slot Bookings</Link></li>
              <li><Link to="/contact">Help & Support</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>For Arena Owners</h4>
            <ul className="footer-links">
              <li><Link to="/owner/apply">List Your Sports Turf ↗</Link></li>
              <li><Link to="/owner/status">Track Partner Application</Link></li>
              <li><Link to="/owner/login">Turf Owner Sign In</Link></li>
              <li><Link to="/owner/dashboard">Owner Management Console</Link></li>
              <li><Link to="/admin/login">Super Admin Console</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Active Metro Hubs</h4>
            <ul className="footer-links">
              <li><Link to="/venues?city=Mumbai">📍 Mumbai Arenas (38)</Link></li>
              <li><Link to="/venues?city=Bengaluru">📍 Bengaluru Turfs (32)</Link></li>
              <li><Link to="/venues?city=Delhi">📍 Delhi / NCR Courts (24)</Link></li>
              <li><Link to="/venues?city=Pune">📍 Pune Sports Hubs (18)</Link></li>
              <li><Link to="/venues?city=Hyderabad">📍 Hyderabad Arenas (15)</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} PlaySlot Technologies Private Limited. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Refund Policy</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
