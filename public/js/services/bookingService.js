/**
 * PLAYSlot Booking Service
 * 
 * Manages slot reservations, duplicate booking prevention, cancellations,
 * and dynamic platform/owner revenue calculations.
 */

const bookingService = (() => {
  function getAllBookings() {
    return dataService.get(dataService.getKeys().BOOKINGS, []);
  }

  function getBookings(filters = {}) {
    let bookings = getAllBookings();

    if (filters.userId) {
      bookings = bookings.filter(b => b.userId === filters.userId);
    }

    if (filters.ownerId) {
      bookings = bookings.filter(b => b.ownerId === filters.ownerId);
    }

    if (filters.turfId) {
      bookings = bookings.filter(b => b.turfId === filters.turfId);
    }

    if (filters.status && filters.status !== 'All') {
      bookings = bookings.filter(b => b.status.toLowerCase() === filters.status.toLowerCase());
    }

    if (filters.date) {
      bookings = bookings.filter(b => b.date === filters.date);
    }

    // Sort newest first by creation date
    bookings.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    return bookings;
  }

  function getBookingById(bookingId) {
    if (!bookingId) return null;
    const bookings = getAllBookings();
    return bookings.find(b => b.id === bookingId || b.bookingId === bookingId) || null;
  }

  /**
   * Section 18: Prevent Frontend Double Booking
   * Checks whether an active booking already exists for turfId + date + timeSlot.
   */
  function isSlotBooked(turfId, date, timeSlot) {
    if (!turfId || !date || !timeSlot) return false;
    const bookings = getAllBookings();
    return bookings.some(b => 
      b.turfId === turfId &&
      b.date === date &&
      b.timeSlot === timeSlot &&
      b.status !== 'Cancelled'
    );
  }

  function createBooking(bookingData) {
    // 1. Duplicate Booking Check
    if (isSlotBooked(bookingData.turfId, bookingData.date, bookingData.timeSlot)) {
      return {
        success: false,
        error: 'This slot has already been booked.',
        booking: null
      };
    }

    const bookings = getAllBookings();
    const newBookingId = 'PS-' + Math.floor(100000 + Math.random() * 900000);
    const basePrice = parseFloat(bookingData.basePrice) || 1200;
    const convenienceFee = 49;
    const gstAmount = Math.round(basePrice * 0.18);
    const totalAmount = parseFloat(bookingData.totalAmount) || (basePrice + convenienceFee + gstAmount);

    const newBooking = {
      id: newBookingId,
      bookingId: newBookingId,
      userId: bookingData.userId || 'user-1',
      userName: bookingData.userName || 'Customer Athlete',
      userEmail: bookingData.userEmail || 'user@playslot.com',
      userPhone: bookingData.userPhone || '+91 98765 43210',
      turfId: bookingData.turfId,
      turfName: bookingData.turfName || 'Sports Arena',
      turfImage: bookingData.turfImage || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
      ownerId: bookingData.ownerId || 'owner-1',
      sport: bookingData.sport || 'Box Cricket',
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      durationHours: parseInt(bookingData.durationHours) || 1,
      playersCount: parseInt(bookingData.playersCount) || 6,
      basePrice,
      convenienceFee,
      gstAmount,
      totalAmount,
      status: 'Confirmed',
      paymentStatus: 'Success',
      paymentMethod: bookingData.paymentMethod || 'UPI / Card',
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    dataService.set(dataService.getKeys().BOOKINGS, bookings);

    // Update user's booking count
    const users = dataService.get(dataService.getKeys().USERS, []);
    const user = users.find(u => u.id === newBooking.userId);
    if (user) {
      user.totalBookings = (user.totalBookings || 0) + 1;
      dataService.set(dataService.getKeys().USERS, users);
    }

    return {
      success: true,
      booking: newBooking
    };
  }

  function cancelBooking(bookingId) {
    const bookings = getAllBookings();
    const target = bookings.find(b => b.id === bookingId || b.bookingId === bookingId);
    if (target) {
      target.status = 'Cancelled';
      target.cancelledAt = new Date().toISOString();
      dataService.set(dataService.getKeys().BOOKINGS, bookings);
      return target;
    }
    return null;
  }

  /**
   * Section 13: Reusable calculateRevenue()
   * Only active, confirmed or completed bookings count towards gross revenue.
   */
  function calculateRevenue(bookingsList = null) {
    const list = bookingsList || getAllBookings();
    return list
      .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
      .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
  }

  /**
   * Section 14: Count actual slot bookings for today's date
   * Returns a reliable integer (e.g. 0, 1, 2) - never undefined or NaN.
   */
  function getTodayBookingsCount(bookingsList = null) {
    const list = bookingsList || getAllBookings();
    return list.filter(b => 
      dataService.isToday(b.date) && 
      b.status !== 'Cancelled'
    ).length;
  }

  return {
    getAllBookings,
    getBookings,
    getBookingById,
    isSlotBooked,
    createBooking,
    cancelBooking,
    calculateRevenue,
    getTodayBookingsCount
  };
})();

if (typeof window !== 'undefined') {
  window.bookingService = bookingService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { bookingService };
}
