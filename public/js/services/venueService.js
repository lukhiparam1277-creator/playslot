/**
 * PLAYSlot Turf / Venue Service
 * 
 * Manages turf discovery, owner turf creations, and admin moderation.
 * Core Rule: Only APPROVED & ACTIVE turfs appear in public venue listings.
 * When an owner creates a turf, it starts with status: 'Pending'.
 */

const venueService = (() => {
  function getAllTurfs() {
    return dataService.get(dataService.getKeys().TURFS, []);
  }

  function getTurfs(filters = {}, includeAllStatus = false) {
    let turfs = getAllTurfs();

    // Unless explicitly requested (e.g. by Admin or Owner dashboard), filter strictly by Approved/Active
    if (!includeAllStatus && !filters.ownerId) {
      turfs = turfs.filter(t => t.status === 'Approved' || t.status === 'Active');
    }

    if (filters.ownerId) {
      turfs = turfs.filter(t => t.ownerId === filters.ownerId);
    }

    if (filters.status && filters.status !== 'All') {
      turfs = turfs.filter(t => t.status.toLowerCase() === filters.status.toLowerCase());
    }

    if (filters.sport && filters.sport !== 'All') {
      const target = filters.sport.toLowerCase();
      turfs = turfs.filter(t => 
        (t.sport && t.sport.toLowerCase() === target) || 
        (t.sportsAvailable && t.sportsAvailable.some(s => s.toLowerCase() === target))
      );
    }

    if (filters.city && filters.city !== 'All') {
      turfs = turfs.filter(t => t.city && t.city.toLowerCase() === filters.city.toLowerCase());
    }

    if (filters.turfType && filters.turfType !== 'All') {
      turfs = turfs.filter(t => t.turfType && t.turfType.toLowerCase() === filters.turfType.toLowerCase());
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      turfs = turfs.filter(t => 
        (t.name && t.name.toLowerCase().includes(q)) || 
        (t.location && t.location.toLowerCase().includes(q)) || 
        (t.sport && t.sport.toLowerCase().includes(q))
      );
    }

    if (filters.maxPrice) {
      turfs = turfs.filter(t => Number(t.pricePerHour) <= parseFloat(filters.maxPrice));
    }

    if (filters.minRating) {
      turfs = turfs.filter(t => Number(t.rating) >= parseFloat(filters.minRating));
    }

    if (filters.sort) {
      if (filters.sort === 'price_low') turfs.sort((a, b) => a.pricePerHour - b.pricePerHour);
      else if (filters.sort === 'price_high') turfs.sort((a, b) => b.pricePerHour - a.pricePerHour);
      else if (filters.sort === 'rating') turfs.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      else if (filters.sort === 'distance') turfs.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
    }

    return turfs;
  }

  function getTurfById(id) {
    const turfs = getAllTurfs();
    return turfs.find(t => t.id === id) || null;
  }

  function addTurf(turfData) {
    const turfs = getAllTurfs();
    const newTurf = {
      id: turfData.id || 'turf-' + Date.now(),
      name: turfData.name,
      sport: turfData.sport || 'Box Cricket',
      sportsAvailable: turfData.sportsAvailable || [turfData.sport || 'Box Cricket'],
      city: turfData.city || 'Mumbai',
      location: turfData.location || 'Central Area',
      address: turfData.address || turfData.location || 'Central Area',
      distance: turfData.distance || '2.0 km',
      distanceKm: turfData.distanceKm || 2.0,
      pricePerHour: parseInt(turfData.pricePerHour) || 1200,
      rating: 5.0,
      reviewsCount: 0,
      turfType: turfData.turfType || 'Outdoor',
      ownerId: turfData.ownerId || 'owner-1',
      ownerName: turfData.ownerName || 'Turf Owner',
      contactPhone: turfData.contactPhone || '+91 98201 23456',
      contactEmail: turfData.contactEmail || 'owner@playslot.com',
      openingTime: turfData.openingTime || '06:00 AM',
      closingTime: turfData.closingTime || '11:00 PM',
      // CRITICAL RULE: New owner-created turfs start as PENDING moderation review
      status: turfData.status || 'Pending',
      featured: false,
      availableToday: true,
      description: turfData.description || 'Modern sports arena registered on PlaySlot.',
      rules: turfData.rules || [
        'Non-marking sports shoes or rubber studs only.',
        'Please report 10 minutes prior to your booked slot timing.'
      ],
      facilities: turfData.facilities || ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water'],
      images: turfData.images && turfData.images.length > 0 ? turfData.images : ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'],
      slotTimings: turfData.slotTimings || [
        '06:00 AM - 07:00 AM',
        '07:00 AM - 08:00 AM',
        '08:00 AM - 09:00 AM',
        '05:00 PM - 06:00 PM',
        '06:00 PM - 07:00 PM',
        '07:00 PM - 08:00 PM',
        '08:00 PM - 09:00 PM'
      ]
    };

    turfs.unshift(newTurf);
    dataService.set(dataService.getKeys().TURFS, turfs);
    return newTurf;
  }

  function updateTurfStatus(turfId, newStatus) {
    const turfs = getAllTurfs();
    const turf = turfs.find(t => t.id === turfId);
    if (turf) {
      turf.status = newStatus;
      dataService.set(dataService.getKeys().TURFS, turfs);
      return turf;
    }
    return null;
  }

  function deleteTurf(turfId) {
    let turfs = getAllTurfs();
    turfs = turfs.filter(t => t.id !== turfId);
    dataService.set(dataService.getKeys().TURFS, turfs);
    return true;
  }

  return {
    getAllTurfs,
    getTurfs,
    getTurfById,
    addTurf,
    updateTurfStatus,
    deleteTurf
  };
})();

if (typeof window !== 'undefined') {
  window.venueService = venueService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { venueService };
}
