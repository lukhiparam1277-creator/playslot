export const defaultSports = [
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

export const defaultTurfs = [
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

export const defaultApplications = [
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
  }
];

export const defaultBookings = [
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

export const defaultUsers = [
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
