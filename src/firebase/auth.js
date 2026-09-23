import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

/**
 * Sign in with email and password via Firebase Auth
 */
export const loginWithFirebase = async (email, password) => {
  if (!isFirebaseConfigured()) {
    console.info('[Firebase Auth] Running in demo mode - mock login');
    return { email, uid: 'user-' + Date.now() };
  }
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * Register a new user via Firebase Auth
 */
export const registerWithFirebase = async (email, password, displayName = '') => {
  if (!isFirebaseConfigured()) {
    console.info('[Firebase Auth] Running in demo mode - mock registration');
    return { email, displayName, uid: 'user-' + Date.now() };
  }
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }
  return userCredential.user;
};

/**
 * Sign out of Firebase Auth
 */
export const logoutFromFirebase = async () => {
  if (!isFirebaseConfigured()) {
    return true;
  }
  await signOut(auth);
  return true;
};

/**
 * Listen to auth state changes
 */
export const subscribeToAuthState = (callback) => {
  if (!isFirebaseConfigured()) {
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};
