import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const OwnerTurfForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { getTurfById, addTurf, updateTurf, sports } = useData();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [sport, setSport] = useState('Box Cricket');
  const [city, setCity] = useState('Mumbai');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [turfType, setTurfType] = useState('Outdoor');
  const [pricePerHour, setPricePerHour] = useState(1400);
  const [openingTime, setOpeningTime] = useState('06:00 AM');
  const [closingTime, setClosingTime] = useState('11:30 PM');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80');
  const [facilities, setFacilities] = useState(['Parking', 'Washroom', 'Flood Lights', 'Drinking Water']);

  const availableFacilities = [
    'Parking',
    'Washroom',
    'Changing Room',
    'Drinking Water',
    'Flood Lights',
    'Seating',
    'Equipment Rental',
    'Cafeteria / Snack Bar',
    'First Aid',
    'Live Camera Recording'
  ];

  useEffect(() => {
    if (isEditing) {
      const existing = getTurfById(id);
      if (existing) {
        setName(existing.name);
        setSport(existing.sport || 'Box Cricket');
        setCity(existing.city || 'Mumbai');
        setLocation(existing.location || existing.area || '');
        setAddress(existing.address || '');
        setTurfType(existing.turfType || 'Outdoor');
        setPricePerHour(existing.pricePerHour || existing.price || 1200);
        setOpeningTime(existing.openingTime || '06:00 AM');
        setClosingTime(existing.closingTime || '11:30 PM');
        setDescription(existing.description || '');
        setImageUrl(existing.images?.[0] || existing.image || '');
        setFacilities(existing.facilities || ['Parking', 'Washroom']);
      }
    }
  }, [id, isEditing]);

  const handleFacilityToggle = (fac) => {
    setFacilities(prev => prev.includes(fac) ? prev.filter(f => f !== fac) : [...prev, fac]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !city || !pricePerHour) {
      showToast('Please fill all mandatory turf fields.', 'error');
      return;
    }

    const payload = {
      name,
      sport,
      sports: [sport],
      sportsAvailable: [sport],
      city,
      location: location || 'Central Area',
      area: location || 'Central Area',
      address: address || `${location}, ${city}`,
      turfType,
      pricePerHour: parseInt(pricePerHour),
      price: parseInt(pricePerHour),
      openingTime,
      closingTime,
      description,
      facilities,
      images: [imageUrl],
      ownerId: currentUser?.id || 'owner-1',
      ownerName: currentUser?.name || 'Verified Owner',
      contactEmail: currentUser?.email || 'owner@playslot.com',
      contactPhone: currentUser?.phone || '+91 98201 23456'
    };

    if (isEditing) {
      updateTurf(id, payload);
      showToast(`Turf "${name}" updated successfully!`, 'success');
      navigate('/owner/turfs');
    } else {
      // New turf gets PENDING status by default!
      const newTurf = addTurf({
        ...payload,
        status: 'PENDING'
      });
      showToast(`Turf "${name}" submitted for admin approval! Status: PENDING 🏟️`, 'success');
      navigate('/owner/turfs');
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Link to="/owner/turfs" className="btn btn-outline-dark btn-sm">
          ← Back to Turfs
        </Link>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>
          {isEditing ? `Edit Arena: ${name}` : 'Add New Sports Turf'}
        </h1>
      </div>

      <div className="summary-card" style={{ padding: '36px', borderRadius: '20px' }}>
        <form onSubmit={handleSubmit}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '16px', color: '#10B981' }}>
            1. Arena Identity & Sport
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Turf / Arena Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Thunderbolts Arena & Box Turf"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Primary Sport *</label>
              <select className="form-select" value={sport} onChange={(e) => setSport(e.target.value)}>
                {sports.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>City *</label>
              <select className="form-select" value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Delhi">Delhi / NCR</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Area / Locality *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Andheri West"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Turf Type</label>
              <select className="form-select" value={turfType} onChange={(e) => setTurfType(e.target.value)}>
                <option value="Outdoor">Outdoor Ground</option>
                <option value="Indoor">Indoor Hall</option>
                <option value="Covered Box">Covered Box</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Full Street Address</label>
            <input
              type="text"
              className="form-input"
              placeholder="Building, street, landmarks, pin code..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '16px', color: '#10B981' }}>
            2. Pricing & Operational Timings
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Hourly Rate (₹) *</label>
              <input
                type="number"
                className="form-input"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Opening Time</label>
              <input
                type="text"
                className="form-input"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Closing Time</label>
              <input
                type="text"
                className="form-input"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
              />
            </div>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '16px', color: '#10B981' }}>
            3. Media & Features
          </h3>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Turf Image URL</label>
            <input
              type="url"
              className="form-input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Arena Description</label>
            <textarea
              className="form-textarea"
              rows="3"
              placeholder="Turf dimensions, grass quality, lighting lux, dugouts..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group" style={{ marginBottom: '28px' }}>
            <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '10px', display: 'block' }}>Available Facilities</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
              {availableFacilities.map(fac => (
                <label key={fac} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', cursor: 'pointer' }}>
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

          {!isEditing && (
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '14px 18px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.3rem' }}>⏳</span>
              <p style={{ fontSize: '0.85rem', color: '#92400E', margin: 0 }}>
                <strong>Turf Moderation Notice:</strong> New turfs are saved in <strong>PENDING</strong> status and will appear on the public user listing once approved by Super Admin.
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Link to="/owner/turfs" className="btn btn-outline-dark">
              Cancel
            </Link>
            <button type="submit" className="btn btn-emerald" style={{ padding: '12px 28px', fontWeight: '800' }}>
              {isEditing ? 'Save Changes' : 'Submit Turf for Approval 🚀'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerTurfForm;
