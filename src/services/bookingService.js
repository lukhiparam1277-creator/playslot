/**
 * Booking Service for PlaySlot
 * Handles centralized bookings, double-booking validation, and isolated queries.
 */

import storageService, { STORAGE_KEYS } from './storageService';
import { defaultBookings } from '../data/initialData';

export const bookingService = {
  async getBookings() {
    return storageService.get(STORAGE_KEYS.BOOKINGS, defaultBookings);
  },

  async getBookingById(id) {
    const bookings = await this.getBookings();
    return bookings.find(b => b.id === id || b.bookingId === id) || null;
  },

  async getBookingsByOwner(ownerId) {
    const bookings = await this.getBookings();
    return bookings.filter(b => b.ownerId === ownerId);
  },

  async getBookingsByUser(userId) {
    const bookings = await this.getBookings();
    return bookings.filter(b => b.userId === userId);
  },

  async checkSlotAvailable(turfId, date, timeSlot) {
    const bookings = await this.getBookings();
    const existing = bookings.find(b => 
      b.turfId === turfId && 
      b.date === date && 
      (b.timeSlot === timeSlot || b.slot === timeSlot) && 
      b.status !== 'Cancelled' && 
      b.status !== 'rejected'
    );
    return !existing;
  },

  async createBooking(bookingData) {
    const bookings = await this.getBookings();

    // Check double-booking
    const slot = bookingData.timeSlot || bookingData.slot;
    const isAvailable = await this.checkSlotAvailable(bookingData.turfId, bookingData.date, slot);
    if (!isAvailable) {
      throw new Error('This slot has already been booked.');
    }

    const bookingId = bookingData.bookingId || ('PS-' + Math.floor(100000 + Math.random() * 900000));
    const baseAmt = parseFloat(bookingData.basePrice || bookingData.amount || 1200);
    const fee = bookingData.convenienceFee !== undefined ? parseFloat(bookingData.convenienceFee) : 49;
    const gst = bookingData.gstAmount !== undefined ? parseFloat(bookingData.gstAmount) : Math.round(baseAmt * 0.18);
    const totalAmt = parseFloat(bookingData.totalAmount || bookingData.amount || (baseAmt + fee + gst));

    const newBooking = {
      id: bookingId,
      bookingId: bookingId,
      userId: bookingData.userId || 'user-1',
      userName: bookingData.userName || 'Rahul Sharma',
      userEmail: bookingData.userEmail || 'user@playslot.com',
      userPhone: bookingData.userPhone || '+91 98765 43210',
      ownerId: bookingData.ownerId || 'owner-1',
      turfId: bookingData.turfId,
      turfName: bookingData.turfName || 'Sports Arena',
      turfImage: bookingData.turfImage || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
      sport: bookingData.sport || 'Box Cricket',
      date: bookingData.date,
      timeSlot: slot,
      slot: slot,
      startTime: bookingData.startTime || (slot ? slot.split(' - ')[0] : '06:00 PM'),
      endTime: bookingData.endTime || (slot ? slot.split(' - ')[1] : '07:00 PM'),
      durationHours: bookingData.durationHours || 1,
      playersCount: parseInt(bookingData.playersCount) || 6,
      basePrice: baseAmt,
      convenienceFee: fee,
      gstAmount: gst,
      totalAmount: totalAmt,
      amount: totalAmt,
      status: bookingData.status || 'Confirmed',
      paymentStatus: bookingData.paymentStatus || 'Paid',
      paymentMethod: bookingData.paymentMethod || 'UPI / Card',
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...bookings];
    storageService.set(STORAGE_KEYS.BOOKINGS, updated);
    return newBooking;
  },

  async updateBooking(id, updates) {
    const bookings = await this.getBookings();
    let updatedBooking = null;
    const updated = bookings.map(b => {
      if (b.id === id || b.bookingId === id) {
        updatedBooking = {
          ...b,
          ...updates,
          totalAmount: updates.totalAmount !== undefined ? parseFloat(updates.totalAmount) : (updates.amount !== undefined ? parseFloat(updates.amount) : b.totalAmount),
          amount: updates.totalAmount !== undefined ? parseFloat(updates.totalAmount) : (updates.amount !== undefined ? parseFloat(updates.amount) : b.amount)
        };
        return updatedBooking;
      }
      return b;
    });
    storageService.set(STORAGE_KEYS.BOOKINGS, updated);
    return updatedBooking;
  },

  async cancelBooking(id) {
    return await this.updateBooking(id, { status: 'Cancelled' });
  },

  async deleteBooking(id) {
    const bookings = await this.getBookings();
    const filtered = bookings.filter(b => b.id !== id && b.bookingId !== id);
    storageService.set(STORAGE_KEYS.BOOKINGS, filtered);
    return true;
  }
};

export default bookingService;
