import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/statistics';

export const AdminDashboard = () => {
  const { getAdminStats, owners, turfs, bookings, resetToDefaults } = useData();
  const stats = getAdminStats();

  const pendingOwners = owners.filter(o => o.status === 'PENDING' || o.status === 'Pending');
  const pendingTurfs = turfs.filter(t => t.status === 'PENDING' || t.status === 'Pending');
  const recentBookings = bookings.slice(0, 5);

  return (
    <div>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        color: '#FFFFFF',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        boxShadow: '0 12px 30px rgba(15, 23, 42, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'inline-block', background: 'rgba(239, 68, 68, 0.2)', color: '#FCA5A5', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800', marginBottom: '10px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            🛡️ SUPER ADMIN OPERATIONS
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
            Master Platform Overview
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '6px', maxWidth: '600px' }}>
            Live platform metrics calculated dynamically from active users, verified turf owners, and confirmed booking records.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/admin/owner-requests" className="btn" style={{ background: '#EF4444', color: '#FFFFFF', fontWeight: '800', border: 'none', padding: '10px 20px', borderRadius: '10px' }}>
            📋 Review Owner Requests ({stats.pendingOwners})
          </Link>
          <button
            onClick={() => {
              if (window.confirm('Reset demo data to clean baseline (3 users, 4 owners, 4 turfs, 1 booking)?')) {
                resetToDefaults();
              }
            }}
            className="btn btn-outline"
            style={{ color: '#94A3B8', borderColor: '#475569', fontSize: '0.85rem' }}
            title="Reset to clean baseline state for testing"
          >
            🔄 Reset Demo Data
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        {/* Total Athletes */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
            👥
          </div>
          <div className="stat-info">
            <h4>Total Athletes</h4>
            <div className="value">{stats.totalUsers}</div>
          </div>
        </div>

        {/* Approved Turf Owners */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ECFDF5', color: '#10B981' }}>
            👔
          </div>
          <div className="stat-info">
            <h4>Approved Turf Owners</h4>
            <div className="value">{stats.approvedOwners}</div>
          </div>
        </div>

        {/* Approved Turfs */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
            🏟️
          </div>
          <div className="stat-info">
            <h4>Approved Turfs</h4>
            <div className="value">{stats.approvedTurfs}</div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#F3E8FF', color: '#8B5CF6' }}>
            🎟️
          </div>
          <div className="stat-info">
            <h4>Total Bookings</h4>
            <div className="value">{stats.totalBookings}</div>
          </div>
        </div>

        {/* Platform Gross Revenue */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}>
            💰
          </div>
          <div className="stat-info">
            <h4>Gross Platform Revenue</h4>
            <div className="value">{formatCurrency(stats.totalRevenue)}</div>
          </div>
        </div>

        {/* Today's Slot Bookings */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FDF2F8', color: '#DB2777' }}>
            ⏰
          </div>
          <div className="stat-info">
            <h4>Today's Slot Bookings</h4>
            <div className="value">{stats.todayBookingsCount} Slots</div>
          </div>
        </div>

        {/* Pending Owner Requests */}
        <div className="stat-card" style={{ border: stats.pendingOwners > 0 ? '1.5px solid #F59E0B' : '1px solid var(--border-color)' }}>
          <div className="stat-icon" style={{ background: '#FFFBEB', color: '#D97706' }}>
            📋
          </div>
          <div className="stat-info">
            <h4>Pending Owner Requests</h4>
            <div className="value" style={{ color: stats.pendingOwners > 0 ? '#D97706' : 'inherit' }}>
              {stats.pendingOwners}
            </div>
          </div>
        </div>

        {/* Pending Turf Moderation */}
        <div className="stat-card" style={{ border: stats.pendingTurfs > 0 ? '1.5px solid #EF4444' : '1px solid var(--border-color)' }}>
          <div className="stat-icon" style={{ background: '#FEF2F2', color: '#EF4444' }}>
            ⏳
          </div>
          <div className="stat-info">
            <h4>Pending Turf Reviews</h4>
            <div className="value" style={{ color: stats.pendingTurfs > 0 ? '#EF4444' : 'inherit' }}>
              {stats.pendingTurfs}
            </div>
          </div>
        </div>
      </div>

      {/* Moderation Alerts */}
      {(pendingOwners.length > 0 || pendingTurfs.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: pendingOwners.length > 0 && pendingTurfs.length > 0 ? '1fr 1fr' : '1fr', gap: '20px', marginBottom: '32px' }}>
          {pendingOwners.length > 0 && (
            <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '800', color: '#92400E', fontSize: '1rem' }}>
                  ⏳ {pendingOwners.length} Turf Owner Request{pendingOwners.length > 1 ? 's' : ''} Pending Review
                </div>
                <div style={{ fontSize: '0.85rem', color: '#B45309', marginTop: '2px' }}>
                  Latest: {pendingOwners[0].name} ({pendingOwners[0].businessName})
                </div>
              </div>
              <Link to="/admin/owner-requests" className="btn btn-sm" style={{ background: '#D97706', color: '#FFFFFF', fontWeight: '700' }}>
                Review Now ➔
              </Link>
            </div>
          )}

          {pendingTurfs.length > 0 && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '800', color: '#991B1B', fontSize: '1rem' }}>
                  🏟️ {pendingTurfs.length} Turf Listing{pendingTurfs.length > 1 ? 's' : ''} Awaiting Approval
                </div>
                <div style={{ fontSize: '0.85rem', color: '#B91C1C', marginTop: '2px' }}>
                  Latest: {pendingTurfs[0].name} by {pendingTurfs[0].ownerName}
                </div>
              </div>
              <Link to="/admin/turfs" className="btn btn-sm" style={{ background: '#EF4444', color: '#FFFFFF', fontWeight: '700' }}>
                Moderate Turfs ➔
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Grid: All Recent Bookings & Financial Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Recent Real Bookings */}
        <div className="table-card" style={{ margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>Live Platform Bookings</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Single source of truth booking records</span>
            </div>
            <Link to="/admin/bookings" style={{ fontSize: '0.85rem', color: '#EF4444', fontWeight: '700' }}>
              All Bookings ({bookings.length}) ➔
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎟️</div>
              <p>No bookings have been made yet on the platform.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>BOOKING ID</th>
                    <th>ATHLETE</th>
                    <th>TURF</th>
                    <th>SLOT</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: '700', fontFamily: 'monospace', color: '#EF4444' }}>
                        {b.id}
                      </td>
                      <td>
                        <div style={{ fontWeight: '700' }}>{b.userName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.userEmail}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600' }}>{b.turfName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.sport}</div>
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

        {/* Financial Distribution Widget */}
        <div className="table-card" style={{ margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>Financial Settlements</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>15% Platform Commission Model</span>
            </div>
            <Link to="/admin/financial-reports" style={{ fontSize: '0.85rem', color: '#EF4444', fontWeight: '700' }}>
              Full Audit ➔
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Gross Bookings Volume</span>
                <strong style={{ fontSize: '1.1rem', color: '#0F172A' }}>{formatCurrency(stats.financials.grossRevenue)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.88rem', color: '#059669' }}>Platform Commission (15%)</span>
                <strong style={{ fontSize: '1rem', color: '#059669' }}>{formatCurrency(stats.financials.platformCommission)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #CBD5E1', paddingTop: '8px', marginTop: '6px' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Net Owner Earnings (85%)</span>
                <strong style={{ fontSize: '1rem', color: '#2563EB' }}>{formatCurrency(stats.financials.ownerEarnings)}</strong>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: '#ECFDF5', padding: '12px', borderRadius: '10px', border: '1px solid #A7F3D0', textAlign: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: '#065F46', fontWeight: '700' }}>COMPLETED MATCHES</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#065F46' }}>{stats.financials.completedBookings}</div>
              </div>
              <div style={{ background: '#FEF2F2', padding: '12px', borderRadius: '10px', border: '1px solid #FECACA', textAlign: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: '#991B1B', fontWeight: '700' }}>CANCELLED</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#991B1B' }}>{stats.financials.cancelledBookings}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
