/**
 * PLAYSlot Slot Configurations & Overrides Dataset
 * Slot availability is dynamically computed from active bookings in playslot_bookings.
 * This file tracks manual block/unblock overrides configured by turf owners.
 */
const defaultSlots = {
  // Key format: `${turfId}_${dateStr}` -> Array of { time, status: 'Blocked' | 'Available', price }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { defaultSlots };
}
