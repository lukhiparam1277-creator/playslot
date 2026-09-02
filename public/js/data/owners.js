/**
 * PLAYSlot Centralized Turf Owners Dataset
 * 4 initial approved turf owners
 */
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { defaultOwners };
}
