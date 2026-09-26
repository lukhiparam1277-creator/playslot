/**
 * Initial PlaySlot Baseline Dataset
 * Strictly verified:
 * - 3 Active Users
 * - 4 Approved Turf Owners (0 Pending)
 * - 4 Approved Turfs (belonging to approved owners)
 * - 1 Confirmed Booking
 * - 8 Sports
 */

export const defaultSports = [
  {
    id: 'sport-cricket',
    name: 'Cricket',
    icon: '🏏',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    description: 'Full pitch turf with standard bowling crease, practice nets, and boundary markings.',
    startingPrice: 1500,
    categoryType: 'Outdoor',
    popular: true,
    status: 'ACTIVE'
  },
  {
    id: 'sport-boxcricket',
    name: 'Box Cricket',
    icon: '🏟️',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    description: 'Enclosed high-tension safety nets with high-density synthetic grass and floodlights.',
    startingPrice: 1300,
    categoryType: 'Both',
    popular: true,
    status: 'ACTIVE'
  },
  {
    id: 'sport-football',
    name: 'Football',
    icon: '⚽',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    description: 'FIFA standard monofilament artificial turf for 5v5, 7v7, and 11v11 matches.',
    startingPrice: 1800,
    categoryType: 'Outdoor',
    popular: true,
    status: 'ACTIVE'
  },
  {
    id: 'sport-badminton',
    name: 'Badminton',
    icon: '🏸',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    description: 'BWF standard wooden/synthetic court mats with anti-glare high bay illumination.',
    startingPrice: 600,
    categoryType: 'Indoor',
    popular: true,
    status: 'ACTIVE'
  },
  {
    id: 'sport-basketball',
    name: 'Basketball',
    icon: '🏀',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
    description: 'Full-court maple wood indoor & shock-absorbent acrylic outdoor courts.',
    startingPrice: 1000,
    categoryType: 'Both',
    popular: true,
    status: 'ACTIVE'
  },
  {
    id: 'sport-pickleball',
    name: 'Pickleball',
    icon: '🏓',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80',
    description: 'Dedicated cushioned pickleball courts with tournament-grade net tensioning.',
    startingPrice: 800,
    categoryType: 'Both',
    popular: true,
    status: 'ACTIVE'
  },
  {
    id: 'sport-tennis',
    name: 'Tennis',
    icon: '🎾',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80',
    description: 'Synthetic hard courts and clay courts equipped with night match floodlights.',
    startingPrice: 1200,
    categoryType: 'Outdoor',
    popular: false,
    status: 'ACTIVE'
  },
  {
    id: 'sport-volleyball',
    name: 'Volleyball',
    icon: '🏐',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
    description: 'Beach sand arena and indoor wooden cushioned volleyball courts.',
    startingPrice: 900,
    categoryType: 'Both',
    popular: false,
    status: 'ACTIVE'
  }
];

export const defaultOwners = [
  {
    id: 'owner-1',
    name: 'Vikram Malhotra',
    businessName: 'Thunderbolt Sports Infra LLP',
    email: 'owner@playslot.com',
    phone: '+91 98201 23456',
    city: 'Mumbai',
    address: 'Link Road, Andheri West, Mumbai 400053',
    status: 'APPROVED',
    registeredDate: '2026-01-10',
    turfsCount: 1,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'owner-2',
    name: 'Ananya Deshmukh',
    businessName: 'Casa Arena Sports Academy',
    email: 'ananya@playslot.com',
    phone: '+91 97411 44556',
    city: 'Bengaluru',
    address: '80 Feet Road, 4th Block, Koramangala, Bengaluru 560034',
    status: 'APPROVED',
    registeredDate: '2026-01-14',
    turfsCount: 1,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'owner-3',
    name: 'Rajesh Iyer',
    businessName: 'Skyline Turf Ventures Pvt Ltd',
    email: 'rajesh@skylinearena.com',
    phone: '+91 98450 78901',
    city: 'Bengaluru',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    status: 'APPROVED',
    registeredDate: '2026-02-01',
    turfsCount: 1,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'owner-4',
    name: 'Kunal Bansal',
    businessName: 'Smash Champions Sports Complex',
    email: 'kunal@smashchampions.com',
    phone: '+91 98330 11223',
    city: 'Mumbai',
    address: 'Opposite Inorbit Mall, Malad West, Mumbai 400064',
    status: 'APPROVED',
    registeredDate: '2026-02-15',
    turfsCount: 1,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  }
];

