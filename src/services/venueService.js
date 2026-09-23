import {
  COLLECTIONS,
  getCollectionDocs,
  getDocById,
  createFirestoreDoc,
  updateFirestoreDoc,
  deleteFirestoreDoc
} from '../firebase/firestore';
import { defaultTurfs, defaultSports } from '../data/initialData';

export const venueService = {
  async getAllVenues() {
    const docs = await getCollectionDocs(COLLECTIONS.VENUES);
    return docs.length ? docs : defaultTurfs;
  },

  async getVenueById(id) {
    const venue = await getDocById(COLLECTIONS.VENUES, id);
    if (venue) return venue;
    return defaultTurfs.find(t => t.id === id) || defaultTurfs[0] || null;
  },

  async createVenue(venueData) {
    return await createFirestoreDoc(COLLECTIONS.VENUES, venueData, venueData.id);
  },

  async updateVenue(id, venueData) {
    return await updateFirestoreDoc(COLLECTIONS.VENUES, id, venueData);
  },

  async deleteVenue(id) {
    return await deleteFirestoreDoc(COLLECTIONS.VENUES, id);
  },

  async getAllSports() {
    const docs = await getCollectionDocs(COLLECTIONS.SPORTS);
    return docs.length ? docs : defaultSports;
  },

  async createSport(sportData) {
    return await createFirestoreDoc(COLLECTIONS.SPORTS, sportData, sportData.id);
  },

  async updateSport(id, sportData) {
    return await updateFirestoreDoc(COLLECTIONS.SPORTS, id, sportData);
  },

  async deleteSport(id) {
    return await deleteFirestoreDoc(COLLECTIONS.SPORTS, id);
  }
};

export default venueService;
