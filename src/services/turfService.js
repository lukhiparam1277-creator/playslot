/**
 * Turf / Venue Service for PlaySlot
 * Standardized CRUD for Turfs & Arenas. Replaceable with Express /api/turfs endpoints.
 */

import storageService, { STORAGE_KEYS } from './storageService';
import { defaultTurfs } from '../data/initialData';

export const turfService = {
  async getTurfs() {
    return storageService.get(STORAGE_KEYS.TURFS, defaultTurfs);
  },

  async getTurfById(id) {
    const turfs = await this.getTurfs();
    return turfs.find(t => t.id === id) || null;
  },

  async getTurfsByOwner(ownerId) {
    const turfs = await this.getTurfs();
    return turfs.filter(t => t.ownerId === ownerId);
  },

  async createTurf(turfData) {
    const turfs = await this.getTurfs();
    const newTurfId = 'turf-' + Date.now();
    const priceVal = parseInt(turfData.pricePerHour || turfData.price) || 1200;

    const newTurf = {
      id: newTurfId,
      ownerId: turfData.ownerId || 'owner-1',
      ownerName: turfData.ownerName || 'Verified Owner',
      name: turfData.name,
      sport: turfData.sport || (Array.isArray(turfData.sports) ? turfData.sports[0] : 'Box Cricket'),
      sportsAvailable: Array.isArray(turfData.sportsAvailable) ? turfData.sportsAvailable : (Array.isArray(turfData.sports) ? turfData.sports : [turfData.sport || 'Box Cricket']),
      city: turfData.city || 'Mumbai',
      location: turfData.location || turfData.area || 'Central Area',
      address: turfData.address || `${turfData.location || turfData.area || ''}, ${turfData.city || ''}`,
      distance: turfData.distance || '2.0 km',
      pricePerHour: priceVal,
      price: priceVal,
      rating: Number(turfData.rating) || 5.0,
      reviewsCount: parseInt(turfData.reviewsCount) || 1,
      turfType: turfData.turfType || 'Outdoor',
      contactPhone: turfData.contactPhone || '+91 98201 23456',
      contactEmail: turfData.contactEmail || 'owner@playslot.com',
      openingTime: turfData.openingTime || '06:00 AM',
      closingTime: turfData.closingTime || '11:00 PM',
      status: turfData.status || 'PENDING', // Owner added turf is PENDING by default
      featured: Boolean(turfData.featured),
      availableToday: true,
      description: turfData.description || 'Premium sports arena facility with high quality turf.',
      rules: turfData.rules || [
        'Non-marking sports shoes or rubber studs only.',
        'Please report 10 minutes prior to your booked slot.'
      ],
      facilities: turfData.facilities || ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water'],
      images: turfData.images && turfData.images.length > 0 ? turfData.images : ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'],
      slotTimings: turfData.slotTimings || [
        '06:00 AM - 07:00 AM',
        '07:00 AM - 08:00 AM',
        '08:00 AM - 09:00 AM',
        '05:00 PM - 06:00 PM',
        '06:00 PM - 07:00 PM',
        '07:00 PM - 08:00 PM',
        '08:00 PM - 09:00 PM'
      ]
    };

    const updated = [newTurf, ...turfs];
    storageService.set(STORAGE_KEYS.TURFS, updated);
    return newTurf;
  },

  async updateTurf(id, updates) {
    const turfs = await this.getTurfs();
    let updatedTurf = null;
    const updated = turfs.map(t => {
      if (t.id === id) {
        const priceVal = updates.pricePerHour !== undefined ? parseInt(updates.pricePerHour) : (updates.price !== undefined ? parseInt(updates.price) : t.pricePerHour);
        updatedTurf = {
          ...t,
          ...updates,
          pricePerHour: priceVal,
          price: priceVal,
          id: t.id
        };
        return updatedTurf;
      }
      return t;
    });
    storageService.set(STORAGE_KEYS.TURFS, updated);
    return updatedTurf;
  },

  async updateTurfStatus(id, status) {
    return await this.updateTurf(id, { status });
  },

  async deleteTurf(id) {
    const turfs = await this.getTurfs();
    const filtered = turfs.filter(t => t.id !== id);
    storageService.set(STORAGE_KEYS.TURFS, filtered);
    return true;
  }
};

export default turfService;
