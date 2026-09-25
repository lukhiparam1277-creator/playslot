import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultSports, defaultTurfs, defaultBookings, defaultUsers, defaultApplications } from '../data/initialData';
import venueService from '../services/venueService';
import bookingService from '../services/bookingService';
import userService from '../services/userService';
import ownerService from '../services/ownerService';
import { isFirebaseConfigured } from '../firebase/config';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  SPORTS: 'playslot_react_sports',
  TURFS: 'playslot_react_turfs',
  BOOKINGS: 'playslot_react_bookings',
  USERS: 'playslot_react_users',
  APPLICATIONS: 'playslot_react_applications',
  SLOTS: 'playslot_react_slots'
};

function getStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(data);
  } catch (e) {
    console.warn('LocalStorage retrieval error:', e);
    return fallback;
  }
}

export const DataProvider = ({ children }) => {
  const [sports, setSports] = useState(() => getStorage(STORAGE_KEYS.SPORTS, defaultSports));
  const [turfs, setTurfs] = useState(() => getStorage(STORAGE_KEYS.TURFS, defaultTurfs));
  const [bookings, setBookings] = useState(() => getStorage(STORAGE_KEYS.BOOKINGS, defaultBookings));
  const [users, setUsers] = useState(() => getStorage(STORAGE_KEYS.USERS, defaultUsers));
  const [applications, setApplications] = useState(() => getStorage(STORAGE_KEYS.APPLICATIONS, defaultApplications));
  const [slotsMap, setSlotsMap] = useState(() => getStorage(STORAGE_KEYS.SLOTS, {}));

  // Hydrate data from Firestore on mount if available
  useEffect(() => {
    let isMounted = true;
    async function hydrateFromFirestore() {
      if (!isFirebaseConfigured()) return;
      try {
        const [remoteSports, remoteTurfs, remoteBookings, remoteUsers, remoteApps] = await Promise.all([
          venueService.getAllSports(),
          venueService.getAllVenues(),
          bookingService.getAllBookings(),
          userService.getAllUsers(),
          ownerService.getAllApplications()
        ]);
        if (!isMounted) return;
        if (remoteSports && remoteSports.length > 0) setSports(remoteSports);
        if (remoteTurfs && remoteTurfs.length > 0) setTurfs(remoteTurfs);
        if (remoteBookings && remoteBookings.length > 0) setBookings(remoteBookings);
        if (remoteUsers && remoteUsers.length > 0) setUsers(remoteUsers);
        if (remoteApps && remoteApps.length > 0) setApplications(remoteApps);
      } catch (err) {
        console.warn('[DataContext] Failed to fetch data from Firestore:', err);
      }
    }
    hydrateFromFirestore();
    return () => { isMounted = false; };
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SPORTS, JSON.stringify(sports));
  }, [sports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TURFS, JSON.stringify(turfs));
  }, [turfs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SLOTS, JSON.stringify(slotsMap));
  }, [slotsMap]);

  // --- Sports CRUD ---
  const addSport = async (sportData) => {
    const newSport = {
      id: sportData.id || ('sport-' + Date.now()),
      name: sportData.name,
      icon: sportData.icon || '🏅',
      image: sportData.image || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
      description: sportData.description || 'Professional ground and equipment rental.',
      startingPrice: parseInt(sportData.startingPrice || sportData.price) || 1000,
      turfsCount: parseInt(sportData.turfsCount || sportData.count) || 0,
      categoryType: sportData.categoryType || 'Both',
      popular: Boolean(sportData.popular || sportData.tag === 'Popular')
    };
    setSports(prev => [newSport, ...prev]);
    try {
      await venueService.createSport(newSport);
    } catch (e) {
      console.warn('[Firestore] Async createSport error:', e);
    }
    return newSport;
  };

  const updateSport = async (id, sportData) => {
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
    try {
      if (updated) await venueService.updateSport(id, updated);
    } catch (e) {
      console.warn('[Firestore] Async updateSport error:', e);
    }
    return updated;
  };

  const deleteSport = async (id) => {
    setSports(prev => prev.filter(s => s.id !== id));
    try {
      await venueService.deleteSport(id);
    } catch (e) {
      console.warn('[Firestore] Async deleteSport error:', e);
    }
  };

  const getSportById = (id) => sports.find(s => s.id === id) || null;

  // --- Turfs CRUD ---
  const addTurf = async (turfData) => {
    const newTurf = {
      id: turfData.id || ('turf-' + Date.now()),
      name: turfData.name,
      sport: turfData.sport || (Array.isArray(turfData.sports) ? turfData.sports[0] : 'Box Cricket'),
      sports: Array.isArray(turfData.sports) ? turfData.sports : [turfData.sport || 'Box Cricket'],
      sportsAvailable: Array.isArray(turfData.sportsAvailable) ? turfData.sportsAvailable : [turfData.sport || 'Box Cricket'],
      city: turfData.city || 'Mumbai',
      location: turfData.location || turfData.area || 'Central Area',
      area: turfData.area || turfData.location || 'Central Area',
      address: turfData.address || `${turfData.area || turfData.location || ''}, ${turfData.city || ''}`,
      distance: turfData.distance || '1.5 km',
      distanceKm: turfData.distanceKm || 1.5,
      pricePerHour: parseInt(turfData.pricePerHour || turfData.price) || 1200,
      price: parseInt(turfData.pricePerHour || turfData.price) || 1200,
      rating: Number(turfData.rating) || 4.9,
      reviewsCount: parseInt(turfData.reviewsCount) || 12,
      turfType: turfData.turfType || 'Outdoor',
      ownerId: turfData.ownerId || 'owner-1',
      ownerName: turfData.ownerName || 'Vikram Malhotra',
      contactPhone: turfData.contactPhone || '+91 98201 23456',
      contactEmail: turfData.contactEmail || 'owner@playslot.com',
      openingTime: turfData.openingTime || '06:00 AM',
      closingTime: turfData.closingTime || '11:00 PM',
      status: turfData.status || 'Approved',
      featured: Boolean(turfData.featured),
      availableToday: true,
      description: turfData.description || 'Verified multi-sports turf arena on PlaySlot.',
      rules: turfData.rules || ['Rubber studs or sports shoes required.', 'Report 10 mins prior.'],
      facilities: turfData.facilities || turfData.amenities || ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water'],
      amenities: turfData.facilities || turfData.amenities || ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water'],
      images: turfData.images && turfData.images.length > 0 ? turfData.images : [turfData.image || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'],
      image: turfData.image || (turfData.images ? turfData.images[0] : 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'),
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
    try {
      await venueService.createVenue(newTurf);
    } catch (e) {
      console.warn('[Firestore] Async createVenue error:', e);
    }
    return newTurf;
  };

  const updateTurf = async (id, turfData) => {
    let updated = null;
    setTurfs(prev => prev.map(t => {
      if (t.id === id) {
        const priceVal = turfData.pricePerHour !== undefined ? parseInt(turfData.pricePerHour) : (turfData.price !== undefined ? parseInt(turfData.price) : t.pricePerHour);
        updated = {
          ...t,
          ...turfData,
          pricePerHour: priceVal,
          price: priceVal,
          id: t.id
        };
        return updated;
      }
      return t;
    }));
    try {
      if (updated) await venueService.updateVenue(id, updated);
    } catch (e) {
      console.warn('[Firestore] Async updateVenue error:', e);
    }
    return updated;
  };

  const updateTurfStatus = async (id, status) => {
    setTurfs(prev => prev.map(t => (t.id === id ? { ...t, status } : t)));
    try {
      await venueService.updateVenue(id, { status });
    } catch (e) {
      console.warn('[Firestore] Async updateTurfStatus error:', e);
    }
  };

  const deleteTurf = async (id) => {
    setTurfs(prev => prev.filter(t => t.id !== id));
    try {
      await venueService.deleteVenue(id);
    } catch (e) {
      console.warn('[Firestore] Async deleteVenue error:', e);
    }
  };

  const getTurfById = (id) => turfs.find(t => t.id === id) || turfs[0] || null;

  // --- Slots CRUD ---
  const getSlotsForTurfAndDate = (turfId, dateStr) => {
    const key = `${turfId}_${dateStr}`;
    if (slotsMap[key]) return slotsMap[key];

    const turf = getTurfById(turfId);
    const timings = turf && turf.slotTimings ? turf.slotTimings : ['06:00 AM - 07:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'];
    const generated = timings.map((timing, idx) => ({
      id: `slot-${idx}`,
      time: timing,
      price: turf ? (turf.pricePerHour || turf.price) : 1200,
      status: idx === 1 ? 'Booked' : 'Available'
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
      status: slotData.status || 'Available'
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

  const deleteSlot = (turfId, dateStr, slotIdentifier) => {
    const key = `${turfId}_${dateStr}`;
    const currentSlots = slotsMap[key] || getSlotsForTurfAndDate(turfId, dateStr);
    const updated = currentSlots.filter(s => s.time !== slotIdentifier && s.id !== slotIdentifier);
    setSlotsMap(prev => ({ ...prev, [key]: updated }));
  };

  // --- Bookings CRUD ---
  const createBooking = async (bookingData) => {
    const newBookingId = 'PS-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: newBookingId,
      bookingId: newBookingId,
      userId: bookingData.userId || 'user-1',
      userName: bookingData.userName || 'Rahul Sharma',
      userEmail: bookingData.userEmail || 'user@playslot.com',
      userPhone: bookingData.userPhone || '+91 98765 43210',
      turfId: bookingData.turfId,
      turfName: bookingData.turfName,
      turfImage: bookingData.turfImage,
      sport: bookingData.sport,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot || bookingData.slot,
      slot: bookingData.timeSlot || bookingData.slot,
      durationHours: 1,
      playersCount: parseInt(bookingData.playersCount) || 6,
      basePrice: parseFloat(bookingData.basePrice || bookingData.amount) || 1200,
      convenienceFee: 49,
      gstAmount: Math.round((bookingData.basePrice || bookingData.amount || 1200) * 0.18),
      totalAmount: parseFloat(bookingData.totalAmount || bookingData.amount) || 1465,
      amount: parseFloat(bookingData.totalAmount || bookingData.amount) || 1465,
      status: bookingData.status || 'Confirmed',
      paymentMethod: bookingData.paymentMethod || 'UPI Paid',
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    if (bookingData.turfId && bookingData.date && (bookingData.timeSlot || bookingData.slot)) {
      updateSlotState(bookingData.turfId, bookingData.date, bookingData.timeSlot || bookingData.slot, 'Booked');
    }
    try {
      await bookingService.createBooking(newBooking);
    } catch (e) {
      console.warn('[Firestore] Async createBooking error:', e);
    }
    return newBooking;
  };

  const updateBooking = async (id, bookingData) => {
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
    try {
      if (updated) await bookingService.updateBooking(id, updated);
    } catch (e) {
      console.warn('[Firestore] Async updateBooking error:', e);
    }
    return updated;
  };

  const updateBookingStatus = async (id, status) => {
    return await updateBooking(id, { status });
  };

  const cancelBooking = async (bookingId) => {
    setBookings(prev => prev.map(b => (b.id === bookingId || b.bookingId === bookingId ? { ...b, status: 'Cancelled' } : b)));
    try {
      await bookingService.cancelBooking(bookingId);
    } catch (e) {
      console.warn('[Firestore] Async cancelBooking error:', e);
    }
  };

  const deleteBooking = async (id) => {
    setBookings(prev => prev.filter(b => b.id !== id && b.bookingId !== id));
    try {
      await bookingService.deleteBooking(id);
    } catch (e) {
      console.warn('[Firestore] Async deleteBooking error:', e);
    }
  };

  const getBookingById = (id) => bookings.find(b => b.id === id || b.bookingId === id) || null;

  // --- Users CRUD ---
  const addUser = async (userData) => {
    const newUser = {
      id: 'user-' + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+91 98765 00000',
      city: userData.city || 'Mumbai',
      totalBookings: parseInt(userData.totalBookings) || 0,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      status: userData.status || 'Active',
      role: userData.role || 'user',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };
    setUsers(prev => [newUser, ...prev]);
    try {
      await userService.createUser(newUser);
    } catch (e) {
      console.warn('[Firestore] Async createUser error:', e);
    }
    return newUser;
  };

  const updateUser = async (id, userData) => {
    let updated = null;
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        updated = { ...u, ...userData, id: u.id };
        return updated;
      }
      return u;
    }));
    try {
      if (updated) await userService.updateUser(id, updated);
    } catch (e) {
      console.warn('[Firestore] Async updateUser error:', e);
    }
    return updated;
  };

  const updateUserStatus = (id, status) => {
    updateUser(id, { status });
  };

  const deleteUser = async (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    try {
      await userService.deleteUser(id);
    } catch (e) {
      console.warn('[Firestore] Async deleteUser error:', e);
    }
  };

  const getUserById = (id) => users.find(u => u.id === id) || null;

  // --- Partner Applications ---
  const submitApplication = async (appData) => {
    const newAppId = 'PS-OWNER-' + Math.floor(10000 + Math.random() * 90000);
    const newApp = {
      applicationId: newAppId,
      id: 'app-' + Date.now(),
      ownerName: appData.ownerName,
      email: appData.email,
      phone: appData.phone,
      turfName: appData.turfName,
      turfAddress: appData.turfAddress,
      city: appData.city,
      area: appData.area,
      turfType: appData.turfType,
      sports: appData.sports || ['Cricket', 'Football'],
      pricePerHour: parseInt(appData.pricePerHour) || 1200,
      price: parseInt(appData.pricePerHour) || 1200,
      openingTime: appData.openingTime || '06:00 AM',
      closingTime: appData.closingTime || '11:00 PM',
      facilities: appData.facilities || ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water'],
      description: appData.description || 'Modern sports arena application.',
      images: appData.images && appData.images.length > 0 ? appData.images : ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'],
      status: 'Pending',
      submittedDate: new Date().toISOString().split('T')[0],
      rejectionReason: ''
    };
    setApplications(prev => [newApp, ...prev]);
    try {
      await ownerService.submitApplication(newApp);
    } catch (e) {
      console.warn('[Firestore] Async submitApplication error:', e);
    }
    return newApp;
  };

  const approveApplication = async (appId) => {
    const app = applications.find(a => a.applicationId === appId || a.id === appId);
    if (app) {
      setApplications(prev => prev.map(a => (a.applicationId === appId || a.id === appId ? { ...a, status: 'Approved' } : a)));
      await addTurf({
        name: app.turfName,
        sport: app.sports[0] || 'Box Cricket',
        sportsAvailable: app.sports,
        sports: app.sports,
        city: app.city,
        location: app.area,
        area: app.area,
        address: app.turfAddress,
        turfType: app.turfType,
        pricePerHour: app.pricePerHour,
        price: app.pricePerHour,
        openingTime: app.openingTime,
        closingTime: app.closingTime,
        facilities: app.facilities,
        amenities: app.facilities,
        images: app.images,
        description: app.description,
        ownerName: app.ownerName,
        contactEmail: app.email,
        contactPhone: app.phone,
        status: 'Approved'
      });
      try {
        await ownerService.updateApplicationStatus(app.id, 'Approved');
      } catch (e) {
        console.warn('[Firestore] Async approveApplication error:', e);
      }
      return app;
    }
    return null;
  };

  const rejectApplication = async (appId, reason) => {
    setApplications(prev => prev.map(a => (a.applicationId === appId || a.id === appId ? { ...a, status: 'Rejected', rejectionReason: reason } : a)));
    const app = applications.find(a => a.applicationId === appId || a.id === appId);
    if (app) {
      try {
        await ownerService.updateApplicationStatus(app.id, 'Rejected', reason);
      } catch (e) {
        console.warn('[Firestore] Async rejectApplication error:', e);
      }
    }
  };

  const getApplicationById = (appId) => applications.find(a => a.applicationId?.toLowerCase() === (appId || '').toLowerCase() || a.id === appId);
  const getApplicationByEmail = (email) => applications.find(a => a.email?.toLowerCase() === (email || '').toLowerCase());

  // --- Stats Aggregators ---
  const getAdminStats = () => {
    const pendingApps = applications.filter(a => a.status === 'Pending').length;
    const totalRev = bookings.reduce((sum, b) => b.status !== 'Cancelled' ? sum + (Number(b.totalAmount || b.amount) || 0) : sum, 0);
    return {
      totalUsers: users.length + 1280,
      totalOwners: 34,
      totalTurfs: turfs.length,
      totalBookings: bookings.length + 3420,
      todayBookingsCount: 14,
      pendingApprovals: pendingApps,
      totalRevenue: totalRev || 4826000
    };
  };

  const getOwnerStats = (ownerId = 'owner-1') => {
    const myTurfs = turfs.filter(t => t.ownerId === ownerId || t.ownerId === 'owner-1');
    const myBookings = bookings.filter(b => myTurfs.some(t => t.id === b.turfId) || b.turfId === 'turf-1');
    const rev = myBookings.reduce((sum, b) => b.status !== 'Cancelled' ? sum + (Number(b.totalAmount || b.amount) || 0) : sum, 0);

    return {
      totalTurfs: myTurfs.length || 3,
      totalBookings: myBookings.length || 142,
      todayBookings: 6,
      upcomingBookings: 18,
      monthlyEarnings: rev || 184500,
      monthlyRevenue: rev || 184500,
      averageRating: 4.8,
      availableSlots: 24
    };
  };

  return (
    <DataContext.Provider
      value={{
        sports,
        turfs,
        bookings,
        users,
        applications,
        addSport,
        updateSport,
        deleteSport,
        getSportById,
        addTurf,
        updateTurf,
        updateTurfStatus,
        deleteTurf,
        getTurfById,
        getSlotsForTurfAndDate,
        addCustomSlot,
        updateSlot,
        updateSlotState,
        deleteSlot,
        createBooking,
        updateBooking,
        updateBookingStatus,
        cancelBooking,
        deleteBooking,
        getBookingById,
        addUser,
        updateUser,
        updateUserStatus,
        deleteUser,
        getUserById,
        submitApplication,
        approveApplication,
        rejectApplication,
        getApplicationById,
        getApplicationByEmail,
        getAdminStats,
        getOwnerStats
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
