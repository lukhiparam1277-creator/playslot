import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

export const SlotPicker = ({ turf, onSelectSlot, selectedDate, selectedSlot, setSelectedDate, setSelectedSlot }) => {
  const { getSlotsForTurfAndDate } = useData();

  // Generate 7 days chips
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = i === 0 ? 'Today' : (i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }));
    const monthDay = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    return { dateStr, dayName, monthDay };
  });

  const activeDateStr = selectedDate || days[0].dateStr;
  const currentSlots = getSlotsForTurfAndDate(turf.id, activeDateStr);

  return (
    <div className="slots-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Select Date & Time Slot</h3>
        <span className="badge badge-success">Live Available</span>
      </div>

      {/* Date selector chips */}
      <div className="date-selector-row">
        {days.map((item) => (
          <div
            key={item.dateStr}
            className={`date-chip ${activeDateStr === item.dateStr ? 'active' : ''}`}
            onClick={() => {
              setSelectedDate(item.dateStr);
              setSelectedSlot(null);
            }}
          >
            <div style={{ fontSize: '0.78rem', fontWeight: '700' }}>{item.dayName}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '800' }}>{item.monthDay}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
        Available Slots ({currentSlots.filter(s => s.status === 'Available').length} open):
      </div>

      {/* Slots Grid */}
      <div className="slots-grid">
        {currentSlots.map((slot) => {
          const isBooked = slot.status === 'Booked';
          const isBlocked = slot.status === 'Blocked' || slot.status === 'Maintenance';
          const isSelected = selectedSlot === slot.time;
          const isDisabled = isBooked || isBlocked;

          return (
            <div
              key={slot.id || slot.time}
              className={`slot-pill ${isSelected ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => {
                if (!isDisabled) {
                  setSelectedSlot(slot.time);
                  onSelectSlot && onSelectSlot({ date: activeDateStr, time: slot.time, price: slot.price });
                }
              }}
              title={isBooked ? 'Booked by another player' : (isBlocked ? 'Blocked for turf maintenance' : `₹${slot.price}/hr`)}
            >
              <div>⏰ {slot.time}</div>
              <div style={{ fontSize: '0.75rem', marginTop: '2px', opacity: 0.85 }}>
                {isBooked ? 'Booked' : (isBlocked ? 'Blocked' : `₹${slot.price}`)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlotPicker;
