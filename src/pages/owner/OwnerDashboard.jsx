import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/statistics';

export const OwnerDashboard = () => {
  const { currentUser } = useAuth();
  const { getOwnerStats, turfs, bookings, sports } = useData();

  const ownerId = currentUser?.id || 'owner-1';
  const stats = getOwnerStats(ownerId);

  // Filter isolated owner data
  const myTurfs = turfs.filter(t => t.ownerId === ownerId);
  const myTurfIds = myTurfs.map(t => t.id);
  const myBookings = bookings.filter(b => myTurfIds.includes(b.turfId) || b.ownerId === ownerId);
  const recentBookings = myBookings.slice(0, 5);

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
        color: '#FFFFFF',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        boxShadow: '0 12px 30px rgba(6, 95, 70, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '10px' }}>
            🏟️ PARTNER CONSOLE OVERVIEW
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
            Welcome back, {currentUser?.name || 'Partner'}!
          </h1>
          <p style={{ color: '#A7F3D0', fontSize: '0.95rem', marginTop: '6px', maxWidth: '600px' }}>
            {currentUser?.businessName || 'Your Sports Arena'} • All bookings and slot statistics are calculated in real-time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/owner/turfs/add" className="btn btn-primary" style={{ background: '#FFFFFF', color: '#065F46', border: 'none', fontWeight: '800' }}>
            ➕ Add New Turf
          </Link>
          <Link to="/owner/slots" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}>
            ⏰ Manage Slots
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ECFDF5', color: '#10B981' }}>
            🏟️
          </div>
          <div className="stat-info">
            <h4>My Turfs</h4>
            <div className="value">{stats.myTurfsCount}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
            📅
          </div>
          <div className="stat-info">
            <h4>Today's Bookings</h4>
            <div className="value">{stats.todayBookingsCount}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
            🎟️
          </div>
          <div className="stat-info">
            <h4>Upcoming Bookings</h4>
            <div className="value">{stats.upcomingBookingsCount}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#F3E8FF', color: '#8B5CF6' }}>
            💰
          </div>
          <div className="stat-info">
            <h4>Monthly Revenue</h4>
            <div className="value">{formatCurrency(stats.monthlyRevenue)}</div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Bookings & My Turfs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Recent Bookings */}
        <div className="table-card" style={{ margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>Recent Customer Bookings</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Latest reservations for your arenas</span>
            </div>
            <Link to="/owner/bookings" style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: '700' }}>
              View All ➔
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎟️</div>
              <p style={{ margin: 0 }}>No bookings recorded yet for your turfs.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="owner-table">
                <thead>
                  <tr>
                    <th>BOOKING ID</th>
                    <th>CUSTOMER</th>
                    <th>TURF</th>
                    <th>DATE & SLOT</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: '700', fontFamily: 'monospace', color: '#2563EB' }}>
                        {b.id}
                      </td>
                      <td>
                        <div style={{ fontWeight: '700' }}>{b.userName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.userPhone}</div>
                      </td>
                      <td style={{ fontSize: '0.88rem', fontWeight: '600' }}>
                        {b.turfName}
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{b.date}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.timeSlot || b.slot}</div>
                      </td>
                      <td style={{ fontWeight: '800', color: '#10B981' }}>
                        {formatCurrency(b.totalAmount || b.amount)}
                      </td>
                      <td>
                        <span className={`badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Cancelled' ? 'badge-danger' : 'badge-warning')}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* My Turfs Quick View */}
        <div className="table-card" style={{ margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>My Listed Turfs</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{myTurfs.length} Arenas Registered</span>
            </div>
            <Link to="/owner/turfs" style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: '700' }}>
              Manage ➔
            </Link>
          </div>

          {myTurfs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏟️</div>
              <p style={{ margin: 0, marginBottom: '14px' }}>You haven't listed any sports turfs yet.</p>
              <Link to="/owner/turfs/add" className="btn btn-emerald btn-sm">
                Add Your First Turf
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {myTurfs.map((turf) => (
                <div key={turf.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                  <img
                    src={turf.images?.[0] || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80'}
                    alt={turf.name}
                    style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.92rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {turf.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      📍 {turf.city} • ₹{turf.pricePerHour}/hr
                    </div>
                    <div style={{ marginTop: '4px' }}>
                      <span className={`badge ${turf.status === 'APPROVED' || turf.status === 'Approved' ? 'badge-success' : (turf.status === 'PENDING' || turf.status === 'Pending' ? 'badge-warning' : 'badge-danger')}`} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                        {turf.status}
                      </span>
                    </div>
                  </div>
                  <Link to={`/owner/turfs/edit/${turf.id}`} className="btn btn-outline-dark btn-sm" style={{ padding: '6px 10px', fontSize: '0.78rem' }}>
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
