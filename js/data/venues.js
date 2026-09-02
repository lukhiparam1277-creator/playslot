/**
 * PLAYSlot Demo Venues Dataset
 * 4 initial approved/active turfs mapped to the 4 approved owners
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
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Premier 50mm artificial grass turf with FIFA-standard shock pads, high mast 200W LED floodlights, and premium dugout seating.',
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
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Six BWF approved wooden synthetic courts with glare-free linear illumination, temperature-controlled air ventilation.',
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
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Enclosed cricket arena with seamless net protection, professional synthetic astroturf, and digital live scoreboard integration.',
    facilities: ['Parking', 'Washroom', 'Drinking Water', 'Changing Room', 'Flood Lights'],
    openingTime: '06:00',
    closingTime: '00:00',
    contactNumber: '+91 98111 22334',
    featured: true
  },
  {
    id: 'ven-4',
    name: 'Apex Box Cricket Arena',
    ownerId: 'own-3',
    ownerName: 'Apex Box Cricket & Sports',
    city: 'Delhi',
    area: 'Dwarka Sector 12',
    address: 'Plot 4, Sector 12, Dwarka, New Delhi 110078',
    hourlyRate: 1200,
    rating: 4.8,
    reviewsCount: 88,
    sports: ['Box Cricket', 'Football'],
    status: 'Active',
    banner: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Premier all-weather turf arena with tournament-grade floodlights and dedicated team seating.',
    facilities: ['Parking', 'Washroom', 'Drinking Water', 'Flood Lights', 'Equipment Rental'],
    openingTime: '06:00',
    closingTime: '23:00',
    contactNumber: '+91 97222 33445',
    featured: false
  }
];
