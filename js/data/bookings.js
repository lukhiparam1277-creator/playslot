/**
 * PLAYSlot Demo Bookings Dataset
 * EXACTLY 1 realistic initial demo booking
 */
const todayIso = new Date().toISOString().split('T')[0];

export const defaultBookings = [
  {
    id: 'BK-78901',
    userId: 'usr-1',
    userName: 'Alex Morgan',
    userEmail: 'alex@example.com',
    userPhone: '+91 98765 00001',
    venueId: 'ven-1',
    venueName: 'Skyline Turf & Futsal Arena',
    venueCity: 'Mumbai',
    ownerId: 'own-1',
    ownerName: 'SportsHub Arena Group',
    sport: 'Football',
    date: todayIso,
    timeSlot: '07:00 PM – 08:00 PM',
    amount: 1500,
    status: 'Upcoming',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI / GPay',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
];
