/**
 * Statistics & Calculation Utilities for PlaySlot
 * Guarantees zero-safe, NaN-free, and non-undefined outputs.
 */

export const getApprovedOwnerCount = (owners = []) => {
  if (!Array.isArray(owners)) return 0;
  return owners.filter(o => o.status === 'APPROVED' || o.status === 'Approved').length;
};

export const getPendingOwnerCount = (owners = []) => {
  if (!Array.isArray(owners)) return 0;
  return owners.filter(o => o.status === 'PENDING' || o.status === 'Pending').length;
};

export const getApprovedTurfCount = (turfs = []) => {
  if (!Array.isArray(turfs)) return 0;
  return turfs.filter(t => t.status === 'APPROVED' || t.status === 'Approved' || t.status === 'Active' || t.status === 'active').length;
};

export const getPendingTurfCount = (turfs = []) => {
  if (!Array.isArray(turfs)) return 0;
  return turfs.filter(t => t.status === 'PENDING' || t.status === 'Pending').length;
};

export const getTotalBookings = (bookings = []) => {
  if (!Array.isArray(bookings)) return 0;
  return bookings.length;
};

export const getTodaysBookings = (bookings = []) => {
  if (!Array.isArray(bookings)) return [];
  const todayStr = new Date().toISOString().split('T')[0];
  return bookings.filter(b => b.date === todayStr && b.status !== 'Cancelled');
};

export const getTodaysSlotCount = (bookings = []) => {
  return getTodaysBookings(bookings).length;
};

export const getTotalRevenue = (bookings = []) => {
  if (!Array.isArray(bookings)) return 0;
  return bookings.reduce((sum, b) => {
    if (b.status === 'Cancelled' || b.status === 'rejected') return sum;
    const amount = Number(b.totalAmount !== undefined ? b.totalAmount : (b.amount || 0));
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
};

export const getFinancialStats = (bookings = [], commissionRate = 0.15) => {
  if (!Array.isArray(bookings)) {
    return {
      grossRevenue: 0,
      platformCommission: 0,
      ownerEarnings: 0,
      completedBookings: 0,
      cancelledBookings: 0,
      confirmedBookings: 0,
      totalCount: 0
    };
  }

  let grossRevenue = 0;
  let completedBookings = 0;
  let cancelledBookings = 0;
  let confirmedBookings = 0;

  bookings.forEach(b => {
    if (b.status === 'Cancelled' || b.status === 'rejected') {
      cancelledBookings += 1;
    } else {
      if (b.status === 'Completed') completedBookings += 1;
      else confirmedBookings += 1;

      const amt = Number(b.totalAmount !== undefined ? b.totalAmount : (b.amount || 0));
      if (!isNaN(amt)) grossRevenue += amt;
    }
  });

  const platformCommission = Math.round(grossRevenue * commissionRate);
  const ownerEarnings = Math.max(0, grossRevenue - platformCommission);

  return {
    grossRevenue,
    platformCommission,
    ownerEarnings,
    completedBookings,
    cancelledBookings,
    confirmedBookings,
    totalCount: bookings.length
  };
};

export const getOwnerStats = (ownerId, turfs = [], bookings = []) => {
  if (!ownerId) {
    return {
      myTurfsCount: 0,
      todayBookingsCount: 0,
      upcomingBookingsCount: 0,
      monthlyRevenue: 0,
      totalRevenue: 0,
      totalBookingsCount: 0,
      myTurfs: [],
      myBookings: []
    };
  }

  const myTurfs = turfs.filter(t => t.ownerId === ownerId);
  const myTurfIds = myTurfs.map(t => t.id);

  const myBookings = bookings.filter(b => myTurfIds.includes(b.turfId) || b.ownerId === ownerId);
  const todayStr = new Date().toISOString().split('T')[0];

  const todayBookings = myBookings.filter(b => b.date === todayStr && b.status !== 'Cancelled');
  const upcomingBookings = myBookings.filter(b => b.date >= todayStr && b.status !== 'Cancelled');

  const totalRev = myBookings.reduce((sum, b) => {
    if (b.status === 'Cancelled') return sum;
    const amt = Number(b.totalAmount !== undefined ? b.totalAmount : (b.amount || 0));
    return sum + (isNaN(amt) ? 0 : amt);
  }, 0);

  return {
    myTurfsCount: myTurfs.length,
    todayBookingsCount: todayBookings.length,
    upcomingBookingsCount: upcomingBookings.length,
    monthlyRevenue: totalRev,
    totalRevenue: totalRev,
    totalBookingsCount: myBookings.length,
    myTurfs,
    myBookings
  };
};

export const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return '₹' + num.toLocaleString('en-IN');
};
