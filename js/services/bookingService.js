/**
 * PLAYSlot Booking Service
 * Handles match reservations, digital passes, and cancellations
 */
import { Storage } from './storage.js';
import { SlotService } from './slotService.js';

export const BookingService = {
  async createBooking(data) {
    await new Promise(r => setTimeout(r, 400));
    const bookings = Storage.get('BOOKINGS') || [];
    const payments = Storage.get('PAYMENTS') || [];

    const bookingId = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking = {
      id: bookingId,
      userId: data.userId || 'usr-1',
      userName: data.userName || 'Alex Morgan',
      userEmail: data.userEmail || 'alex@example.com',
      userPhone: data.userPhone || '+91 98765 00001',
      venueId: data.venueId,
      venueName: data.venueName,
      venueCity: data.venueCity || 'Mumbai',
      ownerId: data.ownerId || 'own-1',
      ownerName: data.ownerName || 'SportsHub Arena Group',
      sport: data.sport,
      date: data.date,
      timeSlot: data.timeSlot,
      amount: Number(data.amount) || 1200,
      status: 'Upcoming',
      paymentStatus: 'Paid',
      paymentMethod: data.paymentMethod || 'UPI / GPay',
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    Storage.set('BOOKINGS', bookings);

    // Also create simulated financial ledger payment
    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingId: bookingId,
      user: newBooking.userName,
      venue: newBooking.venueName,
      owner: newBooking.ownerName,
      amount: newBooking.amount,
      method: newBooking.paymentMethod,
      status: 'Success',
      date: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    };
    payments.unshift(newTxn);
    Storage.set('PAYMENTS', payments);

    // Mark slot as booked if slot ID provided
    if (data.slotId) {
      await SlotService.updateSlotStatus(data.slotId, 'BOOKED');
    }

    return newBooking;
  },

  async getUserBookings(userId = 'usr-1', status = 'All') {
    await new Promise(r => setTimeout(r, 150));
    let bookings = Storage.get('BOOKINGS') || [];
    bookings = bookings.filter(b => b.userId === userId);
    if (status && status !== 'All') {
      bookings = bookings.filter(b => b.status.toLowerCase() === status.toLowerCase());
    }
    return bookings;
  },

  async getOwnerBookings(ownerId, filters = {}) {
    await new Promise(r => setTimeout(r, 150));
    let bookings = Storage.get('BOOKINGS') || [];
    if (ownerId) {
      bookings = bookings.filter(b => b.ownerId === ownerId);
    }
    if (filters.status && filters.status !== 'All') {
      bookings = bookings.filter(b => b.status.toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.venueId && filters.venueId !== 'All') {
      bookings = bookings.filter(b => b.venueId === filters.venueId);
    }
    return bookings;
  },

  async getAllBookings(filters = {}) {
    await new Promise(r => setTimeout(r, 150));
    let bookings = Storage.get('BOOKINGS') || [];
    if (filters.status && filters.status !== 'All') {
      bookings = bookings.filter(b => b.status.toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.sport && filters.sport !== 'All') {
      bookings = bookings.filter(b => b.sport.toLowerCase() === filters.sport.toLowerCase());
    }
    return bookings;
  },

  async cancelBooking(bookingId) {
    await new Promise(r => setTimeout(r, 200));
    const bookings = Storage.get('BOOKINGS') || [];
    const target = bookings.find(b => b.id === bookingId);
    if (!target) throw new Error('Booking not found');

    target.status = 'Cancelled';
    target.paymentStatus = 'Refunded';
    Storage.set('BOOKINGS', bookings);

    // Update payment record to refunded
    const payments = Storage.get('PAYMENTS') || [];
    const payment = payments.find(p => p.bookingId === bookingId);
    if (payment) {
      payment.status = 'Refunded';
      Storage.set('PAYMENTS', payments);
    }

    return target;
  }
};