export const defaultTurfs = [
  {
    id: 'turf-1',
    ownerId: 'owner-1',
    ownerName: 'Vikram Malhotra',
    name: 'Thunderbolts Arena & Box Turf',
    sport: 'Box Cricket',
    sportsAvailable: ['Box Cricket', 'Football', 'Cricket'],
    city: 'Mumbai',
    location: 'Andheri West',
    address: 'Link Road, Near Infinity Mall, Andheri West, Mumbai 400053',
    distance: '1.2 km',
    pricePerHour: 1400,
    rating: 4.9,
    reviewsCount: 128,
    turfType: 'Outdoor',
    contactPhone: '+91 98201 23456',
    contactEmail: 'owner@playslot.com',
    openingTime: '06:00 AM',
    closingTime: '12:00 AM',
    status: 'APPROVED',
    featured: true,
    availableToday: true,
    description: 'State-of-the-art all-weather enclosed box cricket turf featuring 40mm imported monofilament turf, stadium-grade LED glare-free lights, live streaming camera setup, and dedicated dugouts.',
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
    ownerId: 'owner-3',
    ownerName: 'Rajesh Iyer',
    name: 'Skyline FIFA Football Ground',
    sport: 'Football',
    sportsAvailable: ['Football', 'Box Cricket'],
    city: 'Bengaluru',
    location: 'Indiranagar',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    distance: '2.1 km',
    pricePerHour: 1800,
    rating: 4.9,
    reviewsCount: 94,
    turfType: 'Outdoor',
    contactPhone: '+91 98450 78901',
    contactEmail: 'rajesh@skylinearena.com',
    openingTime: '05:30 AM',
    closingTime: '11:30 PM',
    status: 'APPROVED',
    featured: true,
    availableToday: true,
    description: 'FIFA Quality certified 7v7 artificial football turf ground with shock-pad underlay to reduce knee impact. Equipped with 8 high-mast floodlight towers.',
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
    ownerId: 'owner-2',
    ownerName: 'Ananya Deshmukh',
    name: 'Casa Arena Badminton Academy',
    sport: 'Badminton',
    sportsAvailable: ['Badminton', 'Pickleball'],
    city: 'Bengaluru',
    location: 'Koramangala',
    address: '80 Feet Road, 4th Block, Koramangala, Bengaluru 560034',
    distance: '3.4 km',
    pricePerHour: 650,
    rating: 4.8,
    reviewsCount: 156,
    turfType: 'Indoor',
    contactPhone: '+91 97411 44556',
    contactEmail: 'ananya@playslot.com',
    openingTime: '06:00 AM',
    closingTime: '11:00 PM',
    status: 'APPROVED',
    featured: true,
    availableToday: true,
    description: '6 air-cooled indoor badminton courts with BWF certified Yonex synthetic flooring, glare-free indirect LED lighting, and coaching support.',
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
    ownerId: 'owner-4',
    ownerName: 'Kunal Bansal',
    name: 'Smash Champions Pickleball Court',
    sport: 'Pickleball',
    sportsAvailable: ['Pickleball', 'Tennis'],
    city: 'Mumbai',
    location: 'Malad West',
    address: 'Opposite Inorbit Mall, Malad West, Mumbai 400064',
    distance: '2.8 km',
    pricePerHour: 800,
    rating: 4.8,
    reviewsCount: 78,
    turfType: 'Outdoor',
    contactPhone: '+91 98330 11223',
    contactEmail: 'kunal@smashchampions.com',
    openingTime: '06:00 AM',
    closingTime: '11:00 PM',
    status: 'APPROVED',
    featured: true,
    availableToday: true,
    description: '4 tournament-grade acrylic cushioned pickleball courts with paddle rental and night floodlights.',
    rules: [
      'Sports footwear required.',
      'Equipment available at counter upon request.'
    ],
    facilities: ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water', 'Equipment Rental'],
    images: [
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80'
    ],
    slotTimings: [
      '06:00 AM - 07:00 AM',
      '07:00 AM - 08:00 AM',
      '05:00 PM - 06:00 PM',
      '06:00 PM - 07:00 PM',
      '07:00 PM - 08:00 PM',
      '08:00 PM - 09:00 PM'
    ]
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
    totalBookings: 1,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-2',
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    phone: '+91 98112 33445',
    role: 'user',
    city: 'Bengaluru',
    status: 'Active',
    joinedDate: '2026-02-05',
    totalBookings: 0,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-3',
    name: 'Rohan Verma',
    email: 'rohan.v@example.com',
    phone: '+91 97223 44556',
    role: 'user',
    city: 'Mumbai',
    status: 'Active',
    joinedDate: '2026-02-20',
    totalBookings: 0,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
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
    ownerId: 'owner-1',
    turfId: 'turf-1',
    turfName: 'Thunderbolts Arena & Box Turf',
    turfImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    sport: 'Box Cricket',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '07:00 PM - 08:00 PM',
    startTime: '07:00 PM',
    endTime: '08:00 PM',
    durationHours: 1,
    playersCount: 8,
    basePrice: 1400,
    convenienceFee: 49,
    gstAmount: 252,
    totalAmount: 1701,
    amount: 1701,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI / Card',
    createdAt: new Date().toISOString()
  }
];
