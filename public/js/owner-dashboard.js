/**
 * PlaySlot Turf Owner Console Interactive Engine
 * 100% Dynamic & Isolated by ownerId
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const user = window.PlaySlotData.getCurrentUser();
  if (!user || user.role !== 'turf_owner') {
    window.location.href = '/owner/login?error=' + encodeURIComponent('Please login to access the Turf Owner Console');
    return;
  }

  // Active Owner Context
  const activeOwnerId = user.id || 'owner-1';
  const activeOwnerName = user.name || user.ownerName || 'Turf Owner';

  const ownerNameEl = document.getElementById('ownerName');
  const ownerAvatarEl = document.getElementById('ownerAvatar');
  if (ownerNameEl) ownerNameEl.textContent = activeOwnerName;
  if (ownerAvatarEl && user.avatar) ownerAvatarEl.src = user.avatar;

  let currentOwnerSection = 'dashboard'; // dashboard | turfs | add-turf | slots | bookings | earnings

  // Navigation handlers
  const navItems = document.querySelectorAll('.owner-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetSec = item.getAttribute('data-section');
      if (targetSec) {
        e.preventDefault();
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentOwnerSection = targetSec;
        renderCurrentSection();
      }
    });
  });

  // Render Section Switcher
  function renderCurrentSection() {
    const mainContainer = document.getElementById('ownerSectionContainer');
    if (!mainContainer) return;

    if (currentOwnerSection === 'dashboard') {
      renderDashboardOverview(mainContainer);
    } else if (currentOwnerSection === 'turfs') {
      renderMyTurfs(mainContainer);
    } else if (currentOwnerSection === 'add-turf') {
      renderAddTurfForm(mainContainer);
    } else if (currentOwnerSection === 'slots') {
      renderSlotManagement(mainContainer);
    } else if (currentOwnerSection === 'bookings') {
      renderOwnerBookings(mainContainer);
    } else if (currentOwnerSection === 'earnings') {
      renderOwnerEarnings(mainContainer);
    }
  }

  // --- 1. Dashboard Overview ---
  function renderDashboardOverview(container) {
    const stats = window.PlaySlotData.getOwnerStats(activeOwnerId);
    const recentBookings = window.PlaySlotData.getBookings({ ownerId: activeOwnerId }).slice(0, 5);
    const myTurfs = window.PlaySlotData.getTurfs({ ownerId: activeOwnerId }, true).slice(0, 3);

    container.innerHTML = `
      <div class="owner-header">
        <div>
          <h1 class="owner-title" style="font-size:1.8rem; font-weight:900;">🏟️ Turf Owner Console</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Manage your turf arenas, schedule slot timings, and track customer reservations</p>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <span class="badge badge-success" style="padding:6px 14px; font-size:0.85rem;">● Portal Active</span>
          <a href="/venues.html" target="_blank" class="btn btn-outline-dark btn-sm">Public Venue View ↗</a>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background:#E0F2FE; color:#0284C7;">🏟️</div>
          <div class="stat-info">
            <h4>Managed Turfs</h4>
            <div class="value">${stats.totalTurfs} Arenas</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#ECFDF5; color:#10B981;">🎟️</div>
          <div class="stat-info">
            <h4>Total Bookings</h4>
            <div class="value">${stats.totalBookings} Slots</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#FEF3C7; color:#D97706;">💰</div>
          <div class="stat-info">
            <h4>Total Revenue</h4>
            <div class="value">₹${stats.monthlyRevenue.toLocaleString()}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#F3E8FF; color:#8B5CF6;">⭐</div>
          <div class="stat-info">
            <h4>Average Rating</h4>
            <div class="value">${stats.averageRating} / 5.0</div>
          </div>
        </div>
      </div>

      <!-- Quick Action Buttons Row -->
      <div style="display:flex; gap:14px; margin-bottom:32px; flex-wrap:wrap;">
        <button onclick="window.switchOwnerNav('add-turf')" class="btn btn-primary">
          + Add New Turf Arena
        </button>
        <button onclick="window.switchOwnerNav('slots')" class="btn btn-emerald">
          ⏰ Manage Slot Schedules
        </button>
        <button onclick="window.switchOwnerNav('bookings')" class="btn btn-outline-dark">
          🎟️ View All Reservations
        </button>
      </div>

      <!-- Managed Arenas Preview Table -->
      <div class="table-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <div>
            <h3 style="font-size:1.15rem; font-weight:800;">🏟️ Managed Turf Arenas</h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">Quick summary of your listed venues on PlaySlot</p>
          </div>
          <button onclick="window.switchOwnerNav('turfs')" class="btn btn-outline-dark btn-sm">View All Turfs ➔</button>
        </div>

        <div class="table-responsive">
          <table class="owner-table">
            <thead>
              <tr>
                <th>Turf Arena</th>
                <th>Sport</th>
                <th>Location</th>
                <th>Price / Hr</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Quick Action</th>
              </tr>
            </thead>
            <tbody>
              ${myTurfs.length > 0 ? myTurfs.map(t => `
                <tr>
                  <td>
                    <div style="display:flex; gap:12px; align-items:center;">
                      <img src="${(t.images && t.images[0]) || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80'}" alt="${t.name}" style="width:50px; height:40px; border-radius:8px; object-fit:cover;">
                      <strong>${t.name}</strong>
                    </div>
                  </td>
                  <td><span class="badge badge-primary">${t.sport}</span></td>
                  <td>${t.location}, ${t.city}</td>
                  <td><strong>₹${t.pricePerHour}</strong></td>
                  <td><span class="badge badge-warning">★ ${t.rating || 5.0}</span></td>
                  <td><span class="badge ${t.status === 'Approved' ? 'badge-success' : 'badge-warning'}">${t.status}</span></td>
                  <td>
                    <button onclick="window.manageTurfSlots('${t.id}')" class="btn btn-emerald btn-sm">Manage Slots</button>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="7" style="text-align:center; padding:32px 20px; color:var(--text-muted);">
                    No turfs added yet. Click "+ Add New Turf Arena" to list your grounds.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Customer Bookings Table -->
      <div class="table-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <div>
            <h3 style="font-size:1.15rem; font-weight:800;">🎟️ Recent Customer Reservations</h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">Real-time player reservations booked on your properties</p>
          </div>
          <button onclick="window.switchOwnerNav('bookings')" class="btn btn-outline-dark btn-sm">View All Bookings ➔</button>
        </div>

        <div class="table-responsive">
          <table class="owner-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Turf Arena</th>
                <th>Date & Slot</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${recentBookings.length > 0 ? recentBookings.map(b => `
                <tr>
                  <td><strong style="color:var(--primary-color);">${b.bookingId}</strong></td>
                  <td>👤 ${b.userName}<br><span style="font-size:0.78rem; color:var(--text-muted);">${b.userPhone || ''}</span></td>
                  <td><strong>${b.turfName}</strong><br><span style="font-size:0.78rem; color:var(--text-muted);">🏆 ${b.sport}</span></td>
                  <td>📅 ${b.date}<br>⏰ <strong>${b.timeSlot}</strong></td>
                  <td><strong style="color:#059669;">₹${b.totalAmount}</strong></td>
                  <td><span class="badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}">${b.status}</span></td>
                  <td>
                    ${b.status === 'Confirmed' ? `
                      <button onclick="window.updateBookingState('${b.bookingId}', 'Completed')" class="btn btn-secondary btn-sm">Complete ✓</button>
                    ` : '<span style="color:var(--text-muted); font-size:0.85rem;">Processed</span>'}
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="7" style="text-align:center; padding:32px 20px; color:var(--text-muted);">
                    No reservations received yet
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- 2. My Turfs Section ---
  function renderMyTurfs(container) {
    const turfs = window.PlaySlotData.getTurfs({ ownerId: activeOwnerId }, true);

    container.innerHTML = `
      <div class="owner-header">
        <div>
          <h1 class="owner-title" style="font-size:1.8rem; font-weight:900;">🏟️ My Registered Turfs (${turfs.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Manage your turf properties, edit details, and configure slots</p>
        </div>
        <button onclick="window.switchOwnerNav('add-turf')" class="btn btn-primary">+ Add New Turf</button>
      </div>

      <div class="table-card">
        <div class="table-responsive">
          <table class="owner-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Turf Name</th>
                <th>Sport Category</th>
                <th>Location</th>
                <th>Rate / Hr</th>
                <th>Total Slots</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${turfs.length > 0 ? turfs.map(t => `
                <tr>
                  <td><img src="${(t.images && t.images[0]) || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80'}" alt="${t.name}" style="width:65px; height:50px; border-radius:8px; object-fit:cover;"></td>
                  <td><strong>${t.name}</strong><br><span style="font-size:0.78rem; color:var(--text-muted);">${t.turfType} Turf</span></td>
                  <td><span class="badge badge-primary">🏆 ${t.sport}</span></td>
                  <td>${t.location}, ${t.city}</td>
                  <td><strong>₹${t.pricePerHour}</strong> / hr</td>
                  <td>⚡ ${(t.slotTimings || []).length} Slots</td>
                  <td><span class="badge ${t.status === 'Approved' ? 'badge-success' : 'badge-warning'}">${t.status}</span></td>
                  <td>
                    <div style="display:flex; gap:6px;">
                      <a href="/venue-detail.html?id=${t.id}" target="_blank" class="btn btn-outline-dark btn-sm" title="View Public Page">View</a>
                      <button onclick="window.manageTurfSlots('${t.id}')" class="btn btn-emerald btn-sm">Slots</button>
                      <button onclick="window.promptDeleteTurf('${t.id}', '${t.name.replace(/'/g, "\\'")}')" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="8" style="text-align:center; padding:36px 20px; color:var(--text-muted);">
                    No turfs registered yet. Click "+ Add New Turf" to list your venue.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- 3. Add Turf Form Section (Section 8: New turf starts as Pending) ---
  function renderAddTurfForm(container, editTurfData = null) {
    const sports = window.PlaySlotData.getSports();

    container.innerHTML = `
      <div class="owner-header">
        <div>
          <h1 class="owner-title" style="font-size:1.8rem; font-weight:900;">
            ${editTurfData ? '✏️ Edit Turf Arena' : '🏟️ Register New Turf Arena'}
          </h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">
            List your sports venue on PlaySlot. New turfs undergo quick moderation review before appearing in public listings.
          </p>
        </div>
      </div>

      <div class="summary-card" style="max-width:880px;">
        <form id="ownerAddTurfForm">
          <div style="display:grid; grid-template-columns:1.5fr 1fr; gap:16px; margin-bottom:18px;">
            <div class="form-group">
              <label>Arena Name *</label>
              <input type="text" id="addTurfName" class="form-input" placeholder="e.g. Apex Champions Arena" required value="${editTurfData ? editTurfData.name : ''}">
            </div>
            <div class="form-group">
              <label>Primary Sport *</label>
              <select id="addTurfSport" class="form-select" required>
                ${sports.map(s => `<option value="${s.name}" ${editTurfData && editTurfData.sport === s.name ? 'selected' : ''}>${s.icon} ${s.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:18px;">
            <label>Short Description *</label>
            <textarea id="addTurfDesc" class="form-textarea" rows="3" placeholder="Tell athletes about your ground, lighting, turf density..." required>${editTurfData ? editTurfData.description : ''}</textarea>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:18px;">
            <div class="form-group">
              <label>City *</label>
              <select id="addTurfCity" class="form-select" required>
                <option value="Mumbai" ${editTurfData && editTurfData.city === 'Mumbai' ? 'selected' : ''}>Mumbai</option>
                <option value="Bengaluru" ${editTurfData && editTurfData.city === 'Bengaluru' ? 'selected' : ''}>Bengaluru</option>
                <option value="Delhi" ${editTurfData && editTurfData.city === 'Delhi' ? 'selected' : ''}>Delhi</option>
              </select>
            </div>
            <div class="form-group">
              <label>Neighborhood / Area *</label>
              <input type="text" id="addTurfLoc" class="form-input" placeholder="e.g. Malad West" required value="${editTurfData ? editTurfData.location : ''}">
            </div>
            <div class="form-group">
              <label>Turf Type *</label>
              <select id="addTurfType" class="form-select" required>
                <option value="Outdoor">Outdoor</option>
                <option value="Indoor">Indoor</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:18px;">
            <label>Full Address *</label>
            <input type="text" id="addTurfAddress" class="form-input" placeholder="Complete street address..." required value="${editTurfData ? editTurfData.address : ''}">
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:20px;">
            <div class="form-group">
              <label>Price Per Hour (₹) *</label>
              <input type="number" id="addTurfPrice" class="form-input" placeholder="e.g. 1400" required value="${editTurfData ? editTurfData.pricePerHour : '1200'}">
            </div>
            <div class="form-group">
              <label>Opening Time *</label>
              <input type="text" id="addTurfOpen" class="form-input" placeholder="06:00 AM" required value="${editTurfData ? editTurfData.openingTime : '06:00 AM'}">
            </div>
            <div class="form-group">
              <label>Closing Time *</label>
              <input type="text" id="addTurfClose" class="form-input" placeholder="11:00 PM" required value="${editTurfData ? editTurfData.closingTime : '11:00 PM'}">
            </div>
          </div>

          <div class="form-group" style="margin-bottom:20px;">
            <label>Turf Image URL</label>
            <input type="text" id="addTurfImage" class="form-input" placeholder="https://images.unsplash.com/..." value="${editTurfData && editTurfData.images ? editTurfData.images[0] : 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80'}">
          </div>

          <div class="form-group" style="margin-bottom:24px;">
            <label style="margin-bottom:10px;">Player Facilities Available</label>
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px;">
              <label style="display:flex; align-items:center; gap:8px; font-size:0.9rem; cursor:pointer;">
                <input type="checkbox" name="facility" value="Parking" checked> 🚗 Parking
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size:0.9rem; cursor:pointer;">
                <input type="checkbox" name="facility" value="Washroom" checked> 🚿 Washroom
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size:0.9rem; cursor:pointer;">
                <input type="checkbox" name="facility" value="Changing Room" checked> 👕 Changing Room
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size:0.9rem; cursor:pointer;">
                <input type="checkbox" name="facility" value="Drinking Water" checked> 💧 Drinking Water
              </label>
              <label style="display:flex; align-items:center; gap:8px; font-size:0.9rem; cursor:pointer;">
                <input type="checkbox" name="facility" value="Flood Lights" checked> 💡 Flood Lights
              </label>
            </div>
          </div>

          <div style="display:flex; gap:12px;">
            <button type="submit" class="btn btn-primary" style="height:48px; padding:0 28px;">
              Submit Turf for Moderation ➔
            </button>
            <button type="button" onclick="window.switchOwnerNav('turfs')" class="btn btn-outline-dark">Cancel</button>
          </div>
        </form>
      </div>
    `;

    document.getElementById('ownerAddTurfForm').addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedFacilities = Array.from(document.querySelectorAll('input[name="facility"]:checked')).map(cb => cb.value);
      const imageUrl = document.getElementById('addTurfImage').value.trim() || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80';

      const turfPayload = {
        name: document.getElementById('addTurfName').value,
        sport: document.getElementById('addTurfSport').value,
        description: document.getElementById('addTurfDesc').value,
        city: document.getElementById('addTurfCity').value,
        location: document.getElementById('addTurfLoc').value,
        address: document.getElementById('addTurfAddress').value,
        turfType: document.getElementById('addTurfType').value,
        pricePerHour: parseInt(document.getElementById('addTurfPrice').value) || 1200,
        openingTime: document.getElementById('addTurfOpen').value,
        closingTime: document.getElementById('addTurfClose').value,
        facilities: selectedFacilities,
        images: [imageUrl],
        ownerId: activeOwnerId,
        ownerName: activeOwnerName,
        // CRITICAL RULE (Section 8 & 9): New owner-created turf starts with status 'Pending'
        status: 'Pending'
      };

      const created = window.PlaySlotData.saveTurf(turfPayload);
      PlaySlotApp.showToast(`Turf "${created.name}" submitted! Status is Pending Admin Review.`, 'success');
      window.switchOwnerNav('turfs');
    });
  }

  // --- 4. Slot Management Section ---
  function renderSlotManagement(container, selectedTurfId = null) {
    const turfs = window.PlaySlotData.getTurfs({ ownerId: activeOwnerId }, true);
    const today = new Date().toISOString().split('T')[0];

    container.innerHTML = `
      <div class="owner-header">
        <div>
          <h1 class="owner-title" style="font-size:1.8rem; font-weight:900;">⏰ Slot Management & Availability Matrix</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Configure real-time slot pricing, block dates for maintenance, and open new timings</p>
        </div>
      </div>

      <!-- Select Turf & Date Filter Bar -->
      <div class="search-card" style="margin-bottom:28px;">
        <div style="display:grid; grid-template-columns:1.5fr 1fr auto auto; gap:16px; align-items:end;">
          <div class="form-group">
            <label>Select Turf Arena</label>
            <select id="slotOwnerTurfSelect" class="form-select">
              ${turfs.length > 0 ? turfs.map(t => `<option value="${t.id}" ${t.id === selectedTurfId ? 'selected' : ''}>${t.name} (${t.city})</option>`).join('') : '<option value="">No turfs available</option>'}
            </select>
          </div>

          <div class="form-group">
            <label>Schedule Date</label>
            <input type="date" id="slotOwnerDateInput" class="form-input" value="${today}">
          </div>

          <div>
            <button onclick="window.blockAllDay()" class="btn btn-outline-dark" style="height:44px;">Block Full Day</button>
          </div>
          <div>
            <button onclick="window.unblockAllDay()" class="btn btn-emerald" style="height:44px;">Open Full Day</button>
          </div>
        </div>
      </div>

      <!-- Slots Grid Matrix Container -->
      <div class="table-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <div>
            <h3 style="font-size:1.2rem; font-weight:800;">Real-Time Slot Roster</h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">Green = Available for player booking | Red = Reserved | Gray = Maintenance</p>
          </div>
        </div>

        <div class="slots-grid" id="ownerSlotGridDisplay">
          <!-- Rendered by loadSlots() -->
        </div>
      </div>
    `;

    function loadSlots() {
      const turfSelect = document.getElementById('slotOwnerTurfSelect');
      const dateInput = document.getElementById('slotOwnerDateInput');
      const slotsContainer = document.getElementById('ownerSlotGridDisplay');
      if (!slotsContainer || !turfSelect) return;

      const currentTurfId = turfSelect.value;
      const currentDate = dateInput ? dateInput.value : today;

      if (!currentTurfId) {
        slotsContainer.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:32px; color:var(--text-muted);">No turfs registered. Please add a turf first.</div>`;
        return;
      }

      const slots = window.PlaySlotData.getSlotsForTurfAndDate(currentTurfId, currentDate);

      slotsContainer.innerHTML = slots.map(slot => `
        <div class="slot-pill ${slot.status === 'Booked' ? 'disabled' : (slot.status === 'Blocked' ? 'blocked' : 'active')}">
          <div style="font-weight:700; font-size:0.92rem;">${slot.time}</div>
          <div style="font-size:0.75rem; margin-top:4px; font-weight:600;">
            ${slot.status === 'Booked' ? '🔴 Booked' : (slot.status === 'Blocked' ? '⛔ Maintenance' : '🟢 Available')}
          </div>
          <div style="margin-top:8px; display:flex; gap:6px; justify-content:center;">
            ${slot.status !== 'Booked' ? `
              ${slot.status === 'Blocked' ? `
                <button onclick="window.changeSlotState('${currentTurfId}', '${currentDate}', '${slot.time}', 'Available')" class="btn btn-emerald btn-sm">Unblock</button>
              ` : `
                <button onclick="window.changeSlotState('${currentTurfId}', '${currentDate}', '${slot.time}', 'Blocked')" class="btn btn-outline-dark btn-sm">Block</button>
              `}
            ` : '<span style="font-size:0.75rem; color:var(--text-muted);">Active Booking</span>'}
          </div>
        </div>
      `).join('');
    }

    const turfSelectEl = document.getElementById('slotOwnerTurfSelect');
    const dateInputEl = document.getElementById('slotOwnerDateInput');
    if (turfSelectEl) turfSelectEl.addEventListener('change', loadSlots);
    if (dateInputEl) dateInputEl.addEventListener('change', loadSlots);

    window.blockAllDay = () => {
      const currentTurfId = document.getElementById('slotOwnerTurfSelect')?.value;
      const currentDate = document.getElementById('slotOwnerDateInput')?.value || today;
      if (!currentTurfId) return;
      const slots = window.PlaySlotData.getSlotsForTurfAndDate(currentTurfId, currentDate);
      slots.forEach(s => {
        if (s.status !== 'Booked') {
          window.PlaySlotData.updateSlotState(currentTurfId, currentDate, s.time, 'Blocked');
        }
      });
      PlaySlotApp.showToast('All slots blocked for maintenance.', 'info');
      loadSlots();
    };

    window.unblockAllDay = () => {
      const currentTurfId = document.getElementById('slotOwnerTurfSelect')?.value;
      const currentDate = document.getElementById('slotOwnerDateInput')?.value || today;
      if (!currentTurfId) return;
      const slots = window.PlaySlotData.getSlotsForTurfAndDate(currentTurfId, currentDate);
      slots.forEach(s => {
        if (s.status !== 'Booked') {
          window.PlaySlotData.updateSlotState(currentTurfId, currentDate, s.time, 'Available');
        }
      });
      PlaySlotApp.showToast('All slots opened for booking.', 'success');
      loadSlots();
    };

    loadSlots();
  }

  window.changeSlotState = (turfId, date, time, newStatus) => {
    window.PlaySlotData.updateSlotState(turfId, date, time, newStatus);
    PlaySlotApp.showToast(`Slot timing set to ${newStatus}.`, 'success');
    renderCurrentSection();
  };

  // --- 5. Owner Bookings Section (Filtered by activeOwnerId) ---
  function renderOwnerBookings(container) {
    const bookings = window.PlaySlotData.getBookings({ ownerId: activeOwnerId });

    container.innerHTML = `
      <div class="owner-header">
        <div>
          <h1 class="owner-title" style="font-size:1.8rem; font-weight:900;">🎟️ Customer Slot Reservations (${bookings.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Full roster of confirmed, completed, and cancelled reservations for your venues</p>
        </div>
      </div>

      <div class="table-card">
        <div class="table-responsive">
          <table class="owner-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Player Customer</th>
                <th>Turf Arena</th>
                <th>Date & Slot</th>
                <th>Players</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${bookings.length > 0 ? bookings.map(b => `
                <tr>
                  <td><strong style="color:var(--primary-color);">${b.bookingId}</strong></td>
                  <td>👤 <strong>${b.userName}</strong><br><span style="font-size:0.78rem; color:var(--text-muted);">${b.userEmail} • ${b.userPhone}</span></td>
                  <td><strong>${b.turfName}</strong><br><span style="font-size:0.78rem; color:var(--text-muted);">🏆 ${b.sport}</span></td>
                  <td>📅 ${b.date}<br>⏰ <strong>${b.timeSlot}</strong></td>
                  <td>${b.playersCount || 6} Players</td>
                  <td><strong style="color:#059669; font-size:1.05rem;">₹${b.totalAmount}</strong></td>
                  <td><span class="badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}">${b.status}</span></td>
                  <td>
                    ${b.status === 'Confirmed' ? `
                      <button onclick="window.updateBookingState('${b.bookingId}', 'Completed')" class="btn btn-secondary btn-sm">Complete ✓</button>
                    ` : '<span style="color:var(--text-muted); font-size:0.85rem;">Processed</span>'}
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="8" style="text-align:center; padding:36px 20px; color:var(--text-muted);">
                    No reservations received yet for your properties
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.updateBookingState = (bookingId, status) => {
    window.PlaySlotData.updateBookingStatus(bookingId, status);
    PlaySlotApp.showToast(`Booking ${bookingId} status updated to ${status}.`, 'success');
    renderCurrentSection();
  };

  // --- 6. Owner Earnings & Analytics Section (Strictly Dynamic) ---
  function renderOwnerEarnings(container) {
    const stats = window.PlaySlotData.getOwnerStats(activeOwnerId);
    const bookings = window.PlaySlotData.getBookings({ ownerId: activeOwnerId });
    const paidBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Completed');

    // Dynamic calculations
    const todayRevenue = paidBookings
      .filter(b => window.PlaySlotData.isToday(b.date))
      .reduce((s, b) => s + (Number(b.totalAmount) || 0), 0);

    const totalGross = paidBookings.reduce((s, b) => s + (Number(b.totalAmount) || 0), 0);

    container.innerHTML = `
      <div class="owner-header">
        <div>
          <h1 class="owner-title" style="font-size:1.8rem; font-weight:900;">💰 Earnings & Financial Reports</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Track gross booking receipts and payout history for your arenas</p>
        </div>
        <button onclick="PlaySlotApp.showToast('Payout statement dispatched to your registered email! ✉️')" class="btn btn-outline-dark">
          Export Financial Report 📄
        </button>
      </div>

      <!-- Earnings Stat Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background:#ECFDF5; color:#10B981;">📅</div>
          <div class="stat-info">
            <h4>Today's Earnings</h4>
            <div class="value">₹${todayRevenue.toLocaleString()}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#E0F2FE; color:#0284C7;">📈</div>
          <div class="stat-info">
            <h4>Completed Bookings</h4>
            <div class="value">${paidBookings.length} Slots</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#FEF3C7; color:#D97706;">💰</div>
          <div class="stat-info">
            <h4>Gross Volume</h4>
            <div class="value">₹${totalGross.toLocaleString()}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#F3E8FF; color:#8B5CF6;">🏦</div>
          <div class="stat-info">
            <h4>Net Earnings</h4>
            <div class="value">₹${Math.round(totalGross * 0.92).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div class="table-card">
        <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:16px;">Booking Payout Ledger</h3>
        <div class="table-responsive">
          <table class="owner-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Date</th>
                <th>Turf Arena</th>
                <th>Gross Amount</th>
                <th>Platform Fee (8%)</th>
                <th>Your Payout (92%)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${paidBookings.length > 0 ? paidBookings.map(b => {
                const amt = Number(b.totalAmount) || 0;
                const fee = Math.round(amt * 0.08);
                const net = amt - fee;
                return `
                  <tr>
                    <td><strong>${b.bookingId}</strong></td>
                    <td>${b.date}</td>
                    <td>${b.turfName}</td>
                    <td><strong style="color:#059669;">₹${amt.toLocaleString()}</strong></td>
                    <td>₹${fee}</td>
                    <td><strong>₹${net.toLocaleString()}</strong></td>
                    <td><span class="badge badge-success">Settled</span></td>
                  </tr>
                `;
              }).join('') : `
                <tr>
                  <td colspan="7" style="text-align:center; padding:32px; color:var(--text-muted);">
                    No revenue transactions processed yet
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Global helpers for owner
  window.manageTurfSlots = (turfId) => {
    window.switchOwnerNav('slots');
    setTimeout(() => {
      const turfSelect = document.getElementById('slotOwnerTurfSelect');
      if (turfSelect) {
        turfSelect.value = turfId;
        turfSelect.dispatchEvent(new Event('change'));
      }
    }, 100);
  };

  window.promptDeleteTurf = (turfId, turfName) => {
    if (confirm(`Are you sure you want to remove "${turfName}" from your turf listings?`)) {
      window.PlaySlotData.deleteTurf(turfId);
      PlaySlotApp.showToast(`Turf "${turfName}" removed.`, 'success');
      renderCurrentSection();
    }
  };

  window.switchOwnerNav = (secName) => {
    currentOwnerSection = secName;
    navItems.forEach(i => {
      if (i.getAttribute('data-section') === secName) i.classList.add('active');
      else i.classList.remove('active');
    });
    renderCurrentSection();
  };

  renderCurrentSection();
});
