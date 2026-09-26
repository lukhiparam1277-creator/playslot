import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/statistics';

export const OwnerCustomers = () => {
  const { bookings, turfs } = useData();
  const { currentUser } = useAuth();

  const ownerId = currentUser?.id || 'owner-1';
  const myTurfs = turfs.filter(t => t.ownerId === ownerId);
  const myTurfIds = myTurfs.map(t => t.id);

  const myBookings = bookings.filter(b => myTurfIds.includes(b.turfId) || b.ownerId === ownerId);

  // Aggregate unique customers
  const customersMap = {};
  myBookings.forEach(b => {
    const key = b.userId || b.userEmail || b.userName;
    if (!customersMap[key]) {
      customersMap[key] = {
        id: b.userId,
        name: b.userName,
        email: b.userEmail,
        phone: b.userPhone,
        totalBookings: 0,
        totalSpent: 0,
        lastBookingDate: b.date
      };
    }
    customersMap[key].totalBookings += 1;
    if (b.status !== 'Cancelled') {
      customersMap[key].totalSpent += Number(b.totalAmount || b.amount || 0);
    }
    if (b.date > customersMap[key].lastBookingDate) {
      customersMap[key].lastBookingDate = b.date;
    }
  });

  const customersList = Object.values(customersMap);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = customersList.filter(c => 
    (c.name && c.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.phone && c.phone.includes(searchTerm))
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Customer Directory</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Players and teams who have booked your venues ({customersList.length} athletes)
          </p>
        </div>

        <input
          type="text"
          className="form-input"
          placeholder="Search by customer name, email, phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '320px', padding: '10px 16px' }}
        />
      </div>

      <div className="table-card">
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>👥</div>
            <p>No customer records found matching your query.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="owner-table">
              <thead>
                <tr>
                  <th>CUSTOMER</th>
                  <th>PHONE</th>
                  <th>EMAIL</th>
                  <th>TOTAL BOOKINGS</th>
                  <th>LIFETIME SPENT</th>
                  <th>LAST ACTIVITY</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                          {c.name ? c.name[0].toUpperCase() : 'U'}
                        </div>
                        <div style={{ fontWeight: '700' }}>{c.name}</div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.9rem' }}>{c.phone || '—'}</td>
                    <td style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{c.email || '—'}</td>
                    <td>
                      <span className="badge badge-primary" style={{ fontWeight: '700' }}>
                        {c.totalBookings} matches
                      </span>
                    </td>
                    <td style={{ fontWeight: '800', color: '#10B981' }}>
                      {formatCurrency(c.totalSpent)}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {c.lastBookingDate || 'Recent'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerCustomers;
