/**
 * PLAYSlot Slot Service
 * Handles real-time slot state management (AVAILABLE, SELECTED, BOOKED, BLOCKED)
 */
import { Storage } from './storage.js';

export const SlotService = {
  async getSlots(venueId, sport) {
    await new Promise(r => setTimeout(r, 100));
    let slots = Storage.get('SLOTS') || [];
    if (venueId) {
      slots = slots.filter(s => s.venueId === venueId);
    }
    if (sport && sport !== 'All') {
      slots = slots.filter(s => s.sport.toLowerCase() === sport.toLowerCase());
    }
    return slots;
  },

  async updateSlotStatus(slotId, status) {
    const slots = Storage.get('SLOTS') || [];
    const target = slots.find(s => s.id === slotId);
    if (!target) return false;
    target.status = status;
    Storage.set('SLOTS', slots);
    return true;
  },

  async addSlot(data) {
    const slots = Storage.get('SLOTS') || [];
    const newSlot = {
      id: `s-${Date.now()}`,
      venueId: data.venueId,
      sport: data.sport,
      time: data.time,
      period: data.period || 'Evening',
      price: Number(data.price) || 1000,
      status: data.status || 'AVAILABLE'
    };
    slots.push(newSlot);
    Storage.set('SLOTS', slots);
    return newSlot;
  },

  async deleteSlot(slotId) {
    let slots = Storage.get('SLOTS') || [];
    slots = slots.filter(s => s.id !== slotId);
    Storage.set('SLOTS', slots);
    return true;
  }
};
