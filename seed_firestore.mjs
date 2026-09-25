import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, deleteDoc } from 'firebase/firestore';
import {
  defaultSports,
  defaultTurfs,
  defaultBookings,
  defaultApplications,
  defaultUsers
} from './src/data/initialData.js';

const firebaseConfig = {
  apiKey: "AIzaSyD2ACS5ZLBQhEHcCXxNoGBmtCfY0NwJwyw",
  authDomain: "playslot-0.firebaseapp.com",
  projectId: "playslot-0",
  storageBucket: "playslot-0.firebasestorage.app",
  messagingSenderId: "1032556716625",
  appId: "1:1032556716625:web:0de2f051af66c1dce4ce70"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Additional system users
const seedUsers = [
  ...defaultUsers,
  {
    id: 'admin-1',
    name: 'Super Administrator',
    email: 'admin@playslot.com',
    role: 'admin',
    status: 'Active',
    joinedDate: '2025-01-01',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'owner-1',
    name: 'Vikram Malhotra',
    email: 'owner@playslot.com',
    phone: '+91 98201 23456',
    role: 'turf_owner',
    status: 'Active',
    joinedDate: '2025-01-10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'owner-2',
    name: 'Ananya Deshmukh',
    email: 'ananya@playslot.com',
    phone: '+91 97411 44556',
    role: 'turf_owner',
    status: 'Active',
    joinedDate: '2025-02-05',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  }
];

async function seedDatabase() {
  console.log('--- Starting Firestore Database Seeding for playslot-0 ---');

  // 1. Remove temporary health check
  try {
    await deleteDoc(doc(db, '_healthCheck', 'ping'));
  } catch (e) {
    // ignore
  }

  // 2. Seed Sports
  console.log(`Seeding ${defaultSports.length} sports into 'sports' collection...`);
  for (const sport of defaultSports) {
    await setDoc(doc(db, 'sports', sport.id), {
      ...sport,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`  + Sport: ${sport.name} (${sport.id})`);
  }

  // 3. Seed Venues / Turfs
  console.log(`\nSeeding ${defaultTurfs.length} venues into 'venues' collection...`);
  for (const turf of defaultTurfs) {
    await setDoc(doc(db, 'venues', turf.id), {
      ...turf,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`  + Venue: ${turf.name} (${turf.id})`);
  }

  // 4. Seed Bookings
  console.log(`\nSeeding ${defaultBookings.length} bookings into 'bookings' collection...`);
  for (const booking of defaultBookings) {
    await setDoc(doc(db, 'bookings', booking.id), {
      ...booking,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`  + Booking: ${booking.bookingId} (${booking.id})`);
  }

  // 5. Seed Partner Applications
  console.log(`\nSeeding ${defaultApplications.length} applications into 'partnerApplications' collection...`);
  for (const appItem of defaultApplications) {
    await setDoc(doc(db, 'partnerApplications', appItem.id), {
      ...appItem,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`  + Application: ${appItem.turfName} (${appItem.applicationId})`);
  }

  // 6. Seed Users
  console.log(`\nSeeding ${seedUsers.length} users into 'users' collection...`);
  for (const user of seedUsers) {
    await setDoc(doc(db, 'users', user.id), {
      ...user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`  + User: ${user.name} [${user.role}] (${user.id})`);
  }

  console.log('\n--- Firestore Database Seeding Completed Successfully! ---');
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error('Fatal error during seeding:', err);
  process.exit(1);
});
