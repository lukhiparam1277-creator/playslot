// PlaySlot Pure JavaScript Application Engine
const PlaySlotApp = {
  // STRICT 6 SPORTS CATEGORIES ONLY (Unique High-Quality Images)
  sports: [
    {
      name: 'Football Turf',
      icon: '⚽',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      description: 'Book premium football turf grounds for practice and matches.',
      startingPrice: 1800,
      venuesAvailable: 12,
      rating: 4.9,
      categoryType: 'Outdoor'
    },
    {
      name: 'Box Cricket',
      icon: '🏏',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
      description: 'Reserve indoor and outdoor box cricket arenas.',
      startingPrice: 1200,
      venuesAvailable: 14,
      rating: 4.9,
      categoryType: 'Both'
    },
    {
      name: 'Pickleball',
      icon: '🎾',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80',
      description: 'Find and reserve professional pickleball courts.',
      startingPrice: 800,
      venuesAvailable: 10,
      rating: 4.9,
      categoryType: 'Both'
    },
    {
      name: 'Badminton',
      icon: '🏸',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
      description: 'Book indoor badminton courts with quality flooring.',
      startingPrice: 600,
      venuesAvailable: 16,
      rating: 4.9,
      categoryType: 'Indoor'
    },
    {
      name: 'Basketball',
      icon: '🏀',
      image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
      description: 'Reserve indoor and outdoor basketball courts.',
      startingPrice: 1000,
      venuesAvailable: 7,
      rating: 4.8,
      categoryType: 'Both'
    },
    {
      name: 'Golf',
      icon: '⛳',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=80',
      description: 'Book golf courses and driving range sessions.',
      startingPrice: 2500,
      venuesAvailable: 5,
      rating: 4.9,
      categoryType: 'Outdoor'
    }
  ],

  // VENUES WITH 100% UNIQUE VENUE IMAGES (NO DUPLICATES WITH SPORTS)
  venues: [
    {
      _id: 'v1',
      name: 'The Horizon x Courtplay | Sector 58',
      sportName: 'Pickleball',
      city: 'Gurugram',
      address: 'Sector 58, Golf Course Extension Road, Gurugram',
      location: 'Sector 58',
      rating: 4.9,
      reviewsCount: 48,
      distance: '1.5 km',
      distanceVal: 1.5,
      pricePerHour: 800,
      venueType: 'Outdoor',
      images: ['https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80'],
      facilities: ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water'],
      slotTimings: ['06:00 AM - 07:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'],
      description: 'Canopy sheltered outdoor pickleball hard court with professional net tensioning and anti-glare floodlights.',
      isActive: true
    },
    {
      _id: 'v2',
      name: 'Casa Arena x Blue Court | Indiranagar',
      sportName: 'Badminton',
      city: 'Bengaluru',
      address: '100 Feet Road, Indiranagar, Bengaluru',
      location: 'Indiranagar',
      rating: 4.9,
      reviewsCount: 64,
      distance: '1.9 km',
      distanceVal: 1.9,
      pricePerHour: 600,
      venueType: 'Indoor',
      images: ['https://images.unsplash.com/photo-1521537634581-0ddea2efe258?auto=format&fit=crop&w=800&q=80'],
      facilities: ['Parking', 'Washroom', 'Air Conditioning', 'Equipment Rental'],
      slotTimings: ['06:00 AM - 07:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'],
      description: 'High-ceiling indoor court with blue cushioned floor matting, LED ceiling lights, and spectator gallery.',
      isActive: true
    },
    {
      _id: 'v3',
      name: 'Vana Greens | Gurgaon',
      sportName: 'Badminton',
      city: 'Gurugram',
      address: 'Golf Course Road, Gurgaon, Haryana',
      location: 'Gurgaon',
      rating: 4.8,
      reviewsCount: 35,
      distance: '2.8 km',
      distanceVal: 2.8,
      pricePerHour: 700,
      venueType: 'Outdoor',
      images: ['https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80'],
      facilities: ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water'],
      slotTimings: ['06:00 AM - 07:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM'],
      description: 'Lush green sports court complex surrounded by natural greenery and modern floodlight poles.',
      isActive: true
    },
    {
      _id: 'v4',
      name: 'KAFA | Kalra Academy for Football',
      sportName: 'Football Turf',
      city: 'Gurugram',
      address: 'Farrukhnagar Road, Gurugram, Haryana',
      location: 'Gurugram',
      rating: 4.9,
      reviewsCount: 78,
      distance: '3.2 km',
      distanceVal: 3.2,
      pricePerHour: 1800,
      venueType: 'Outdoor',
      images: ['https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80'],
      facilities: ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water'],
      slotTimings: ['06:00 AM - 07:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM'],
      description: 'Panoramic aerial view sunset grass turf for 7v7 and 11v11 football matches.',
      isActive: true
    },
    {
      _id: 'v5',
      name: 'Thunderbolts Box Cricket | Andheri West',
      sportName: 'Box Cricket',
      city: 'Mumbai',
      address: 'Link Road, Andheri West, Mumbai',
      location: 'Andheri West',
      rating: 4.9,
      reviewsCount: 52,
      distance: '1.2 km',
      distanceVal: 1.2,
      pricePerHour: 1200,
      venueType: 'Outdoor',
      images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80'],
      facilities: ['Parking', 'Washroom', 'Flood Lights', 'Equipment Rental'],
      slotTimings: ['06:00 AM - 07:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM'],
      description: 'Fully netted box cricket turf with LED stadium floodlights and commentary box.',
      isActive: true
    },
    {
      _id: 'v6',
      name: 'HoopNation Basketball Court | Juhu',
      sportName: 'Basketball',
      city: 'Mumbai',
      address: 'Juhu Tara Road, Mumbai',
      location: 'Juhu',
      rating: 4.8,
      reviewsCount: 31,
      distance: '2.5 km',
      distanceVal: 2.5,
      pricePerHour: 1000,
      venueType: 'Outdoor',
      images: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80'],
      facilities: ['Parking', 'Washroom', 'Flood Lights', 'Drinking Water'],
      slotTimings: ['06:00 AM - 07:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM'],
      description: 'Full court outdoor basketball arena with clear glass backboards.',
      isActive: true
    },
    {
      _id: 'v7',
      name: 'GreenFairways Golf Course | Delhi',
      sportName: 'Golf',
      city: 'Delhi',
      address: 'Golf Links, New Delhi',
      location: 'Golf Links',
      rating: 4.9,
      reviewsCount: 22,
      distance: '3.0 km',
      distanceVal: 3.0,
      pricePerHour: 2500,
      venueType: 'Outdoor',
      images: ['https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80'],
      facilities: ['Parking', 'Washroom', 'Equipment Rental'],
      slotTimings: ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '04:00 PM - 05:00 PM'],
      description: 'Championship golf course fairway greens at sunset.',
      isActive: true
    }
  ],

  // Session User State
  getUser: () => {
    const userStr = localStorage.getItem('playslot_user');
    return userStr ? JSON.parse(userStr) : null;
  },
  setUser: (user) => {
    if (user) {
      localStorage.setItem('playslot_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('playslot_user');
    }
  },

  // Inject Navbar
  renderNavbar: () => {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    const user = PlaySlotApp.getUser();
    let roleNavLinks = '';
    if (user) {
      if (user.role === 'turf_owner') {
        roleNavLinks = '<li><a href="/owner/dashboard.html" class="nav-link" style="color:var(--primary-color); font-weight:700;">🏟️ Turf Panel</a></li>';
      } else {
        roleNavLinks = '<li><a href="/my-bookings.html" class="nav-link">My Bookings</a></li>';
      }
    }

    container.innerHTML = `
      <nav class="navbar">
        <div class="container navbar-container">
          <a href="/index.html" class="logo">
            <span>⚽</span> PlaySlot
          </a>

          <ul class="nav-menu" id="navMenu">
            <li><a href="/index.html" class="nav-link">Home</a></li>
            <li><a href="/sports.html" class="nav-link">Sports</a></li>
            <li><a href="/venues.html" class="nav-link">Venues</a></li>
            ${roleNavLinks}
            <li><a href="/contact.html" class="nav-link">Contact</a></li>
          </ul>

          <div class="nav-actions">
            ${user ? `
              <a href="${user.role === 'turf_owner' ? '/owner/dashboard.html' : '/profile.html'}" class="user-profile-menu" title="${user.role === 'turf_owner' ? 'Turf Owner Dashboard' : 'User Profile'}">
                <img src="${user.avatar || '/images/default-avatar.png'}" alt="${user.name}" class="avatar-sm">
                <span style="font-weight:600; font-size:0.9rem;">${user.name.split(' ')[0]} ${user.role === 'turf_owner' ? '🏟️' : ''}</span>
              </a>
              <button onclick="PlaySlotApp.logout()" class="btn btn-outline" style="padding: 8px 16px; font-size:0.85rem;">Logout</button>
            ` : `
              <a href="/login.html" class="btn btn-outline" style="padding: 10px 20px;">Login</a>
              <a href="/register.html" class="btn btn-primary" style="padding: 10px 20px;">Register</a>
            `}
            <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle navigation">☰</button>
          </div>
        </div>
      </nav>
    `;

    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
      });
    }

    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  },

  // Inject Footer
  renderFooter: () => {
    const container = document.getElementById('footer-container');
    if (!container) return;

    container.innerHTML = `
      <footer>
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <a href="/index.html" class="logo" style="color:#ffffff; margin-bottom: 16px; display:inline-flex;">
                <span style="color:var(--secondary-color);">⚽</span> PlaySlot
              </a>
              <p style="color: var(--text-light); font-size: 0.9rem; margin-top: 12px; max-width: 320px;">
                The ultimate sports slot booking platform inspired by District by Zomato Play.
              </p>
            </div>

            <div class="footer-col">
              <h4>Quick Links</h4>
              <ul class="footer-links">
                <li><a href="/index.html">Home</a></li>
                <li><a href="/sports.html">Sports Categories (6)</a></li>
                <li><a href="/venues.html">Explore Venues</a></li>
                <li><a href="/contact.html">Contact Support</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Supported Sports</h4>
              <ul class="footer-links">
                <li><a href="/venues.html?sport=Football+Turf">Football Turf</a></li>
                <li><a href="/venues.html?sport=Box+Cricket">Box Cricket</a></li>
                <li><a href="/venues.html?sport=Pickleball">Pickleball</a></li>
                <li><a href="/venues.html?sport=Badminton">Badminton</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Contact Info</h4>
              <ul class="footer-links">
                <li>📍 100 Feet Road, Indiranagar, Bengaluru</li>
                <li>📞 +91 98765 43210</li>
                <li>✉️ support@playslot.com</li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} PlaySlot. All rights reserved.</p>
            <div>
              <span style="color: var(--text-light); font-size:0.85rem;">Designed for Sports Enthusiasts & Turf Owners</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  logout: () => {
    PlaySlotApp.setUser(null);
    window.location.href = '/login.html?success=Logged out successfully';
  },

  // Init Homepage Components
  initHome: () => {
    const select = document.getElementById('heroSportSelect');
    if (select) {
      select.innerHTML = '<option value="All">All Sports (6)</option>';
      PlaySlotApp.sports.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.name;
        opt.textContent = `${s.icon} ${s.name}`;
        select.appendChild(opt);
      });
    }

    const dateInput = document.getElementById('heroDateInput');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Render Exactly 6 Sports Cards
    const sportsGrid = document.getElementById('homeSportsGrid');
    if (sportsGrid) {
      sportsGrid.innerHTML = PlaySlotApp.sports.map(sport => `
        <div class="sport-card">
          <div class="sport-img-wrapper">
            <img src="${sport.image}" alt="${sport.name}">
            <div class="sport-icon-badge">${sport.icon}</div>
            <div style="position:absolute; bottom:10px; left:10px;" class="badge badge-primary">${sport.categoryType}</div>
          </div>
          <div class="sport-info">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <h3 style="font-size:1.15rem; font-weight:700;">${sport.name}</h3>
              <div style="color:#D97706; font-size:0.85rem; font-weight:700;">★ ${sport.rating}</div>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">${sport.description}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-color); padding:8px 12px; border-radius:10px; margin-bottom:16px; font-size:0.82rem;">
              <span>Starting <strong>₹${sport.startingPrice}/hr</strong></span>
              <span style="color:var(--primary-color); font-weight:600;">🏟️ ${sport.venuesAvailable} Venues</span>
            </div>
            <a href="/venues.html?sport=${encodeURIComponent(sport.name)}" class="btn btn-primary" style="width:100%; padding:10px; font-size:0.9rem;">Book Now ⚡</a>
          </div>
        </div>
      `).join('');
    }

    // Render Featured Venues Cards (District by Zomato Style with Unique Images)
    const venuesGrid = document.getElementById('homeVenuesGrid');
    if (venuesGrid) {
      venuesGrid.innerHTML = PlaySlotApp.venues.map(venue => `
        <div class="venue-card">
          <div class="venue-img-wrapper">
            <img src="${venue.images[0]}" alt="${venue.name}">
            <button class="fav-btn" title="Add to Favorites">❤️</button>
            <div style="position:absolute; bottom:12px; left:12px;" class="badge badge-success">Available Today</div>
          </div>
          <div class="venue-info">
            <div class="venue-name" style="font-size:1.1rem; font-weight:700; color:#0F172A; margin-bottom:4px;">${venue.name}</div>
            <div class="venue-meta" style="font-size:0.88rem; color:#64748B; margin-bottom:12px;">
              <span>${venue.distance} • ${venue.city}</span>
            </div>
            <div style="display:flex; gap:8px; align-items:center; margin-bottom:16px;">
              <span class="badge" style="background:#F1F5F9; color:#475569; border-radius:12px; padding:4px 12px; font-size:0.8rem; font-weight:600;">${venue.sportName}</span>
              <span class="badge" style="background:#F1F5F9; color:#475569; border-radius:12px; padding:4px 12px; font-size:0.8rem; font-weight:600;">${venue.venueType}</span>
            </div>
            <div class="venue-footer">
              <div class="price-tag">
                <span class="amount">₹${venue.pricePerHour}</span>
                <span class="unit">per hour</span>
              </div>
              <a href="/venue-detail.html?id=${venue._id}" class="btn btn-primary" style="padding:10px 18px; font-size:0.88rem;">Book Slot</a>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PlaySlotApp.renderNavbar();
  PlaySlotApp.renderFooter();
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    PlaySlotApp.initHome();
  }
});
