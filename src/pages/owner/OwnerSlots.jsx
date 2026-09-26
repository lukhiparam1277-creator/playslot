import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

export const OwnerSlots = () => {
  const { turfs, getSlotsForTurfAndDate, addCustomSlot, updateSlot, blockSlot, unblockSlot, deleteSlot } = useData();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const ownerId = currentUser?.id || 'owner-1';
  const myTurfs = turfs.filter(t => t.ownerId === ownerId);

  const [selectedTurfId, setSelectedTurfId] = useState(myTurfs[0]?.id || 'turf-1');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [slotTime, setSlotTime] = useState('');
  const [slotPrice, setSlotPrice] = useState(1200);
  const [editingSlot, setEditingSlot] = useState(null);

  const activeTurf = myTurfs.find(t => t.id === selectedTurfId) || myTurfs[0];
  const slots = activeTurf ? getSlotsForTurfAndDate(activeTurf.id, selectedDate) : [];

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!slotTime) {
      showToast('Please specify a slot time range (e.g. 06:00 AM - 07:00 AM)', 'error');
      return;
    }
    addCustomSlot(activeTurf.id, selectedDate, {
      time: slotTime,
      price: parseInt(slotPrice) || 1200,
      status: 'AVAILABLE'
    });
    showToast(`Time slot "${slotTime}" added!`, 'success');
    setAddModalOpen(false);
    setSlotTime('');
  };

  const handleEditSlot = (e) => {
    e.preventDefault();
    if (!editingSlot) return;
    updateSlot(activeTurf.id, selectedDate, editingSlot.time || editingSlot.id, {
      time: slotTime,
      price: parseInt(slotPrice) || editingSlot.price
    });
    showToast(`Time slot updated!`, 'success');
    setEditModalOpen(false);
    setEditingSlot(null);
  };

  const handleToggleBlock = (slot) => {
    if (slot.status === 'BLOCKED') {
      unblockSlot(activeTurf.id, selectedDate, slot.time || slot.id);
      showToast(`Slot "${slot.time}" is now AVAILABLE`, 'success');
    } else if (slot.status === 'AVAILABLE') {
      blockSlot(activeTurf.id, selectedDate, slot.time || slot.id);
      showToast(`Slot "${slot.time}" is now BLOCKED`, 'warning');
    } else {
      showToast('Cannot block a booked slot with active customer reservation', 'error');
    }
  };

  const handleDeleteSlot = (slot) => {
    if (slot.status === 'BOOKED') {
      showToast('Cannot delete a slot with confirmed reservation', 'error');
      return;
    }
    deleteSlot(activeTurf.id, selectedDate, slot.time || slot.id);
    showToast(`Slot removed.`, 'info');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>Slot Schedule Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Control hourly inventory, custom pricing, and maintenance blocks
          </p>
        </div>

        {activeTurf && (
          <button onClick={() => { setSlotTime(''); setSlotPrice(activeTurf.pricePerHour || 1200); setAddModalOpen(true); }} className="btn btn-emerald" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>➕</span> Add Time Slot
          </button>
        )}
      </div>

      {myTurfs.length === 0 ? (
        <div className="empty-state" style={{ background: '#FFFFFF', padding: '60px 20px', borderRadius: '16px' }}>
          <div className="empty-icon">⏰</div>
          <h3>No Turfs Available</h3>
          <p style={{ color: 'var(--text-muted)' }}>You must list at least one sports turf before managing slot schedules.</p>
        </div>
      ) : (
        <>
          {/* Controls Bar */}
          <div className="summary-card" style={{ padding: '20px', borderRadius: '16px', marginBottom: '24px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ minWidth: '220px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Select Arena</label>
              <select
                className="form-select"
                value={selectedTurfId}
                onChange={(e) => setSelectedTurfId(e.target.value)}
                style={{ fontWeight: '700' }}
              >
                {myTurfs.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.sport})</option>
                ))}
              </select>
            </div>

            <div style={{ minWidth: '200px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Schedule Date</label>
              <input
                type="date"
                className="form-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ fontWeight: '700' }}
              >
              </input>
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#10B981' }}></span>
                <span>Available</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#2563EB' }}></span>
                <span>Booked</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#EF4444' }}></span>
                <span>Blocked</span>
              </div>
            </div>
          </div>

          {/* Slots Table */}
          <div className="table-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>
                Hourly Slots for {selectedDate} ({slots.length} total)
              </h3>
            </div>

            {slots.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                <p>No slots configured for this date.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="owner-table">
                  <thead>
                    <tr>
                      <th>TIME WINDOW</th>
                      <th>BASE RATE</th>
                      <th>STATUS</th>
                      <th style={{ textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((slot) => {
                      const isBooked = slot.status === 'BOOKED' || slot.status === 'Booked';
                      const isBlocked = slot.status === 'BLOCKED' || slot.status === 'Blocked';
                      return (
                        <tr key={slot.id || slot.time}>
                          <td style={{ fontWeight: '800', fontSize: '0.95rem' }}>
                            ⏰ {slot.time}
                          </td>
                          <td style={{ fontWeight: '700', color: '#10B981' }}>
                            ₹{slot.price}
                          </td>
                          <td>
                            {isBooked ? (
                              <span className="badge badge-primary" style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' }}>
                                ● BOOKED
                              </span>
                            ) : isBlocked ? (
                              <span className="badge badge-danger">
                                🚫 BLOCKED
                              </span>
                            ) : (
                              <span className="badge badge-success">
                                ✓ AVAILABLE
                              </span>
                            )}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              {!isBooked && (
                                <>
                                  <button
                                    onClick={() => handleToggleBlock(slot)}
                                    className="btn btn-outline-dark btn-sm"
                                    style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                                  >
                                    {isBlocked ? '🔓 Unblock' : '🔒 Block'}
                                  </button>
                                  <button
                                    onClick={() => { setEditingSlot(slot); setSlotTime(slot.time); setSlotPrice(slot.price); setEditModalOpen(true); }}
                                    className="btn btn-outline-dark btn-sm"
                                    style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSlot(slot)}
                                    className="btn btn-sm"
                                    style={{ background: '#FEE2E2', color: '#EF4444', border: '1px solid #FCA5A5', fontSize: '0.78rem', padding: '4px 10px' }}
                                  >
                                    ✕
                                  </button>
                                </>
                              )}
                              {isBooked && (
                                <span style={{ fontSize: '0.8rem', color: '#2563EB', fontWeight: '700' }}>
                                  Reserved by Customer
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Add Slot Modal */}
      {addModalOpen && (
        <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Add Hourly Slot">
          <form onSubmit={handleAddSlot}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Slot Timing *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 06:00 AM - 07:00 AM"
                value={slotTime}
                onChange={(e) => setSlotTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Slot Price (₹) *</label>
              <input
                type="number"
                className="form-input"
                value={slotPrice}
                onChange={(e) => setSlotPrice(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" className="btn btn-outline-dark" onClick={() => setAddModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-emerald">Add Slot</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Slot Modal */}
      {editModalOpen && (
        <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Hourly Slot">
          <form onSubmit={handleEditSlot}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Slot Timing *</label>
              <input
                type="text"
                className="form-input"
                value={slotTime}
                onChange={(e) => setSlotTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px', display: 'block' }}>Slot Price (₹) *</label>
              <input
                type="number"
                className="form-input"
                value={slotPrice}
                onChange={(e) => setSlotPrice(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" className="btn btn-outline-dark" onClick={() => setEditModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-emerald">Save Changes</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default OwnerSlots;
