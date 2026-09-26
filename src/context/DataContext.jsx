import React, { createContext, useContext, useState, useEffect } from 'react';
import storageService, { STORAGE_KEYS } from '../services/storageService';
import {
  defaultSports,
  defaultOwners,
  defaultTurfs,
  defaultUsers,
  defaultBookings
} from '../data/initialData';
import {
  getApprovedOwnerCount,
  getPendingOwnerCount,
  getApprovedTurfCount,
  getPendingTurfCount,
  getTotalBookings,
  getTodaysBookings,
  getTodaysSlotCount,
  getTotalRevenue,
  getFinancialStats,
  getOwnerStats as calculateOwnerStats
} from '../utils/statistics';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [sports, setSports] = useState(() => storageService.get(STORAGE_KEYS.SPORTS, defaultSports));
  const [owners, setOwners] = useState(() => storageService.get(STORAGE_KEYS.OWNERS, defaultOwners));
  const [turfs, setTurfs] = useState(() => storageService.get(STORAGE_KEYS.TURFS, defaultTurfs));
  const [bookings, setBookings] = useState(() => storageService.get(STORAGE_KEYS.BOOKINGS, defaultBookings));
  const [users, setUsers] = useState(() => storageService.get(STORAGE_KEYS.USERS, defaultUsers));
  const [slotsMap, setSlotsMap] = useState(() => storageService.get(STORAGE_KEYS.SLOTS, {}));

  // Sync state changes to storage
  useEffect(() => {
    storageService.set(STORAGE_KEYS.SPORTS, sports);
  }, [sports]);

  useEffect(() => {
    storageService.set(STORAGE_KEYS.OWNERS, owners);
  }, [owners]);

  useEffect(() => {
    storageService.set(STORAGE_KEYS.TURFS, turfs);
  }, [turfs]);

  useEffect(() => {
    storageService.set(STORAGE_KEYS.BOOKINGS, bookings);
  }, [bookings]);

  useEffect(() => {
    storageService.set(STORAGE_KEYS.USERS, users);
  }, [users]);

  useEffect(() => {
    storageService.set(STORAGE_KEYS.SLOTS, slotsMap);
  }, [slotsMap]);

  // ==========================================
  // 1. OWNER MANAGEMENT
  // ==========================================
  const registerOwner = (ownerData) => {
    const newOwnerId = 'owner-' + Date.now();
    const newOwner = {
      id: newOwnerId,
      name: ownerData.name || ownerData.ownerName,
      businessName: ownerData.businessName || `${ownerData.name || 'Owner'}'s Arena`,
      email: ownerData.email,
      phone: ownerData.phone,
      password: ownerData.password || 'password123',
      city: ownerData.city || 'Mumbai',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      registeredDate: new Date().toISOString().split('T')[0],
      turfsCount: 0,
      ...ownerData,
      status: 'PENDING'
    };

    setOwners(prev => [newOwner, ...prev]);
    return newOwner;
  };

  const updateOwnerStatus = (ownerId, status, notes = '') => {
    let updatedOwner = null;
    setOwners(prev => prev.map(o => {
      if (o.id === ownerId || o.email?.toLowerCase() === ownerId?.toLowerCase()) {
        updatedOwner = { ...o, status, notes, updatedAt: new Date().toISOString() };
        return updatedOwner;
      }
      return o;
    }));
    return updatedOwner;
  };

  const updateOwner = (ownerId, updates) => {
    let updatedOwner = null;
    setOwners(prev => prev.map(o => {
      if (o.id === ownerId) {
        updatedOwner = { ...o, ...updates };
        return updatedOwner;
      }
      return o;
    }));
    return updatedOwner;
  };

  const deleteOwner = (ownerId) => {
    setOwners(prev => prev.filter(o => o.id !== ownerId));
  };

  const getOwnerById = (id) => {
    return owners.find(o => o.id === id || o.email?.toLowerCase() === id?.toLowerCase()) || null;
  };

  // ==========================================
  // 2. TURF MANAGEMENT
  // ==========================================
  const addTurf = (turfData) => {
    const newTurfId = 'turf-' + Date.now();
    const priceVal = parseInt(turfData.pricePerHour || turfData.price) || 1200;

    const newTurf = {
      id: newTurfId,
      ownerId: turfData.ownerId || 'owner-1',
      ownerName: turfData.ownerName || 'Verified Turf Owner',
      name: turfData.name,
      sport: turfData.sport || (Array.isArray(turfData.sports) ? turfData.sports[0] : 'Box Cricket'),
      sports: Array.isArray(turfData.sports) ? turfData.sports : [turfData.sport || 'Box Cricket'],
      sportsAvailable: Array.isArray(turfData.sportsAvailable) ? turfData.sportsAvailable : (Array.isArray(turfData.sports) ? turfData.sports : [turfData.sport || 'Box Cricket']),
      city: turfData.city || 'Mumbai',
      location: turfData.location || turfData.area || 'Central Area',
      address: turfData.address || `${turfData.location || turfData.area || ''}, ${turfData.city || ''}`,
      distance: turfData.distance || '1.8 km',
      pricePerHour: priceVal,
      price: priceVal,
      rating: Number(turfData.rating) || 5.0,
      reviewsCount: parseInt(turfData.reviewsCount) || 1,
      turfType: turfData.turfType || 'Outdoor',
      contactPhone: turfData.contactPhone || '+91 98201 23456',
      contactEmail: turfData.contactEmail || 'owner@playslot.com',
      openingTime: turfData.openingTime || '06:00 AM',
      closingTime: turfData.closingTime || '11:00 PM',
      status: turfData.status || 'PENDING', // Default status for owner-created turf is PENDING until admin approves
      featured: Boolean(turfData.featured),
      availableToday: true,
      description: turfData.description || 'Premium sports arena facility with high quality turf.',
      rules: turfData.rules || [
        'Non-marking sports shoes or rubber studs only.',
        'Please report 10 minutes prior to your booked slot.'
      ],
      facilities: turfData.facilities || ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water'],
      images: turfData.images && turfData.images.length > 0 ? turfData.images : [turfData.image || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'],
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

    setTurfs(prev => [newTurf, ...prev]);

    // Update owner's turfsCount
    setOwners(prev => prev.map(o => {
      if (o.id === newTurf.ownerId) {
        return { ...o, turfsCount: (o.turfsCount || 0) + 1 };
      }
      return o;
    }));

    return newTurf;
  };

  const updateTurf = (id, turfData) => {
    let updatedTurf = null;
    setTurfs(prev => prev.map(t => {
      if (t.id === id) {
        const priceVal = turfData.pricePerHour !== undefined ? parseInt(turfData.pricePerHour) : (turfData.price !== undefined ? parseInt(turfData.price) : t.pricePerHour);
        updatedTurf = {
          ...t,
          ...turfData,
          pricePerHour: priceVal,
          price: priceVal,
          id: t.id
        };
        return updatedTurf;
      }
      return t;
    }));
    return updatedTurf;
  };

  const updateTurfStatus = (id, status) => {
    return updateTurf(id, { status });
  };

  const deleteTurf = (id) => {
    const turf = turfs.find(t => t.id === id);
    setTurfs(prev => prev.filter(t => t.id !== id));
    if (turf && turf.ownerId) {
      setOwners(prev => prev.map(o => {
        if (o.id === turf.ownerId) {
          return { ...o, turfsCount: Math.max(0, (o.turfsCount || 1) - 1) };
        }
        return o;
      }));
    }
  };

  const getTurfById = (id) => {
    return turfs.find(t => t.id === id) || null;
  };

  // ==========================================
  // 3. SLOTS MANAGEMENT
  // ==========================================
  const getSlotsForTurfAndDate = (turfId, dateStr) => {
    const key = `${turfId}_${dateStr}`;
    if (slotsMap[key]) return slotsMap[key];

    const turf = getTurfById(turfId);
    const timings = turf && turf.slotTimings && turf.slotTimings.length > 0
      ? turf.slotTimings
      : ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '08:00 AM - 09:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM', '08:00 PM - 09:00 PM'];

    // Check existing confirmed bookings for this turf & date
    const bookedSlotTimes = bookings
      .filter(b => b.turfId === turfId && b.date === dateStr && b.status !== 'Cancelled')
      .map(b => b.timeSlot || b.slot);

    const generated = timings.map((timing, idx) => ({
      id: `slot-${idx}`,
      time: timing,
      price: turf ? (turf.pricePerHour || turf.price || 1200) : 1200,
      status: bookedSlotTimes.includes(timing) ? 'BOOKED' : 'AVAILABLE'
    }));

    setSlotsMap(prev => ({ ...prev, [key]: generated }));
    return generated;
  };

  const addCustomSlot = (turfId, dateStr, slotData) => {
    const key = `${turfId}_${dateStr}`;
    const currentSlots = slotsMap[key] || getSlotsForTurfAndDate(turfId, dateStr);
    const newSlot = {
      id: 'slot-' + Date.now(),
      time: slotData.time,
      price: parseInt(slotData.price) || 1200,
      status: slotData.status || 'AVAILABLE'
    };
    const updated = [...currentSlots, newSlot];
    setSlotsMap(prev => ({ ...prev, [key]: updated }));
    return newSlot;
  };

  const updateSlot = (turfId, dateStr, slotTime, slotData) => {
    const key = `${turfId}_${dateStr}`;
    const currentSlots = slotsMap[key] || getSlotsForTurfAndDate(turfId, dateStr);
    const updated = currentSlots.map(s => {
      if (s.time === slotTime || s.id === slotTime) {
        return {
          ...s,
          time: slotData.time || s.time,
          price: slotData.price !== undefined ? parseInt(slotData.price) : s.price,
          status: slotData.status || s.status
        };
      }
      return s;
    });
    setSlotsMap(prev => ({ ...prev, [key]: updated }));
  };

  const updateSlotState = (turfId, dateStr, slotTime, newStatus) => {
    const key = `${turfId}_${dateStr}`;
    const currentSlots = slotsMap[key] || getSlotsForTurfAndDate(turfId, dateStr);
    const updated = currentSlots.map(s => (s.time === slotTime || s.id === slotTime ? { ...s, status: newStatus } : s));
    setSlotsMap(prev => ({ ...prev, [key]: updated }));
  };

  const blockSlot = (turfId, dateStr, slotTime) => {
    updateSlotState(turfId, dateStr, slotTime, 'BLOCKED');
  };

  const unblockSlot = (turfId, dateStr, slotTime) => {
    updateSlotState(turfId, dateStr, slotTime, 'AVAILABLE');
  };

  const deleteSlot = (turfId, dateStr, slotIdentifier) => {
    const key = `${turfId}_${dateStr}`;
    const currentSlots = slotsMap[key] || getSlotsForTurfAndDate(turfId, dateStr);
    const updated = currentSlots.filter(s => s.time !== slotIdentifier && s.id !== slotIdentifier);
    setSlotsMap(prev => ({ ...prev, [key]: updated }));
  };

  // ==========================================
  // 4. BOOKINGS MANAGEMENT (Single Source of Truth)
  // ==========================================
  const createBooking = (bookingData) => {
    const slotTime = bookingData.timeSlot || bookingData.slot;

    // Double-Booking Check
    const alreadyBooked = bookings.some(b => 
      b.turfId === bookingData.turfId &&
      b.date === bookingData.date &&
      (b.timeSlot === slotTime || b.slot === slotTime) &&
      b.status !== 'Cancelled' &&
      b.status !== 'rejected'
    );

    if (alreadyBooked) {
      throw new Error('This slot has already been booked.');
    }

    // Resolve ownerId if missing
    let ownerId = bookingData.ownerId;
    if (!ownerId && bookingData.turfId) {
      const turf = turfs.find(t => t.id === bookingData.turfId);
      if (turf) ownerId = turf.ownerId;
    }

    const newBookingId = 'PS-' + Math.floor(100000 + Math.random() * 900000);
    const baseAmt = parseFloat(bookingData.basePrice || bookingData.amount || 1200);
    const fee = bookingData.convenienceFee !== undefined ? parseFloat(bookingData.convenienceFee) : 49;
    const gst = bookingData.gstAmount !== undefined ? parseFloat(bookingData.gstAmount) : Math.round(baseAmt * 0.18);
    const totalAmt = parseFloat(bookingData.totalAmount || bookingData.amount || (baseAmt + fee + gst));

    const newBooking = {
      id: newBookingId,
      bookingId: newBookingId,
      userId: bookingData.userId || 'user-1',
      userName: bookingData.userName || 'Rahul Sharma',
      userEmail: bookingData.userEmail || 'user@playslot.com',
      userPhone: bookingData.userPhone || '+91 98765 43210',
      ownerId: ownerId || 'owner-1',
      turfId: bookingData.turfId,
      turfName: bookingData.turfName || 'Sports Arena',
      turfImage: bookingData.turfImage || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
      sport: bookingData.sport || 'Box Cricket',
      date: bookingData.date,
      timeSlot: slotTime,
      slot: slotTime,
      startTime: bookingData.startTime || (slotTime ? slotTime.split(' - ')[0] : '06:00 PM'),
      endTime: bookingData.endTime || (slotTime ? slotTime.split(' - ')[1] : '07:00 PM'),
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

    setBookings(prev => [newBooking, ...prev]);

    // Update slot status in slots map
    if (bookingData.turfId && bookingData.date && slotTime) {
      updateSlotState(bookingData.turfId, bookingData.date, slotTime, 'BOOKED');
    }

    // Increment user booking counter
    setUsers(prev => prev.map(u => {
      if (u.id === newBooking.userId) {
        return { ...u, totalBookings: (u.totalBookings || 0) + 1 };
      }
      return u;
    }));

    return newBooking;
  };

  const updateBooking = (id, bookingData) => {
    let updated = null;
    setBookings(prev => prev.map(b => {
      if (b.id === id || b.bookingId === id) {
        updated = {
          ...b,
          ...bookingData,
          totalAmount: bookingData.totalAmount !== undefined ? parseFloat(bookingData.totalAmount) : (bookingData.amount !== undefined ? parseFloat(bookingData.amount) : b.totalAmount),
          amount: bookingData.totalAmount !== undefined ? parseFloat(bookingData.totalAmount) : (bookingData.amount !== undefined ? parseFloat(bookingData.amount) : b.amount)
        };
        return updated;
      }
      return b;
    }));
    return updated;
  };

  const updateBookingStatus = (id, status) => {
    return updateBooking(id, { status });
  };

  const cancelBooking = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId || b.bookingId === bookingId);
    setBookings(prev => prev.map(b => (b.id === bookingId || b.bookingId === bookingId ? { ...b, status: 'Cancelled' } : b)));
    if (booking && booking.turfId && booking.date && (booking.timeSlot || booking.slot)) {
      updateSlotState(booking.turfId, booking.date, booking.timeSlot || booking.slot, 'AVAILABLE');
    }
  };

  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id && b.bookingId !== id));
  };

  const getBookingById = (id) => {
    return bookings.find(b => b.id === id || b.bookingId === id) || null;
  };

  // ==========================================
  // 5. USER / ATHLETE MANAGEMENT
  // ==========================================
  const addUser = (userData) => {
    const newUser = {
      id: userData.id || ('user-' + Date.now()),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+91 98765 00000',
      city: userData.city || 'Mumbai',
      totalBookings: parseInt(userData.totalBookings) || 0,
      joinedDate: userData.joinedDate || new Date().toISOString().split('T')[0],
      status: userData.status || 'Active',
      role: userData.role || 'user',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };
    setUsers(prev => [newUser, ...prev]);
    return newUser;
  };

  const updateUser = (id, userData) => {
    let updated = null;
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        updated = { ...u, ...userData, id: u.id };
        return updated;
      }
      return u;
    }));
    return updated;
  };

  const updateUserStatus = (id, status) => {
    return updateUser(id, { status });
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const getUserById = (id) => {
    return users.find(u => u.id === id || u.email === id) || null;
  };

  // ==========================================
  // 6. SPORTS MANAGEMENT
  // ==========================================
  const addSport = (sportData) => {
    const newSport = {
      id: sportData.id || ('sport-' + Date.now()),
      name: sportData.name,
      icon: sportData.icon || '🏅',
      image: sportData.image || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
      description: sportData.description || 'Ground and professional equipment rental.',
      startingPrice: parseInt(sportData.startingPrice || sportData.price) || 1000,
      categoryType: sportData.categoryType || 'Both',
      popular: Boolean(sportData.popular),
      status: sportData.status || 'ACTIVE'
    };
    setSports(prev => [newSport, ...prev]);
    return newSport;
  };

  const updateSport = (id, sportData) => {
    let updated = null;
    setSports(prev => prev.map(s => {
      if (s.id === id) {
        updated = {
          ...s,
          ...sportData,
          startingPrice: parseInt(sportData.startingPrice || sportData.price) || s.startingPrice,
          id: s.id
        };
        return updated;
      }
      return s;
    }));
    return updated;
  };

  const toggleSportStatus = (id) => {
    setSports(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : s));
  };

  const deleteSport = (id) => {
    setSports(prev => prev.filter(s => s.id !== id));
  };

  const getSportById = (id) => sports.find(s => s.id === id) || null;

  // ==========================================
  // 7. DYNAMIC STATS (Zero Static Numbers)
  // ==========================================
  const getAdminStats = () => {
    const approvedOwnersCount = getApprovedOwnerCount(owners);
    const pendingOwnersCount = getPendingOwnerCount(owners);
    const approvedTurfsCount = getApprovedTurfCount(turfs);
    const pendingTurfsCount = getPendingTurfCount(turfs);
    const totalBookingsCount = getTotalBookings(bookings);
    const todaySlotCount = getTodaysSlotCount(bookings);
    const totalRevenueVal = getTotalRevenue(bookings);
    const financials = getFinancialStats(bookings);

    return {
      totalUsers: users.length,
      totalOwners: approvedOwnersCount,
      approvedOwners: approvedOwnersCount,
      pendingOwners: pendingOwnersCount,
      approvedTurfs: approvedTurfsCount,
      pendingTurfs: pendingTurfsCount,
      totalTurfs: turfs.length,
      totalBookings: totalBookingsCount,
      todayBookingsCount: todaySlotCount,
      totalRevenue: totalRevenueVal,
      financials
    };
  };

  const getOwnerStats = (ownerId = 'owner-1') => {
    return calculateOwnerStats(ownerId, turfs, bookings);
  };

  // Reset helper for fresh tests
  const resetToDefaults = () => {
    setSports(defaultSports);
    setOwners(defaultOwners);
    setTurfs(defaultTurfs);
    setBookings(defaultBookings);
    setUsers(defaultUsers);
    setSlotsMap({});
    storageService.set(STORAGE_KEYS.SPORTS, defaultSports);
    storageService.set(STORAGE_KEYS.OWNERS, defaultOwners);
    storageService.set(STORAGE_KEYS.TURFS, defaultTurfs);
    storageService.set(STORAGE_KEYS.BOOKINGS, defaultBookings);
    storageService.set(STORAGE_KEYS.USERS, defaultUsers);
    storageService.set(STORAGE_KEYS.SLOTS, {});
  };

  return (
    <DataContext.Provider
      value={{
        // State
        sports,
        owners,
        turfs,
        bookings,
        users,
        slotsMap,

        // Owner methods
        registerOwner,
        updateOwnerStatus,
        updateOwner,
        deleteOwner,
        getOwnerById,

        // Turf methods
        addTurf,
        updateTurf,
        updateTurfStatus,
        deleteTurf,
        getTurfById,

        // Slot methods
        getSlotsForTurfAndDate,
        addCustomSlot,
        updateSlot,
        updateSlotState,
        blockSlot,
        unblockSlot,
        deleteSlot,

        // Booking methods
        createBooking,
        updateBooking,
        updateBookingStatus,
        cancelBooking,
        deleteBooking,
        getBookingById,

        // User methods
        addUser,
        updateUser,
        updateUserStatus,
        deleteUser,
        getUserById,

        // Sports methods
        addSport,
        updateSport,
        toggleSportStatus,
        deleteSport,
        getSportById,

        // Dynamic Aggregators
        getAdminStats,
        getOwnerStats,
        resetToDefaults
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
