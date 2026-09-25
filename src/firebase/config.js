import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Read config from environment variables (Vite uses import.meta.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD2ACS5ZLBQhEHcCXxNoGBmtCfY0NwJwyw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "playslot-0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "playslot-0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "playslot-0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1032556716625",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1032556716625:web:0de2f051af66c1dce4ce70"
};

// Initialize Firebase safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const isFirebaseConfigured = () => {
  const key = import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey;
  return Boolean(key && !key.includes("DummyKey"));
};

export default app;
