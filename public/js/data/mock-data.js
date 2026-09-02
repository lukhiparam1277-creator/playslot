/**
 * PlaySlot Centralized Mock Data & Client-Side API Layer (Production-Ready)
 * 
 * Single source of truth backed by localStorage and modular service architecture.
 * Eliminates all static/dummy numbers and provides 100% dynamic platform state.
 */

// ==========================================
// 1. DEFAULT SEED DATASETS
// ==========================================

const defaultUsers = [
  {
    id: 'user-1',
    name: 'Rahul Sharma',
    email: 'user@playslot.com',
    phone: '+91 98765 43210',
    role: 'user',
    city: 'Mumbai',
    status: 'Active',
    joinedDate: '2026-01-12',
    totalBookings: 1,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-2',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    phone: '+91 98765 00001',
    role: 'user',
    city: 'Mumbai',
    status: 'Active',
    joinedDate: '2026-02-15',
    totalBookings: 0,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-3',
    name: 'Priya Patel',
    email: 'priya@example.com',
    phone: '+91 98765 00002',
    role: 'user',
    city: 'Bengaluru',
    status: 'Active',
    joinedDate: '2026-03-01',
    totalBookings: 0,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-4',
    name: 'David Chen',
    email: 'david@example.com',
    phone: '+91 98765 00003',
    role: 'user',
    city: 'Delhi',
    status: 'Active',
    joinedDate: '2026-04-10',
    totalBookings: 0,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
];

const defaultOwners = [
  {
    id: 'owner-1',
    applicationId: 'PS-OWNER-10001',
    ownerName: 'Vikram Malhotra',
    name: 'Vikram Malhotra',
    email: 'owner@playslot.com',
    phone: '+91 98201 23456',
    businessName: 'Thunderbolts Sports Hub',
    turfName: 'Thunderbolts Arena & Box Turf',
    city: 'Mumbai',
    area: 'Andheri West',
    status: 'Approved',
    role: 'turf_owner',
    appliedDate: '2026-08-01',
    submittedDate: '2026-08-01',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rejectionReason: ''
  },
  {
    id: 'owner-2',
    applicationId: 'PS-OWNER-10002',
    ownerName: 'Ananya Deshmukh',
    name: 'Ananya Deshmukh',
    email: 'ananya@playslot.com',
    phone: '+91 97411 44556',
    businessName: 'Casa Sports Enterprises',
    turfName: 'Casa Arena Badminton Academy',
    city: 'Bengaluru',
    area: 'Koramangala',
    status: 'Approved',
    role: 'turf_owner',
    appliedDate: '2026-08-05',
    submittedDate: '2026-08-05',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rejectionReason: ''
  },
  {
    id: 'owner-3',
    applicationId: 'PS-OWNER-10003',
    ownerName: 'Rajesh Kumar',
    name: 'Rajesh Kumar',
    email: 'rajesh@playslot.com',
    phone: '+91 98110 33221',
    businessName: 'Metro Arena Properties',
    turfName: 'Metro Champions Cricket Turf',
    city: 'Delhi',
    area: 'Dwarka Sector 12',
    status: 'Approved',
    role: 'turf_owner',
    appliedDate: '2026-08-10',
    submittedDate: '2026-08-10',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rejectionReason: ''
  },
  {
    id: 'owner-4',
    applicationId: 'PS-OWNER-10004',
    ownerName: 'Neha Sharma',
    name: 'Neha Sharma',
    email: 'neha@playslot.com',
    phone: '+91 98990 12345',
    businessName: 'Smash Point Sports Hub',
    turfName: 'Smash Point Multi-Sport Turf',
    city: 'Bengaluru',
    area: 'Indiranagar',
    status: 'Approved',
    role: 'turf_owner',
    appliedDate: '2026-08-15',
    submittedDate: '2026-08-15',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rejectionReason: ''
  }
];

const defaultTurfs = [
  {
    id: 'turf-1',
    name: 'Thunderbolts Arena & Box Turf',
    sport: 'Box Cricket',
    sportsAvailable: ['Box Cricket', 'Football', 'Cricket'],
    city: 'Mumbai',
    location: 'Andheri West',
    address: 'Link Road, Near Infinity Mall, Andheri West, Mumbai 400053',
    distance: '1.2 km',
    distanceKm: 1.2,
    pricePerHour: 1400,
    rating: 4.9,
    reviewsCount: 128,
    turfType: 'Outdoor',
    ownerId: 'owner-1',
    ownerName: 'Vikram Malhotra',
    contactPhone: '+91 98201 23456',
    contactEmail: 'owner@playslot.com',
    openingTime: '06:00 AM',
    closingTime: '12:00 AM',
    status: 'Approved',
    featured: true,
    availableToday: true,
    description: 'State-of-the-art all-weather enclosed box cricket turf featuring 40mm imported monofilament turf, stadium-grade LED glare-free lights, live streaming camera setup, and dedicated dugouts for both teams.',
    rules: [
      'Non-marking sports shoes or rubber studs only. Metal studs strictly prohibited.',
      'Please report 10 minutes prior to your booked slot timing.',
      'Smoking, alcohol, and chewing gum are strictly prohibited on the turf surface.',
      'Booking cancellation is permitted up to 4 hours prior to slot time.'
    ],
    facilities: ['Parking', 'Washroom', 'Changing Room', 'Drinking Water', 'Flood Lights', 'Seating', 'Equipment Rental'],
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'
    ],
    slotTimings: [
      '06:00 AM - 07:00 AM',
      '07:00 AM - 08:00 AM',
      '08:00 AM - 09:00 AM',
      '05:00 PM - 06:00 PM',
      '06:00 PM - 07:00 PM',
      '07:00 PM - 08:00 PM',
      '08:00 PM - 09:00 PM',
      '09:00 PM - 10:00 PM',
      '10:00 PM - 11:00 PM'
    ]
  },
  {
    id: 'turf-2',
    name: 'Skyline FIFA Football Ground',
    sport: 'Football',
    sportsAvailable: ['Football', 'Box Cricket'],
    city: 'Bengaluru',
    location: 'Indiranagar',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    distance: '2.1 km',
    distanceKm: 2.1,
    pricePerHour: 1800,
    rating: 4.9,
    reviewsCount: 94,
    turfType: 'Outdoor',
    ownerId: 'owner-4',
    ownerName: 'Neha Sharma',
    contactPhone: '+91 98990 12345',
    contactEmail: 'neha@playslot.com',
    openingTime: '05:30 AM',
    closingTime: '11:30 PM',
    status: 'Approved',
    featured: true,
    availableToday: true,
    description: 'FIFA Quality certified 7v7 artificial football turf ground with shock-pad underlay to reduce knee impact. Equipped with 8 high-mast floodlight towers and sound system.',
    rules: [
      'Rubber turf shoes and football boots permitted. Hard metal cleats prohibited.',
      'Proper sports attire is mandatory for all players.',
      'Outside food items are restricted to the cafeteria area.'
    ],
    facilities: ['Parking', 'Washroom', 'Changing Room', 'Drinking Water', 'Flood Lights', 'Seating', 'Equipment Rental'],
    images: [
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'
    ],
    slotTimings: [
      '06:00 AM - 07:00 AM',
      '07:00 AM - 08:00 AM',
      '08:00 AM - 09:00 AM',
      '04:00 PM - 05:00 PM',
      '05:00 PM - 06:00 PM',
      '06:00 PM - 07:00 PM',
      '07:00 PM - 08:00 PM',
      '08:00 PM - 09:00 PM'
    ]
  },
  {
    id: 'turf-3',
    name: 'Casa Arena Badminton Academy',
    sport: 'Badminton',
    sportsAvailable: ['Badminton', 'Pickleball'],
    city: 'Bengaluru',
    location: 'Koramangala',
    address: '80 Feet Road, 4th Block, Koramangala, Bengaluru 560034',
    distance: '3.4 km',
    distanceKm: 3.4,
    pricePerHour: 650,
    rating: 4.8,
    reviewsCount: 156,
    turfType: 'Indoor',
    ownerId: 'owner-2',
    ownerName: 'Ananya Deshmukh',
    contactPhone: '+91 97411 44556',
    contactEmail: 'ananya@playslot.com',
    openingTime: '06:00 AM',
    closingTime: '11:00 PM',
    status: 'Approved',
    featured: true,
    availableToday: true,
    description: '6 air-cooled indoor badminton courts with BWF certified Yonex synthetic flooring, glare-free indirect LED lighting, racket stringing services, and coaching support.',
    rules: [
      'Strictly non-marking gum sole badminton shoes required.',
      'Barefoot or running shoes strictly not allowed on court floor.'
    ],
    facilities: ['Parking', 'Washroom', 'Changing Room', 'Drinking Water', 'Seating', 'Equipment Rental'],
    images: [
      'https://images.unsplash.com/photo-1521537634581-0ddea2efe258?auto=format&fit=crop&w=1200&q=80'
    ],
    slotTimings: [
      '06:00 AM - 07:00 AM',
      '07:00 AM - 08:00 AM',
      '08:00 AM - 09:00 AM',
      '05:00 PM - 06:00 PM',
      '06:00 PM - 07:00 PM',
      '07:00 PM - 08:00 PM',
      '08:00 PM - 09:00 PM'
    ]
  },
  {
    id: 'turf-4',
    name: 'Metro Champions Cricket Turf',
    sport: 'Cricket',
    sportsAvailable: ['Cricket', 'Box Cricket'],
    city: 'Delhi',
    location: 'Dwarka Sector 12',
    address: 'Plot 4, Sector 12, Dwarka, New Delhi 110078',
    distance: '2.8 km',
    distanceKm: 2.8,
    pricePerHour: 1200,
    rating: 4.8,
    reviewsCount: 82,
    turfType: 'Outdoor',
    ownerId: 'owner-3',
    ownerName: 'Rajesh Kumar',
    contactPhone: '+91 98110 33221',
    contactEmail: 'rajesh@playslot.com',
    openingTime: '06:00 AM',
    closingTime: '11:00 PM',
    status: 'Approved',
    featured: true,
    availableToday: true,
    description: 'Full-size cricket practice nets with high-density synthetic grass, automated bowling machines, and tournament-grade LED floodlights.',
    rules: [
      'Rubber turf shoes only. Spikes strictly prohibited.',
      'Protective gear required during bowling machine sessions.'
    ],
    facilities: ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water', 'Equipment Rental'],
    images: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80'
    ],
    slotTimings: [
      '06:00 AM - 07:00 AM',
      '07:00 AM - 08:00 AM',
      '08:00 AM - 09:00 AM',
      '05:00 PM - 06:00 PM',
      '06:00 PM - 07:00 PM',
      '07:00 PM - 08:00 PM',
      '08:00 PM - 09:00 PM'
    ]
  }
];

