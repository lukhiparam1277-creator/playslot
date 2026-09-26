import React from 'react';
import { useData } from '../../context/DataContext';
import { formatCurrency, getFinancialStats } from '../../utils/statistics';

export const AdminFinancialReports = () => {
  const { bookings, turfs, owners } = useData();
  const financials = getFinancialStats(bookings, 0.15); // 15% platform commission

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Financial Audit & Settlement Reports</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Real-time transactional revenue distribution (15% platform commission, 85% merchant payout)
        </p>
      </div>

      {/* Main KPI Cards */}
      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}>
            💳
          </div>
          <div className="stat-info">
            <h4>Total Gross Revenue</h4>
            <div className="value">{formatCurrency(financials.grossRevenue)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ECFDF5', color: '#10B981' }}>
            🏛️
          </div>
          <div className="stat-info">
            <h4>Platform Commission (15%)</h4>
            <div className="value" style={{ color: '#059669' }}>{formatCurrency(financials.platformCommission)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#EFF6FF', color: '#2563EB' }}>
            👔
          </div>
          <div className="stat-info">
            <h4>Net Owner Earnings (85%)</h4>
            <div className="value" style={{ color: '#2563EB' }}>{formatCurrency(financials.ownerEarnings)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
            🎟️
          </div>
          <div className="stat-info">
            <h4>Completed Match Bookings</h4>
            <div className="value">{financials.completedBookings + financials.confirmedBookings}</div>
          </div>
        </div>
      </div>

      {/* Breakdown per Owner */}
      <div className="table-card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '18px' }}>Merchant Settlement Ledger</h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>TURF OWNER / MERCHANT</th>
                <th>CITY</th>
                <th>CONFIRMED BOOKINGS</th>
                <th>GROSS VOLUME</th>
                <th>PLATFORM FEE (15%)</th>
                <th>NET PAYOUT DUE</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => {
                const ownerTurfs = turfs.filter(t => t.ownerId === owner.id);
                const ownerTurfIds = ownerTurfs.map(t => t.id);
                const ownerBookings = bookings.filter(b => (ownerTurfIds.includes(b.turfId) || b.ownerId === owner.id) && b.status !== 'Cancelled');
                const gross = ownerBookings.reduce((sum, b) => sum + Number(b.totalAmount || b.amount || 0), 0);
                const commission = Math.round(gross * 0.15);
                const payout = gross - commission;

                return (
                  <tr key={owner.id}>
                    <td>
                      <div style={{ fontWeight: '800' }}>{owner.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{owner.businessName}</div>
                    </td>
                    <td>{owner.city}</td>
                    <td><strong>{ownerBookings.length}</strong> bookings</td>
                    <td style={{ fontWeight: '700' }}>{formatCurrency(gross)}</td>
                    <td style={{ color: '#059669', fontWeight: '700' }}>{formatCurrency(commission)}</td>
                    <td style={{ color: '#2563EB', fontWeight: '900', fontSize: '1.05rem' }}>
                      {formatCurrency(payout)}
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

export default AdminFinancialReports;
