/**
 * PLAYSlot Centralized Turfs Dataset
 * 4 initial approved and active sports turfs
 */
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { defaultTurfs };
}