// Initial demo booking set to today's date
const todayStr = new Date().toISOString().split('T')[0];
const defaultBookings = [
  {
    id: 'PS-109283',
    bookingId: 'PS-109283',
    userId: 'user-1',
    userName: 'Rahul Sharma',
    userEmail: 'user@playslot.com',
    userPhone: '+91 98765 43210',
    turfId: 'turf-1',
    turfName: 'Thunderbolts Arena & Box Turf',
    turfImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    ownerId: 'owner-1',
    sport: 'Box Cricket',
    date: todayStr,
    timeSlot: '07:00 PM - 08:00 PM',
    durationHours: 1,
    playersCount: 8,
    basePrice: 1400,
    convenienceFee: 49,
    gstAmount: 252,
    totalAmount: 1400,
    status: 'Confirmed',
    paymentStatus: 'Success',
    paymentMethod: 'UPI / Card',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
];

const defaultSports = [
  {
    id: 'sport-cricket',
    name: 'Cricket',
    icon: '🏏',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    description: 'Professional grass pitches and practice nets with bowling machines.',
    startingPrice: 1200,
    turfsCount: 1,
    categoryType: 'Outdoor',
    popular: true
  },
  {
    id: 'sport-football',
    name: 'Football',
    icon: '⚽',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    description: 'FIFA standard artificial turf grounds for 5v5, 7v7, and 11v11 matches.',
    startingPrice: 1800,
    turfsCount: 2,
    categoryType: 'Outdoor',
    popular: true
  },
  {
    id: 'sport-badminton',
    name: 'Badminton',
    icon: '🏸',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    description: 'BWF standard wooden and synthetic court mats with anti-glare lighting.',
    startingPrice: 650,
    turfsCount: 1,
    categoryType: 'Indoor',
    popular: true
  },
  {
    id: 'sport-basketball',
    name: 'Basketball',
    icon: '🏀',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
    description: 'Full-court maple wood indoor & shock-absorbent outdoor hard courts.',
    startingPrice: 1000,
    turfsCount: 0,
    categoryType: 'Both',
    popular: true
  },
  {
    id: 'sport-tennis',
    name: 'Tennis',
    icon: '🎾',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80',
    description: 'Clay, grass, and hard courts equipped with high-power tournament floodlights.',
    startingPrice: 1200,
    turfsCount: 0,
    categoryType: 'Outdoor',
    popular: true
  },
  {
    id: 'sport-volleyball',
    name: 'Volleyball',
    icon: '🏐',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
    description: 'Beach sand volleyball arenas and indoor cushioned wooden courts.',
    startingPrice: 900,
    turfsCount: 0,
    categoryType: 'Both',
    popular: false
  },
  {
    id: 'sport-boxcricket',
    name: 'Box Cricket',
    icon: '🏟️',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    description: 'Enclosed netted arenas with high-density synthetic grass turf and sound systems.',
    startingPrice: 1400,
    turfsCount: 3,
    categoryType: 'Both',
    popular: true
  },
  {
    id: 'sport-pickleball',
    name: 'Pickleball',
    icon: '🏓',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80',
    description: 'Dedicated cushioned pickleball courts with tournament-grade net tensioning.',
    startingPrice: 800,
    turfsCount: 1,
    categoryType: 'Both',
    popular: true
  }
];

// ==========================================
// 2. CENTRAL STATE & LOCALSTORAGE ENGINE
// ==========================================

const PlaySlotState = (() => {
  const STORAGE_KEYS = {
    USERS: 'playslot_users',
    OWNERS: 'playslot_owners',
    TURFS: 'playslot_turfs',
    BOOKINGS: 'playslot_bookings',
    SLOTS: 'playslot_slots',
    SPORTS: 'playslot_sports',
    NOTIFICATIONS: 'playslot_notifications',
    CURRENT_USER: 'playslot_current_user'
  };

  function getStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Storage parse warning:', key, e);
      return fallback;
    }
  }

  function setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage set error:', key, e);
      return false;
    }
  }

  function initState(forceReset = false) {
    if (forceReset) {
      localStorage.removeItem(STORAGE_KEYS.USERS);
      localStorage.removeItem(STORAGE_KEYS.OWNERS);
      localStorage.removeItem(STORAGE_KEYS.TURFS);
      localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
      localStorage.removeItem(STORAGE_KEYS.SLOTS);
      localStorage.removeItem(STORAGE_KEYS.SPORTS);
      localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
      // Clean legacy keys
      localStorage.removeItem('playslot_users_v2');
      localStorage.removeItem('playslot_owners_v2');
      localStorage.removeItem('playslot_turfs_v2');
      localStorage.removeItem('playslot_bookings_v2');
      localStorage.removeItem('playslot_slots_v2');
      localStorage.removeItem('playslot_sports_v2');
      localStorage.removeItem('playslot_owner_applications_v2');
      localStorage.removeItem('playslot_current_user_v2');
    }

    // Seed defaults if absent
    getStorage(STORAGE_KEYS.USERS, defaultUsers);
    getStorage(STORAGE_KEYS.OWNERS, defaultOwners);
    getStorage(STORAGE_KEYS.TURFS, defaultTurfs);
    getStorage(STORAGE_KEYS.BOOKINGS, defaultBookings);
    getStorage(STORAGE_KEYS.SLOTS, {});
    getStorage(STORAGE_KEYS.SPORTS, defaultSports);
    getStorage(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: 'notif-1',
        title: 'Platform Online',
        message: 'All real-time slot scheduling is dynamically operational.',
        date: new Date().toISOString(),
        read: false
      }
    ]);
  }

  initState(false);

  return {
    KEYS: STORAGE_KEYS,
    getStorage,
    setStorage,
    initState,
    resetState: () => initState(true)
  };
})();

