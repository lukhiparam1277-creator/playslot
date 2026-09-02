/**
 * PLAYSlot Turf Owner Service
 * 
 * Manages owner onboarding/applications, status moderation (Pending, Approved, Rejected, Suspended),
 * and strictly isolated owner analytics by ownerId.
 * 
 * CRITICAL RULE (Section 8): OWNER ≠ TURF.
 * Approving an owner grants owner portal access only. It DOES NOT add or approve a turf!
 */

const ownerService = (() => {
  function getAllOwners() {
    return dataService.get(dataService.getKeys().OWNERS, []);
  }

  function getOwners(statusFilter = 'All') {
    let owners = getAllOwners();
    if (statusFilter && statusFilter !== 'All') {
      owners = owners.filter(o => o.status.toLowerCase() === statusFilter.toLowerCase());
    }
    return owners;
  }

  function getOwnerById(ownerId) {
    if (!ownerId) return null;
    const owners = getAllOwners();
    return owners.find(o => 
      o.id === ownerId || 
      (o.applicationId && o.applicationId.toLowerCase() === ownerId.toLowerCase())
    ) || null;
  }

  function getOwnerByEmail(email) {
    if (!email) return null;
    const owners = getAllOwners();
    return owners.find(o => o.email.toLowerCase() === email.toLowerCase()) || null;
  }

  /**
   * Section 7: Owner Registration
   * Owner registers -> status = 'Pending'.
   * Appears in Pending Owner Requests table.
   * Does NOT increment Turf Owners count until approved.
   */
  function registerOwner(data) {
    const owners = getAllOwners();
    const newAppId = 'PS-OWNER-' + Math.floor(10000 + Math.random() * 90000);
    const newOwner = {
      id: 'owner-' + Date.now(),
      applicationId: newAppId,
      ownerName: data.ownerName || data.name,
      name: data.ownerName || data.name,
      email: data.email,
      phone: data.phone,
      businessName: data.businessName || data.turfName || 'Sports Business',
      turfName: data.turfName || 'Pending Arena',
      city: data.city || 'Mumbai',
      area: data.area || '',
      turfType: data.turfType || 'Outdoor',
      sports: data.sports || ['Cricket'],
      pricePerHour: parseInt(data.pricePerHour) || 1200,
      openingTime: data.openingTime || '06:00 AM',
      closingTime: data.closingTime || '11:00 PM',
      facilities: data.facilities || ['Parking', 'Washroom', 'Flood Lights'],
      description: data.description || '',
      images: data.images || ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'],
      status: 'Pending',
      role: 'turf_owner',
      appliedDate: new Date().toISOString().split('T')[0],
      submittedDate: new Date().toISOString().split('T')[0],
      rejectionReason: '',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    };

    owners.unshift(newOwner);
    dataService.set(dataService.getKeys().OWNERS, owners);
    return newOwner;
  }

  /**
   * Section 7 & 8: Approve / Reject / Suspend Owner
   * On Approve:
   * 1. Status becomes 'Approved'.
   * 2. Saves to localStorage.
   * 3. Increments approved owner count.
   * 4. Decrements pending count.
   * 5. CRITICAL: Does NOT automatically add or increase turfs!
   */
  function updateOwnerStatus(ownerId, status, reason = '') {
    const owners = getAllOwners();
    const owner = owners.find(o => o.id === ownerId || o.applicationId === ownerId);
    if (owner) {
      owner.status = status;
      if (reason) {
        owner.rejectionReason = reason;
      }
      dataService.set(dataService.getKeys().OWNERS, owners);
      return owner;
    }
    return null;
  }

  /**
   * Check login eligibility for Turf Owner portal
   */
  function checkOwnerLogin(email) {
    if (!email) {
      return { allowed: false, message: 'Please enter your registered email address.' };
    }

    const owners = getAllOwners();
    const owner = owners.find(o => o.email.toLowerCase() === email.toLowerCase());

    if (!owner) {
      return {
        allowed: false,
        status: 'NotFound',
        message: 'No turf partner application found with this email. Please register at /owner/apply first.'
      };
    }

    if (owner.status === 'Pending') {
      return {
        allowed: false,
        status: 'Pending',
        applicationId: owner.applicationId,
        message: `Your application (${owner.applicationId}) is currently Pending review by our operations team. Portal access will unlock upon approval.`
      };
    }

    if (owner.status === 'Rejected') {
      return {
        allowed: false,
        status: 'Rejected',
        applicationId: owner.applicationId,
        message: `Your application (${owner.applicationId}) was rejected: "${owner.rejectionReason || 'Application incomplete'}".`
      };
    }

    if (owner.status === 'Suspended' || owner.status === 'Blocked') {
      return {
        allowed: false,
        status: 'Suspended',
        message: 'Your turf owner account is currently suspended. Please contact platform administration.'
      };
    }

    // Approved owner
    const sessionOwner = {
      id: owner.id,
      name: owner.ownerName || owner.name,
      email: owner.email,
      phone: owner.phone,
      role: 'turf_owner',
      avatar: owner.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    };

    authService.setCurrentUser(sessionOwner);
    return {
      allowed: true,
      status: 'Approved',
      ownerUser: sessionOwner
    };
  }

  /**
   * Section 19: Owner Dashboard Metrics
   * Strictly isolated for ownerId:
   * Only owner's turfs, only owner's bookings, only owner's revenue!
   */
  function getOwnerStats(ownerId) {
    if (!ownerId) {
      return {
        totalTurfs: 0,
        totalBookings: 0,
        upcomingBookings: 0,
        todayBookings: 0,
        monthlyRevenue: 0,
        monthlyEarnings: 0,
        averageRating: 5.0
      };
    }

    const myTurfs = venueService.getTurfs({ ownerId }, true);
    const myBookings = bookingService.getBookings({ ownerId });

    const totalTurfs = myTurfs.length;
    const totalBookings = myBookings.length;
    const todayBookings = myBookings.filter(b => dataService.isToday(b.date) && b.status !== 'Cancelled').length;
    const upcomingBookings = myBookings.filter(b => b.status === 'Confirmed' && !dataService.isToday(b.date)).length;
    const monthlyRevenue = bookingService.calculateRevenue(myBookings);

    let avgRating = 5.0;
    if (myTurfs.length > 0) {
      const sumRating = myTurfs.reduce((s, t) => s + (Number(t.rating) || 4.9), 0);
      avgRating = (sumRating / myTurfs.length).toFixed(1);
    }

    return {
      totalTurfs,
      totalBookings,
      upcomingBookings,
      todayBookings,
      monthlyRevenue,
      monthlyEarnings: monthlyRevenue,
      averageRating: avgRating
    };
  }

  return {
    getAllOwners,
    getOwners,
    getOwnerById,
    getOwnerByEmail,
    registerOwner,
    updateOwnerStatus,
    checkOwnerLogin,
    getOwnerStats
  };
})();

if (typeof window !== 'undefined') {
  window.ownerService = ownerService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ownerService };
}
