/**
 * PLAYSlot Slot Service
 * 
 * Dynamic slot availability engine.
 * Computes slot status (Available, Booked, Blocked) directly from:
 * 1. Active bookings in playslot_bookings (if an active booking exists -> 'Booked')
 * 2. Manual owner maintenance overrides in playslot_slots (if owner blocked -> 'Blocked')
 * 3. Default state is 'Available'
 */

const slotService = (() => {
  function getSlotsForTurfAndDate(turfId, dateStr) {
    const turf = venueService.getTurfById(turfId);
    const timings = (turf && turf.slotTimings && turf.slotTimings.length > 0) ? turf.slotTimings : [
      '06:00 AM - 07:00 AM',
      '07:00 AM - 08:00 AM',
      '08:00 AM - 09:00 AM',
      '05:00 PM - 06:00 PM',
      '06:00 PM - 07:00 PM',
      '07:00 PM - 08:00 PM',
      '08:00 PM - 09:00 PM'
    ];

    const price = turf ? turf.pricePerHour : 1200;
    const manualOverrides = dataService.get(dataService.getKeys().SLOTS, {});
    const overrideKey = `${turfId}_${dateStr}`;
    const overridesForDay = manualOverrides[overrideKey] || {};

    return timings.map((time, idx) => {
      let status = 'Available';

      // 1. Check if there is an active booking for this slot
      if (bookingService.isSlotBooked(turfId, dateStr, time)) {
        status = 'Booked';
      } 
      // 2. Check if owner has manually blocked this slot
      else if (overridesForDay[time] === 'Blocked') {
        status = 'Blocked';
      }

      return {
        id: `slot-${idx}`,
        time,
        price,
        status
      };
    });
  }

  function updateSlotState(turfId, dateStr, slotTime, newStatus) {
    const manualOverrides = dataService.get(dataService.getKeys().SLOTS, {});
    const overrideKey = `${turfId}_${dateStr}`;
    if (!manualOverrides[overrideKey]) {
      manualOverrides[overrideKey] = {};
    }

    manualOverrides[overrideKey][slotTime] = newStatus;
    dataService.set(dataService.getKeys().SLOTS, manualOverrides);
    return { turfId, dateStr, slotTime, status: newStatus };
  }

  return {
    getSlotsForTurfAndDate,
    updateSlotState
  };
})();

if (typeof window !== 'undefined') {
  window.slotService = slotService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { slotService };
}
