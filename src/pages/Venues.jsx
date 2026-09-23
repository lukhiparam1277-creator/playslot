import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { TurfCard } from '../components/turfs/TurfCard';

export const Venues = () => {
  const { turfs, sports } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedSport, setSelectedSport] = useState(searchParams.get('sport') || 'All');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(3000);

  const filteredTurfs = useMemo(() => {
    let result = turfs.filter(t => t.status === 'Approved');

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.sport.toLowerCase().includes(q)
      );
    }

    if (selectedSport !== 'All') {
      result = result.filter(t =>
        t.sport.toLowerCase() === selectedSport.toLowerCase() ||
        (t.sportsAvailable && t.sportsAvailable.some(s => s.toLowerCase() === selectedSport.toLowerCase()))
      );
    }

    if (selectedCity !== 'All') {
      result = result.filter(t => t.city.toLowerCase() === selectedCity.toLowerCase());
    }

    if (selectedType !== 'All') {
      result = result.filter(t => t.turfType?.toLowerCase() === selectedType.toLowerCase());
    }

    result = result.filter(t => t.pricePerHour <= maxPrice);

    if (sortBy === 'price_low') {
      result.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (sortBy === 'price_high') {
      result.sort((a, b) => b.pricePerHour - a.pricePerHour);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [turfs, searchQuery, selectedSport, selectedCity, selectedType, maxPrice, sortBy]);

  return (
    <div>
      {/* Page Header */}
      <section style={{ background: '#0F172A', color: '#FFFFFF', padding: '40px 0' }}>
        <div className="container">
          <h1 style={{ color: '#FFFFFF', fontSize: '2.2rem', fontWeight: '900', marginBottom: '8px' }}>
            Explore Sports Turfs & Arenas
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem' }}>
            Book verified professional grounds, indoor courts, and enclosed box arenas
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter Bar */}
          <div className="search-card" style={{ marginBottom: '36px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
              <div className="form-group">
                <label>Search Keyword</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Arena name, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Sport</label>
                <select
                  className="form-select"
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                >
                  <option value="All">All Sports</option>
                  {sports.map(s => (
                    <option key={s.id} value={s.name}>{s.icon} {s.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>City</label>
                <select
                  className="form-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="All">All Cities</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Delhi">Delhi / NCR</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              <div className="form-group">
                <label>Turf Type</label>
                <select
                  className="form-select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Outdoor">Outdoor Grounds</option>
                  <option value="Indoor">Indoor Courts</option>
                </select>
              </div>

              <div className="form-group">
                <label>Sort By</label>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured First</option>
                  <option value="rating">Top Rated (Stars)</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dark)' }}>
                  Max Rate: ₹{maxPrice}/hr
                </span>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  style={{ cursor: 'pointer' }}
                />
              </div>

              <button
                type="button"
                className="btn btn-outline-dark btn-sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSport('All');
                  setSelectedCity('All');
                  setSelectedType('All');
                  setMaxPrice(3000);
                  setSortBy('featured');
                }}
              >
                Reset All Filters ✕
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }}>
              Available Sports Arenas ({filteredTurfs.length})
            </h2>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Showing verified playable turfs
            </span>
          </div>

          {/* Turfs Grid */}
          {filteredTurfs.length > 0 ? (
            <div className="venues-grid">
              {filteredTurfs.map(turf => (
                <TurfCard key={turf.id} turf={turf} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🏟️</div>
              <h3>No Matching Turfs Found</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                Try adjusting your city, sport filter, or rate slider to find open grounds.
              </p>
              <button
                onClick={() => {
                  setSelectedSport('All');
                  setSelectedCity('All');
                  setSearchQuery('');
                  setMaxPrice(3000);
                }}
                className="btn btn-primary"
                style={{ marginTop: '20px' }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
