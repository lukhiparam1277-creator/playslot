/**
 * PLAYSlot Demo Venues Dataset
 * High-quality sports arenas mapped to owners, sports, facilities, and prices
 */
export const defaultVenues = [
  {
    id: 'ven-1',
    name: 'Skyline Turf & Futsal Arena',
    ownerId: 'own-1',
    ownerName: 'SportsHub Arena Group',
    city: 'Mumbai',
    area: 'Andheri West',
    address: 'Near Infinity Mall, Link Road, Andheri West, Mumbai, Maharashtra 400053',
    hourlyRate: 1200,
    rating: 4.9,
    reviewsCount: 142,
    sports: ['Football', 'Box Cricket'],
    status: 'Active',
    banner: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Premier 50mm artificial grass turf with FIFA-standard shock pads, high mast 200W LED floodlights, and premium dugout seating. Ideal for fast 5v5 soccer and night box cricket matches.',
    facilities: ['Parking', 'Washroom', 'Drinking Water', 'Changing Room', 'Flood Lights', 'Equipment Rental'],
    openingTime: '06:00',
    closingTime: '23:00',
    contactNumber: '+91 98765 43210',
    featured: true
  },
  {
    id: 'ven-2',
    name: 'Apex Badminton & Tennis Club',
    ownerId: 'own-4',
    ownerName: 'Metro Smash Badminton Hub',
    city: 'Bengaluru',
    area: 'Koramangala 4th Block',
    address: '80 Feet Road, Koramangala 4th Block, Bengaluru, Karnataka 560034',
    hourlyRate: 650,
    rating: 4.8,
    reviewsCount: 98,
    sports: ['Badminton', 'Pickleball'],
    status: 'Active',
    banner: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511067007770-3da75bc38929?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Six BWF approved wooden synthetic courts with glare-free linear illumination, temperature-controlled air ventilation, and Yonex/Victor rental gear on-premise.',
    facilities: ['Parking', 'Washroom', 'Drinking Water', 'Changing Room', 'Air Conditioned', 'Equipment Rental'],
    openingTime: '05:00',
    closingTime: '23:00',
    contactNumber: '+91 99000 11223',
    featured: true
  },
  {
    id: 'ven-3',
    name: 'Champion Indoor Box Cricket Hub',
    ownerId: 'own-2',
    ownerName: 'Turf Nation LLC',
    city: 'Delhi',
    area: 'Gurugram Sector 29',
    address: 'Near IFFCO Chowk Metro, Sector 29, Gurugram, Haryana 122002',
    hourlyRate: 1500,
    rating: 4.7,
    reviewsCount: 215,
    sports: ['Cricket', 'Box Cricket'],
    status: 'Active',
    banner: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Enclosed 14,000 sq.ft cricket arena with seamless net protection, professional synthetic astroturf, digital live scoreboard integration, and commentary mic facilities.',
    facilities: ['Parking', 'Washroom', 'Drinking Water', 'Changing Room', 'Flood Lights', 'Live Scoring Screen'],
    openingTime: '06:00',
    closingTime: '00:00',
    contactNumber: '+91 98111 22334',
    featured: true
  },
  {
    id: 'ven-4',
    name: 'UrbanHoops Basketball & Pickle Arena',
    ownerId: 'own-1',
    ownerName: 'SportsHub Arena Group',
    city: 'Mumbai',
    area: 'Bandra West',
    address: 'Carter Road Promenade, Bandra West, Mumbai, Maharashtra 400050',
    hourlyRate: 900,
    rating: 4.9,
    reviewsCount: 88,
    sports: ['Basketball', 'Pickleball'],
    status: 'Active',
    banner: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'High-traction acrylic cushioned basketball and dual pickleball courts overlooking the sea breeze. Equipped with breakaway spring rims and official tournament court markings.',
    facilities: ['Parking', 'Washroom', 'Drinking Water', 'Flood Lights', 'Equipment Rental'],
    openingTime: '06:00',
    closingTime: '22:30',
    contactNumber: '+91 98765 43210',
    featured: false
  },
  {
    id: 'ven-5',
    name: 'ProSwing Golf Simulator & Driving Bay',
    ownerId: 'own-2',
    ownerName: 'Turf Nation LLC',
    city: 'Bengaluru',
    area: 'Indiranagar',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    hourlyRate: 1800,
    rating: 4.9,
    reviewsCount: 64,
    sports: ['Golf'],
    status: 'Active',
    banner: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'TrackMan 4 radar-powered 4K golf simulators simulating over 120 global championship golf courses with precision ball-spin and launch metrics.',
    facilities: ['Parking', 'Washroom', 'Drinking Water', 'Air Conditioned', 'Lounge / Cafe', 'Equipment Rental'],
    openingTime: '08:00',
    closingTime: '23:00',
    contactNumber: '+91 98111 22334',
    featured: true
  },
  {
    id: 'ven-6',
    name: 'The Cue Society - Premium 8-Ball & Snooker',
    ownerId: 'own-1',
    ownerName: 'SportsHub Arena Group',
    city: 'Delhi',
    area: 'Connaught Place',
    address: 'Block C, Inner Circle, Connaught Place, New Delhi 110001',
    hourlyRate: 450,
    rating: 4.8,
    reviewsCount: 112,
    sports: ['8 Ball Pool'],
    status: 'Active',
    banner: 'https://images.unsplash.com/photo-1588865198282-e3d1e6761595?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588865198282-e3d1e6761595?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Air-conditioned luxury lounge featuring 8 world-class Wiraka & Riley English slate pool tables with Strachan 6811 cloth and Aramith tournament balls.',
    facilities: ['Parking', 'Washroom', 'Air Conditioned', 'Lounge / Cafe', 'Equipment Rental'],
    openingTime: '10:00',
    closingTime: '01:00',
    contactNumber: '+91 98765 43210',
    featured: false
  }
];
