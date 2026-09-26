import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

export const AdminSports = () => {
  const { sports, addSport, updateSport, toggleSportStatus, deleteSport } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSport, setEditingSport] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '🏅',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    description: '',
    startingPrice: 1200,
    categoryType: 'Both',
    popular: true
  });

  const handleOpenAdd = () => {
    setEditingSport(null);
    setFormData({
      name: '',
      icon: '🏅',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
      description: 'Professional playing arena and equipment rental.',
      startingPrice: 1200,
      categoryType: 'Both',
      popular: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sport) => {
    setEditingSport(sport);
    setFormData({
      name: sport.name,
      icon: sport.icon || '🏅',
      image: sport.image || '',
      description: sport.description || '',
      startingPrice: sport.startingPrice || 1200,
      categoryType: sport.categoryType || 'Both',
      popular: Boolean(sport.popular)
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Sport name is required.', 'error');
      return;
    }

    if (editingSport) {
      updateSport(editingSport.id, formData);
      showToast(`Sport "${formData.name}" updated!`, 'success');
    } else {
      addSport(formData);
      showToast(`Sport "${formData.name}" added to platform!`, 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (sport) => {
    if (window.confirm(`Delete sport "${sport.name}"?`)) {
      deleteSport(sport.id);
      showToast(`Sport "${sport.name}" deleted.`, 'info');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Sports Catalog Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Single source of truth for sports categories ({sports.length} disciplines configured)
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>➕</span> Add New Sport
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {sports.map((sport) => {
          const isActive = sport.status !== 'INACTIVE';
          return (
            <div key={sport.id} className="summary-card" style={{ padding: '0', overflow: 'hidden', opacity: isActive ? 1 : 0.6 }}>
              <div style={{ position: 'relative', height: '140px' }}>
                <img
                  src={sport.image || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80'}
                  alt={sport.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                  {sport.icon || '🏅'}
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <span className={`badge ${isActive ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.72rem', fontWeight: '800' }}>
                    {isActive ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
              </div>

              <div style={{ padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>{sport.name}</h3>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#10B981' }}>₹{sport.startingPrice}/hr</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '16px', lineHeight: '1.5' }}>
                  {sport.description || 'Verified sport discipline on PlaySlot.'}
                </p>

                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #E2E8F0', paddingTop: '14px' }}>
                  <button onClick={() => handleOpenEdit(sport)} className="btn btn-outline-dark btn-sm" style={{ flex: 1 }}>
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => toggleSportStatus(sport.id)}
                    className="btn btn-sm"
                    style={{
                      background: isActive ? '#FEF2F2' : '#ECFDF5',
                      color: isActive ? '#EF4444' : '#059669',
                      border: '1px solid ' + (isActive ? '#FECACA' : '#A7F3D0'),
                      fontSize: '0.78rem'
                    }}
                  >
                    {isActive ? 'Disable' : 'Enable'}
                  </button>
                  <button onClick={() => handleDelete(sport)} className="btn btn-sm btn-danger">
                    ✕
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Add / Edit Sport */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSport ? `Edit Sport: ${editingSport.name}` : 'Add New Sport'}>
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div className="form-group">
                <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Sport Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Pickleball, Box Cricket, Golf"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Emoji / Icon</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div className="form-group">
                <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Starting Price (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="form-group">
                <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Category</label>
                <select className="form-select" value={formData.categoryType} onChange={(e) => setFormData({ ...formData, categoryType: e.target.value })}>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Indoor">Indoor</option>
                  <option value="Both">Both Outdoor & Indoor</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Image URL</label>
              <input
                type="url"
                className="form-input"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Description</label>
              <textarea
                className="form-textarea"
                rows="2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" className="btn btn-outline-dark" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editingSport ? 'Save Changes' : 'Create Sport'}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminSports;
