/**
 * PLAYSlot Demo Slots Dataset
 * Standard 1-hour time slots with 4 states: AVAILABLE, SELECTED, BOOKED, BLOCKED
 */
export const defaultSlots = [
  // Skyline Turf (ven-1) - Football & Box Cricket
  { id: 's-101', venueId: 'ven-1', sport: 'Football', time: '06:00 AM – 07:00 AM', period: 'Morning', price: 1000, status: 'AVAILABLE' },
  { id: 's-102', venueId: 'ven-1', sport: 'Football', time: '07:00 AM – 08:00 AM', period: 'Morning', price: 1100, status: 'BOOKED' },
  { id: 's-103', venueId: 'ven-1', sport: 'Football', time: '08:00 AM – 09:00 AM', period: 'Morning', price: 1100, status: 'AVAILABLE' },
  { id: 's-104', venueId: 'ven-1', sport: 'Football', time: '09:00 AM – 10:00 AM', period: 'Morning', price: 1100, status: 'AVAILABLE' },
  { id: 's-105', venueId: 'ven-1', sport: 'Football', time: '10:00 AM – 11:00 AM', period: 'Morning', price: 1000, status: 'AVAILABLE' },
  { id: 's-106', venueId: 'ven-1', sport: 'Football', time: '11:00 AM – 12:00 PM', period: 'Afternoon', price: 950, status: 'AVAILABLE' },
  { id: 's-107', venueId: 'ven-1', sport: 'Football', time: '12:00 PM – 01:00 PM', period: 'Afternoon', price: 950, status: 'BLOCKED' },
  { id: 's-108', venueId: 'ven-1', sport: 'Football', time: '01:00 PM – 02:00 PM', period: 'Afternoon', price: 950, status: 'AVAILABLE' },
  { id: 's-109', venueId: 'ven-1', sport: 'Football', time: '05:00 PM – 06:00 PM', period: 'Evening', price: 1300, status: 'BOOKED' },
  { id: 's-110', venueId: 'ven-1', sport: 'Football', time: '06:00 PM – 07:00 PM', period: 'Evening', price: 1400, status: 'BOOKED' },
  { id: 's-111', venueId: 'ven-1', sport: 'Football', time: '07:00 PM – 08:00 PM', period: 'Evening', price: 1500, status: 'AVAILABLE' },
  { id: 's-112', venueId: 'ven-1', sport: 'Football', time: '08:00 PM – 09:00 PM', period: 'Night', price: 1500, status: 'AVAILABLE' },
  { id: 's-113', venueId: 'ven-1', sport: 'Football', time: '09:00 PM – 10:00 PM', period: 'Night', price: 1400, status: 'AVAILABLE' },
  { id: 's-114', venueId: 'ven-1', sport: 'Football', time: '10:00 PM – 11:00 PM', period: 'Night', price: 1200, status: 'AVAILABLE' },

  // Apex Badminton (ven-2)
  { id: 's-201', venueId: 'ven-2', sport: 'Badminton', time: '06:00 AM – 07:00 AM', period: 'Morning', price: 650, status: 'AVAILABLE' },
  { id: 's-202', venueId: 'ven-2', sport: 'Badminton', time: '07:00 AM – 08:00 AM', period: 'Morning', price: 650, status: 'BOOKED' },
  { id: 's-203', venueId: 'ven-2', sport: 'Badminton', time: '06:00 PM – 07:00 PM', period: 'Evening', price: 750, status: 'BOOKED' },
  { id: 's-204', venueId: 'ven-2', sport: 'Badminton', time: '07:00 PM – 08:00 PM', period: 'Evening', price: 800, status: 'AVAILABLE' },
  { id: 's-205', venueId: 'ven-2', sport: 'Badminton', time: '08:00 PM – 09:00 PM', period: 'Night', price: 800, status: 'AVAILABLE' },

  // Champion Box Cricket (ven-3)
  { id: 's-301', venueId: 'ven-3', sport: 'Box Cricket', time: '07:00 PM – 08:00 PM', period: 'Evening', price: 1500, status: 'AVAILABLE' },
  { id: 's-302', venueId: 'ven-3', sport: 'Box Cricket', time: '08:00 PM – 09:00 PM', period: 'Night', price: 1600, status: 'AVAILABLE' },
  { id: 's-303', venueId: 'ven-3', sport: 'Box Cricket', time: '09:00 PM – 10:00 PM', period: 'Night', price: 1600, status: 'BLOCKED' },

  // Golf & Pool
  { id: 's-501', venueId: 'ven-5', sport: 'Golf', time: '05:00 PM – 06:00 PM', period: 'Evening', price: 1800, status: 'AVAILABLE' },
  { id: 's-502', venueId: 'ven-5', sport: 'Golf', time: '06:00 PM – 07:00 PM', period: 'Evening', price: 1800, status: 'AVAILABLE' },
  { id: 's-601', venueId: 'ven-6', sport: '8 Ball Pool', time: '06:00 PM – 07:00 PM', period: 'Evening', price: 450, status: 'AVAILABLE' },
  { id: 's-602', venueId: 'ven-6', sport: '8 Ball Pool', time: '07:00 PM – 08:00 PM', period: 'Evening', price: 450, status: 'BOOKED' }
];
