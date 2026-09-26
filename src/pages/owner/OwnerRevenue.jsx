import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/statistics';

export const OwnerRevenue = () => {
  const { bookings, turfs } = useData();
  const { currentUser } = useAuth();

  const ownerId = currentUser?.id || 'owner-1';
  const myTurfs = turfs.filter(t => t.ownerId === ownerId);
  const myTurfIds = myTurfs.map(t => t.id);

  const myBookings = bookings.filter(b => myTurfIds.includes(b.turfId) || b.ownerId === ownerId);

  const todayStr = new Date().toISOString().split('T')[0];
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  let totalRevenue = 0;
  let todayRevenue = 0;
  let weeklyRevenue = 0;
  let monthlyRevenue = 0;
  let completedCount = 0;

  myBookings.forEach(b => {
    if (b.status !== 'Cancelled') {
      const amt = Number(b.totalAmount !== undefined ? b.totalAmount : (b.amount || 0));
      totalRevenue += amt;

      if (b.date === todayStr) {
        todayRevenue += amt;
      }
      if (b.date >= sevenDaysAgo) {
        weeklyRevenue += amt;
      }
      if (b.date >= thirtyDaysAgo) {
        monthlyRevenue += amt;
      }
      if (b.status === 'Completed') {
        completedCount += 1;
      }
    }
  });

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Revenue & Payouts</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Real-time earnings breakdown calculated directly from customer reservations
        </p>
      </div>

      {/* Revenue Cards */}
      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ECFDF5', color: '#10B981' }}>
            💰
          </div>
          <div className="stat-info">
            <h4>Total Gross Earnings</h4>
            <div className="value">{formatCurrency(totalRevenue)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
            📅
          </div>
          <div className="stat-info">
            <h4>Today's Revenue</h4>
            <div className="value">{formatCurrency(todayRevenue)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
            📈
          </div>
          <div className="stat-info">
            <h4>Weekly Revenue (7D)</h4>
            <div className="value">{formatCurrency(weeklyRevenue)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#F3E8FF', color: '#8B5CF6' }}>
            💳
          </div>
          <div className="stat-info">
            <h4>Monthly Revenue (30D)</h4>
            <div className="value">{formatCurrency(monthlyRevenue)}</div>
          </div>
        </div>
      </div>

      {/* Revenue by Turf Breakdown */}
      <div className="table-card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '18px' }}>Arena Performance Breakdown</h3>
        <div className="table-responsive">
          <table className="owner-table">
            <thead>
              <tr>
                <th>TURF ARENA</th>
                <th>SPORT</th>
                <th>TOTAL BOOKINGS</th>
                <th>GROSS REVENUE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {myTurfs.map((turf) => {
                const turfBookings = myBookings.filter(b => b.turfId === turf.id && b.status !== 'Cancelled');
                const turfRev = turfBookings.reduce((sum, b) => sum + Number(b.totalAmount || b.amount || 0), 0);
                return (
                  <tr key={turf.id}>
                    <td style={{ fontWeight: '700' }}>{turf.name}</td>
                    <td>{turf.sport}</td>
                    <td><strong>{turfBookings.length}</strong> bookings</td>
                    <td style={{ fontWeight: '800', color: '#10B981', fontSize: '1.05rem' }}>
                      {formatCurrency(turfRev)}
                    </td>
                    <td>
                      <span className={`badge ${turf.status === 'APPROVED' || turf.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                        {turf.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerRevenue;
