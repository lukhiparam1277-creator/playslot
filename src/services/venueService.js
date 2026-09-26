/**
 * Venue Service adapter for backward compatibility.
 * Redirects to turfService and sports storage.
 */

import turfService from './turfService';
import storageService, { STORAGE_KEYS } from './storageService';
import { defaultSports } from '../data/initialData';

export const venueService = {
  getAllVenues: () => turfService.getTurfs(),
  getVenueById: (id) => turfService.getTurfById(id),
  createVenue: (data) => turfService.createTurf(data),
  updateVenue: (id, data) => turfService.updateTurf(id, data),
  deleteVenue: (id) => turfService.deleteTurf(id),

  async getAllSports() {
    return storageService.get(STORAGE_KEYS.SPORTS, defaultSports);
  },

  async createSport(sport) {
    const sports = await this.getAllSports();
    const updated = [sport, ...sports];
    storageService.set(STORAGE_KEYS.SPORTS, updated);
    return sport;
  },

  async updateSport(id, sportData) {
    const sports = await this.getAllSports();
    const updated = sports.map(s => s.id === id ? { ...s, ...sportData } : s);
    storageService.set(STORAGE_KEYS.SPORTS, updated);
    return sportData;
  },

  async deleteSport(id) {
    const sports = await this.getAllSports();
    const updated = sports.filter(s => s.id !== id);
    storageService.set(STORAGE_KEYS.SPORTS, updated);
    return true;
  }
};

export default venueService;
