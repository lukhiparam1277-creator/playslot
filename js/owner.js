/**
 * PLAYSlot Turf Owner Portal Controller (owner.js)
 * Multi-owner SaaS dashboard, venue CRUD, slot schedule matrix, and revenue charts
 */
import { initOwnerSidebar, showToast, openModal, closeModal, formatCurrency, formatDate } from './common.js';
import { Storage } from './services/storage.js';
import { AuthService } from './services/authService.js';
import { VenueService } from './services/venueService.js';
import { SlotService } from './services/slotService.js';
import { BookingService } from './services/bookingService.js';
import { OwnerService } from './services/ownerService.js';

export const OwnerController = {
  // =========================================================================
  // 1. Owner Dashboard
  // =========================================================================
  async initDashboard() {
    await initOwnerSidebar('dashboard');
    const auth = await AuthService.getCurrentAuth();
    const currentOwner = auth?.owner || Storage.get('OWNERS')[0];

    // Header greeting
    document.getElementById('ownerWelcomeName').textContent = currentOwner.name;
    document.getElementById('ownerBusinessName').textContent = currentOwner.businessName;

    // Load KPIs
    const metrics = await OwnerService.getOwnerMetrics(currentOwner.id);
    document.getElementById('kpiVenues').textContent = metrics.totalVenues;
    document.getElementById('kpiTodayBookings').textContent = metrics.todaysBookings;
    document.getElementById('kpiUpcomingBookings').textContent = metrics.upcomingBookings;
    document.getElementById('kpiMonthlyRev').textContent = formatCurrency(metrics.monthlyRevenue);

    // Load Recent Bookings
    const bookings = await BookingService.getOwnerBookings(currentOwner.id);
    const tbody = document.getElementById('recentBookingsTbody');
    if (tbody) {
      if (bookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding:24px; color:var(--text-muted);">No bookings received yet for your venues.</td></tr>`;
      } else {
        tbody.innerHTML = bookings.slice(0, 5).map(b => `
          <tr>
            <td><strong>#${b.id}</strong></td>
            <td>${b.userName}</td>
            <td>${b.venueName}</td>
            <td>${formatDate(b.date)} (${b.timeSlot})</td>
            <td><strong>${formatCurrency(b.amount)}</strong></td>
            <td><span class="badge ${b.status === 'Upcoming' ? 'badge-success' : b.status === 'Completed' ? 'badge-info' : 'badge-danger'}">${b.status}</span></td>
            <td>
              <button class="btn btn-outline btn-sm view-booking-btn" data-id="${b.id}">View</button>
            </td>
          </tr>
        `).join('');
      }
    }
  },

  // =========================================================================
  // 2. Owner Venues List
  // =========================================================================
  async initVenuesList() {
    await initOwnerSidebar('venues');
    const auth = await AuthService.getCurrentAuth();
    const currentOwner = auth?.owner || Storage.get('OWNERS')[0];

    const loadVenues = async () => {
      const venues = await VenueService.getVenuesByOwner(currentOwner.id);
      const container = document.getElementById('ownerVenuesGrid');
      if (!container) return;

      if (venues.length === 0) {
        container.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1; background:var(--bg-surface); padding:40px; border-radius:var(--radius-lg); border:1px solid var(--border-color);">
            <div class="empty-state-icon">🏟️</div>
            <h3>No Venues Listed</h3>
            <p>You have not added any sports turfs or arenas under ${currentOwner.businessName} yet.</p>
            <a href="add-venue.html" class="btn btn-primary" style="margin-top:16px;">Add Your First Venue +</a>
          </div>
        `;
        return;
      }

      container.innerHTML = venues.map(v => `
        <div class="card" style="display:flex; flex-direction:column; gap:14px;">
          <div style="position:relative; height:180px; border-radius:var(--radius-md); overflow:hidden;">
            <img src="${v.banner}" alt="${v.name}" style="width:100%; height:100%; object-fit:cover;">
            <span class="badge ${v.status === 'Active' ? 'badge-success' : 'badge-danger'}" style="position:absolute; top:12px; right:12px;">
              ${v.status}
            </span>
          </div>

          <div>
            <h3 style="font-size:1.2rem; margin-bottom:4px;">${v.name}</h3>
            <div style="font-size:0.85rem; color:var(--text-muted);">📍 ${v.address}</div>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${v.sports.map(s => `<span class="badge badge-secondary">${s}</span>`).join('')}
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:12px; margin-top:auto;">
            <div style="font-weight:800; font-size:1.1rem;">${formatCurrency(v.hourlyRate)} <span style="font-size:0.8rem; font-weight:500; color:var(--text-muted);">/ hr</span></div>
            <div style="display:flex; gap:6px;">
              <a href="edit-venue.html?id=${v.id}" class="btn btn-outline btn-sm">Edit ✏️</a>
              <button class="btn btn-secondary btn-sm toggle-status-btn" data-id="${v.id}">
                ${v.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
              <button class="btn btn-danger btn-sm delete-venue-btn" data-id="${v.id}" data-name="${v.name}">🗑️</button>
            </div>
          </div>
        </div>
      `).join('');

      // Attach Toggle & Delete handlers
      container.querySelectorAll('.toggle-status-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const newStatus = await VenueService.toggleVenueStatus(btn.dataset.id);
          showToast(`Venue status updated to ${newStatus}`, 'info');
          loadVenues();
        });
      });

      container.querySelectorAll('.delete-venue-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (confirm(`Are you sure you want to permanently delete "${btn.dataset.name}"?`)) {
            await VenueService.deleteVenue(btn.dataset.id);
            showToast('Venue deleted from platform', 'danger');
            loadVenues();
          }
        });
      });
    };

    loadVenues();
  },

  // =========================================================================
  // 3. Add & Edit Venue Form
  // =========================================================================
  async initVenueForm(isEdit = false) {
    await initOwnerSidebar('venues');
    const auth = await AuthService.getCurrentAuth();
    const currentOwner = auth?.owner || Storage.get('OWNERS')[0];

    const params = new URLSearchParams(window.location.search);
    const venueId = params.get('id');

    let existingVenue = null;
    if (isEdit && venueId) {
      existingVenue = await VenueService.getVenueById(venueId);
      if (existingVenue) {
        document.getElementById('formTitle').textContent = `Edit Venue: ${existingVenue.name}`;
        document.getElementById('venueNameInput').value = existingVenue.name;
        document.getElementById('venueCitySelect').value = existingVenue.city;
        document.getElementById('venueAreaInput').value = existingVenue.area;
        document.getElementById('venueAddressInput').value = existingVenue.address;
        document.getElementById('venueRateInput').value = existingVenue.hourlyRate;
        document.getElementById('venueOpenTimeInput').value = existingVenue.openingTime;
        document.getElementById('venueCloseTimeInput').value = existingVenue.closingTime;
        document.getElementById('venuePhoneInput').value = existingVenue.contactNumber;
        document.getElementById('venueBannerInput').value = existingVenue.banner;
        document.getElementById('venueDescInput').value = existingVenue.description;

        // Check sports checkboxes
        document.querySelectorAll('input[name="venueSports"]').forEach(cb => {
          cb.checked = existingVenue.sports.includes(cb.value);
        });

        // Check facilities
        document.querySelectorAll('input[name="venueFacilities"]').forEach(cb => {
          cb.checked = existingVenue.facilities.includes(cb.value);
        });
      }
    }

    // Form Submit
    document.getElementById('venueForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const selectedSports = Array.from(document.querySelectorAll('input[name="venueSports"]:checked')).map(c => c.value);
      const selectedFacilities = Array.from(document.querySelectorAll('input[name="venueFacilities"]:checked')).map(c => c.value);

      if (selectedSports.length === 0) {
        showToast('Please select at least one sport category', 'warning');
        return;
      }

      const venueData = {
        name: document.getElementById('venueNameInput').value,
        city: document.getElementById('venueCitySelect').value,
        area: document.getElementById('venueAreaInput').value,
        address: document.getElementById('venueAddressInput').value,
        hourlyRate: Number(document.getElementById('venueRateInput').value),
        openingTime: document.getElementById('venueOpenTimeInput').value,
        closingTime: document.getElementById('venueCloseTimeInput').value,
        contactNumber: document.getElementById('venuePhoneInput').value,
        banner: document.getElementById('venueBannerInput').value || 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop&q=80',
        description: document.getElementById('venueDescInput').value,
        sports: selectedSports,
        facilities: selectedFacilities,
        ownerId: currentOwner.id,
        ownerName: currentOwner.businessName
      };

      if (isEdit && venueId) {
        await VenueService.updateVenue(venueId, venueData);
        showToast('Venue updated successfully! 🎉', 'success');
      } else {
        await VenueService.addVenue(venueData);
        showToast('New venue listed successfully! 🚀', 'success');
      }

      setTimeout(() => window.location.href = 'venues.html', 500);
    });
  },

  // =========================================================================
  // 4. Owner Slots Matrix Manager
  // =========================================================================
  async initSlotsManager() {
    await initOwnerSidebar('slots');
    const auth = await AuthService.getCurrentAuth();
    const currentOwner = auth?.owner || Storage.get('OWNERS')[0];

    const venues = await VenueService.getVenuesByOwner(currentOwner.id);
    const venueSelect = document.getElementById('slotVenueSelect');
    const sportSelect = document.getElementById('slotSportSelect');

    if (venueSelect) {
      if (venues.length === 0) {
        venueSelect.innerHTML = `<option value="">No Venues Available</option>`;
      } else {
        venueSelect.innerHTML = venues.map(v => `<option value="${v.id}">${v.name}</option>`).join('');
      }
    }

    const updateSportsDropdown = () => {
      const selectedVenueId = venueSelect?.value;
      const v = venues.find(item => item.id === selectedVenueId);
      if (v && sportSelect) {
        sportSelect.innerHTML = `<option value="All">All Sports</option>` + v.sports.map(s => `<option value="${s}">${s}</option>`).join('');
      }
    };

    venueSelect?.addEventListener('change', () => {
      updateSportsDropdown();
      loadSlotsTable();
    });
    sportSelect?.addEventListener('change', () => loadSlotsTable());

    const loadSlotsTable = async () => {
      const selectedVenueId = venueSelect?.value;
      const selectedSport = sportSelect?.value || 'All';
      const slots = await SlotService.getSlots(selectedVenueId, selectedSport);

      const tbody = document.getElementById('ownerSlotsTbody');
      if (!tbody) return;

      if (slots.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding:24px;">No slots found for this venue and sport.</td></tr>`;
        return;
      }

      tbody.innerHTML = slots.map(s => `
        <tr>
          <td><strong>${s.time}</strong></td>
          <td>${s.sport}</td>
          <td>${s.period}</td>
          <td><strong>${formatCurrency(s.price)}</strong></td>
          <td>
            <span class="badge ${s.status === 'AVAILABLE' ? 'badge-success' : s.status === 'BOOKED' ? 'badge-info' : 'badge-danger'}">
              ${s.status}
            </span>
          </td>
          <td>
            <button class="btn btn-outline btn-sm toggle-slot-btn" data-id="${s.id}" data-status="${s.status}">
              ${s.status === 'BLOCKED' ? 'Unblock' : s.status === 'AVAILABLE' ? 'Block Slot' : 'View'}
            </button>
            <button class="btn btn-danger btn-sm delete-slot-btn" data-id="${s.id}">🗑️</button>
          </td>
        </tr>
      `).join('');

      // Attach Toggle & Delete handlers
      tbody.querySelectorAll('.toggle-slot-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const current = btn.dataset.status;
          if (current === 'BOOKED') {
            showToast('Slot is already booked by a customer', 'warning');
            return;
          }
          const next = current === 'BLOCKED' ? 'AVAILABLE' : 'BLOCKED';
          await SlotService.updateSlotStatus(btn.dataset.id, next);
          showToast(`Slot status changed to ${next}`, 'info');
          loadSlotsTable();
        });
      });

      tbody.querySelectorAll('.delete-slot-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (confirm('Delete this slot?')) {
            await SlotService.deleteSlot(btn.dataset.id);
            showToast('Slot deleted', 'danger');
            loadSlotsTable();
          }
        });
      });
    };

    // Add New Slot Modal
    document.getElementById('openAddSlotModalBtn')?.addEventListener('click', () => {
      openModal('addSlotModal');
    });

    document.getElementById('addSlotForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const selectedVenueId = venueSelect?.value;
      const v = venues.find(item => item.id === selectedVenueId);

      await SlotService.addSlot({
        venueId: selectedVenueId,
        sport: document.getElementById('newSlotSportInput').value || (v ? v.sports[0] : 'Football'),
        time: document.getElementById('newSlotTimeInput').value,
        period: document.getElementById('newSlotPeriodSelect').value,
        price: Number(document.getElementById('newSlotPriceInput').value),
        status: 'AVAILABLE'
      });

      closeModal('addSlotModal');
      showToast('New slot scheduled successfully!', 'success');
      loadSlotsTable();
    });

    updateSportsDropdown();
    loadSlotsTable();
  },

  // =========================================================================
  // 5. Owner Bookings Ledger
  // =========================================================================
  async initBookingsLedger() {
    await initOwnerSidebar('bookings');
    const auth = await AuthService.getCurrentAuth();
    const currentOwner = auth?.owner || Storage.get('OWNERS')[0];

    const statusFilter = document.getElementById('bookingStatusFilter');
    const searchInput = document.getElementById('bookingSearchInput');

    const loadBookings = async () => {
      const bookings = await BookingService.getOwnerBookings(currentOwner.id, {
        status: statusFilter?.value || 'All'
      });

      const q = searchInput?.value.trim().toLowerCase() || '';
      const filtered = q ? bookings.filter(b => 
        b.userName.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.venueName.toLowerCase().includes(q)
      ) : bookings;

      const tbody = document.getElementById('ownerBookingsTbody');
      if (!tbody) return;

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding:24px;">No match reservations found.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map(b => `
        <tr>
          <td><strong>#${b.id}</strong></td>
          <td>
            <div style="font-weight:700;">${b.userName}</div>
            <div style="font-size:0.78rem; color:var(--text-muted);">${b.userPhone}</div>
          </td>
          <td>${b.venueName}</td>
          <td>${b.sport}</td>
          <td>${formatDate(b.date)}</td>
          <td>${b.timeSlot}</td>
          <td><strong>${formatCurrency(b.amount)}</strong></td>
          <td>
            <span class="badge ${b.status === 'Upcoming' ? 'badge-success' : b.status === 'Completed' ? 'badge-info' : 'badge-danger'}">
              ${b.status}
            </span>
          </td>
        </tr>
      `).join('');
    };

    statusFilter?.addEventListener('change', () => loadBookings());
    searchInput?.addEventListener('input', () => loadBookings());

    loadBookings();
  },

  // =========================================================================
  // 6. Owner Revenue & Analytics
  // =========================================================================
  async initRevenue() {
    await initOwnerSidebar('revenue');
    const auth = await AuthService.getCurrentAuth();
    const currentOwner = auth?.owner || Storage.get('OWNERS')[0];

    const metrics = await OwnerService.getOwnerMetrics(currentOwner.id);
    const stats = await OwnerService.getRevenueStats(currentOwner.id);

    document.getElementById('revMonthlyTotal').textContent = formatCurrency(metrics.monthlyRevenue);
    document.getElementById('revDailyAvg').textContent = formatCurrency(stats.dailyRevenue);
    document.getElementById('revAvgTicket').textContent = formatCurrency(metrics.averageTicket);

    // Render SVG / CSS Bar Chart
    const chartWrapper = document.getElementById('revenueBarChart');
    if (chartWrapper) {
      chartWrapper.innerHTML = stats.chartData.map(c => `
        <div class="chart-bar-col">
          <div class="chart-bar-pillar" style="height:${c.height};" data-tooltip="${formatCurrency(c.amount)}"></div>
          <div class="chart-bar-label">${c.label}</div>
        </div>
      `).join('');
    }
  }
};
