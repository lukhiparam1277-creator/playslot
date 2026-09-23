import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/common/Modal';

export default function AdminDashboard() {
  const {
    turfs, addTurf, updateTurf, deleteTurf,
    sports, addSport, updateSport, deleteSport,
    bookings, updateBookingStatus, deleteBooking,
    users, addUser, updateUser, deleteUser,
    applications
  } = useData();
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // overview, turfs, users, bookings, sports

  // Modals state
  const [turfModalOpen, setTurfModalOpen] = useState(false);
  const [editingTurf, setEditingTurf] = useState(null);
  const [turfForm, setTurfForm] = useState({
    name: '', city: 'Bangalore', area: '', address: '', price: 1200,
    sports: ['Football'], rating: 4.8, image: '', description: '',
    amenities: ['Floodlights', 'Parking', 'Changing Rooms'], status: 'active'
  });

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    name: '', email: '', phone: '', role: 'user', status: 'active'
  });

  const [sportModalOpen, setSportModalOpen] = useState(false);
  const [editingSport, setEditingSport] = useState(null);
  const [sportForm, setSportForm] = useState({
    name: '', icon: 'fas fa-running', image: '', count: 0, tag: 'Popular', description: ''
  });

  // Calculate high-level KPIs
  const totalTurfs = turfs.length;
  const totalUsers = users.length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + (Number(b.amount) || 0) : sum, 0);
  const pendingRequests = applications.filter(a => a.status === 'Pending').length;

  // Turf Handlers
  const handleOpenTurfModal = (turf = null) => {
    if (turf) {
      setEditingTurf(turf);
      setTurfForm({
        ...turf,
        sports: Array.isArray(turf.sports) ? turf.sports : [turf.sports],
        amenities: Array.isArray(turf.amenities) ? turf.amenities : [turf.amenities]
      });
    } else {
      setEditingTurf(null);
      setTurfForm({
        name: '', city: 'Bangalore', area: '', address: '', price: 1200,
        sports: ['Football'], rating: 4.8,
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
        description: 'Premium sports facility equipped with professional turf and lighting.',
        amenities: ['Floodlights', 'Parking', 'Changing Rooms'], status: 'active'
      });
    }
    setTurfModalOpen(true);
  };

  const handleSaveTurf = (e) => {
    e.preventDefault();
    if (!turfForm.name || !turfForm.city || !turfForm.price) {
      addToast('Please fill all mandatory turf fields', 'error');
      return;
    }
    if (editingTurf) {
      updateTurf(editingTurf.id, turfForm);
      addToast(`Turf "${turfForm.name}" updated successfully!`, 'success');
    } else {
      addTurf({
        ...turfForm,
        price: Number(turfForm.price),
        rating: Number(turfForm.rating) || 4.8,
        reviewsCount: 12
      });
      addToast(`Turf "${turfForm.name}" created successfully!`, 'success');
    }
    setTurfModalOpen(false);
  };

  const handleDeleteTurf = (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete turf "${name}"?`)) {
      deleteTurf(id);
      addToast(`Turf "${name}" removed.`, 'info');
    }
  };

  // User Handlers
  const handleOpenUserModal = (usr = null) => {
    if (usr) {
      setEditingUser(usr);
      setUserForm({ ...usr });
    } else {
      setEditingUser(null);
      setUserForm({ name: '', email: '', phone: '', role: 'user', status: 'active' });
    }
    setUserModalOpen(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email) {
      addToast('Name and email are required', 'error');
      return;
    }
    if (editingUser) {
      updateUser(editingUser.id, userForm);
      addToast(`User "${userForm.name}" updated!`, 'success');
    } else {
      addUser(userForm);
      addToast(`User account created for "${userForm.name}"!`, 'success');
    }
    setUserModalOpen(false);
  };

  const handleDeleteUser = (id, name) => {
    if (window.confirm(`Delete user account "${name}"?`)) {
      deleteUser(id);
      addToast(`User "${name}" deleted.`, 'info');
    }
  };

  // Sport Handlers
  const handleOpenSportModal = (sp = null) => {
    if (sp) {
      setEditingSport(sp);
      setSportForm({ ...sp });
    } else {
      setEditingSport(null);
      setSportForm({
        name: '', icon: 'fas fa-running',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
        count: 5, tag: 'Popular', description: 'Fast-paced team sport.'
      });
    }
    setSportModalOpen(true);
  };

  const handleSaveSport = (e) => {
    e.preventDefault();
    if (!sportForm.name) {
      addToast('Sport name is required', 'error');
      return;
    }
    if (editingSport) {
      updateSport(editingSport.id, sportForm);
      addToast(`Sport category "${sportForm.name}" updated!`, 'success');
    } else {
      addSport(sportForm);
      addToast(`New sport "${sportForm.name}" added to catalog!`, 'success');
    }
    setSportModalOpen(false);
  };

  const handleDeleteSport = (id, name) => {
    if (window.confirm(`Delete sport category "${name}"?`)) {
      deleteSport(id);
      addToast(`Sport "${name}" removed.`, 'info');
    }
  };

  return (
    <div className="admin-page-wrapper" style={{ minHeight: 'calc(100vh - 180px)', padding: '30px 0 80px 0' }}>
      <div className="container">
        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
              <i className="fas fa-shield-alt"></i>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Super Admin Console</h1>
                <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>Master Access</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Logged in as <strong>{user?.name || 'Administrator'}</strong> ({user?.email})
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link to="/admin/owner-requests" className="btn btn-sm" style={{ background: '#ef4444', color: '#fff', position: 'relative' }}>
              <i className="fas fa-file-signature" style={{ marginRight: '6px' }}></i> Partner Requests
              {pendingRequests > 0 && (
                <span style={{ marginLeft: '6px', background: '#fff', color: '#ef4444', borderRadius: '999px', padding: '1px 6px', fontSize: '0.75rem', fontWeight: 800 }}>
                  {pendingRequests}
                </span>
              )}
            </Link>
            <button onClick={() => { logout(); navigate('/admin/login'); }} className="btn btn-sm btn-outline">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px' }}>
          {[
            { id: 'overview', label: 'Analytics & Overview', icon: 'fas fa-chart-line' },
            { id: 'turfs', label: `Turfs (${turfs.length})`, icon: 'fas fa-map-marked-alt' },
            { id: 'users', label: `Users (${users.length})`, icon: 'fas fa-users' },
            { id: 'bookings', label: `Bookings (${bookings.length})`, icon: 'fas fa-calendar-check' },
            { id: 'sports', label: `Sports (${sports.length})`, icon: 'fas fa-volleyball-ball' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="btn btn-sm"
              style={{
                background: activeTab === tab.id ? '#ef4444' : 'var(--card-bg)',
                color: activeTab === tab.id ? '#fff' : 'var(--text-main)',
                border: '1px solid ' + (activeTab === tab.id ? '#ef4444' : 'var(--card-border)'),
                padding: '10px 18px',
                borderRadius: '10px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <i className={tab.icon}></i> {tab.label}
            </button>
          ))}
        </div>

        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              <div className="card glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Revenue</div>
                  <i className="fas fa-rupee-sign" style={{ color: '#10b981', fontSize: '1.2rem' }}></i>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px' }}>₹{totalRevenue.toLocaleString()}</div>
                <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '4px' }}>
                  <i className="fas fa-arrow-up"></i> +18.4% this month
                </div>
              </div>

              <div className="card glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Turfs</div>
                  <i className="fas fa-futbol" style={{ color: 'var(--primary)', fontSize: '1.2rem' }}></i>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px' }}>{totalTurfs}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Across 8 cities</div>
              </div>

              <div className="card glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Registered Users</div>
                  <i className="fas fa-users" style={{ color: 'var(--accent)', fontSize: '1.2rem' }}></i>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px' }}>{totalUsers}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '4px' }}>
                  <i className="fas fa-user-plus"></i> Verified profiles
                </div>
              </div>

              <div className="card glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pending Onboarding</div>
                  <i className="fas fa-clock" style={{ color: '#f59e0b', fontSize: '1.2rem' }}></i>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px' }}>{pendingRequests}</div>
                <div style={{ fontSize: '0.8rem', color: pendingRequests > 0 ? '#f59e0b' : 'var(--text-muted)', marginTop: '4px' }}>
                  {pendingRequests > 0 ? 'Requires attention' : 'All clear'}
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Bookings */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              <div className="card glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Quick Operations</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button onClick={() => handleOpenTurfModal()} className="btn btn-outline" style={{ padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <i className="fas fa-plus-circle" style={{ color: 'var(--primary)', fontSize: '1.3rem' }}></i>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Add New Turf</div>
                  </button>
                  <button onClick={() => handleOpenUserModal()} className="btn btn-outline" style={{ padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <i className="fas fa-user-plus" style={{ color: 'var(--accent)', fontSize: '1.3rem' }}></i>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Create User</div>
                  </button>
                  <button onClick={() => handleOpenSportModal()} className="btn btn-outline" style={{ padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <i className="fas fa-trophy" style={{ color: '#f59e0b', fontSize: '1.3rem' }}></i>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Add Sport</div>
                  </button>
                  <Link to="/admin/owner-requests" className="btn btn-outline" style={{ padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <i className="fas fa-tasks" style={{ color: '#ef4444', fontSize: '1.3rem' }}></i>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Audit Requests</div>
                  </Link>
                </div>
              </div>

              <div className="card glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Reservations</h3>
                  <button onClick={() => setActiveTab('bookings')} className="btn btn-sm btn-outline" style={{ fontSize: '0.78rem' }}>View All</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {bookings.slice(0, 4).map(b => (
                    <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{b.turfName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.sport} • {b.date} • {b.slot}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>₹{b.amount}</div>
                        <span className={`badge ${b.status === 'confirmed' ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: TURFS CRUD */}
        {activeTab === 'turfs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Manage Turf Arenas</h2>
              <button onClick={() => handleOpenTurfModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-plus"></i> Add New Turf
              </button>
            </div>

            <div className="card glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="table-responsive" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--card-border)' }}>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>ARENA</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>CITY / AREA</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>SPORTS</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>PRICE / HR</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>RATING</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {turfs.map(t => (
                      <tr key={t.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={t.image} alt={t.name} style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.name}</div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ID: {t.id}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '0.9rem' }}>
                          <div>{t.city}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.area}</div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {(Array.isArray(t.sports) ? t.sports : [t.sports]).map((s, idx) => (
                              <span key={idx} className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{s}</span>
                            ))}
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--primary)' }}>
                          ₹{t.price}
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '0.9rem' }}>
                          <i className="fas fa-star" style={{ color: '#f59e0b', marginRight: '4px' }}></i> {t.rating || '4.8'}
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <Link to={`/venues/${t.id}`} className="btn btn-sm btn-outline" title="View Public Page">
                              <i className="fas fa-eye"></i>
                            </Link>
                            <button onClick={() => handleOpenTurfModal(t)} className="btn btn-sm btn-outline" title="Edit Turf">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button onClick={() => handleDeleteTurf(t.id, t.name)} className="btn btn-sm btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444' }} title="Delete Turf">
                              <i className="fas fa-trash-alt"></i>
                            </button>
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

        {/* TAB: USERS CRUD */}
        {activeTab === 'users' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>User Accounts & Roles</h2>
              <button onClick={() => handleOpenUserModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-user-plus"></i> Add New User
              </button>
            </div>

            <div className="card glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="table-responsive" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--card-border)' }}>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>NAME & EMAIL</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>PHONE</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>ROLE</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>STATUS</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{u.name}</div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{u.email}</div>
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '0.9rem' }}>
                          {u.phone || '—'}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <span className={`badge ${u.role === 'admin' ? 'badge-danger' : u.role === 'turf_owner' ? 'badge-warning' : 'badge-primary'}`} style={{ textTransform: 'capitalize' }}>
                            {u.role ? u.role.replace('_', ' ') : 'User'}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <span className={`badge ${u.status === 'blocked' ? 'badge-danger' : 'badge-success'}`}>
                            {u.status || 'Active'}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button onClick={() => handleOpenUserModal(u)} className="btn btn-sm btn-outline" title="Edit User">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => {
                                const newStatus = u.status === 'blocked' ? 'active' : 'blocked';
                                updateUser(u.id, { status: newStatus });
                                addToast(`User status set to ${newStatus}`, 'info');
                              }}
                              className="btn btn-sm btn-outline"
                              style={{ color: u.status === 'blocked' ? '#10b981' : '#f59e0b', borderColor: u.status === 'blocked' ? '#10b981' : '#f59e0b' }}
                              title={u.status === 'blocked' ? 'Unblock User' : 'Block User'}
                            >
                              <i className={u.status === 'blocked' ? 'fas fa-unlock' : 'fas fa-ban'}></i>
                            </button>
                            <button onClick={() => handleDeleteUser(u.id, u.name)} className="btn btn-sm btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444' }} title="Delete User">
                              <i className="fas fa-trash-alt"></i>
                            </button>
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

        {/* TAB: BOOKINGS CRUD */}
        {activeTab === 'bookings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Master Booking Registry</h2>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{bookings.length} reservations recorded</span>
            </div>

            <div className="card glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="table-responsive" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--card-border)' }}>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>BOOKING ID</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>TURF & SPORT</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>DATE & TIME</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>CUSTOMER</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>AMOUNT</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>STATUS</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                        <td style={{ padding: '16px 20px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)' }}>
                          {b.id}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 700 }}>{b.turfName}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.sport}</div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 600 }}>{b.date}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.slot}</div>
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '0.9rem' }}>
                          <div>{b.userName || 'Guest Player'}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.userPhone || '—'}</div>
                        </td>
                        <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--primary)' }}>
                          ₹{b.amount}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <span className={`badge ${b.status === 'confirmed' ? 'badge-success' : b.status === 'completed' ? 'badge-primary' : 'badge-danger'}`} style={{ textTransform: 'capitalize' }}>
                            {b.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            {b.status === 'confirmed' && (
                              <button
                                onClick={() => {
                                  updateBookingStatus(b.id, 'cancelled');
                                  addToast(`Reservation #${b.id} cancelled.`, 'info');
                                }}
                                className="btn btn-sm btn-outline"
                                style={{ color: '#ef4444', borderColor: '#ef4444', fontSize: '0.78rem' }}
                                title="Cancel Booking"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete booking record #${b.id}?`)) {
                                  deleteBooking(b.id);
                                  addToast('Booking record deleted.', 'info');
                                }
                              }}
                              className="btn btn-sm btn-outline"
                              style={{ color: '#ef4444', borderColor: '#ef4444' }}
                              title="Delete Record"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
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

        {/* TAB: SPORTS CRUD */}
        {activeTab === 'sports' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Manage Sport Categories</h2>
              <button onClick={() => handleOpenSportModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-plus"></i> Add Sport Category
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {sports.map(sp => (
                <div key={sp.id} className="card glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                        <i className={sp.icon || 'fas fa-running'}></i>
                      </div>
                      <span className="badge badge-primary">{sp.tag || 'Popular'}</span>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>{sp.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>{sp.description}</p>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <strong>{sp.count || 0}</strong> active venues supporting this sport
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--card-border)' }}>
                    <button onClick={() => handleOpenSportModal(sp)} className="btn btn-sm btn-outline" style={{ flex: 1 }}>
                      <i className="fas fa-edit" style={{ marginRight: '6px' }}></i> Edit
                    </button>
                    <button onClick={() => handleDeleteSport(sp.id, sp.name)} className="btn btn-sm btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Turf Modal */}
      {turfModalOpen && (
        <Modal
          isOpen={turfModalOpen}
          onClose={() => setTurfModalOpen(false)}
          title={editingTurf ? `Edit Turf: ${editingTurf.name}` : 'Create New Turf Arena'}
        >
          <form onSubmit={handleSaveTurf}>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">Arena Name *</label>
              <input
                type="text"
                className="form-control"
                required
                value={turfForm.name}
                onChange={(e) => setTurfForm({ ...turfForm, name: e.target.value })}
                placeholder="e.g. Apex Football Arena"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={turfForm.city}
                  onChange={(e) => setTurfForm({ ...turfForm, city: e.target.value })}
                  placeholder="Bangalore"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Area / Locality</label>
                <input
                  type="text"
                  className="form-control"
                  value={turfForm.area}
                  onChange={(e) => setTurfForm({ ...turfForm, area: e.target.value })}
                  placeholder="Indiranagar"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">Full Address</label>
              <input
                type="text"
                className="form-control"
                value={turfForm.address}
                onChange={(e) => setTurfForm({ ...turfForm, address: e.target.value })}
                placeholder="100 Feet Road, HAL 2nd Stage"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div className="form-group">
                <label className="form-label">Hourly Price (₹) *</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={turfForm.price}
                  onChange={(e) => setTurfForm({ ...turfForm, price: e.target.value })}
                  placeholder="1200"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  className="form-control"
                  value={turfForm.rating}
                  onChange={(e) => setTurfForm({ ...turfForm, rating: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">Image URL</label>
              <input
                type="url"
                className="form-control"
                value={turfForm.image}
                onChange={(e) => setTurfForm({ ...turfForm, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="2"
                value={turfForm.description}
                onChange={(e) => setTurfForm({ ...turfForm, description: e.target.value })}
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button type="button" className="btn btn-outline" onClick={() => setTurfModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save" style={{ marginRight: '6px' }}></i> {editingTurf ? 'Update Turf' : 'Create Turf'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* User Modal */}
      {userModalOpen && (
        <Modal
          isOpen={userModalOpen}
          onClose={() => setUserModalOpen(false)}
          title={editingUser ? `Edit User: ${editingUser.name}` : 'Create User Account'}
        >
          <form onSubmit={handleSaveUser}>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-control"
                required
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                placeholder="Rohit Sharma"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-control"
                required
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                placeholder="rohit@example.com"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                value={userForm.phone}
                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                placeholder="+91 98765 43210"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div className="form-group">
                <label className="form-label">User Role</label>
                <select
                  className="form-control"
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                >
                  <option value="user">User / Player</option>
                  <option value="turf_owner">Turf Owner</option>
                  <option value="admin">Super Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  value={userForm.status}
                  onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-outline" onClick={() => setUserModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save" style={{ marginRight: '6px' }}></i> {editingUser ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Sport Modal */}
      {sportModalOpen && (
        <Modal
          isOpen={sportModalOpen}
          onClose={() => setSportModalOpen(false)}
          title={editingSport ? `Edit Sport: ${editingSport.name}` : 'Add Sport Category'}
        >
          <form onSubmit={handleSaveSport}>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">Sport Name *</label>
              <input
                type="text"
                className="form-control"
                required
                value={sportForm.name}
                onChange={(e) => setSportForm({ ...sportForm, name: e.target.value })}
                placeholder="e.g. Squash"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">FontAwesome Icon Class</label>
              <input
                type="text"
                className="form-control"
                value={sportForm.icon}
                onChange={(e) => setSportForm({ ...sportForm, icon: e.target.value })}
                placeholder="fas fa-table-tennis"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">Tag / Badge</label>
              <input
                type="text"
                className="form-control"
                value={sportForm.tag}
                onChange={(e) => setSportForm({ ...sportForm, tag: e.target.value })}
                placeholder="Fast-Paced, Trending..."
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="2"
                value={sportForm.description}
                onChange={(e) => setSportForm({ ...sportForm, description: e.target.value })}
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button type="button" className="btn btn-outline" onClick={() => setSportModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save" style={{ marginRight: '6px' }}></i> {editingSport ? 'Save Sport' : 'Create Sport'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
