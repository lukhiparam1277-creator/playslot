/**
 * PLAYSlot Super Admin Service
 * 
 * Master administration metrics, owner onboarding moderation,
 * turf review, and user management.
 * 
 * STRICT RULE (Section 1 & 20): ALL DASHBOARD STATS ARE 100% DYNAMICALLY
 * CALCULATED FROM CURRENT STATE. NO HARDCODED OR FAKE STATS ALLOWED.
 */

const adminService = (() => {
  function getAdminStats() {
    const users = dataService.get(dataService.getKeys().USERS, []);
    const owners = dataService.get(dataService.getKeys().OWNERS, []);
    const turfs = dataService.get(dataService.getKeys().TURFS, []);
    const bookings = dataService.get(dataService.getKeys().BOOKINGS, []);

    // 1. Total Athletes: Actual count of users
    const totalUsers = users.filter(u => !u.role || u.role === 'user').length;

    // 2. Turf Owners: ONLY Approved & Active owners
    const totalOwners = owners.filter(o => o.status === 'Approved' || o.status === 'Active').length;

    // 3. Pending Owner Requests
    const pendingApprovals = owners.filter(o => o.status === 'Pending').length;

    // 4. Total Turfs: ONLY Approved & Active turfs
    const totalTurfs = turfs.filter(t => t.status === 'Approved' || t.status === 'Active').length;
    const pendingTurfs = turfs.filter(t => t.status === 'Pending').length;

    // 5. Total Bookings: All created bookings in system
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
    const completedBookings = bookings.filter(b => b.status === 'Completed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;

    // 6. Platform Gross Revenue: Sum of valid confirmed/completed transactions
    const totalRevenue = bookingService.calculateRevenue(bookings);

    // 7. Today's Slot Bookings: Reliable non-undefined count for today's date
    const todayBookingsCount = bookingService.getTodayBookingsCount(bookings);

    return {
      totalUsers,
      totalOwners,
      pendingApprovals,
      totalTurfs,
      pendingTurfs,
      totalBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalRevenue,
      todayBookingsCount
    };
  }

  function getUsers() {
    return dataService.get(dataService.getKeys().USERS, []);
  }

  function updateUserStatus(userId, status) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.status = status;
      dataService.set(dataService.getKeys().USERS, users);
      return user;
    }
    return null;
  }

  function getSports() {
    return dataService.get(dataService.getKeys().SPORTS, []);
  }

  function addSport(sportData) {
    const sports = getSports();
    const newSport = {
      id: 'sport-' + Date.now(),
      name: sportData.name,
      icon: sportData.icon || '🏅',
      image: sportData.image || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
      description: sportData.description || 'Verified sport category.',
      startingPrice: parseInt(sportData.startingPrice) || 1000,
      turfsCount: 0,
      categoryType: sportData.categoryType || 'Both',
      popular: false
    };
    sports.unshift(newSport);
    dataService.set(dataService.getKeys().SPORTS, sports);
    return newSport;
  }

  function deleteSport(sportId) {
    let sports = getSports();
    sports = sports.filter(s => s.id !== sportId);
    dataService.set(dataService.getKeys().SPORTS, sports);
    return true;
  }

  return {
    getAdminStats,
    getUsers,
    updateUserStatus,
    getSports,
    addSport,
    deleteSport
  };
})();

if (typeof window !== 'undefined') {
  window.adminService = adminService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { adminService };
}
