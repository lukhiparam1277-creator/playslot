/**
 * PLAYSlot Master Admin Service
 * Moderation actions, platform audits, users/owners approvals, and sports management
 */
import { Storage } from './storage.js';

export const AdminService = {
  async getAdminMetrics() {
    const users = Storage.get('USERS') || [];
    const owners = Storage.get('OWNERS') || [];
    const venues = Storage.get('VENUES') || [];
    const bookings = Storage.get('BOOKINGS') || [];
    const payments = Storage.get('PAYMENTS') || [];

    const pendingOwners = owners.filter(o => o.status === 'Pending').length;
    const grossRevenue = payments.filter(p => p.status === 'Success').reduce((s, p) => s + (p.amount || 0), 0);

    return {
      totalUsers: users.length,
      totalOwners: owners.length,
      totalVenues: venues.length,
      totalBookings: bookings.length,
      pendingOwners,
      grossRevenue
    };
  },

  async getUsers() {
    return Storage.get('USERS') || [];
  },

  async toggleUserStatus(userId) {
    const users = Storage.get('USERS') || [];
    const target = users.find(u => u.id === userId);
    if (!target) return false;
    target.status = target.status === 'Active' ? 'Suspended' : 'Active';
    Storage.set('USERS', users);
    return target.status;
  },

  async deleteUser(userId) {
    let users = Storage.get('USERS') || [];
    users = users.filter(u => u.id !== userId);
    Storage.set('USERS', users);
    return true;
  },

  async getOwners() {
    return Storage.get('OWNERS') || [];
  },

  async updateOwnerStatus(ownerId, status) {
    const owners = Storage.get('OWNERS') || [];
    const target = owners.find(o => o.id === ownerId);
    if (!target) return false;
    target.status = status; // 'Approved' | 'Rejected' | 'Suspended' | 'Pending'
    Storage.set('OWNERS', owners);
    return true;
  },

  async getSports() {
    return Storage.get('SPORTS') || [];
  },

  async addSport(data) {
    const sports = Storage.get('SPORTS') || [];
    const newSport = {
      id: `sport-${Date.now()}`,
      name: data.name,
      icon: data.icon || '🏅',
      category: data.category || 'Outdoor',
      description: data.description || 'Exciting competitive sport.',
      playerCount: data.playerCount || '2 to 10 players',
      activeVenues: 0,
      status: 'Active'
    };
    sports.push(newSport);
    Storage.set('SPORTS', sports);
    return newSport;
  },

  async toggleSportStatus(sportId) {
    const sports = Storage.get('SPORTS') || [];
    const target = sports.find(s => s.id === sportId);
    if (!target) return false;
    target.status = target.status === 'Active' ? 'Inactive' : 'Active';
    Storage.set('SPORTS', sports);
    return target.status;
  },

  async getPayments() {
    return Storage.get('PAYMENTS') || [];
  }
};
