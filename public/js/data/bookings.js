/**
 * PLAYSlot Centralized Bookings Dataset
 * EXACTLY 1 realistic initial demo booking
 */
const todayIso = new Date().toISOString().split('T')[0];

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
    date: todayIso,
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { defaultBookings };
}
