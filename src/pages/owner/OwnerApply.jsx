import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

export const OwnerApply = () => {
  const { submitApplication } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [turfName, setTurfName] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [area, setArea] = useState('');
  const [turfAddress, setTurfAddress] = useState('');
  const [turfType, setTurfType] = useState('Outdoor');
  const [pricePerHour, setPricePerHour] = useState(1400);
  const [openingTime, setOpeningTime] = useState('06:00 AM');
  const [closingTime, setClosingTime] = useState('11:30 PM');
  const [description, setDescription] = useState('');
  const [facilities, setFacilities] = useState(['Parking', 'Washroom', 'Flood Lights', 'Drinking Water']);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80');

  const handleFacilityToggle = (fac) => {
    setFacilities(prev => prev.includes(fac) ? prev.filter(f => f !== fac) : [...prev, fac]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ownerName || !email || !turfName || !area) {
      showToast('Please fill in all required venue and contact fields.', 'error');
      return;
    }

    const app = submitApplication({
      ownerName,
      email,
      phone,
      turfName,
      city,
      area,
      turfAddress: turfAddress || `${area}, ${city}`,
      turfType,
      pricePerHour,
      openingTime,
      closingTime,
      description,
      facilities,
      images: [imageUrl]
    });

    showToast(`Application submitted! Reference ID: ${app.applicationId} 🚀`, 'success');
    navigate(`/owner/status?appId=${app.applicationId}`);
  };

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="badge badge-success" style={{ marginBottom: '10px' }}>PARTNER ONBOARDING</div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '900' }}>List Your Sports Turf on PlaySlot</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Reach thousands of players in your city. Get verified and start accepting bookings within 24 hours.
          </p>
        </div>

        <div className="summary-card">
          <form onSubmit={handleSubmit}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '16px', color: 'var(--primary-color)' }}>
              1. Owner / Merchant Contact
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label>Owner Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Vikram Malhotra"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Official Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="owner@arena.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '28px' }}>
              <label>Contact Phone Number *</label>
              <input
                type="text"
                className="form-input"
                placeholder="+91 98201 23456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '16px', color: 'var(--primary-color)' }}>
              2. Arena Details & Specifications
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label>Turf Arena Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Smash Box Cricket & Football Ground"
                  value={turfName}
                  onChange={(e) => setTurfName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>City *</label>
                <select className="form-select" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Delhi">Delhi / NCR</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label>Area / Locality *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Andheri West"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Turf Format</label>
                <select className="form-select" value={turfType} onChange={(e) => setTurfType(e.target.value)}>
                  <option value="Outdoor">Outdoor Ground</option>
                  <option value="Indoor">Indoor Hall</option>
                  <option value="Covered Box">Covered Box</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>Complete Street Address</label>
              <input
                type="text"
                className="form-input"
                placeholder="Full address, landmarks, pin code..."
                value={turfAddress}
                onChange={(e) => setTurfAddress(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label>Base Price / Hour (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  value={pricePerHour}
                  onChange={(e) => setPricePerHour(parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Opening Time</label>
                <input
                  type="text"
                  className="form-input"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Closing Time</label>
                <input
                  type="text"
                  className="form-input"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>Main Image URL</label>
              <input
                type="url"
                className="form-input"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label>Arena Description & Turf Highlights</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Turf grass mm, lighting lux, sound setup, nets..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group" style={{ marginBottom: '28px' }}>
              <label style={{ marginBottom: '8px' }}>Available Amenities</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {['Parking', 'Washroom', 'Changing Room', 'Drinking Water', 'Flood Lights', 'Seating', 'Equipment Rental'].map(fac => (
                  <label key={fac} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={facilities.includes(fac)}
                      onChange={() => handleFacilityToggle(fac)}
                    />
                    {fac}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-emerald btn-lg" style={{ width: '100%' }}>
              Submit Partner Application 🚀
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/owner/status" style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: '700' }}>
              Already applied? Check Application Status ➔
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
