/**
 * PLAYSlot Centralized Client-Side State Manager
 * 
 * Manages the single source of truth across all pages using localStorage.
 * Keys:
 * - playslot_users
 * - playslot_owners
 * - playslot_turfs
 * - playslot_bookings
 * - playslot_slots
 * - playslot_sports
 * - playslot_notifications
 * - playslot_current_user
 */

const PlaySlotState = (() => {
  const STORAGE_KEYS = {
    USERS: 'playslot_users',
    OWNERS: 'playslot_owners',
    TURFS: 'playslot_turfs',
    BOOKINGS: 'playslot_bookings',
    SLOTS: 'playslot_slots',
    SPORTS: 'playslot_sports',
    NOTIFICATIONS: 'playslot_notifications',
    CURRENT_USER: 'playslot_current_user'
  };

  function getStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      if (!data) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('Storage read warning for key', key, e);
      return fallback;
    }
  }

  function setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage write error for key', key, e);
      return false;
    }
  }

  function initState(forceReset = false) {
    if (forceReset) {
      localStorage.removeItem(STORAGE_KEYS.USERS);
      localStorage.removeItem(STORAGE_KEYS.OWNERS);
      localStorage.removeItem(STORAGE_KEYS.TURFS);
      localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
      localStorage.removeItem(STORAGE_KEYS.SLOTS);
      localStorage.removeItem(STORAGE_KEYS.SPORTS);
      localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
      // Clean up legacy v2 keys if any exist
      localStorage.removeItem('playslot_users_v2');
      localStorage.removeItem('playslot_owners_v2');
      localStorage.removeItem('playslot_turfs_v2');
      localStorage.removeItem('playslot_bookings_v2');
      localStorage.removeItem('playslot_slots_v2');
      localStorage.removeItem('playslot_sports_v2');
      localStorage.removeItem('playslot_owner_applications_v2');
      localStorage.removeItem('playslot_current_user_v2');
    }

    // Seed clean datasets if not already present
    getStorage(STORAGE_KEYS.USERS, typeof defaultUsers !== 'undefined' ? defaultUsers : []);
    getStorage(STORAGE_KEYS.OWNERS, typeof defaultOwners !== 'undefined' ? defaultOwners : []);
    getStorage(STORAGE_KEYS.TURFS, typeof defaultTurfs !== 'undefined' ? defaultTurfs : []);
    getStorage(STORAGE_KEYS.BOOKINGS, typeof defaultBookings !== 'undefined' ? defaultBookings : []);
    getStorage(STORAGE_KEYS.SLOTS, typeof defaultSlots !== 'undefined' ? defaultSlots : {});
    getStorage(STORAGE_KEYS.SPORTS, typeof defaultSports !== 'undefined' ? defaultSports : []);
    getStorage(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: 'notif-1',
        title: 'Platform System Ready',
        message: 'Welcome to PLAYSlot. All real-time slot scheduling is active.',
        date: new Date().toISOString(),
        read: false
      }
    ]);
  }

  // Auto-init on script load
  initState(false);

  return {
    KEYS: STORAGE_KEYS,
    getStorage,
    setStorage,
    initState,
    resetState: () => initState(true)
  };
})();

if (typeof window !== 'undefined') {
  window.PlaySlotState = PlaySlotState;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PlaySlotState };
}
