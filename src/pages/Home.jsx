import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { TurfCard } from '../components/turfs/TurfCard';

export const Home = () => {
  const { sports, turfs } = useData();
  const navigate = useNavigate();

  const [searchSport, setSearchSport] = useState('All');
  const [searchCity, setSearchCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchSport !== 'All') params.set('sport', searchSport);
    if (searchCity !== 'All') params.set('city', searchCity);
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    navigate(`/venues?${params.toString()}`);
  };

  const featuredTurfs = turfs.filter(t => t.featured || t.status === 'Approved').slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary-light)', color: 'var(--primary-color)', padding: '6px 16px', borderRadius: 'var(--border-radius-pill)', fontSize: '0.85rem', fontWeight: '800', marginBottom: '16px' }}>
                <span>⚡ INDIA'S #1 SPORTS SLOT BOOKING PLATFORM</span>
              </div>
              <h1>
                Book Your Favorite <br />
                <span className="highlight">Sports Arena & Turf</span>
              </h1>
              <p>
                Discover nearby cricket pitches, FIFA standard football turfs, badminton courts, and basketball arenas. Instant slot booking with real-time confirmation.
              </p>
              <div className="hero-btns">
                <Link to="/venues" className="btn btn-primary btn-lg">
                  Explore Turfs ➔
                </Link>
                <Link to="/owner/apply" className="btn btn-outline-dark btn-lg">
                  List Your Turf 🏟️
                </Link>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80"
                alt="Sports Turf Arena"
                className="hero-img"
              />
              <div className="hero-badge-floating">
                <div style={{ fontSize: '2rem' }}>🏆</div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--text-dark)' }}>
                    Over 500+ Sports Arenas
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Instant Real-Time Confirmation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Widget */}
      <div className="container search-section">
        <div className="search-card">
          <form onSubmit={handleSearch} className="search-form">
            <div className="form-group">
              <label>Search Arena / Area</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Andheri, Indiranagar, Smash Turf..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Sport Category</label>
              <select
                className="form-select"
                value={searchSport}
                onChange={(e) => setSearchSport(e.target.value)}
              >
                <option value="All">All Sports (8)</option>
                {sports.map(s => (
                  <option key={s.id} value={s.name}>{s.icon} {s.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>City Hub</label>
              <select
                className="form-select"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              >
                <option value="All">All Metro Cities</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Delhi">Delhi / NCR</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ height: '48px', padding: '0 28px' }}>
              Search Slots 🔍
            </button>
          </form>
        </div>
      </div>

      {/* Popular Sports Categories Section */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge badge-primary" style={{ marginBottom: '8px' }}>DISCOVER BY SPORT</div>
            <h2 className="section-title">Popular Sports Formats</h2>
            <p className="section-subtitle">Choose your sport and explore verified professional courts with anti-glare floodlights</p>
          </div>

          <div className="sports-grid">
            {sports.slice(0, 8).map(sport => (
              <Link to={`/venues?sport=${encodeURIComponent(sport.name)}`} key={sport.id} className="sport-card">
                <div className="sport-img-wrapper">
                  <img src={sport.image} alt={sport.name} />
                  <div className="sport-icon-badge">{sport.icon}</div>
                </div>
                <div className="sport-info">
                  <h3>{sport.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', flex: 1 }}>
                    {sport.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                      {sport.turfsCount || 15}+ Venues
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                      From ₹{sport.startingPrice}/hr
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/sports" className="btn btn-outline-dark">
              View All Sports Categories ➔
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Turfs Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-success" style={{ marginBottom: '8px' }}>FEATURED VENUES</div>
            <h2 className="section-title">Top Rated Sports Turfs</h2>
            <p className="section-subtitle">Handpicked, tournament-ready arenas with top-grade amenities and flexible timings</p>
          </div>

          <div className="venues-grid">
            {featuredTurfs.map(turf => (
              <TurfCard key={turf.id} turf={turf} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/venues" className="btn btn-primary btn-lg">
              Explore All Turfs & Arenas ➔
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <div className="badge badge-purple" style={{ marginBottom: '8px' }}>SIMPLE 3-STEP PROCESS</div>
            <h2 className="section-title">How PlaySlot Works</h2>
            <p className="section-subtitle">Get on the ground and start playing in under 2 minutes</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div style={{ background: 'var(--bg-color)', padding: '32px 24px', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 20px auto', fontWeight: '900' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px' }}>Find Your Arena</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Search by sport, city, location, or price. View photos, verified ratings, and amenities.
              </p>
            </div>

            <div style={{ background: 'var(--bg-color)', padding: '32px 24px', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--secondary-light)', color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 20px auto', fontWeight: '900' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px' }}>Select Live Slot</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Pick your match date and convenient time slot. Pay securely via UPI, Cards, or Net Banking.
              </p>
            </div>

            <div style={{ background: 'var(--bg-color)', padding: '32px 24px', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-purple-light)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 20px auto', fontWeight: '900' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px' }}>Turn Up & Play</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Show your instant digital pass at the arena gate and enjoy the game with your squad!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Turf Owner CTA Banner */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #0B132B 0%, #1E293B 100%)', color: '#FFFFFF' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge badge-success" style={{ marginBottom: '14px' }}>PARTNER WITH US</span>
          <h2 style={{ color: '#FFFFFF', fontSize: '2.4rem', fontWeight: '900', marginBottom: '14px' }}>
            Do You Own a Sports Turf or Arena?
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 30px auto' }}>
            Join 300+ turf partners nationwide. Automate slot bookings, minimize vacant hours, and increase your monthly venue revenue by 40%.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/owner/apply" className="btn btn-emerald btn-lg">
              Apply to List Turf 🚀
            </Link>
            <Link to="/owner/status" className="btn btn-outline-dark btn-lg" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>
              Check Application Status
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
