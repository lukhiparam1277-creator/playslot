/**
 * PLAYSlot Storage Service
 * Manages persistent demo state using localStorage while keeping data pure and accessible
 */
import { defaultSports } from '../data/sports.js';
import { defaultVenues } from '../data/venues.js';
import { defaultSlots } from '../data/slots.js';
import { defaultBookings } from '../data/bookings.js';
import { defaultUsers } from '../data/users.js';
import { defaultOwners } from '../data/owners.js';
import { defaultPayments } from '../data/payments.js';

const KEYS = {
  SPORTS: 'playslot_sports',
  VENUES: 'playslot_venues',
  SLOTS: 'playslot_slots',
  BOOKINGS: 'playslot_bookings',
  USERS: 'playslot_users',
  OWNERS: 'playslot_owners',
  PAYMENTS: 'playslot_payments',
  AUTH: 'playslot_auth'
};

export const Storage = {
  init() {
    if (!localStorage.getItem(KEYS.SPORTS)) {
      localStorage.setItem(KEYS.SPORTS, JSON.stringify(defaultSports));
    }
    if (!localStorage.getItem(KEYS.VENUES)) {
      localStorage.setItem(KEYS.VENUES, JSON.stringify(defaultVenues));
    }
    if (!localStorage.getItem(KEYS.SLOTS)) {
      localStorage.setItem(KEYS.SLOTS, JSON.stringify(defaultSlots));
    }
    if (!localStorage.getItem(KEYS.BOOKINGS)) {
      localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(defaultBookings));
    }
    if (!localStorage.getItem(KEYS.USERS)) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(defaultUsers));
    }
    if (!localStorage.getItem(KEYS.OWNERS)) {
      localStorage.setItem(KEYS.OWNERS, JSON.stringify(defaultOwners));
    }
    if (!localStorage.getItem(KEYS.PAYMENTS)) {
      localStorage.setItem(KEYS.PAYMENTS, JSON.stringify(defaultPayments));
    }
    if (!localStorage.getItem(KEYS.AUTH)) {
      localStorage.setItem(KEYS.AUTH, JSON.stringify({
        role: 'user', // 'user' | 'owner' | 'admin' | 'guest'
        user: defaultUsers[0],
        owner: defaultOwners[0]
      }));
    }
  },

  get(key) {
    this.init();
    try {
      const data = localStorage.getItem(KEYS[key] || key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Storage parse error:', e);
      return null;
    }
  },

  set(key, value) {
    this.init();
    try {
      localStorage.setItem(KEYS[key] || key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage write error:', e);
      return false;
    }
  },

  KEYS
};

// Auto-initialize storage on module load
Storage.init();
