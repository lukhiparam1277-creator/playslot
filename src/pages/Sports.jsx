import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

export const Sports = () => {
  const { sports } = useData();
  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');

  const filteredSports = sports.filter(s => {
    const matchesType = filterType === 'All' || s.categoryType === filterType;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <section style={{ background: '#0B132B', color: '#FFFFFF', padding: '50px 0 40px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="badge badge-purple" style={{ marginBottom: '10px' }}>SPORTS DIRECTORY</div>
          <h1 style={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>
            Explore Sports Formats
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            From fast-paced Box Cricket to FIFA grade Football and BWF Badminton courts
          </p>
        </div>
      </section>

      {/* Main Filter & Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Outdoor', 'Indoor', 'Both'].map(type => (
                <button
                  key={type}
                  className={`btn btn-sm ${filterType === type ? 'btn-primary' : 'btn-outline-dark'}`}
                  onClick={() => setFilterType(type)}
                >
                  {type === 'All' ? 'All Formats' : type}
                </button>
              ))}
            </div>

            <div style={{ width: '280px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search sports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ height: '40px' }}
              />
            </div>
          </div>

          <div className="sports-grid">
            {filteredSports.map(sport => (
              <div key={sport.id} className="sport-card">
                <div className="sport-img-wrapper">
                  <img src={sport.image} alt={sport.name} />
                  <div className="sport-icon-badge">{sport.icon}</div>
                </div>
                <div className="sport-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3>{sport.name}</h3>
                    <span className="badge badge-dark" style={{ fontSize: '0.7rem' }}>{sport.categoryType}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', flex: 1 }}>
                    {sport.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Starting from</span>
                      <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                        ₹{sport.startingPrice}/hr
                      </div>
                    </div>
                    <Link to={`/venues?sport=${encodeURIComponent(sport.name)}`} className="btn btn-primary btn-sm">
                      Find Turfs ➔
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
