/**
 * PLAYSlot Data Service
 * 
 * Central data abstraction layer.
 * Currently backed by localStorage; structured to be seamlessly replaced
 * by Express REST APIs (e.g. fetch('/api/...')) in the future.
 */

const dataService = (() => {
  // --- Date & Formatting Helper Functions ---
  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }

  function isToday(dateStr) {
    if (!dateStr) return false;
    try {
      // Normalize both target date and today's date to YYYY-MM-DD
      const target = typeof dateStr === 'string' ? dateStr.split('T')[0].trim() : new Date(dateStr).toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      return target === today;
    } catch (e) {
      return false;
    }
  }

  function formatTime(timeStr) {
    return timeStr || '';
  }

  function formatCurrency(amount) {
    const num = Number(amount) || 0;
    return '₹' + num.toLocaleString('en-IN');
  }

  function getKeys() {
    return window.PlaySlotState ? window.PlaySlotState.KEYS : {
      USERS: 'playslot_users',
      OWNERS: 'playslot_owners',
      TURFS: 'playslot_turfs',
      BOOKINGS: 'playslot_bookings',
      SLOTS: 'playslot_slots',
      SPORTS: 'playslot_sports',
      NOTIFICATIONS: 'playslot_notifications',
      CURRENT_USER: 'playslot_current_user'
    };
  }

  function get(key, fallback = []) {
    if (window.PlaySlotState) {
      return window.PlaySlotState.getStorage(key, fallback);
    }
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function set(key, value) {
    if (window.PlaySlotState) {
      return window.PlaySlotState.setStorage(key, value);
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function resetDemoData() {
    if (window.PlaySlotState) {
      window.PlaySlotState.resetState();
    } else {
      localStorage.clear();
    }
    return true;
  }

  return {
    formatDate,
    isToday,
    formatTime,
    formatCurrency,
    getKeys,
    get,
    set,
    resetDemoData
  };
})();

if (typeof window !== 'undefined') {
  window.dataService = dataService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { dataService };
}
