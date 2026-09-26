import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import {
  defaultSports,
  defaultOwners,
  defaultTurfs,
  defaultUsers,
  defaultBookings
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

async function seedDatabase() {
  console.log('====================================================');
  console.log('--- STARTING FIREBASE FIRESTORE DATABASE SEEDING ---');
  console.log('Project: playslot-0');
  console.log('====================================================\n');

  // 1. Seed Users Collection
  console.log(`1. Seeding ${defaultUsers.length} Athletes/Users into 'users'...`);
  for (const user of defaultUsers) {
    await setDoc(doc(db, 'users', user.id), {
      ...user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`   + User: ${user.name} (${user.email}) -> [users/${user.id}]`);
  }

  // 2. Seed Owners Collection
  console.log(`\n2. Seeding ${defaultOwners.length} Turf Owners into 'owners'...`);
  for (const owner of defaultOwners) {
    await setDoc(doc(db, 'owners', owner.id), {
      ...owner,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`   + Owner: ${owner.name} [${owner.businessName}] -> [owners/${owner.id}]`);
  }

  // 3. Seed Turfs Collection
  console.log(`\n3. Seeding ${defaultTurfs.length} Sports Turfs into 'turfs'...`);
  for (const turf of defaultTurfs) {
    await setDoc(doc(db, 'turfs', turf.id), {
      ...turf,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`   + Turf: ${turf.name} [${turf.sport}] -> [turfs/${turf.id}]`);
  }

  // 4. Seed Bookings Collection
  console.log(`\n4. Seeding ${defaultBookings.length} Bookings into 'bookings'...`);
  for (const booking of defaultBookings) {
    await setDoc(doc(db, 'bookings', booking.id), {
      ...booking,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`   + Booking: ${booking.bookingId} (${booking.userName} @ ${booking.turfName}) -> [bookings/${booking.id}]`);
  }

  // 5. Seed Sports Catalog
  console.log(`\n5. Seeding ${defaultSports.length} Sports into 'sports'...`);
  for (const sport of defaultSports) {
    await setDoc(doc(db, 'sports', sport.id), {
      ...sport,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`   + Sport: ${sport.icon} ${sport.name} -> [sports/${sport.id}]`);
  }

  // 6. Seed Platform Settings
  console.log(`\n6. Seeding Platform Governance into 'settings/platform'...`);
  await setDoc(doc(db, 'settings', 'platform'), {
    platformCommissionRate: 15,
    gstRate: 18,
    convenienceFee: 49,
    maintenanceMode: false,
    autoApproveOwners: false,
    autoApproveTurfs: false,
    updatedAt: new Date().toISOString()
  });
  console.log('   + Platform Settings: 15% commission, 18% GST -> [settings/platform]');

  console.log('\n====================================================');
  console.log('✅ ALL COLLECTIONS SEEDED IN FIREBASE FIRESTORE!');
  console.log('====================================================');
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error('❌ Error during Firestore seeding:', err);
  process.exit(1);
});
