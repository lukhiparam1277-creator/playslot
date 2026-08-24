/**
 * PlaySlot Centralized Mock Data & Client-Side API Layer (v2)
 * 
 * Provides decoupled state management with localStorage persistence.
 * Includes complete lifecycle for Normal Users, Turf Owner Applications,
 * and Super Admin moderation.
 */

const PlaySlotData = (() => {
  const STORAGE_KEYS = {
    SPORTS: 'playslot_sports_v2',
    TURFS: 'playslot_turfs_v2',
    BOOKINGS: 'playslot_bookings_v2',
    USERS: 'playslot_users_v2',
    OWNERS: 'playslot_owners_v2',
    APPLICATIONS: 'playslot_owner_applications_v2',
    SLOTS: 'playslot_slots_v2',
    CURRENT_USER: 'playslot_current_user_v2'
  };

  // --- Initial Default Sports Dataset (8 Sports) ---
  const defaultSports = [
    {
      id: 'sport-cricket',
      name: 'Cricket',
      icon: '🏏',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
      description: 'Professional grass pitches and practice nets with bowling machines.',
      startingPrice: 1500,
      turfsCount: 18,
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
      turfsCount: 22,
      categoryType: 'Outdoor',
      popular: true
    },
    {
      id: 'sport-badminton',
      name: 'Badminton',
      icon: '🏸',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
      description: 'BWF standard wooden and synthetic court mats with anti-glare lighting.',
      startingPrice: 600,
      turfsCount: 25,
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
      turfsCount: 14,
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
      turfsCount: 11,
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
      turfsCount: 9,
      categoryType: 'Both',
      popular: false
    },
    {
      id: 'sport-boxcricket',
      name: 'Box Cricket',
      icon: '🏟️',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
      description: 'Enclosed netted arenas with high-density synthetic grass turf and sound systems.',
      startingPrice: 1300,
      turfsCount: 30,
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
      turfsCount: 16,
      categoryType: 'Both',
      popular: true
    }
  ];

  // --- Initial Default Turfs Dataset ---
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
      ownerId: 'owner-1',
      ownerName: 'Vikram Malhotra',
      contactPhone: '+91 98450 78901',
      contactEmail: 'owner@playslot.com',
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
    }
  ];

  // --- Initial Default Owner Applications Dataset ---
  const defaultApplications = [
    {
      applicationId: 'PS-OWNER-10245',
      id: 'app-1',
      ownerName: 'Kunal Bansal',
      email: 'kunal.turf@example.com',
      phone: '+91 98330 11223',
      turfName: 'Apex Arena Multi-Sport Ground',
      turfAddress: 'Opposite Inorbit Mall, Malad West',
      city: 'Mumbai',
      area: 'Malad West',
      turfType: 'Outdoor',
      sports: ['Box Cricket', 'Football', 'Cricket'],
      pricePerHour: 1350,
      openingTime: '06:00 AM',
      closingTime: '11:30 PM',
      facilities: ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water', 'Seating'],
      description: 'Brand new 6v6 football and box cricket arena with high-density synthetic grass and 8 LED stadium lights.',
      images: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'],
      status: 'Pending',
      submittedDate: '2026-08-23',
      rejectionReason: ''
    },
    {
      applicationId: 'PS-OWNER-10018',
      id: 'app-2',
      ownerName: 'Vikram Malhotra',
      email: 'owner@playslot.com',
      phone: '+91 98201 23456',
      turfName: 'Thunderbolts Arena & Box Turf',
      turfAddress: 'Link Road, Andheri West',
      city: 'Mumbai',
      area: 'Andheri West',
      turfType: 'Outdoor',
      sports: ['Box Cricket', 'Football'],
      pricePerHour: 1400,
      openingTime: '06:00 AM',
      closingTime: '12:00 AM',
      facilities: ['Parking', 'Washroom', 'Changing Room', 'Drinking Water', 'Flood Lights', 'Seating', 'Equipment Rental'],
      description: 'Enclosed 40mm turf arena with live recording camera.',
      images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80'],
      status: 'Approved',
      submittedDate: '2026-08-10',
      rejectionReason: ''
    },
    {
      applicationId: 'PS-OWNER-10009',
      id: 'app-3',
      ownerName: 'Dinesh Rawat',
      email: 'dinesh.turf@example.com',
      phone: '+91 98110 55443',
      turfName: 'Suburban Sports Enclave',
      turfAddress: 'Sector 45, Gurugram',
      city: 'Delhi',
      area: 'Gurugram',
      turfType: 'Outdoor',
      sports: ['Cricket'],
      pricePerHour: 900,
      openingTime: '07:00 AM',
      closingTime: '09:00 PM',
      facilities: ['Parking', 'Drinking Water'],
      description: 'Open ground practice pitches.',
      images: ['https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80'],
      status: 'Rejected',
      submittedDate: '2026-08-05',
      rejectionReason: 'Ground surface and floodlighting specifications were incomplete. Please provide high-resolution photos of the playable turf and player facilities.'
    }
  ];

  // --- Initial Default Bookings Dataset ---
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
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      timeSlot: '07:00 PM - 08:00 PM',
      durationHours: 1,
      playersCount: 8,
      basePrice: 1400,
      convenienceFee: 49,
      gstAmount: 252,
      totalAmount: 1701,
      status: 'Confirmed',
      paymentMethod: 'UPI / Card (Demo)',
      createdAt: new Date().toISOString()
    }
  ];

  // --- Initial Default Users Dataset ---
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
      totalBookings: 8,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    }
  ];

  // --- Local Storage Helpers ---
  function getStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      if (!data) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('LocalStorage access warning:', e);
      return fallback;
    }
  }

  function setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage write warning:', e);
    }
  }

  // --- Public API Interface ---
  return {
    // Current Authenticated Session (Client-Side)
    getCurrentUser: () => {
      const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return raw ? JSON.parse(raw) : null;
    },

    setCurrentUser: (user) => {
      if (user) {
        setStorage(STORAGE_KEYS.CURRENT_USER, user);
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    },

    logout: () => {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    },

    // User Authentication Methods
    loginUser: (email, password) => {
      const users = getStorage(STORAGE_KEYS.USERS, defaultUsers);
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
          totalBookings: 1,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        };
        users.push(user);
        setStorage(STORAGE_KEYS.USERS, users);
      }
      setStorage(STORAGE_KEYS.CURRENT_USER, user);
      return user;
    },

    registerUser: (userData) => {
      const users = getStorage(STORAGE_KEYS.USERS, defaultUsers);
      const newUser = {
        id: 'user-' + Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: 'user',
        city: 'Mumbai',
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        totalBookings: 0,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };
      users.push(newUser);
      setStorage(STORAGE_KEYS.USERS, users);
      setStorage(STORAGE_KEYS.CURRENT_USER, newUser);
      return newUser;
    },

    // Admin Authentication (Hidden Route)
    loginAdmin: (email, password) => {
      const adminUser = {
        id: 'admin-1',
        name: 'Super Administrator',
        email: email || 'admin@playslot.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      };
      setStorage(STORAGE_KEYS.CURRENT_USER, adminUser);
      return adminUser;
    },

    // Turf Owner Application Lifecycle
    submitOwnerApplication: (appData) => {
      const apps = getStorage(STORAGE_KEYS.APPLICATIONS, defaultApplications);
      const newAppId = 'PS-OWNER-' + Math.floor(10000 + Math.random() * 90000);

      const application = {
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
        openingTime: appData.openingTime || '06:00 AM',
        closingTime: appData.closingTime || '11:00 PM',
        facilities: appData.facilities || ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water'],
        description: appData.description || 'Modern sports arena applying for PlaySlot listing.',
        images: appData.images && appData.images.length > 0 ? appData.images : ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'],
        status: 'Pending',
        submittedDate: new Date().toISOString().split('T')[0],
        rejectionReason: ''
      };

      apps.unshift(application);
      setStorage(STORAGE_KEYS.APPLICATIONS, apps);
      return application;
    },

    getOwnerApplications: (statusFilter) => {
      let apps = getStorage(STORAGE_KEYS.APPLICATIONS, defaultApplications);
      if (statusFilter && statusFilter !== 'All') {
        apps = apps.filter(a => a.status.toLowerCase() === statusFilter.toLowerCase());
      }
      return apps;
    },

    getOwnerApplicationById: (appId) => {
      const apps = getStorage(STORAGE_KEYS.APPLICATIONS, defaultApplications);
      return apps.find(a => a.applicationId.toLowerCase() === (appId || '').toLowerCase() || a.id === appId);
    },

    getOwnerApplicationByEmail: (email) => {
      const apps = getStorage(STORAGE_KEYS.APPLICATIONS, defaultApplications);
      return apps.find(a => a.email.toLowerCase() === (email || '').toLowerCase());
    },

    approveOwnerApplication: (appId) => {
      const apps = getStorage(STORAGE_KEYS.APPLICATIONS, defaultApplications);
      const app = apps.find(a => a.applicationId === appId || a.id === appId);
      if (app) {
        app.status = 'Approved';
        setStorage(STORAGE_KEYS.APPLICATIONS, apps);

        // Automatically register turf in live listing
        PlaySlotData.saveTurf({
          name: app.turfName,
          sport: app.sports[0] || 'Box Cricket',
          sportsAvailable: app.sports,
          city: app.city,
          location: app.area,
          address: app.turfAddress,
          turfType: app.turfType,
          pricePerHour: app.pricePerHour,
          openingTime: app.openingTime,
          closingTime: app.closingTime,
          facilities: app.facilities,
          images: app.images,
          description: app.description,
          ownerName: app.ownerName,
          contactEmail: app.email,
          contactPhone: app.phone,
          status: 'Approved'
        });

        return app;
      }
      return null;
    },

    rejectOwnerApplication: (appId, reason) => {
      const apps = getStorage(STORAGE_KEYS.APPLICATIONS, defaultApplications);
      const app = apps.find(a => a.applicationId === appId || a.id === appId);
      if (app) {
        app.status = 'Rejected';
        app.rejectionReason = reason || 'Application requirements incomplete.';
        setStorage(STORAGE_KEYS.APPLICATIONS, apps);
        return app;
      }
      return null;
    },

    // Turf Owner Login Eligibility Check
    checkOwnerLoginEligibility: (email) => {
      const apps = getStorage(STORAGE_KEYS.APPLICATIONS, defaultApplications);
      const app = apps.find(a => a.email.toLowerCase() === (email || '').toLowerCase());

      // Default demo owner account
      if (email.toLowerCase() === 'owner@playslot.com') {
        return {
          allowed: true,
          status: 'Approved',
          ownerUser: {
            id: 'owner-1',
            name: 'Vikram Malhotra',
            email: 'owner@playslot.com',
            role: 'turf_owner',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
          }
        };
      }

      if (!app) {
        return {
          allowed: false,
          status: 'NotFound',
          message: 'No turf partner application found with this email. Please apply at /owner/apply first.'
        };
      }

      if (app.status === 'Pending') {
        return {
          allowed: false,
          status: 'Pending',
          applicationId: app.applicationId,
          message: `Your partner application (${app.applicationId}) is currently pending review by our operations team. Dashboard access will be enabled upon approval.`
        };
      }

      if (app.status === 'Rejected') {
        return {
          allowed: false,
          status: 'Rejected',
          applicationId: app.applicationId,
          reason: app.rejectionReason,
          message: `Your partner application (${app.applicationId}) was not approved: "${app.rejectionReason}". Please review status at /owner/status.`
        };
      }

      // Approved
      const ownerUser = {
        id: 'owner-' + Date.now(),
        name: app.ownerName,
        email: app.email,
        phone: app.phone,
        role: 'turf_owner',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      };
      setStorage(STORAGE_KEYS.CURRENT_USER, ownerUser);

      return {
        allowed: true,
        status: 'Approved',
        ownerUser
      };
    },

    // --- Sports Methods ---
    getSports: () => getStorage(STORAGE_KEYS.SPORTS, defaultSports),
    addSport: (sportData) => {
      const sports = getStorage(STORAGE_KEYS.SPORTS, defaultSports);
      const newSport = {
        id: 'sport-' + Date.now(),
        name: sportData.name,
        icon: sportData.icon || '🏅',
        image: sportData.image || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
        description: sportData.description || 'Professional ground and equipment rental.',
        startingPrice: parseInt(sportData.startingPrice) || 1000,
        turfsCount: 0,
        categoryType: sportData.categoryType || 'Both',
        popular: false
      };
      sports.unshift(newSport);
      setStorage(STORAGE_KEYS.SPORTS, sports);
      return newSport;
    },
    deleteSport: (id) => {
      const sports = getStorage(STORAGE_KEYS.SPORTS, defaultSports).filter(s => s.id !== id);
      setStorage(STORAGE_KEYS.SPORTS, sports);
      return true;
    },

    // --- Turfs Methods ---
    getTurfs: (filters = {}) => {
      let turfs = getStorage(STORAGE_KEYS.TURFS, defaultTurfs);
      if (filters.sport && filters.sport !== 'All') {
        const target = filters.sport.toLowerCase();
        turfs = turfs.filter(t => (t.sport && t.sport.toLowerCase() === target) || (t.sportsAvailable && t.sportsAvailable.some(s => s.toLowerCase() === target)));
      }
      if (filters.city && filters.city !== 'All') {
        turfs = turfs.filter(t => t.city.toLowerCase() === filters.city.toLowerCase());
      }
      if (filters.turfType && filters.turfType !== 'All') {
        turfs = turfs.filter(t => t.turfType.toLowerCase() === filters.turfType.toLowerCase());
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        turfs = turfs.filter(t => t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q) || (t.sport && t.sport.toLowerCase().includes(q)));
      }
      if (filters.maxPrice) {
        turfs = turfs.filter(t => t.pricePerHour <= parseFloat(filters.maxPrice));
      }
      if (filters.minRating) {
        turfs = turfs.filter(t => t.rating >= parseFloat(filters.minRating));
      }
      if (filters.sort) {
        if (filters.sort === 'price_low') turfs.sort((a, b) => a.pricePerHour - b.pricePerHour);
        else if (filters.sort === 'price_high') turfs.sort((a, b) => b.pricePerHour - a.pricePerHour);
        else if (filters.sort === 'rating') turfs.sort((a, b) => b.rating - a.rating);
        else if (filters.sort === 'distance') turfs.sort((a, b) => a.distanceKm - b.distanceKm);
      }
      return turfs;
    },

    getTurfById: (id) => {
      const turfs = getStorage(STORAGE_KEYS.TURFS, defaultTurfs);
      return turfs.find(t => t.id === id) || turfs[0];
    },

    saveTurf: (turfData) => {
      const turfs = getStorage(STORAGE_KEYS.TURFS, defaultTurfs);
      const newTurf = {
        id: turfData.id || 'turf-' + Date.now(),
        name: turfData.name,
        sport: turfData.sport || 'Box Cricket',
        sportsAvailable: turfData.sportsAvailable || [turfData.sport || 'Box Cricket'],
        city: turfData.city || 'Mumbai',
        location: turfData.location || 'Central Area',
        address: turfData.address || turfData.location,
        distance: '1.8 km',
        distanceKm: 1.8,
        pricePerHour: parseInt(turfData.pricePerHour) || 1200,
        rating: 4.9,
        reviewsCount: 12,
        turfType: turfData.turfType || 'Outdoor',
        ownerId: 'owner-1',
        ownerName: turfData.ownerName || 'Vikram Malhotra',
        contactPhone: turfData.contactPhone || '+91 98201 23456',
        contactEmail: turfData.contactEmail || 'owner@playslot.com',
        openingTime: turfData.openingTime || '06:00 AM',
        closingTime: turfData.closingTime || '11:00 PM',
        status: turfData.status || 'Approved',
        featured: false,
        availableToday: true,
        description: turfData.description || 'Verified sports arena on PlaySlot.',
        rules: ['Rubber studs or non-marking sports shoes only.', 'Report 10 mins before slot.'],
        facilities: turfData.facilities || ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water'],
        images: turfData.images && turfData.images.length > 0 ? turfData.images : ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'],
        slotTimings: [
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
      setStorage(STORAGE_KEYS.TURFS, turfs);
      return newTurf;
    },

    deleteTurf: (id) => {
      const turfs = getStorage(STORAGE_KEYS.TURFS, defaultTurfs).filter(t => t.id !== id);
      setStorage(STORAGE_KEYS.TURFS, turfs);
      return true;
    },

    // --- Slots Methods ---
    getSlotsForTurfAndDate: (turfId, dateStr) => {
      const key = `${turfId}_${dateStr}`;
      const allSlotsMap = getStorage(STORAGE_KEYS.SLOTS, {});
      if (allSlotsMap[key]) return allSlotsMap[key];

      const turf = PlaySlotData.getTurfById(turfId);
      const timings = turf ? turf.slotTimings : ['06:00 AM - 07:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'];
      const generated = timings.map((timing, idx) => ({
        id: `slot-${idx}`,
        time: timing,
        price: turf ? turf.pricePerHour : 1200,
        status: idx === 1 ? 'Booked' : 'Available'
      }));
      allSlotsMap[key] = generated;
      setStorage(STORAGE_KEYS.SLOTS, allSlotsMap);
      return generated;
    },

    updateSlotState: (turfId, dateStr, slotTime, newStatus) => {
      const key = `${turfId}_${dateStr}`;
      const allSlotsMap = getStorage(STORAGE_KEYS.SLOTS, {});
      let slots = allSlotsMap[key] || PlaySlotData.getSlotsForTurfAndDate(turfId, dateStr);
      const slot = slots.find(s => s.time === slotTime);
      if (slot) {
        slot.status = newStatus;
        allSlotsMap[key] = slots;
        setStorage(STORAGE_KEYS.SLOTS, allSlotsMap);
        return slot;
      }
      return null;
    },

    // --- Bookings Methods ---
    getBookings: (filters = {}) => {
      let bookings = getStorage(STORAGE_KEYS.BOOKINGS, defaultBookings);
      if (filters.userId) {
        bookings = bookings.filter(b => b.userId === filters.userId || b.userEmail === filters.userEmail);
      }
      if (filters.status && filters.status !== 'All') {
        bookings = bookings.filter(b => b.status.toLowerCase() === filters.status.toLowerCase());
      }
      return bookings;
    },

    getBookingById: (id) => {
      const bookings = getStorage(STORAGE_KEYS.BOOKINGS, defaultBookings);
      return bookings.find(b => b.id === id || b.bookingId === id);
    },

    createBooking: (bookingData) => {
      const bookings = getStorage(STORAGE_KEYS.BOOKINGS, defaultBookings);
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
        timeSlot: bookingData.timeSlot,
        durationHours: 1,
        playersCount: parseInt(bookingData.playersCount) || 6,
        basePrice: parseFloat(bookingData.basePrice) || 1200,
        convenienceFee: 49,
        gstAmount: Math.round((bookingData.basePrice || 1200) * 0.18),
        totalAmount: parseFloat(bookingData.totalAmount) || 1465,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };
      bookings.unshift(newBooking);
      setStorage(STORAGE_KEYS.BOOKINGS, bookings);
      PlaySlotData.updateSlotState(bookingData.turfId, bookingData.date, bookingData.timeSlot, 'Booked');
      return newBooking;
    },

    cancelBooking: (bookingId) => {
      const bookings = getStorage(STORAGE_KEYS.BOOKINGS, defaultBookings);
      const b = bookings.find(item => item.id === bookingId || item.bookingId === bookingId);
      if (b) {
        b.status = 'Cancelled';
        setStorage(STORAGE_KEYS.BOOKINGS, bookings);
        return b;
      }
      return null;
    },

    // --- Users & Stats ---
    getUsers: () => getStorage(STORAGE_KEYS.USERS, defaultUsers),
    updateUserStatus: (id, status) => {
      const users = getStorage(STORAGE_KEYS.USERS, defaultUsers);
      const u = users.find(x => x.id === id);
      if (u) {
        u.status = status;
        setStorage(STORAGE_KEYS.USERS, users);
      }
      return u;
    },

    getAdminStats: () => {
      const users = PlaySlotData.getUsers();
      const turfs = getStorage(STORAGE_KEYS.TURFS, defaultTurfs);
      const bookings = getStorage(STORAGE_KEYS.BOOKINGS, defaultBookings);
      const apps = getStorage(STORAGE_KEYS.APPLICATIONS, defaultApplications);
      const pendingApps = apps.filter(a => a.status === 'Pending').length;

      return {
        totalUsers: users.length + 1280,
        totalOwners: 34,
        totalTurfs: turfs.length,
        totalBookings: bookings.length + 3420,
        pendingApprovals: pendingApps,
        totalRevenue: 4826000
      };
    },

    getOwnerStats: (ownerId) => {
      return {
        totalBookings: 142,
        todayBookings: 6,
        upcomingBookings: 18,
        monthlyEarnings: 184500,
        availableSlots: 24
      };
    }
  };
})();

if (typeof window !== 'undefined') {
  window.PlaySlotData = PlaySlotData;
}