if (typeof window !== 'undefined') {
  window.PlaySlotState = PlaySlotState;
}

// ==========================================
// 3. SERVICE LAYER
// ==========================================

const dataService = (() => {
  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }

  function isToday(dateStr) {
    if (!dateStr) return false;
    try {
      const target = typeof dateStr === 'string' ? dateStr.split('T')[0].trim() : new Date(dateStr).toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      return target === today;
    } catch (e) {
      return false;
    }
  }

  function formatTime(timeStr) {
    return timeStr || '';
  }

  function formatCurrency(amount) {
    const num = Number(amount) || 0;
    return '₹' + num.toLocaleString('en-IN');
  }

  function get(key, fallback = []) {
    return PlaySlotState.getStorage(key, fallback);
  }

  function set(key, value) {
    return PlaySlotState.setStorage(key, value);
  }

  function resetDemoData() {
    PlaySlotState.resetState();
    return true;
  }

  return {
    formatDate,
    isToday,
    formatTime,
    formatCurrency,
    getKeys: () => PlaySlotState.KEYS,
    get,
    set,
    resetDemoData
  };
})();

const authService = (() => {
  function getCurrentUser() {
    return dataService.get(dataService.getKeys().CURRENT_USER, null);
  }

  function setCurrentUser(user) {
    const key = dataService.getKeys().CURRENT_USER;
    if (user) {
      dataService.set(key, user);
    } else {
      localStorage.removeItem(key);
    }
    return user;
  }

  function logout() {
    setCurrentUser(null);
  }

  function loginUser(email) {
    const users = dataService.get(dataService.getKeys().USERS, defaultUsers);
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      user = {
        id: 'user-' + Date.now(),
        name: email.split('@')[0].toUpperCase(),
        email,
        phone: '+91 98765 43210',
        role: 'user',
        city: 'Mumbai',
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        totalBookings: 0,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };
      users.push(user);
      dataService.set(dataService.getKeys().USERS, users);
    }
    setCurrentUser(user);
    return user;
  }

  function registerUser(userData) {
    const users = dataService.get(dataService.getKeys().USERS, defaultUsers);
    let user = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return user;
    }

    user = {
      id: 'user-' + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+91 98765 43210',
      role: 'user',
      city: userData.city || 'Mumbai',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      totalBookings: 0,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };

    users.push(user);
    dataService.set(dataService.getKeys().USERS, users);
    setCurrentUser(user);
    return user;
  }

  function loginAdmin(email) {
    const adminUser = {
      id: 'admin-1',
      name: 'Super Administrator',
      email: email || 'admin@playslot.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    setCurrentUser(adminUser);
    return adminUser;
  }

  return {
    getCurrentUser,
    setCurrentUser,
    logout,
    loginUser,
    registerUser,
    loginAdmin
  };
})();

