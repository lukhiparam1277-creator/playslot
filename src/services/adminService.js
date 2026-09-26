/**
 * Admin Service for PlaySlot
 * Platform metrics, financial calculations, and governance.
 */

import storageService, { STORAGE_KEYS } from './storageService';
import { defaultOwners, defaultTurfs, defaultUsers, defaultBookings } from '../data/initialData';
import {
  getApprovedOwnerCount,
  getPendingOwnerCount,
  getApprovedTurfCount,
  getPendingTurfCount,
  getTotalBookings,
  getTodaysBookings,
  getTodaysSlotCount,
  getTotalRevenue,
  getFinancialStats
} from '../utils/statistics';

export const adminService = {
  async getDashboardMetrics() {
    const users = storageService.get(STORAGE_KEYS.USERS, defaultUsers);
    const owners = storageService.get(STORAGE_KEYS.OWNERS, defaultOwners);
    const turfs = storageService.get(STORAGE_KEYS.TURFS, defaultTurfs);
    const bookings = storageService.get(STORAGE_KEYS.BOOKINGS, defaultBookings);

    return {
      totalUsers: users.length,
      approvedOwners: getApprovedOwnerCount(owners),
      pendingOwners: getPendingOwnerCount(owners),
      approvedTurfs: getApprovedTurfCount(turfs),
      pendingTurfs: getPendingTurfCount(turfs),
      totalTurfs: turfs.length,
      totalBookings: getTotalBookings(bookings),
      todayBookingsCount: getTodaysSlotCount(bookings),
      grossRevenue: getTotalRevenue(bookings),
      financials: getFinancialStats(bookings)
    };
  },

  async getPlatformSettings() {
    return storageService.get(STORAGE_KEYS.SETTINGS, {
      platformCommissionRate: 15, // 15%
      gstRate: 18, // 18%
      convenienceFee: 49,
      maintenanceMode: false,
      autoApproveOwners: false,
      autoApproveTurfs: false
    });
  },

  async updatePlatformSettings(settings) {
    const current = await this.getPlatformSettings();
    const updated = { ...current, ...settings };
    storageService.set(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }
};

export default adminService;
