/**
 * PLAYSlot User / Customer Controller (user.js)
 * Manages home search, catalog multi-filters, venue details, and interactive slot booking
 */
import { initNavbar, initFooter, showToast, openModal, closeModal, formatCurrency, formatDate } from './common.js';
import { Storage } from './services/storage.js';
import { VenueService } from './services/venueService.js';
import { SlotService } from './services/slotService.js';
import { BookingService } from './services/bookingService.js';
import { AuthService } from './services/authService.js';

export const UserController = {
  // =========================================================================
  // 1. Home Page Initialization
  // =========================================================================
  async initHome() {
    await initNavbar('home');
    initFooter();

    // Render 8 Sports Categories
    const sports = Storage.get('SPORTS') || [];
    const sportsGrid = document.getElementById('homeSportsGrid');
    const heroSportSelect = document.getElementById('heroSportSelect');

    if (heroSportSelect) {
      heroSportSelect.innerHTML = `<option value="All">All Sports (8)</option>` + 
        sports.map(s => `<option value="${s.name}">${s.icon} ${s.name}</option>`).join('');
    }

    if (sportsGrid) {
      sportsGrid.innerHTML = sports.map(s => `
        <a href="pages/venues.html?sport=${encodeURIComponent(s.name)}" class="sport-card">
          <div class="sport-icon-box">${s.icon}</div>
          <div class="sport-name">${s.name}</div>
          <div class="sport-count">${s.activeVenues} Venues Listed</div>
        </a>
      `).join('');
    }

    // Render Popular Venues
    const venuesGrid = document.getElementById('homeVenuesGrid');
    if (venuesGrid) {
      const venues = await VenueService.getVenues();
      venuesGrid.innerHTML = venues.slice(0, 3).map(v => this.renderVenueCard(v, '')).join('');
    }

    // Set today's date in hero date picker
    const dateInput = document.getElementById('heroDateInput');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
  },

  // =========================================================================
  // 2. Venues Listing & Search Page
  // =========================================================================
  async initVenuesCatalog() {
    await initNavbar('venues');
    initFooter();

    // Parse URL params
    const params = new URLSearchParams(window.location.search);
    const initialSport = params.get('sport') || 'All';
    const initialCity = params.get('city') || 'All';
    const initialSearch = params.get('search') || '';

    // Populate Filter Sports Checkboxes/Select
    const sports = Storage.get('SPORTS') || [];
    const sportFilterContainer = document.getElementById('filterSportsContainer');
    if (sportFilterContainer) {
      sportFilterContainer.innerHTML = `
        <label style="display:flex; align-items:center; gap:8px; margin-bottom:8px; cursor:pointer; font-size:0.9rem;">
          <input type="radio" name="filterSport" value="All" ${initialSport === 'All' ? 'checked' : ''}> All Sports
        </label>
        ${sports.map(s => `
          <label style="display:flex; align-items:center; gap:8px; margin-bottom:8px; cursor:pointer; font-size:0.9rem;">
            <input type="radio" name="filterSport" value="${s.name}" ${initialSport === s.name ? 'checked' : ''}> ${s.icon} ${s.name}
          </label>
        `).join('')}
      `;
    }

    // Set Initial values
    const searchInput = document.getElementById('catalogSearchInput');
    const citySelect = document.getElementById('catalogCitySelect');
    const priceSlider = document.getElementById('priceRangeSlider');
    const priceValue = document.getElementById('priceRangeValue');
    const sortSelect = document.getElementById('catalogSortSelect');

    if (searchInput) searchInput.value = initialSearch;
    if (citySelect) citySelect.value = initialCity;

    const loadVenues = async () => {
      const selectedSport = document.querySelector('input[name="filterSport"]:checked')?.value || 'All';
      const filters = {
        search: searchInput?.value || '',
        city: citySelect?.value || 'All',
        sport: selectedSport,
        maxPrice: priceSlider?.value || 2500,
        sortBy: sortSelect?.value || 'recommended'
      };

      const venues = await VenueService.getVenues(filters);
      const grid = document.getElementById('venuesCatalogGrid');
      const counter = document.getElementById('venuesCountDisplay');

      if (counter) counter.textContent = `Showing ${venues.length} sports arena${venues.length === 1 ? '' : 's'}`;

      if (grid) {
        if (venues.length === 0) {
          grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
              <div class="empty-state-icon">🔍</div>
              <h3>No Turfs Match Your Criteria</h3>
              <p>Try broadening your location, resetting sports filters, or increasing max price limit.</p>
              <button id="resetFiltersBtn" class="btn btn-outline" style="margin-top:16px;">Reset All Filters</button>
            </div>
          `;
          document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (citySelect) citySelect.value = 'All';
            const allRadio = document.querySelector('input[name="filterSport"][value="All"]');
            if (allRadio) allRadio.checked = true;
            if (priceSlider) { priceSlider.value = 2500; if (priceValue) priceValue.textContent = '₹2,500'; }
            loadVenues();
          });
        } else {
          grid.innerHTML = venues.map(v => this.renderVenueCard(v, '../')).join('');
        }
      }
    };

    // Event Listeners
    searchInput?.addEventListener('input', () => loadVenues());
    citySelect?.addEventListener('change', () => loadVenues());
    sortSelect?.addEventListener('change', () => loadVenues());
    document.querySelectorAll('input[name="filterSport"]').forEach(radio => {
      radio.addEventListener('change', () => loadVenues());
    });

    priceSlider?.addEventListener('input', (e) => {
      if (priceValue) priceValue.textContent = formatCurrency(e.target.value);
      loadVenues();
    });

    // Initial load
    loadVenues();
  },

  // =========================================================================
  // 3. Venue Details Page
  // =========================================================================
  async initVenueDetails() {
    await initNavbar('venues');
    initFooter();

    const params = new URLSearchParams(window.location.search);
    const venueId = params.get('id') || 'ven-1';
    const venue = await VenueService.getVenueById(venueId);

    if (!venue) {
      document.getElementById('venueDetailsContainer').innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">❌</div>
          <h2>Turf Not Found</h2>
          <p>The arena you are looking for does not exist or has been deactivated.</p>
          <a href="venues.html" class="btn btn-primary" style="margin-top:16px;">Explore Other Venues</a>
        </div>
      `;
      return;
    }

    // Populate Details
    document.title = `${venue.name} - PlaySlot`;
    document.getElementById('venueTitle').textContent = venue.name;
    document.getElementById('venueLocation').innerHTML = `📍 ${venue.area}, ${venue.city}`;
    document.getElementById('venueRating').innerHTML = `⭐ ${venue.rating} (${venue.reviewsCount} reviews)`;
    document.getElementById('venueDescription').textContent = venue.description;
    document.getElementById('venuePriceRate').textContent = `${formatCurrency(venue.hourlyRate)} / hour`;
    document.getElementById('venueTiming').textContent = `${venue.openingTime} – ${venue.closingTime}`;
    document.getElementById('venueAddress').textContent = venue.address;
    document.getElementById('venueOwnerName').textContent = venue.ownerName;
    document.getElementById('venueContact').textContent = venue.contactNumber;

    // Gallery images
    const mainImg = document.getElementById('galleryMainImg');
    const sideImg1 = document.getElementById('gallerySideImg1');
    const sideImg2 = document.getElementById('gallerySideImg2');
    if (mainImg) mainImg.src = venue.gallery[0] || venue.banner;
    if (sideImg1) sideImg1.src = venue.gallery[1] || venue.banner;
    if (sideImg2) sideImg2.src = venue.gallery[2] || venue.gallery[0] || venue.banner;

    // Sports Pills
    const sportsCont = document.getElementById('venueSportsContainer');
    if (sportsCont) {
      sportsCont.innerHTML = venue.sports.map(s => `<span class="badge badge-primary">${s}</span>`).join('');
    }

    // Facilities Chips
    const facilitiesCont = document.getElementById('venueFacilitiesContainer');
    if (facilitiesCont) {
      const facilityIcons = {
        'Parking': '🚗',
        'Washroom': '🚻',
        'Drinking Water': '💧',
        'Changing Room': '👕',
        'Flood Lights': '💡',
        'Equipment Rental': '🎾',
        'Air Conditioned': '❄️',
        'Live Scoring Screen': '📺',
        'Lounge / Cafe': '☕'
      };
      facilitiesCont.innerHTML = venue.facilities.map(f => `
        <div class="amenity-chip active">
          <span>${facilityIcons[f] || '✨'}</span>
          <span>${f}</span>
        </div>
      `).join('');
    }

    // Connect Book Button
    const bookBtn = document.getElementById('directBookBtn');
    if (bookBtn) {
      bookBtn.href = `booking.html?id=${venue.id}&sport=${encodeURIComponent(venue.sports[0])}`;
    }
  },

  // =========================================================================
  // 4. Interactive Slot Booking Page (4 States Matrix & Demo Checkout)
  // =========================================================================
  async initBookingFlow() {
    await initNavbar();
    initFooter();

    const params = new URLSearchParams(window.location.search);
    const venueId = params.get('id') || 'ven-1';
    const initialSport = params.get('sport') || '';

    const venue = await VenueService.getVenueById(venueId);
    if (!venue) {
      showToast('Invalid venue selected', 'danger');
      window.location.href = 'venues.html';
      return;
    }

    // State Tracking
    let selectedSport = initialSport || venue.sports[0];
    let selectedDate = new Date().toISOString().split('T')[0];
    let selectedSlot = null; // object { id, time, price }
    let selectedPayment = 'upi';

    // Populate Venue Summary Card
    document.getElementById('bookingVenueName').textContent = venue.name;
    document.getElementById('bookingVenueLocation').textContent = `${venue.area}, ${venue.city}`;
    document.getElementById('bookingVenueThumb').src = venue.banner;

    // Render Sports Selector
    const sportSelectEl = document.getElementById('bookingSportSelect');
    if (sportSelectEl) {
      sportSelectEl.innerHTML = venue.sports.map(s => `
        <option value="${s}" ${s === selectedSport ? 'selected' : ''}>${s}</option>
      `).join('');
      sportSelectEl.addEventListener('change', (e) => {
        selectedSport = e.target.value;
        selectedSlot = null;
        renderSlots();
        updateSummary();
      });
    }

    // Generate 7 Days Date Pills
    const datePillsCont = document.getElementById('bookingDatePills');
    if (datePillsCont) {
      const dates = [];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push({
          fullDate: d.toISOString().split('T')[0],
          dayName: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNum: d.getDate(),
          month: d.toLocaleDateString('en-US', { month: 'short' })
        });
      }

      datePillsCont.innerHTML = dates.map((d, idx) => `
        <div class="date-pill ${idx === 0 ? 'active' : ''}" data-date="${d.fullDate}">
          <div style="font-size:0.75rem; text-transform:uppercase;">${d.dayName}</div>
          <div style="font-size:1.25rem; font-weight:800; margin:2px 0;">${d.dayNum}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${d.month}</div>
        </div>
      `).join('');

      datePillsCont.querySelectorAll('.date-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          datePillsCont.querySelectorAll('.date-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          selectedDate = pill.dataset.date;
          selectedSlot = null;
          renderSlots();
          updateSummary();
        });
      });
    }

    // Render 4-State Slot Matrix
    const renderSlots = async () => {
      const slotsCont = document.getElementById('bookingSlotMatrix');
      if (!slotsCont) return;

      const slots = await SlotService.getSlots(venue.id, selectedSport);

      if (slots.length === 0) {
        slotsCont.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1; padding:30px 0;">
            <p>No slots configured for ${selectedSport} on this date.</p>
          </div>
        `;
        return;
      }

      slotsCont.innerHTML = slots.map(s => {
        let stateClass = 'state-available';
        let statusBadge = 'Available';

        if (s.status === 'BOOKED') {
          stateClass = 'state-booked';
          statusBadge = 'Booked';
        } else if (s.status === 'BLOCKED') {
          stateClass = 'state-blocked';
          statusBadge = 'Reserved';
        } else if (selectedSlot && selectedSlot.id === s.id) {
          stateClass = 'state-selected';
          statusBadge = 'Selected ✓';
        }

        return `
          <div class="slot-item ${stateClass}" data-id="${s.id}" data-time="${s.time}" data-price="${s.price}" data-status="${s.status}">
            <div class="slot-time">${s.time}</div>
            <div class="slot-price">${formatCurrency(s.price)}</div>
            <div class="slot-status-text">${statusBadge}</div>
          </div>
        `;
      }).join('');

      // Add click handlers for slots
      slotsCont.querySelectorAll('.slot-item').forEach(item => {
        item.addEventListener('click', () => {
          const status = item.dataset.status;
          if (status === 'BOOKED' || status === 'BLOCKED') {
            showToast(`This time slot is ${status.toLowerCase()} and cannot be booked.`, 'warning');
            return;
          }

          if (selectedSlot && selectedSlot.id === item.dataset.id) {
            selectedSlot = null; // deselect
          } else {
            selectedSlot = {
              id: item.dataset.id,
              time: item.dataset.time,
              price: Number(item.dataset.price)
            };
          }
          renderSlots();
          updateSummary();
        });
      });
    };

    // Summary calculation
    const updateSummary = () => {
      const summarySport = document.getElementById('summarySport');
      const summaryDate = document.getElementById('summaryDate');
      const summaryTime = document.getElementById('summaryTime');
      const summaryBasePrice = document.getElementById('summaryBasePrice');
      const summaryTaxes = document.getElementById('summaryTaxes');
      const summaryTotal = document.getElementById('summaryTotal');
      const submitBtn = document.getElementById('confirmBookingBtn');

      if (summarySport) summarySport.textContent = selectedSport;
      if (summaryDate) summaryDate.textContent = formatDate(selectedDate);
      if (summaryTime) summaryTime.textContent = selectedSlot ? selectedSlot.time : 'Please select a slot';

      const base = selectedSlot ? selectedSlot.price : 0;
      const taxes = selectedSlot ? Math.round(base * 0.05) : 0; // 5% GST
      const total = base + taxes;

      if (summaryBasePrice) summaryBasePrice.textContent = formatCurrency(base);
      if (summaryTaxes) summaryTaxes.textContent = formatCurrency(taxes);
      if (summaryTotal) summaryTotal.textContent = formatCurrency(total);

      if (submitBtn) {
        submitBtn.disabled = !selectedSlot;
        submitBtn.innerHTML = selectedSlot ? `Pay ${formatCurrency(total)} & Confirm Booking 🚀` : 'Select a Slot to Continue';
      }
    };

    // Payment Method selection
    document.querySelectorAll('.payment-option-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.payment-option-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedPayment = card.dataset.method;
      });
    });

    // Form Submission & Booking Generation
    document.getElementById('confirmBookingBtn')?.addEventListener('click', async () => {
      if (!selectedSlot) return;

      const auth = await AuthService.getCurrentAuth();
      const currentUser = auth?.user || Storage.get('USERS')[0];

      const submitBtn = document.getElementById('confirmBookingBtn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⏳ Securing Your Turf Slot...';

      try {
        const base = selectedSlot.price;
        const taxes = Math.round(base * 0.05);
        const total = base + taxes;

        const booking = await BookingService.createBooking({
          userId: currentUser.id,
          userName: currentUser.name,
          userEmail: currentUser.email,
          userPhone: currentUser.phone,
          venueId: venue.id,
          venueName: venue.name,
          venueCity: venue.city,
          ownerId: venue.ownerId,
          ownerName: venue.ownerName,
          sport: selectedSport,
          date: selectedDate,
          timeSlot: selectedSlot.time,
          amount: total,
          paymentMethod: selectedPayment.toUpperCase(),
          slotId: selectedSlot.id
        });

        showToast('🎉 Booking Confirmed Successfully!', 'success');
        setTimeout(() => {
          window.location.href = `booking-success.html?id=${booking.id}`;
        }, 600);
      } catch (err) {
        showToast(err.message || 'Failed to complete booking', 'danger');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Try Again';
      }
    });

    // Initial slot matrix render
    renderSlots();
    updateSummary();
  },

  // =========================================================================
  // 5. Booking Success Page (Match Pass)
  // =========================================================================
  async initBookingSuccess() {
    await initNavbar();
    initFooter();

    const params = new URLSearchParams(window.location.search);
    const bookingId = params.get('id') || 'BK-78901';
    const bookings = Storage.get('BOOKINGS') || [];
    const booking = bookings.find(b => b.id === bookingId) || bookings[0];

    if (!booking) {
      window.location.href = 'my-bookings.html';
      return;
    }

    document.getElementById('passBookingId').textContent = booking.id;
    document.getElementById('passVenueName').textContent = booking.venueName;
    document.getElementById('passSport').textContent = booking.sport;
    document.getElementById('passDate').textContent = formatDate(booking.date);
    document.getElementById('passTime').textContent = booking.timeSlot;
    document.getElementById('passAmount').textContent = formatCurrency(booking.amount);
    document.getElementById('passUserName').textContent = booking.userName;
    document.getElementById('passPaymentStatus').textContent = booking.paymentStatus;
    document.getElementById('passPaymentMethod').textContent = booking.paymentMethod;

    document.getElementById('printPassBtn')?.addEventListener('click', () => {
      window.print();
    });
  },

  // =========================================================================
  // 6. My Bookings Page
  // =========================================================================
  async initMyBookings() {
    await initNavbar('my-bookings');
    initFooter();

    const auth = await AuthService.getCurrentAuth();
    const currentUser = auth?.user || Storage.get('USERS')[0];

    let currentTab = 'Upcoming';

    const loadUserBookings = async () => {
      const bookings = await BookingService.getUserBookings(currentUser.id, currentTab);
      const container = document.getElementById('myBookingsList');

      if (!container) return;

      if (bookings.length === 0) {
        container.innerHTML = `
          <div class="empty-state" style="background:var(--bg-surface); border-radius:var(--radius-lg); border:1px solid var(--border-color);">
            <div class="empty-state-icon">🎟️</div>
            <h3>No ${currentTab} Bookings Found</h3>
            <p>You don't have any ${currentTab.toLowerCase()} turf reservations at the moment.</p>
            <a href="venues.html" class="btn btn-primary" style="margin-top:16px;">Browse Turfs & Book ⚡</a>
          </div>
        `;
        return;
      }

      container.innerHTML = bookings.map(b => `
        <div class="card" style="margin-bottom:18px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                <span class="badge ${b.status === 'Upcoming' ? 'badge-success' : b.status === 'Completed' ? 'badge-info' : 'badge-danger'}">
                  ${b.status}
                </span>
                <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">#${b.id}</span>
              </div>
              <h3 style="font-size:1.25rem;">${b.venueName}</h3>
              <div style="font-size:0.88rem; color:var(--text-muted);">📍 ${b.venueCity} • 🏆 ${b.sport}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:1.3rem; font-weight:800; color:var(--text-main);">${formatCurrency(b.amount)}</div>
              <div style="font-size:0.78rem; color:var(--success); font-weight:700;">● ${b.paymentStatus} (${b.paymentMethod})</div>
            </div>
          </div>

          <div style="background:var(--bg-main); padding:12px 16px; border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
            <div>📅 <strong>Date:</strong> ${formatDate(b.date)}</div>
            <div>⏱️ <strong>Time:</strong> ${b.timeSlot}</div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <a href="booking-success.html?id=${b.id}" class="btn btn-outline btn-sm">View Digital Pass 📱</a>
            ${b.status === 'Upcoming' ? `
              <button class="btn btn-danger btn-sm cancel-booking-btn" data-id="${b.id}" data-venue="${b.venueName}">
                Cancel Booking
              </button>
            ` : ''}
          </div>
        </div>
      `).join('');

      // Attach cancel handlers
      container.querySelectorAll('.cancel-booking-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const venue = btn.dataset.venue;
          if (confirm(`Are you sure you want to cancel your match reservation at ${venue}? 100% refund will be credited to your original payment method.`)) {
            BookingService.cancelBooking(id).then(() => {
              showToast('Booking cancelled & refund initiated', 'info');
              loadUserBookings();
            });
          }
        });
      });
    };

    // Tab buttons
    document.querySelectorAll('.booking-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.booking-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.dataset.tab;
        loadUserBookings();
      });
    });

    loadUserBookings();
  },

  // Helper: Card Renderer
  renderVenueCard(v, pathPrefix = '') {
    return `
      <div class="venue-card">
        <div class="venue-img-wrapper">
          <img src="${v.banner}" alt="${v.name}" class="venue-img">
          <div class="venue-badge-rating">★ ${v.rating}</div>
          <div class="venue-badge-verified">✓ Verified</div>
        </div>
        <div class="venue-content">
          <h3 class="venue-title" title="${v.name}">${v.name}</h3>
          <div class="venue-location">📍 ${v.area}, ${v.city}</div>
          <div class="venue-sports-tags">
            ${v.sports.map(s => `<span class="badge badge-primary">${s}</span>`).join('')}
          </div>
          <div class="venue-footer">
            <div class="venue-price">${formatCurrency(v.hourlyRate)} <span>/ hr</span></div>
            <div style="display:flex; gap:8px;">
              <a href="${pathPrefix}pages/venue-details.html?id=${v.id}" class="btn btn-outline btn-sm">Details</a>
              <a href="${pathPrefix}pages/booking.html?id=${v.id}&sport=${encodeURIComponent(v.sports[0])}" class="btn btn-primary btn-sm">Book ⚡</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
