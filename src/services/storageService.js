/**
 * Storage Service for PlaySlot
 * Encapsulates localStorage access with fallback resilience and schema keys.
 */

export const STORAGE_KEYS = {
  USERS: 'playslot_users',
  OWNERS: 'playslot_owners',
  TURFS: 'playslot_turfs',
  BOOKINGS: 'playslot_bookings',
  SLOTS: 'playslot_slots',
  SPORTS: 'playslot_sports',
  NOTIFICATIONS: 'playslot_notifications',
  SETTINGS: 'playslot_settings'
};

export const storageService = {
  get(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      if (data === null || data === undefined) {
        if (fallback !== undefined) {
          this.set(key, fallback);
        }
        return fallback;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn(`Storage get error for ${key}:`, e);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`Storage set error for ${key}:`, e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn(`Storage remove error for ${key}:`, e);
      return false;
    }
  },

  clearAll() {
    try {
      Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
      return true;
    } catch (e) {
      console.warn('Storage clearAll error:', e);
      return false;
    }
  }
};

export default storageService;
