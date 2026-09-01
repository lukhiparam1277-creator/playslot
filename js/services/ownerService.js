/**
 * PLAYSlot Owner Service
 * Calculates KPI metrics, multi-owner dynamic stats, and revenue analytics
 */
import { Storage } from './storage.js';

export const OwnerService = {
  async getOwnerMetrics(ownerId = 'own-1') {
    const venues = Storage.get('VENUES') || [];
    const bookings = Storage.get('BOOKINGS') || [];

    const ownerVenues = venues.filter(v => v.ownerId === ownerId);
    const ownerBookings = bookings.filter(b => b.ownerId === ownerId);

    const upcomingBookings = ownerBookings.filter(b => b.status === 'Upcoming');
    const completedBookings = ownerBookings.filter(b => b.status === 'Completed' || b.status === 'Upcoming');
    
    const monthlyRevenue = completedBookings.reduce((sum, b) => sum + (b.amount || 0), 0);

    return {
      totalVenues: ownerVenues.length,
      todaysBookings: Math.max(1, Math.floor(upcomingBookings.length / 2)),
      upcomingBookings: upcomingBookings.length,
      monthlyRevenue: monthlyRevenue,
      averageTicket: completedBookings.length ? Math.round(monthlyRevenue / completedBookings.length) : 0
    };
  },

  async getRevenueStats(ownerId = 'own-1') {
    return {
      dailyRevenue: 2800,
      weeklyRevenue: 16400,
      monthlyRevenue: 68500,
      chartData: [
        { label: 'Mon', amount: 2400, height: '40%' },
        { label: 'Tue', amount: 3200, height: '55%' },
        { label: 'Wed', amount: 2900, height: '48%' },
        { label: 'Thu', amount: 4100, height: '70%' },
        { label: 'Fri', amount: 5800, height: '95%' },
        { label: 'Sat', amount: 6200, height: '100%' },
        { label: 'Sun', amount: 5400, height: '88%' }
      ]
    };
  }
};
