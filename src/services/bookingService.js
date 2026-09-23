import {
  COLLECTIONS,
  getCollectionDocs,
  getDocById,
  createFirestoreDoc,
  updateFirestoreDoc,
  deleteFirestoreDoc
} from '../firebase/firestore';
import { defaultBookings } from '../data/initialData';

export const bookingService = {
  async getAllBookings() {
    const docs = await getCollectionDocs(COLLECTIONS.BOOKINGS);
    return docs.length ? docs : defaultBookings;
  },

  async getBookingById(id) {
    const booking = await getDocById(COLLECTIONS.BOOKINGS, id);
    if (booking) return booking;
    return defaultBookings.find(b => b.id === id || b.bookingId === id) || null;
  },

  async createBooking(bookingData) {
    const bookingId = bookingData.bookingId || ('PS-' + Math.floor(100000 + Math.random() * 900000));
    const payload = {
      ...bookingData,
      id: bookingId,
      bookingId,
      status: bookingData.status || 'Confirmed',
      createdAt: new Date().toISOString()
    };
    return await createFirestoreDoc(COLLECTIONS.BOOKINGS, payload, bookingId);
  },

  async updateBooking(id, bookingData) {
    return await updateFirestoreDoc(COLLECTIONS.BOOKINGS, id, bookingData);
  },

  async cancelBooking(id) {
    return await updateFirestoreDoc(COLLECTIONS.BOOKINGS, id, { status: 'Cancelled' });
  },

  async deleteBooking(id) {
    return await deleteFirestoreDoc(COLLECTIONS.BOOKINGS, id);
  }
};

export default bookingService;
