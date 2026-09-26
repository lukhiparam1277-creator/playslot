/**
 * Owner Service for PlaySlot
 * Standardized CRUD for Turf Owners. Easily replaceable with Express /api/owners endpoints.
 */

import storageService, { STORAGE_KEYS } from './storageService';
import { defaultOwners } from '../data/initialData';

export const ownerService = {
  async getOwners() {
    return storageService.get(STORAGE_KEYS.OWNERS, defaultOwners);
  },

  async getOwnerById(id) {
    const owners = await this.getOwners();
    return owners.find(o => o.id === id || o.email?.toLowerCase() === id?.toLowerCase()) || null;
  },

  async registerOwner(ownerData) {
    const owners = await this.getOwners();
    const newOwnerId = 'owner-' + Date.now();
    const newOwner = {
      id: newOwnerId,
      name: ownerData.name || ownerData.ownerName,
      businessName: ownerData.businessName || `${ownerData.name}'s Sports Arena`,
      email: ownerData.email,
      phone: ownerData.phone,
      password: ownerData.password || 'password123',
      city: ownerData.city || 'Mumbai',
      registeredDate: new Date().toISOString().split('T')[0],
      turfsCount: 0,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      ...ownerData,
      status: 'PENDING'
    };

    const updated = [newOwner, ...owners];
    storageService.set(STORAGE_KEYS.OWNERS, updated);
    return newOwner;
  },

  async updateOwnerStatus(ownerId, status, notes = '') {
    const owners = await this.getOwners();
    let updatedOwner = null;
    const updated = owners.map(o => {
      if (o.id === ownerId || o.email?.toLowerCase() === ownerId?.toLowerCase()) {
        updatedOwner = { ...o, status, notes, updatedAt: new Date().toISOString() };
        return updatedOwner;
      }
      return o;
    });
    storageService.set(STORAGE_KEYS.OWNERS, updated);
    return updatedOwner;
  },

  async updateOwner(ownerId, updates) {
    const owners = await this.getOwners();
    let updatedOwner = null;
    const updated = owners.map(o => {
      if (o.id === ownerId) {
        updatedOwner = { ...o, ...updates };
        return updatedOwner;
      }
      return o;
    });
    storageService.set(STORAGE_KEYS.OWNERS, updated);
    return updatedOwner;
  },

  async deleteOwner(ownerId) {
    const owners = await this.getOwners();
    const filtered = owners.filter(o => o.id !== ownerId);
    storageService.set(STORAGE_KEYS.OWNERS, filtered);
    return true;
  }
};

export default ownerService;