const venueService = (() => {
  function getAllTurfs() {
    return dataService.get(dataService.getKeys().TURFS, defaultTurfs);
  }

  function getTurfs(filters = {}, includeAllStatus = false) {
    let turfs = getAllTurfs();

    // Unless explicitly requested (e.g. Admin or Owner dashboard), show only Approved & Active
    if (!includeAllStatus && !filters.ownerId) {
      turfs = turfs.filter(t => t.status === 'Approved' || t.status === 'Active');
    }

    if (filters.ownerId) {
      turfs = turfs.filter(t => t.ownerId === filters.ownerId);
    }

    if (filters.status && filters.status !== 'All') {
      turfs = turfs.filter(t => t.status && t.status.toLowerCase() === filters.status.toLowerCase());
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
    return turfs.find(t => t.id === id) || turfs[0] || null;
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
      // CRITICAL RULE: When owner creates a turf, status = 'Pending'
      status: turfData.status || 'Pending',
      featured: false,
      availableToday: true,
      description: turfData.description || 'Verified sports arena on PlaySlot.',
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

const bookingService = (() => {
  function getAllBookings() {
    return dataService.get(dataService.getKeys().BOOKINGS, defaultBookings);
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
      bookings = bookings.filter(b => b.status && b.status.toLowerCase() === filters.status.toLowerCase());
    }

    if (filters.date) {
      bookings = bookings.filter(b => b.date === filters.date);
    }

    // Sort newest first
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

    // Update user stats
    const users = dataService.get(dataService.getKeys().USERS, defaultUsers);
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

  function calculateRevenue(bookingsList = null) {
    const list = bookingsList || getAllBookings();
    return list
      .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
      .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
  }

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

const slotService = (() => {
  function getSlotsForTurfAndDate(turfId, dateStr) {
    const turf = venueService.getTurfById(turfId);
    const timings = (turf && turf.slotTimings && turf.slotTimings.length > 0) ? turf.slotTimings : [
      '06:00 AM - 07:00 AM',
      '07:00 AM - 08:00 AM',
      '08:00 AM - 09:00 AM',
      '05:00 PM - 06:00 PM',
      '06:00 PM - 07:00 PM',
      '07:00 PM - 08:00 PM',
      '08:00 PM - 09:00 PM'
    ];

    const price = turf ? turf.pricePerHour : 1200;
    const manualOverrides = dataService.get(dataService.getKeys().SLOTS, {});
    const overrideKey = `${turfId}_${dateStr}`;
    const overridesForDay = manualOverrides[overrideKey] || {};

    return timings.map((time, idx) => {
      let status = 'Available';

      if (bookingService.isSlotBooked(turfId, dateStr, time)) {
        status = 'Booked';
      } else if (overridesForDay[time] === 'Blocked') {
        status = 'Blocked';
      }

      return {
        id: `slot-${idx}`,
        time,
        price,
        status
      };
    });
  }

  function updateSlotState(turfId, dateStr, slotTime, newStatus) {
    const manualOverrides = dataService.get(dataService.getKeys().SLOTS, {});
    const overrideKey = `${turfId}_${dateStr}`;
    if (!manualOverrides[overrideKey]) {
      manualOverrides[overrideKey] = {};
    }
    manualOverrides[overrideKey][slotTime] = newStatus;
    dataService.set(dataService.getKeys().SLOTS, manualOverrides);
    return { turfId, dateStr, slotTime, status: newStatus };
  }

  return {
    getSlotsForTurfAndDate,
    updateSlotState
  };
})();

const ownerService = (() => {
  function getAllOwners() {
    return dataService.get(dataService.getKeys().OWNERS, defaultOwners);
  }

  function getOwners(statusFilter = 'All') {
    let owners = getAllOwners();
    if (statusFilter && statusFilter !== 'All') {
      owners = owners.filter(o => o.status && o.status.toLowerCase() === statusFilter.toLowerCase());
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
    return owners.find(o => o.email && o.email.toLowerCase() === email.toLowerCase()) || null;
  }

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
   * Section 7 & 8: Approve Owner
   * CRITICAL RULE: Approving owner grants owner access ONLY. Does NOT create a turf!
   */
  function updateOwnerStatus(ownerId, status, reason = '') {
    const owners = getAllOwners();
    const owner = owners.find(o => o.id === ownerId || o.applicationId === ownerId);
    if (owner) {
      owner.status = status;
      if (reason) owner.rejectionReason = reason;
      dataService.set(dataService.getKeys().OWNERS, owners);
      return owner;
    }
    return null;
  }

  function checkOwnerLogin(email) {
    if (!email) {
      return { allowed: false, message: 'Please enter registered owner email.' };
    }

    const owners = getAllOwners();
    const owner = owners.find(o => o.email && o.email.toLowerCase() === email.toLowerCase());

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
        message: `Your partner application (${owner.applicationId}) is currently Pending review by our operations team. Portal access will unlock upon approval.`
      };
    }

    if (owner.status === 'Rejected') {
      return {
        allowed: false,
        status: 'Rejected',
        applicationId: owner.applicationId,
        message: `Your partner application (${owner.applicationId}) was rejected: "${owner.rejectionReason || 'Application incomplete'}".`
      };
    }

    if (owner.status === 'Suspended' || owner.status === 'Blocked') {
      return {
        allowed: false,
        status: 'Suspended',
        message: 'Your turf owner account is currently suspended. Please contact platform administration.'
      };
    }

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

const adminService = (() => {
  function getAdminStats() {
    const users = dataService.get(dataService.getKeys().USERS, defaultUsers);
    const owners = dataService.get(dataService.getKeys().OWNERS, defaultOwners);
    const turfs = dataService.get(dataService.getKeys().TURFS, defaultTurfs);
    const bookings = dataService.get(dataService.getKeys().BOOKINGS, defaultBookings);

    // Dynamic stats: strictly derived
    const totalUsers = users.filter(u => !u.role || u.role === 'user').length;
    const totalOwners = owners.filter(o => o.status === 'Approved' || o.status === 'Active').length;
    const pendingApprovals = owners.filter(o => o.status === 'Pending').length;
    const totalTurfs = turfs.filter(t => t.status === 'Approved' || t.status === 'Active').length;
    const pendingTurfs = turfs.filter(t => t.status === 'Pending').length;
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
    const completedBookings = bookings.filter(b => b.status === 'Completed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;
    const totalRevenue = bookingService.calculateRevenue(bookings);
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
    return dataService.get(dataService.getKeys().USERS, defaultUsers);
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
    return dataService.get(dataService.getKeys().SPORTS, defaultSports);
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

// ==========================================
// 4. GLOBAL PLAYSLOT API FACADE
// ==========================================

const PlaySlotData = {
  // Session
  getCurrentUser: () => authService.getCurrentUser(),
  setCurrentUser: (user) => authService.setCurrentUser(user),
  logout: () => authService.logout(),

  // Auth
  loginUser: (email) => authService.loginUser(email),
  registerUser: (userData) => authService.registerUser(userData),
  loginAdmin: (email) => authService.loginAdmin(email),

  // Users
  getUsers: () => adminService.getUsers(),
  updateUserStatus: (userId, status) => adminService.updateUserStatus(userId, status),

  // Owners & Applications
  getOwnerApplications: (statusFilter) => ownerService.getOwners(statusFilter),
  getOwnerApplicationById: (appId) => ownerService.getOwnerById(appId),
  getOwnerApplicationByEmail: (email) => ownerService.getOwnerByEmail(email),
  submitOwnerApplication: (appData) => ownerService.registerOwner(appData),
  approveOwnerApplication: (appId) => ownerService.updateOwnerStatus(appId, 'Approved'),
  rejectOwnerApplication: (appId, reason) => ownerService.updateOwnerStatus(appId, 'Rejected', reason),
  checkOwnerLoginEligibility: (email) => ownerService.checkOwnerLogin(email),
  getOwners: (statusFilter) => ownerService.getOwners(statusFilter),
  updateOwnerStatus: (ownerId, status, reason) => ownerService.updateOwnerStatus(ownerId, status, reason),
  getOwnerStats: (ownerId) => ownerService.getOwnerStats(ownerId),

  // Turfs
  getTurfs: (filters = {}, includeAll = false) => venueService.getTurfs(filters, includeAll),
  getTurfById: (id) => venueService.getTurfById(id),
  saveTurf: (turfData) => venueService.addTurf(turfData),
  updateTurfStatus: (turfId, status) => venueService.updateTurfStatus(turfId, status),
  deleteTurf: (turfId) => venueService.deleteTurf(turfId),

  // Slots
  getSlotsForTurfAndDate: (turfId, dateStr) => slotService.getSlotsForTurfAndDate(turfId, dateStr),
  updateSlotState: (turfId, dateStr, slotTime, newStatus) => slotService.updateSlotState(turfId, dateStr, slotTime, newStatus),

  // Bookings
  getBookings: (filters) => bookingService.getBookings(filters),
  getBookingById: (id) => bookingService.getBookingById(id),
  isSlotBooked: (turfId, date, timeSlot) => bookingService.isSlotBooked(turfId, date, timeSlot),
  createBooking: (bookingData) => {
    const res = bookingService.createBooking(bookingData);
    if (!res.success) {
      throw new Error(res.error || 'Slot already booked');
    }
    return res.booking;
  },
  cancelBooking: (id) => bookingService.cancelBooking(id),
  updateBookingStatus: (bookingId, status) => {
    const bookings = dataService.get(dataService.getKeys().BOOKINGS, defaultBookings);
    const b = bookings.find(item => item.id === bookingId || item.bookingId === bookingId);
    if (b) {
      b.status = status;
      dataService.set(dataService.getKeys().BOOKINGS, bookings);
      return b;
    }
    return null;
  },

  // Sports
  getSports: () => adminService.getSports(),
  addSport: (sportData) => adminService.addSport(sportData),
  deleteSport: (sportId) => adminService.deleteSport(sportId),

  // Platform Metrics
  getAdminStats: () => adminService.getAdminStats(),

  // Reset Demo Data
  resetDemoData: () => dataService.resetDemoData(),

  // Helpers
  formatDate: (dateStr) => dataService.formatDate(dateStr),
  isToday: (dateStr) => dataService.isToday(dateStr),
  formatCurrency: (val) => dataService.formatCurrency(val)
};

// Export to window
if (typeof window !== 'undefined') {
  window.PlaySlotData = PlaySlotData;
  window.dataService = dataService;
  window.authService = authService;
  window.venueService = venueService;
  window.bookingService = bookingService;
  window.slotService = slotService;
  window.ownerService = ownerService;
  window.adminService = adminService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PlaySlotData,
    PlaySlotState,
    dataService,
    authService,
    venueService,
    bookingService,
    slotService,
    ownerService,
    adminService
  };
}
