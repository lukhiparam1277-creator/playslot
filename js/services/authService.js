/**
 * PLAYSlot Auth Service
 * Isolated authentication bridge (ready for Express JWT / session replacement in Phase 2)
 */
import { Storage } from './storage.js';

export const AuthService = {
  async getCurrentAuth() {
    return Storage.get('AUTH');
  },

  async getCurrentUser() {
    const auth = Storage.get('AUTH');
    return auth ? auth.user : null;
  },

  async getCurrentOwner() {
    const auth = Storage.get('AUTH');
    return auth ? auth.owner : null;
  },

  async getCurrentRole() {
    const auth = Storage.get('AUTH');
    return auth ? auth.role : 'guest';
  },

  async loginUser(email, password) {
    // Simulated network delay
    await new Promise(r => setTimeout(r, 300));
    const users = Storage.get('USERS') || [];
    const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!matched) {
      throw new Error('No user account found with this email address.');
    }
    if (matched.status === 'Suspended') {
      throw new Error('Your account is currently suspended. Please contact support.');
    }

    Storage.set('AUTH', {
      role: 'user',
      user: matched,
      owner: null
    });

    return { success: true, user: matched };
  },

  async registerUser(data) {
    await new Promise(r => setTimeout(r, 350));
    const users = Storage.get('USERS') || [];
    const exists = users.some(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (exists) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || '+91 98000 00000',
      role: 'Customer',
      status: 'Active',
      joined: new Date().toISOString().split('T')[0],
      bookingsCount: 0,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };

    users.push(newUser);
    Storage.set('USERS', users);

    Storage.set('AUTH', {
      role: 'user',
      user: newUser,
      owner: null
    });

    return { success: true, user: newUser };
  },

  async loginOwner(ownerIdOrEmail, password) {
    await new Promise(r => setTimeout(r, 300));
    const owners = Storage.get('OWNERS') || [];
    const matched = owners.find(o => o.id === ownerIdOrEmail || o.email.toLowerCase() === ownerIdOrEmail.toLowerCase());

    if (!matched) {
      throw new Error('Owner account not found.');
    }
    if (matched.status === 'Suspended') {
      throw new Error('Your owner account has been suspended by administration.');
    }

    Storage.set('AUTH', {
      role: 'owner',
      user: null,
      owner: matched
    });

    return { success: true, owner: matched };
  },

  async switchActiveOwner(ownerId) {
    const owners = Storage.get('OWNERS') || [];
    const matched = owners.find(o => o.id === ownerId);
    if (!matched) return false;

    const auth = Storage.get('AUTH') || {};
    Storage.set('AUTH', {
      ...auth,
      role: 'owner',
      owner: matched
    });
    return true;
  },

  async loginAdmin(email, password) {
    await new Promise(r => setTimeout(r, 300));
    if (email === 'admin@playslot.app' || email === 'admin@example.com' || email.includes('admin')) {
      const adminUser = {
        id: 'adm-1',
        name: 'Master Administrator',
        email: 'admin@playslot.app',
        role: 'Admin'
      };
      Storage.set('AUTH', {
        role: 'admin',
        user: adminUser,
        owner: null
      });
      return { success: true, admin: adminUser };
    }
    throw new Error('Invalid admin credentials. Use admin@playslot.app');
  },

  async logout() {
    Storage.set('AUTH', {
      role: 'guest',
      user: null,
      owner: null
    });
    return true;
  }
};
