/**
 * User Service for PlaySlot
 * Handles Athletes / Platform Users.
 */

import storageService, { STORAGE_KEYS } from './storageService';
import { defaultUsers } from '../data/initialData';

export const userService = {
  async getUsers() {
    return storageService.get(STORAGE_KEYS.USERS, defaultUsers);
  },

  async getUserById(id) {
    const users = await this.getUsers();
    return users.find(u => u.id === id || u.email === id) || null;
  },

  async createUser(userData) {
    const users = await this.getUsers();
    const newUser = {
      id: userData.id || ('user-' + Date.now()),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+91 98765 00000',
      city: userData.city || 'Mumbai',
      totalBookings: parseInt(userData.totalBookings) || 0,
      joinedDate: userData.joinedDate || new Date().toISOString().split('T')[0],
      status: userData.status || 'Active',
      role: userData.role || 'user',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };

    const updated = [newUser, ...users];
    storageService.set(STORAGE_KEYS.USERS, updated);
    return newUser;
  },

  async updateUser(id, updates) {
    const users = await this.getUsers();
    let updatedUser = null;
    const updated = users.map(u => {
      if (u.id === id) {
        updatedUser = { ...u, ...updates, id: u.id };
        return updatedUser;
      }
      return u;
    });
    storageService.set(STORAGE_KEYS.USERS, updated);
    return updatedUser;
  },

  async updateUserStatus(id, status) {
    return await this.updateUser(id, { status });
  },

  async deleteUser(id) {
    const users = await this.getUsers();
    const filtered = users.filter(u => u.id !== id);
    storageService.set(STORAGE_KEYS.USERS, filtered);
    return true;
  }
};

export default userService;
