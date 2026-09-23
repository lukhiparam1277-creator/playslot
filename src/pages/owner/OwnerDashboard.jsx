import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

export const OwnerDashboard = () => {
  const {
    turfs,
    sports,
    bookings,
    addTurf,
    updateTurf,
    deleteTurf,
    getSlotsForTurfAndDate,
    addCustomSlot,
    updateSlot,
    updateSlotState,
    deleteSlot,
    updateBooking,
    deleteBooking,
    getOwnerStats
  } = useData();

  const { currentUser, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('dashboard'); // dashboard | turfs | add-turf | slots | bookings | earnings

  // Editing Turf state
  const [editingTurf, setEditingTurf] = useState(null);

  // Turf Form fields
  const [turfName, setTurfName] = useState('');
  const [turfSport, setTurfSport] = useState('Box Cricket');
  const [turfCity, setTurfCity] = useState('Mumbai');
  const [turfLoc, setTurfLoc] = useState('');
  const [turfAddress, setTurfAddress] = useState('');
  const [turfType, setTurfType] = useState('Outdoor');
  const [pricePerHour, setPricePerHour] = useState(1400);
  const [openingTime, setOpeningTime] = useState('06:00 AM');
  const [closingTime, setClosingTime] = useState('11:30 PM');
  const [turfDesc, setTurfDesc] = useState('');
  const [turfImage, setTurfImage] = useState('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80');
  const [facilities, setFacilities] = useState(['Parking', 'Washroom', 'Flood Lights', 'Drinking Water']);

  // Slot Management filter state
  const [selectedTurfId, setSelectedTurfId] = useState(turfs[0]?.id || 'turf-1');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Modals state
  const [isAddSlotModalOpen, setIsAddSlotModalOpen] = useState(false);
  const [isEditSlotModalOpen, setIsEditSlotModalOpen] = useState(false);
  const [customSlotTime, setCustomSlotTime] = useState('');
  const [customSlotPrice, setCustomSlotPrice] = useState(1200);
  const [customSlotStatus, setCustomSlotStatus] = useState('Available');
  const [originalSlotTime, setOriginalSlotTime] = useState('');

  const [deleteTurfConfirm, setDeleteTurfConfirm] = useState(null);
  const [receiptBooking, setReceiptBooking] = useState(null);

  const stats = getOwnerStats('owner-1');
  const myTurfs = turfs.filter(t => t.ownerId === 'owner-1' || t.ownerId === currentUser?.id);
  const myBookings = bookings.filter(b => b.turfId === 'turf-1' || myTurfs.some(t => t.id === b.turfId));

  const handleStartEditTurf = (turf) => {
    setEditingTurf(turf);
    setTurfName(turf.name);
    setTurfSport(turf.sport);
    setTurfCity(turf.city);
    setTurfLoc(turf.location);
    setTurfAddress(turf.address || `${turf.location}, ${turf.city}`);
    setTurfType(turf.turfType || 'Outdoor');
    setPricePerHour(turf.pricePerHour);
    setOpeningTime(turf.openingTime || '06:00 AM');
    setClosingTime(turf.closingTime || '11:30 PM');
    setTurfDesc(turf.description || '');
    setTurfImage(turf.images?.[0] || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80');
    setFacilities(turf.facilities || ['Parking', 'Washroom']);
    setActiveSection('add-turf');
  };

  const handleStartAddTurf = () => {
    setEditingTurf(null);
    setTurfName('');
    setTurfSport('Box Cricket');
    setTurfCity('Mumbai');
    setTurfLoc('');
    setTurfAddress('');
    setTurfType('Outdoor');
    setPricePerHour(1400);
    setOpeningTime('06:00 AM');
    setClosingTime('11:30 PM');
    setTurfDesc('');
    setTurfImage('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80');
    setFacilities(['Parking', 'Washroom', 'Flood Lights', 'Drinking Water']);
    setActiveSection('add-turf');
  };

  const handleSaveTurfSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: turfName,
      sport: turfSport,
      sportsAvailable: [turfSport],
      city: turfCity,
      location: turfLoc,
      address: turfAddress || `${turfLoc}, ${turfCity}`,
      turfType,
      pricePerHour: parseInt(pricePerHour),
      openingTime,
      closingTime,
      description: turfDesc,
      images: [turfImage],
      facilities,
      ownerId: 'owner-1',
      ownerName: currentUser?.name || 'Vikram Malhotra',
      status: 'Approved'
    };

    if (editingTurf) {
      updateTurf(editingTurf.id, payload);
      showToast(`Turf "${turfName}" updated successfully!`, 'success');
    } else {
      addTurf(payload);
      showToast(`Turf "${turfName}" created!`, 'success');
    }
    setActiveSection('turfs');
  };

  const handleDeleteTurf = () => {
    if (deleteTurfConfirm) {
      deleteTurf(deleteTurfConfirm.id);
      showToast(`Turf ${deleteTurfConfirm.name} deleted.`, 'success');
      setDeleteTurfConfirm(null);
    }
  };

  const handleFacilityToggle = (fac) => {
    setFacilities(prev => prev.includes(fac) ? prev.filter(f => f !== fac) : [...prev, fac]);
  };

  // Slot Management actions
  const currentSlots = getSlotsForTurfAndDate(selectedTurfId, selectedDate);

  const handleAddSlotSubmit = (e) => {
    e.preventDefault();
    if (!customSlotTime.trim()) return;
    addCustomSlot(selectedTurfId, selectedDate, {
      time: customSlotTime.trim(),
      price: parseInt(customSlotPrice),
      status: customSlotStatus
    });
    setIsAddSlotModalOpen(false);
    setCustomSlotTime('');
    showToast(`Slot "${customSlotTime}" added!`, 'success');
  };

  const handleEditSlotSubmit = (e) => {
    e.preventDefault();
    updateSlot(selectedTurfId, selectedDate, originalSlotTime, {
      time: customSlotTime.trim(),
      price: parseInt(customSlotPrice),
      status: customSlotStatus
    });
    setIsEditSlotModalOpen(false);
    showToast('Slot updated!', 'success');
  };

  const handleDeleteSlot = (time) => {
    if (confirm(`Remove slot timing "${time}"?`)) {
      deleteSlot(selectedTurfId, selectedDate, time);
      showToast(`Slot "${time}" deleted.`, 'success');
    }
  };

  return (
    <div className="owner-body">
      <div className="owner-layout">
        {/* Sidebar */}
        <aside className="owner-sidebar">
          <div className="owner-logo">
            <div className="logo-badge" style={{ width: '34px', height: '34px', fontSize: '1.1rem' }}>🏟️</div>
            <span>Turf <strong>Console</strong></span>
          </div>

          <div style={{ padding: '14px', marginBottom: '24px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser?.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--secondary-color)' }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.92rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {currentUser?.name || 'Vikram Malhotra'}
              </div>
              <span className="badge badge-success" style={{ fontSize: '0.68rem', padding: '2px 8px', marginTop: '2px' }}>VERIFIED OWNER</span>
            </div>
          </div>

          <ul className="owner-nav">
            <li className={`owner-nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}>
              <button onClick={() => setActiveSection('dashboard')}>📊 Overview</button>
            </li>
            <li className={`owner-nav-item ${activeSection === 'turfs' ? 'active' : ''}`}>
              <button onClick={() => setActiveSection('turfs')}>🏟️ My Turfs ({myTurfs.length})</button>
            </li>
            <li className={`owner-nav-item ${activeSection === 'add-turf' ? 'active' : ''}`}>
              <button onClick={handleStartAddTurf}>➕ Add Arena</button>
            </li>
            <li className={`owner-nav-item ${activeSection === 'slots' ? 'active' : ''}`}>
              <button onClick={() => setActiveSection('slots')}>⏰ Slot Schedules</button>
            </li>
            <li className={`owner-nav-item ${activeSection === 'bookings' ? 'active' : ''}`}>
              <button onClick={() => setActiveSection('bookings')}>🎟️ Customer Bookings</button>
            </li>
            <li className={`owner-nav-item ${activeSection === 'earnings' ? 'active' : ''}`}>
              <button onClick={() => setActiveSection('earnings')}>💰 Earnings & Payouts</button>
            </li>
            <li className="owner-nav-item">
              <Link to="/venues" target="_blank">⚽ Live Public Site ↗</Link>
            </li>
          </ul>

          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="btn btn-outline-dark"
              style={{ width: '100%', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              Log Out Owner
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="owner-main">
          {/* 1. Dashboard Overview */}
          {activeSection === 'dashboard' && (
            <div>
              <div className="owner-header">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '900' }}>🏟️ Turf Owner Console</h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Manage turf arenas, configure slot timings & pricing, and audit reservations
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span className="badge badge-success">● Live Accepting Bookings</span>
                  <Link to="/venues" target="_blank" className="btn btn-outline-dark btn-sm">Public View ↗</Link>
                </div>
              </div>

              {/* Stats */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}>🏟️</div>
                  <div className="stat-info">
                    <h4>Managed Turfs</h4>
                    <div className="value">{myTurfs.length} Arenas</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#ECFDF5', color: '#10B981' }}>🎟️</div>
                  <div className="stat-info">
                    <h4>Upcoming Bookings</h4>
                    <div className="value">{myBookings.filter(b => b.status === 'Confirmed').length || 18} Slots</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>💰</div>
                  <div className="stat-info">
                    <h4>Monthly Revenue</h4>
                    <div className="value">₹{stats.monthlyRevenue.toLocaleString()}</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#F3E8FF', color: '#8B5CF6' }}>⭐</div>
                  <div className="stat-info">
                    <h4>Average Rating</h4>
                    <div className="value">4.9 / 5.0</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
                <button onClick={handleStartAddTurf} className="btn btn-primary">+ Add New Turf Arena</button>
                <button onClick={() => setActiveSection('slots')} className="btn btn-emerald">⏰ Manage Slot Timings</button>
                <button onClick={() => setActiveSection('bookings')} className="btn btn-outline-dark">🎟️ View All Reservations</button>
              </div>

              {/* My Turfs Quick Table */}
              <div className="table-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Active Turf Arenas</h3>
                  <button onClick={() => setActiveSection('turfs')} className="btn btn-outline-dark btn-sm">View All ➔</button>
                </div>
                <div className="table-responsive">
                  <table className="owner-table">
                    <thead>
                      <tr>
                        <th>Turf Arena</th>
                        <th>Sport</th>
                        <th>Location</th>
                        <th>Price/Hr</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myTurfs.map(t => (
                        <tr key={t.id}>
                          <td>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <img src={t.images?.[0]} alt={t.name} style={{ width: '45px', height: '35px', borderRadius: '6px', objectFit: 'cover' }} />
                              <strong>{t.name}</strong>
                            </div>
                          </td>
                          <td><span className="badge badge-primary">{t.sport}</span></td>
                          <td>{t.location}, {t.city}</td>
                          <td><strong>₹{t.pricePerHour}</strong></td>
                          <td><span className="badge badge-success">{t.status}</span></td>
                          <td>
                            <button onClick={() => { setSelectedTurfId(t.id); setActiveSection('slots'); }} className="btn btn-emerald btn-sm">
                              Slots
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. My Turfs (CRUD) */}
          {activeSection === 'turfs' && (
            <div>
              <div className="owner-header">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '900' }}>🏟️ My Registered Turfs ({myTurfs.length})</h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Create, edit details, adjust hourly rates, and schedule slots
                  </p>
                </div>
                <button onClick={handleStartAddTurf} className="btn btn-primary">+ Add New Turf</button>
              </div>

              <div className="table-card">
                <div className="table-responsive">
                  <table className="owner-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Turf Name</th>
                        <th>Sport</th>
                        <th>Location</th>
                        <th>Rate/Hr</th>
                        <th>Total Slots</th>
                        <th>Status</th>
                        <th>Actions (CRUD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myTurfs.map(t => (
                        <tr key={t.id}>
                          <td><img src={t.images?.[0]} alt={t.name} style={{ width: '60px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} /></td>
                          <td><strong>{t.name}</strong><br /><span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.turfType} Turf</span></td>
                          <td><span className="badge badge-primary">🏆 {t.sport}</span></td>
                          <td>{t.location}, {t.city}</td>
                          <td><strong>₹{t.pricePerHour}</strong> / hr</td>
                          <td>⚡ {t.slotTimings ? t.slotTimings.length : 7} Slots</td>
                          <td><span className="badge badge-success">{t.status}</span></td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              <Link to={`/venues/${t.id}`} target="_blank" className="btn btn-outline-dark btn-sm">View</Link>
                              <button onClick={() => handleStartEditTurf(t)} className="btn btn-primary btn-sm">Edit</button>
                              <button onClick={() => { setSelectedTurfId(t.id); setActiveSection('slots'); }} className="btn btn-emerald btn-sm">Slots</button>
                              <button onClick={() => setDeleteTurfConfirm(t)} className="btn btn-danger btn-sm">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. Add / Edit Turf Form */}
          {activeSection === 'add-turf' && (
            <div>
              <div className="owner-header">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '900' }}>
                    {editingTurf ? `✏️ Edit Turf: ${editingTurf.name}` : '🏟️ Register New Turf Arena'}
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Configure venue specs, playing amenities, and pricing
                  </p>
                </div>
                <button onClick={() => setActiveSection('turfs')} className="btn btn-outline-dark">Cancel</button>
              </div>

              <div className="summary-card" style={{ maxWidth: '900px' }}>
                <form onSubmit={handleSaveTurfSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '16px' }}>
                    <div className="form-group">
                      <label>Turf Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={turfName}
                        onChange={(e) => setTurfName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Primary Sport *</label>
                      <select className="form-select" value={turfSport} onChange={(e) => setTurfSport(e.target.value)}>
                        {sports.map(s => <option key={s.id} value={s.name}>{s.icon} {s.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div className="form-group">
                      <label>City *</label>
                      <select className="form-select" value={turfCity} onChange={(e) => setTurfCity(e.target.value)}>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Delhi">Delhi / NCR</option>
                        <option value="Pune">Pune</option>
                        <option value="Hyderabad">Hyderabad</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Area / Locality *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={turfLoc}
                        onChange={(e) => setTurfLoc(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Format</label>
                      <select className="form-select" value={turfType} onChange={(e) => setTurfType(e.target.value)}>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Indoor">Indoor</option>
                        <option value="Covered Box">Covered Box</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label>Full Address</label>
                    <input
                      type="text"
                      className="form-input"
                      value={turfAddress}
                      onChange={(e) => setTurfAddress(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div className="form-group">
                      <label>Price Per Hour (₹) *</label>
                      <input
                        type="number"
                        className="form-input"
                        value={pricePerHour}
                        onChange={(e) => setPricePerHour(e.target.value)}
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
                    <label>Image URL</label>
                    <input
                      type="url"
                      className="form-input"
                      value={turfImage}
                      onChange={(e) => setTurfImage(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '18px' }}>
                    <label>Description</label>
                    <textarea
                      className="form-textarea"
                      rows="3"
                      value={turfDesc}
                      onChange={(e) => setTurfDesc(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-group" style={{ marginBottom: '24px' }}>
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

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" className="btn btn-emerald btn-lg" style={{ flex: 1 }}>
                      {editingTurf ? 'Save Changes ⚡' : 'Create Turf Arena ⚡'}
                    </button>
                    <button type="button" onClick={() => setActiveSection('turfs')} className="btn btn-outline-dark btn-lg">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 4. Slot Schedules Matrix (CRUD) */}
          {activeSection === 'slots' && (
            <div>
              <div className="owner-header">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '900' }}>⏰ Slot Management & Availability Matrix</h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Create custom slots, edit slot prices, and block dates for maintenance
                  </p>
                </div>
              </div>

              {/* Filter Row */}
              <div className="search-card" style={{ marginBottom: '28px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr auto', gap: '16px', alignItems: 'end' }}>
                  <div className="form-group">
                    <label>Select Turf Arena</label>
                    <select
                      className="form-select"
                      value={selectedTurfId}
                      onChange={(e) => setSelectedTurfId(e.target.value)}
                    >
                      {myTurfs.map(t => <option key={t.id} value={t.id}>{t.name} ({t.sport})</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Select Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={() => {
                      setCustomSlotTime('');
                      setCustomSlotPrice(1200);
                      setCustomSlotStatus('Available');
                      setIsAddSlotModalOpen(true);
                    }}
                    className="btn btn-primary"
                    style={{ height: '48px' }}
                  >
                    + Add Custom Slot
                  </button>
                </div>
              </div>

              {/* Slot Grid */}
              <div className="table-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Slot Schedule ({currentSlots.length} Timings)</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="badge badge-success">● Available</span>
                    <span className="badge badge-danger">● Booked</span>
                    <span className="badge badge-dark">● Blocked</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                  {currentSlots.map((slot, idx) => (
                    <div
                      key={slot.id || idx}
                      style={{
                        background: 'var(--bg-color)',
                        border: `1.5px solid ${slot.status === 'Available' ? '#A7F3D0' : (slot.status === 'Booked' ? '#FECACA' : '#CBD5E1')}`,
                        padding: '16px',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.92rem' }}>⏰ {slot.time}</strong>
                        <span className={`badge ${slot.status === 'Available' ? 'badge-success' : (slot.status === 'Booked' ? 'badge-danger' : 'badge-dark')}`}>
                          {slot.status}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                          ₹{slot.price} / hr
                        </span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => {
                              setOriginalSlotTime(slot.time);
                              setCustomSlotTime(slot.time);
                              setCustomSlotPrice(slot.price);
                              setCustomSlotStatus(slot.status);
                              setIsEditSlotModalOpen(true);
                            }}
                            className="btn btn-outline-dark btn-sm"
                          >
                            Edit
                          </button>
                          {slot.status === 'Available' ? (
                            <button
                              onClick={() => {
                                updateSlotState(selectedTurfId, selectedDate, slot.time, 'Blocked');
                                showToast(`Slot "${slot.time}" blocked.`, 'info');
                              }}
                              className="btn btn-warning btn-sm"
                            >
                              Block
                            </button>
                          ) : (slot.status === 'Blocked' ? (
                            <button
                              onClick={() => {
                                updateSlotState(selectedTurfId, selectedDate, slot.time, 'Available');
                                showToast(`Slot "${slot.time}" unblocked.`, 'success');
                              }}
                              className="btn btn-emerald btn-sm"
                            >
                              Unblock
                            </button>
                          ) : null)}
                          <button
                            onClick={() => handleDeleteSlot(slot.time)}
                            className="btn btn-danger btn-sm"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. Customer Bookings */}
          {activeSection === 'bookings' && (
            <div>
              <div className="owner-header">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '900' }}>🎟️ Turf Reservations Log ({myBookings.length})</h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Track incoming match reservations and verify player tickets
                  </p>
                </div>
              </div>

              <div className="table-card">
                <div className="table-responsive">
                  <table className="owner-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Player Customer</th>
                        <th>Turf Arena</th>
                        <th>Date & Slot</th>
                        <th>Players</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myBookings.map(b => (
                        <tr key={b.id || b.bookingId}>
                          <td><strong style={{ color: 'var(--primary-color)' }}>{b.bookingId}</strong></td>
                          <td>👤 <strong>{b.userName}</strong><br /><span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.userPhone || ''}</span></td>
                          <td><strong>{b.turfName}</strong><br /><span style={{ fontSize: '0.78rem', color: 'var(--primary-color)' }}>🏆 {b.sport}</span></td>
                          <td>📅 {b.date}<br />⏰ <strong>{b.timeSlot}</strong></td>
                          <td>{b.playersCount || 6}</td>
                          <td><strong style={{ color: '#059669' }}>₹{b.totalAmount}</strong></td>
                          <td><span className={`badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}`}>{b.status}</span></td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              <button onClick={() => setReceiptBooking(b)} className="btn btn-outline-dark btn-sm">Receipt</button>
                              {b.status === 'Confirmed' && (
                                <>
                                  <button onClick={() => { updateBooking(b.bookingId, { status: 'Completed' }); showToast('Marked Completed ✓', 'success'); }} className="btn btn-secondary btn-sm">Complete</button>
                                  <button onClick={() => { updateBooking(b.bookingId, { status: 'Cancelled' }); showToast('Reservation Cancelled', 'info'); }} className="btn btn-danger btn-sm">Cancel</button>
                                </>
                              )}
                              <button onClick={() => { if (confirm(`Delete reservation #${b.bookingId}?`)) { deleteBooking(b.bookingId); showToast('Deleted record', 'info'); } }} className="btn btn-danger btn-sm">✕</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 6. Earnings */}
          {activeSection === 'earnings' && (
            <div>
              <div className="owner-header">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '900' }}>💰 Earnings & Financial Reports</h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Track gross receipts, commission breakdown, and bank payouts
                  </p>
                </div>
                <button onClick={() => showToast('Financial settlement report dispatched to email! ✉️', 'success')} className="btn btn-outline-dark">
                  Export Report 📄
                </button>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#ECFDF5', color: '#10B981' }}>📅</div>
                  <div className="stat-info">
                    <h4>Today's Earnings</h4>
                    <div className="value">₹3,400</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}>📈</div>
                  <div className="stat-info">
                    <h4>This Week</h4>
                    <div className="value">₹24,800</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>💰</div>
                  <div className="stat-info">
                    <h4>This Month</h4>
                    <div className="value">₹{stats.monthlyRevenue.toLocaleString()}</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#F3E8FF', color: '#8B5CF6' }}>🏦</div>
                  <div className="stat-info">
                    <h4>Lifetime Payouts</h4>
                    <div className="value">₹4,28,000</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Slot Modal */}
      <Modal
        isOpen={isAddSlotModalOpen}
        onClose={() => setIsAddSlotModalOpen(false)}
        title="Add Custom Time Slot"
      >
        <form onSubmit={handleAddSlotSubmit}>
          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label>Slot Timing (e.g. 11:00 PM - 12:00 AM) *</label>
            <input
              type="text"
              className="form-input"
              value={customSlotTime}
              onChange={(e) => setCustomSlotTime(e.target.value)}
              placeholder="e.g. 11:00 PM - 12:00 AM"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label>Slot Price (₹) *</label>
            <input
              type="number"
              className="form-input"
              value={customSlotPrice}
              onChange={(e) => setCustomSlotPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>Initial Status</label>
            <select
              className="form-select"
              value={customSlotStatus}
              onChange={(e) => setCustomSlotStatus(e.target.value)}
            >
              <option value="Available">Available</option>
              <option value="Blocked">Blocked / Maintenance</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setIsAddSlotModalOpen(false)} className="btn btn-outline-dark">Cancel</button>
            <button type="submit" className="btn btn-primary">Add Slot</button>
          </div>
        </form>
      </Modal>

      {/* Edit Slot Modal */}
      <Modal
        isOpen={isEditSlotModalOpen}
        onClose={() => setIsEditSlotModalOpen(false)}
        title="Edit Slot Timing"
      >
        <form onSubmit={handleEditSlotSubmit}>
          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label>Slot Timing *</label>
            <input
              type="text"
              className="form-input"
              value={customSlotTime}
              onChange={(e) => setCustomSlotTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label>Slot Price (₹) *</label>
            <input
              type="number"
              className="form-input"
              value={customSlotPrice}
              onChange={(e) => setCustomSlotPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>Slot Status</label>
            <select
              className="form-select"
              value={customSlotStatus}
              onChange={(e) => setCustomSlotStatus(e.target.value)}
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
              <option value="Blocked">Blocked / Maintenance</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setIsEditSlotModalOpen(false)} className="btn btn-outline-dark">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Slot Changes</button>
          </div>
        </form>
      </Modal>

      {/* Delete Turf Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTurfConfirm)}
        onClose={() => setDeleteTurfConfirm(null)}
        title="Delete Turf Arena"
      >
        <p style={{ color: 'var(--text-body)', lineHeight: '1.7', marginBottom: '20px' }}>
          Are you sure you want to permanently delete <strong>{deleteTurfConfirm?.name}</strong>? All scheduled slots will be unlisted.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={() => setDeleteTurfConfirm(null)} className="btn btn-outline-dark">Cancel</button>
          <button onClick={handleDeleteTurf} className="btn btn-danger">Delete Turf</button>
        </div>
      </Modal>

      {/* Receipt Modal */}
      <Modal
        isOpen={Boolean(receiptBooking)}
        onClose={() => setReceiptBooking(null)}
        title={`Receipt #${receiptBooking?.bookingId}`}
      >
        {receiptBooking && (
          <div>
            <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '12px', fontSize: '0.9rem', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Customer:</span>
                <strong>{receiptBooking.userName} ({receiptBooking.userPhone || ''})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Schedule:</span>
                <strong>📅 {receiptBooking.date} • ⏰ {receiptBooking.timeSlot}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                <span className={`badge ${receiptBooking.status === 'Confirmed' ? 'badge-success' : 'badge-primary'}`}>{receiptBooking.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px dashed var(--border-color)' }}>
                <span style={{ fontWeight: '700' }}>Amount:</span>
                <strong style={{ color: 'var(--primary-color)' }}>₹{receiptBooking.totalAmount}</strong>
              </div>
            </div>
            <button onClick={() => setReceiptBooking(null)} className="btn btn-primary" style={{ width: '100%' }}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};
