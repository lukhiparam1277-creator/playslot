import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

export const AdminUsers = () => {
  const { users, addUser, updateUser, updateUserStatus, deleteUser } = useData();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Mumbai',
    role: 'user',
    status: 'Active'
  });

  const filteredUsers = users.filter(u => 
    (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (u.phone && u.phone.includes(searchTerm))
  );

  const handleToggleStatus = (user) => {
    const nextStatus = user.status === 'Active' ? 'Blocked' : 'Active';
    updateUserStatus(user.id, nextStatus);
    showToast(`User account ${user.name} is now ${nextStatus}`, nextStatus === 'Active' ? 'success' : 'warning');
  };

  const handleDelete = (user) => {
    if (window.confirm(`Permanently delete account for "${user.name}"?`)) {
      deleteUser(user.id);
      showToast(`User "${user.name}" removed from platform.`, 'info');
      setSelectedUser(null);
    }
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast('Name and email are required.', 'error');
      return;
    }
    addUser(formData);
    showToast(`Created athlete profile for ${formData.name}!`, 'success');
    setIsAddModalOpen(false);
    setFormData({ name: '', email: '', phone: '', city: 'Mumbai', role: 'user', status: 'Active' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Athletes & Registered Users</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Platform customer accounts ({users.length} athletes registered)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '280px' }}
          />
          <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>➕</span> Add Athlete
          </button>
        </div>
      </div>

      <div className="table-card">
        {filteredUsers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>👤</div>
            <p>No athlete accounts found matching your search.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ATHLETE / USER</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>ROLE</th>
                  <th>MATCHES BOOKED</th>
                  <th>STATUS</th>
                  <th>JOINED</th>
                  <th style={{ textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                          alt={user.name}
                          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: '800' }}>{user.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>📍 {user.city || 'Mumbai'}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.88rem' }}>{user.email}</td>
                    <td style={{ fontSize: '0.88rem' }}>{user.phone || '—'}</td>
                    <td>
                      <span className="badge badge-dark" style={{ textTransform: 'uppercase', fontSize: '0.72rem' }}>
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-primary" style={{ fontWeight: '700' }}>
                        {user.totalBookings || 0}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {user.status || 'Active'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {user.joinedDate || 'Recent'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="btn btn-outline-dark btn-sm"
                          style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user)}
                          className="btn btn-sm"
                          style={{
                            background: user.status === 'Active' ? '#FEF2F2' : '#ECFDF5',
                            color: user.status === 'Active' ? '#EF4444' : '#059669',
                            border: '1px solid ' + (user.status === 'Active' ? '#FECACA' : '#A7F3D0'),
                            fontSize: '0.78rem',
                            padding: '4px 10px'
                          }}
                        >
                          {user.status === 'Active' ? 'Block' : 'Unblock'}
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="btn btn-sm btn-danger"
                          style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <Modal isOpen={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} title={`Athlete: ${selectedUser.name}`}>
          <div style={{ fontSize: '0.92rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Full Name</span>
                <strong>{selectedUser.name}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Email Address</span>
                <strong>{selectedUser.email}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Phone Number</span>
                <strong>{selectedUser.phone || '—'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>City</span>
                <strong>{selectedUser.city || 'Mumbai'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Matches Booked</span>
                <strong>{selectedUser.totalBookings || 0} bookings</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Account Status</span>
                <span className={`badge ${selectedUser.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                  {selectedUser.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <button onClick={() => setSelectedUser(null)} className="btn btn-outline-dark">
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Athlete Modal */}
      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register Athlete Profile">
          <form onSubmit={handleCreateUser}>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Full Name *</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Email *</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Phone</label>
              <input
                type="text"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>City</label>
              <input
                type="text"
                className="form-input"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" className="btn btn-outline-dark" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create Profile</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminUsers;
