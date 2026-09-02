/**
 * PLAYSlot Centralized Sports Dataset
 * 8 verified sports categories
 */
const defaultSports = [
  {
    id: 'sport-cricket',
    name: 'Cricket',
    icon: '🏏',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    description: 'Professional grass pitches and practice nets with bowling machines.',
    startingPrice: 1200,
    turfsCount: 1,
    categoryType: 'Outdoor',
    popular: true
  },
  {
    id: 'sport-football',
    name: 'Football',
    icon: '⚽',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    description: 'FIFA standard artificial turf grounds for 5v5, 7v7, and 11v11 matches.',
    startingPrice: 1800,
    turfsCount: 2,
    categoryType: 'Outdoor',
    popular: true
  },
  {
    id: 'sport-badminton',
    name: 'Badminton',
    icon: '🏸',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    description: 'BWF standard wooden and synthetic court mats with anti-glare lighting.',
    startingPrice: 650,
    turfsCount: 1,
    categoryType: 'Indoor',
    popular: true
  },
  {
    id: 'sport-basketball',
    name: 'Basketball',
    icon: '🏀',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
    description: 'Full-court maple wood indoor & shock-absorbent outdoor hard courts.',
    startingPrice: 1000,
    turfsCount: 0,
    categoryType: 'Both',
    popular: true
  },
  {
    id: 'sport-tennis',
    name: 'Tennis',
    icon: '🎾',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80',
    description: 'Clay, grass, and hard courts equipped with high-power tournament floodlights.',
    startingPrice: 1200,
    turfsCount: 0,
    categoryType: 'Outdoor',
    popular: true
  },
  {
    id: 'sport-volleyball',
    name: 'Volleyball',
    icon: '🏐',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
    description: 'Beach sand volleyball arenas and indoor cushioned wooden courts.',
    startingPrice: 900,
    turfsCount: 0,
    categoryType: 'Both',
    popular: false
  },
  {
    id: 'sport-boxcricket',
    name: 'Box Cricket',
    icon: '🏟️',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    description: 'Enclosed netted arenas with high-density synthetic grass turf and sound systems.',
    startingPrice: 1400,
    turfsCount: 3,
    categoryType: 'Both',
    popular: true
  },
  {
    id: 'sport-pickleball',
    name: 'Pickleball',
    icon: '🏓',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80',
    description: 'Dedicated cushioned pickleball courts with tournament-grade net tensioning.',
    startingPrice: 800,
    turfsCount: 1,
    categoryType: 'Both',
    popular: true
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { defaultSports };
}
