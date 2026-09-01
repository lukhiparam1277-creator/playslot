/**
 * PLAYSlot Venue Service
 * Manages venue queries, search, multi-filters, sorting, and owner CRUD actions
 */
import { Storage } from './storage.js';

export const VenueService = {
  async getVenues(filters = {}) {
    await new Promise(r => setTimeout(r, 150));
    let venues = Storage.get('VENUES') || [];

    // Filter by search keyword
    if (filters.search && filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      venues = venues.filter(v => 
        v.name.toLowerCase().includes(q) || 
        v.city.toLowerCase().includes(q) || 
        v.area.toLowerCase().includes(q) ||
        v.sports.some(s => s.toLowerCase().includes(q))
      );
    }

    // Filter by city
    if (filters.city && filters.city !== 'All') {
      venues = venues.filter(v => v.city.toLowerCase() === filters.city.toLowerCase());
    }

    // Filter by sport
    if (filters.sport && filters.sport !== 'All') {
      venues = venues.filter(v => v.sports.includes(filters.sport));
    }

    // Filter by max price
    if (filters.maxPrice) {
      venues = venues.filter(v => v.hourlyRate <= Number(filters.maxPrice));
    }

    // Filter by min rating
    if (filters.minRating) {
      venues = venues.filter(v => v.rating >= Number(filters.minRating));
    }

    // Sort
    if (filters.sortBy === 'price_asc') {
      venues.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (filters.sortBy === 'price_desc') {
      venues.sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (filters.sortBy === 'rating') {
      venues.sort((a, b) => b.rating - a.rating);
    }

    return venues;
  },

  async getVenueById(id) {
    await new Promise(r => setTimeout(r, 100));
    const venues = Storage.get('VENUES') || [];
    return venues.find(v => v.id === id) || null;
  },

  async getVenuesByOwner(ownerId) {
    await new Promise(r => setTimeout(r, 150));
    const venues = Storage.get('VENUES') || [];
    return venues.filter(v => v.ownerId === ownerId);
  },

  async addVenue(data) {
    await new Promise(r => setTimeout(r, 300));
    const venues = Storage.get('VENUES') || [];
    const newVenue = {
      id: `ven-${Date.now()}`,
      name: data.name,
      ownerId: data.ownerId || 'own-1',
      ownerName: data.ownerName || 'SportsHub Arena Group',
      city: data.city,
      area: data.area || data.city,
      address: data.address,
      hourlyRate: Number(data.hourlyRate) || 1000,
      rating: 5.0,
      reviewsCount: 1,
      sports: Array.isArray(data.sports) ? data.sports : [data.sports],
      status: 'Active',
      banner: data.banner || 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop&q=80',
      gallery: [
        data.banner || 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80'
      ],
      description: data.description,
      facilities: data.facilities || ['Parking', 'Washroom', 'Drinking Water', 'Flood Lights'],
      openingTime: data.openingTime || '06:00',
      closingTime: data.closingTime || '23:00',
      contactNumber: data.contactNumber || '+91 98765 00000',
      featured: false
    };

    venues.unshift(newVenue);
    Storage.set('VENUES', venues);
    return newVenue;
  },

  async updateVenue(id, updatedFields) {
    await new Promise(r => setTimeout(r, 250));
    const venues = Storage.get('VENUES') || [];
    const index = venues.findIndex(v => v.id === id);
    if (index === -1) throw new Error('Venue not found');

    venues[index] = { ...venues[index], ...updatedFields };
    Storage.set('VENUES', venues);
    return venues[index];
  },

  async deleteVenue(id) {
    await new Promise(r => setTimeout(r, 200));
    let venues = Storage.get('VENUES') || [];
    venues = venues.filter(v => v.id !== id);
    Storage.set('VENUES', venues);
    return true;
  },

  async toggleVenueStatus(id) {
    const venues = Storage.get('VENUES') || [];
    const target = venues.find(v => v.id === id);
    if (!target) return false;
    target.status = target.status === 'Active' ? 'Inactive' : 'Active';
    Storage.set('VENUES', venues);
    return target.status;
  }
};
