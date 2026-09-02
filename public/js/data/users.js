/**
 * PLAYSlot Centralized Users Dataset
 * 4 initial realistic athlete users
 */
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
    totalBookings: 1,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-2',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    phone: '+91 98765 00001',
    role: 'user',
    city: 'Mumbai',
    status: 'Active',
    joinedDate: '2026-02-15',
    totalBookings: 0,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-3',
    name: 'Priya Patel',
    email: 'priya@example.com',
    phone: '+91 98765 00002',
    role: 'user',
    city: 'Bengaluru',
    status: 'Active',
    joinedDate: '2026-03-01',
    totalBookings: 0,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-4',
    name: 'David Chen',
    email: 'david@example.com',
    phone: '+91 98765 00003',
    role: 'user',
    city: 'Delhi',
    status: 'Active',
    joinedDate: '2026-04-10',
    totalBookings: 0,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { defaultUsers };
}
