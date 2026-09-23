import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

// Collection references
export const COLLECTIONS = {
  USERS: 'users',
  VENUES: 'venues',
  SPORTS: 'sports',
  BOOKINGS: 'bookings',
  APPLICATIONS: 'partnerApplications',
  SLOTS: 'slots',
  REVIEWS: 'reviews'
};

/**
 * Generic Fetch all documents from a Firestore collection
 */
export const getCollectionDocs = async (collectionName, queryConstraints = []) => {
  if (!isFirebaseConfigured()) return [];
  try {
    const collRef = collection(db, collectionName);
    const q = query(collRef, ...queryConstraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn(`[Firestore] Error fetching collection ${collectionName}:`, error);
    return [];
  }
};

/**
 * Fetch a single document by ID
 */
export const getDocById = async (collectionName, id) => {
  if (!isFirebaseConfigured() || !id) return null;
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.warn(`[Firestore] Error fetching doc ${collectionName}/${id}:`, error);
    return null;
  }
};

/**
 * Create a new document in Firestore
 */
export const createFirestoreDoc = async (collectionName, data, customId = null) => {
  if (!isFirebaseConfigured()) {
    return { id: customId || ('doc-' + Date.now()), ...data };
  }
  try {
    const payload = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    if (customId) {
      const docRef = doc(db, collectionName, customId);
      await setDoc(docRef, payload);
      return { id: customId, ...payload };
    } else {
      const collRef = collection(db, collectionName);
      const docRef = await addDoc(collRef, payload);
      return { id: docRef.id, ...payload };
    }
  } catch (error) {
    console.error(`[Firestore] Error creating doc in ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Update an existing document in Firestore
 */
export const updateFirestoreDoc = async (collectionName, id, data) => {
  if (!isFirebaseConfigured()) return { id, ...data };
  try {
    const docRef = doc(db, collectionName, id);
    const payload = {
      ...data,
      updatedAt: serverTimestamp()
    };
    await updateDoc(docRef, payload);
    return { id, ...payload };
  } catch (error) {
    console.error(`[Firestore] Error updating doc in ${collectionName}/${id}:`, error);
    throw error;
  }
};

/**
 * Delete a document from Firestore
 */
export const deleteFirestoreDoc = async (collectionName, id) => {
  if (!isFirebaseConfigured()) return true;
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`[Firestore] Error deleting doc from ${collectionName}/${id}:`, error);
    throw error;
  }
};
