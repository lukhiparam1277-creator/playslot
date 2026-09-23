/**
 * PlaySlot Turf Owner Console Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const user = window.PlaySlotData.getCurrentUser();
  if (!user || user.role !== 'turf_owner') {
    window.location.href = '/owner/login?error=' + encodeURIComponent('Please login to access the Turf Owner Console');
    return;
  }

  const ownerNameEl = document.getElementById('ownerName');
  const ownerAvatarEl = document.getElementById('ownerAvatar');
  if (ownerNameEl && user) ownerNameEl.textContent = user.name || 'Vikram Malhotra';
  if (ownerAvatarEl && user && user.avatar) ownerAvatarEl.src = user.avatar;

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
    const stats = window.PlaySlotData.getOwnerStats('owner-1');
    const recentBookings = window.PlaySlotData.getBookings({ ownerId: 'owner-1' }).slice(0, 5);
    const myTurfs = window.PlaySlotData.getTurfs({ ownerId: 'owner-1' }).slice(0, 3);

    container.innerHTML = `
      <div class="owner-header">
        <div>
          <h1 class="owner-title" style="font-size:1.8rem; font-weight:900;">🏟️ Turf Owner Console</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Manage your turf arenas, schedule slot timings, and track customer reservations</p>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <span class="badge badge-success" style="padding:6px 14px; font-size:0.85rem;">● Accepting Bookings Live</span>
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
            <h4>Upcoming Bookings</h4>
            <div class="value">${stats.upcomingBookings} Slots</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#FEF3C7; color:#D97706;">💰</div>
          <div class="stat-info">
            <h4>Monthly Revenue</h4>
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
            <h3 style="font-size:1.15rem; font-weight:800;">🏟️ Active Turf Arenas</h3>
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
              ${myTurfs.map(t => `
                <tr>
                  <td>
                    <div style="display:flex; gap:12px; align-items:center;">
                      <img src="${t.images[0]}" alt="${t.name}" style="width:50px; height:40px; border-radius:8px; object-fit:cover;">
                      <strong>${t.name}</strong>
                    </div>
                  </td>
                  <td><span class="badge badge-primary">${t.sport}</span></td>
                  <td>${t.location}, ${t.city}</td>
                  <td><strong>₹${t.pricePerHour}</strong></td>
                  <td><span class="badge badge-warning">★ ${t.rating}</span></td>
                  <td><span class="badge ${t.status === 'Approved' ? 'badge-success' : 'badge-warning'}">${t.status}</span></td>
                  <td>
                    <button onclick="window.manageTurfSlots('${t.id}')" class="btn btn-emerald btn-sm">Manage Slots</button>
                  </td>
                </tr>
              `).join('')}
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
              ${recentBookings.map(b => `
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
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- 2. My Turfs Section (CRUD) ---
  function renderMyTurfs(container) {
    const turfs = window.PlaySlotData.getTurfs({ ownerId: 'owner-1' });

    container.innerHTML = `
      <div class="owner-header">
        <div>
          <h1 class="owner-title" style="font-size:1.8rem; font-weight:900;">🏟️ My Registered Turfs (${turfs.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Manage your active turf properties, edit details, and configure slots</p>
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
              ${turfs.map(t => `
                <tr>
                  <td><img src="${t.images[0]}" alt="${t.name}" style="width:65px; height:50px; border-radius:8px; object-fit:cover;"></td>
                  <td><strong>${t.name}</strong><br><span style="font-size:0.78rem; color:var(--text-muted);">${t.turfType} Turf</span></td>
                  <td><span class="badge badge-primary">🏆 ${t.sport}</span></td>
                  <td>${t.location}, ${t.city}</td>
                  <td><strong>₹${t.pricePerHour}</strong> / hr</td>
                  <td>⚡ ${t.slotTimings ? t.slotTimings.length : 7} Slots</td>
                  <td><span class="badge ${t.status === 'Approved' ? 'badge-success' : 'badge-warning'}">${t.status}</span></td>
                  <td>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                      <a href="/venue-detail.html?id=${t.id}" target="_blank" class="btn btn-outline-dark btn-sm" title="View Public Page">View</a>
                      <button onclick="window.editOwnerTurf('${t.id}')" class="btn btn-primary btn-sm">Edit</button>
                      <button onclick="window.manageTurfSlots('${t.id}')" class="btn btn-emerald btn-sm">Slots</button>
                      <button onclick="window.promptDeleteTurf('${t.id}', '${t.name.replace(/'/g, "\\'")}')" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.editOwnerTurf = (turfId) => {
    const turf = window.PlaySlotData.getTurfById(turfId);
    if (!turf) return;
    currentOwnerSection = 'add-turf';
    navItems.forEach(i => {
      if (i.getAttribute('data-section') === 'add-turf') i.classList.add('active');
      else i.classList.remove('active');
    });
    renderAddTurfForm(document.getElementById('ownerSectionContainer'), turf);
  };

  // --- 3. Add / Edit Turf Form Section (CRUD) ---
  function renderAddTurfForm(container, editTurfData = null) {
    const sports = window.PlaySlotData.getSports();

    container.innerHTML = `
      <div class="owner-header">
        <div>
          <h1 class="owner-title" style="font-size:1.8rem; font-weight:900;">
            ${editTurfData ? '✏️ Edit Turf Arena: ' + editTurfData.name : '🏟️ Register New Turf Arena'}
          </h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">
            ${editTurfData ? 'Update your arena specifications, pricing, amenities, and timings' : 'List your sports venue on PlaySlot with instant slot booking for thousands of players'}
          </p>
        </div>
        <button onclick="window.switchOwnerNav('turfs')" class="btn btn-outline-dark">Cancel</button>
      </div>

      <div class="summary-card" style="max-width:900px;">
        <form id="ownerAddTurfForm">
          <input type="hidden" id="editTurfId" value="${editTurfData ? editTurfData.id : ''}">
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:18px;">
            <div class="form-group">
              <label>Turf Name *</label>
              <input type="text" id="addTurfName" class="form-input" placeholder="e.g. Thunderbolts Sports Arena" required value="${editTurfData ? editTurfData.name : ''}">
            </div>
            <div class="form-group">
              <label>Primary Sport *</label>
              <select id="addTurfSport" class="form-select" required>
                ${sports.map(s => `<option value="${s.name}" ${editTurfData && editTurfData.sport === s.name ? 'selected' : ''}>${s.icon} ${s.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:18px;">
            <label>Turf Description *</label>
            <textarea id="addTurfDesc" class="form-textarea" rows="3" placeholder="Describe your ground, artificial grass quality, dimensions, lighting..." required>${editTurfData ? editTurfData.description : ''}</textarea>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:18px;">
            <div class="form-group">
              <label>City *</label>
              <select id="addTurfCity" class="form-select" required>
                <option value="Mumbai" ${editTurfData && editTurfData.city === 'Mumbai' ? 'selected' : ''}>Mumbai</option>
                <option value="Bengaluru" ${editTurfData && editTurfData.city === 'Bengaluru' ? 'selected' : ''}>Bengaluru</option>
                <option value="Delhi" ${editTurfData && editTurfData.city === 'Delhi' ? 'selected' : ''}>Delhi / Gurugram</option>
                <option value="Pune" ${editTurfData && editTurfData.city === 'Pune' ? 'selected' : ''}>Pune</option>
                <option value="Hyderabad" ${editTurfData && editTurfData.city === 'Hyderabad' ? 'selected' : ''}>Hyderabad</option>
              </select>
            </div>
            <div class="form-group">
              <label>Area / Locality *</label>
              <input type="text" id="addTurfLoc" class="form-input" placeholder="e.g. Andheri West" required value="${editTurfData ? editTurfData.location : ''}">
            </div>
            <div class="form-group">
              <label>Turf Type *</label>
              <select id="addTurfType" class="form-select" required>
                <option value="Outdoor" ${editTurfData && editTurfData.turfType === 'Outdoor' ? 'selected' : ''}>Outdoor</option>
                <option value="Indoor" ${editTurfData && editTurfData.turfType === 'Indoor' ? 'selected' : ''}>Indoor</option>
                <option value="Covered Box" ${editTurfData && editTurfData.turfType === 'Covered Box' ? 'selected' : ''}>Covered Box</option>
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
              ${['Parking', 'Washroom', 'Changing Room', 'Drinking Water', 'Flood Lights', 'Seating', 'Equipment Rental'].map(fac => `
                <label style="display:flex; align-items:center; gap:8px; font-size:0.9rem; cursor:pointer;">
                  <input type="checkbox" name="facility" value="${fac}" ${!editTurfData || (editTurfData.facilities && editTurfData.facilities.includes(fac)) ? 'checked' : ''}>
                  ${fac}
                </label>
              `).join('')}
            </div>
          </div>

          <div style="display:flex; gap:14px;">
            <button type="submit" class="btn btn-emerald btn-lg" style="flex:1;">
              ${editTurfData ? 'Save Changes ⚡' : 'Register Turf Arena ⚡'}
            </button>
            <button type="button" onclick="window.switchOwnerNav('turfs')" class="btn btn-outline-dark btn-lg">
              Cancel
            </button>
          </div>
        </form>
      </div>
    `;

    document.getElementById('ownerAddTurfForm').addEventListener('submit', (e) => {
      e.preventDefault();

      const editId = document.getElementById('editTurfId').value;
      const selectedFacilities = Array.from(document.querySelectorAll('input[name="facility"]:checked')).map(cb => cb.value);
      const imageUrl = document.getElementById('addTurfImage').value.trim() || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80';
      const name = document.getElementById('addTurfName').value.trim();
      const sport = document.getElementById('addTurfSport').value;
      const city = document.getElementById('addTurfCity').value;
      const location = document.getElementById('addTurfLoc').value.trim();
      const address = document.getElementById('addTurfAddress').value.trim();

      const turfPayload = {
        name,
        sport,
        sportsAvailable: [sport],
        description: document.getElementById('addTurfDesc').value,
        city,
        location,
        address: address || `${location}, ${city}`,
        turfType: document.getElementById('addTurfType').value,
        pricePerHour: parseInt(document.getElementById('addTurfPrice').value) || 1200,
        openingTime: document.getElementById('addTurfOpen').value,
        closingTime: document.getElementById('addTurfClose').value,
        facilities: selectedFacilities,
        images: [imageUrl],
        ownerId: 'owner-1',
        ownerName: 'Vikram Malhotra',
        status: 'Approved'
      };

      if (editId) {
        window.PlaySlotData.updateTurf(editId, turfPayload);
        PlaySlotApp.showToast(`Turf "${name}" updated successfully!`, 'success');
      } else {
        window.PlaySlotData.saveTurf(turfPayload);
        PlaySlotApp.showToast(`Turf "${name}" created successfully!`, 'success');
      }

      window.switchOwnerNav('turfs');
    });
  }

  // --- 4. Slot Management Section (CRUD) ---
  function renderSlotManagement(container, selectedTurfId = 'turf-1') {
    const turfs = window.PlaySlotData.getTurfs({ ownerId: 'owner-1' });
    const today = new Date().toISOString().split('T')[0];

    container.innerHTML = `
      <div class="owner-header">
        <div>
          <h1 class="owner-title" style="font-size:1.8rem; font-weight:900;">⏰ Slot Management & Availability Matrix</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Configure real-time slot pricing, create custom slots, and block dates for maintenance</p>
        </div>
      </div>

      <!-- Select Turf & Date Filter Bar -->
      <div class="search-card" style="margin-bottom:28px;">
        <div style="display:grid; grid-template-columns:1.5fr 1fr auto; gap:16px; align-items:end;">
          <div class="form-group">
            <label>Select Turf Arena</label>
            <select id="slotOwnerTurfSelect" class="form-select">
              ${turfs.map(t => `<option value="${t.id}" ${t.id === selectedTurfId ? 'selected' : ''}>${t.name} (${t.sport})</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label>Select Date</label>
            <input type="date" id="slotOwnerDateInput" class="form-input" value="${today}" min="${today}">
          </div>

          <button id="addCustomSlotBtn" class="btn btn-primary" style="height:48px;">
            + Add Custom Slot
          </button>
        </div>
      </div>

      <!-- Slots Grid Matrix Container -->
      <div class="table-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <h3 style="font-size:1.15rem; font-weight:800;">Slot Matrix for Selected Date</h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">Edit slot price, toggle status (Available/Blocked), or remove timing</p>
          </div>
          <div style="display:flex; gap:10px; font-size:0.82rem;">
            <span class="badge badge-success">● Available</span>
            <span class="badge badge-danger">● Booked</span>
            <span class="badge badge-dark">● Blocked / Maintenance</span>
          </div>
        </div>

        <div id="ownerSlotGridDisplay" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:16px;">
          <!-- Rendered by loadSlots() -->
        </div>
      </div>
    `;

    function loadSlots() {
      const activeTurfId = document.getElementById('slotOwnerTurfSelect').value;
      const activeDate = document.getElementById('slotOwnerDateInput').value;
      const slotsContainer = document.getElementById('ownerSlotGridDisplay');
      if (!slotsContainer) return;

      const slots = window.PlaySlotData.getSlotsForTurfAndDate(activeTurfId, activeDate);

      slotsContainer.innerHTML = slots.map(slot => `
        <div style="background:var(--bg-color); border:1.5px solid ${slot.status === 'Available' ? '#A7F3D0' : (slot.status === 'Booked' ? '#FECACA' : '#CBD5E1')}; padding:16px; border-radius:12px; display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size:0.95rem;">⏰ ${slot.time}</strong>
            <span class="badge ${slot.status === 'Available' ? 'badge-success' : (slot.status === 'Booked' ? 'badge-danger' : 'badge-dark')}">${slot.status}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
            <span style="font-size:0.9rem; font-weight:700; color:var(--primary-color);">₹${slot.price} / hr</span>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button onclick="window.promptEditOwnerSlot('${activeTurfId}', '${activeDate}', '${slot.time}', ${slot.price}, '${slot.status}')" class="btn btn-outline-dark btn-sm" title="Edit slot">Edit</button>
              ${slot.status === 'Available' ? `
                <button onclick="window.changeSlotState('${activeTurfId}', '${activeDate}', '${slot.time}', 'Blocked')" class="btn btn-warning btn-sm" title="Block for maintenance">Block</button>
              ` : (slot.status === 'Blocked' ? `
                <button onclick="window.changeSlotState('${activeTurfId}', '${activeDate}', '${slot.time}', 'Available')" class="btn btn-emerald btn-sm">Unblock</button>
              ` : '')}
              <button onclick="window.promptDeleteOwnerSlot('${activeTurfId}', '${activeDate}', '${slot.time}')" class="btn btn-danger btn-sm" title="Delete slot">✕</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    document.getElementById('slotOwnerTurfSelect').addEventListener('change', loadSlots);
    document.getElementById('slotOwnerDateInput').addEventListener('change', loadSlots);

    document.getElementById('addCustomSlotBtn').addEventListener('click', () => {
      const activeTurfId = document.getElementById('slotOwnerTurfSelect').value;
      const activeDate = document.getElementById('slotOwnerDateInput').value;

      const modalContent = `
        <div class="form-group" style="margin-bottom:16px;">
          <label>Slot Timing *</label>
          <input type="text" id="customSlotTime" class="form-input" placeholder="e.g. 11:00 PM - 12:00 AM" required>
        </div>
        <div class="form-group" style="margin-bottom:16px;">
          <label>Slot Rate (₹) *</label>
          <input type="number" id="customSlotPrice" class="form-input" value="1200" required>
        </div>
        <div class="form-group">
          <label>Initial Status</label>
          <select id="customSlotStatus" class="form-select">
            <option value="Available">Available</option>
            <option value="Blocked">Blocked / Maintenance</option>
          </select>
        </div>
      `;

      const modalFooter = `
        <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.executeAddCustomSlot('${activeTurfId}', '${activeDate}')">Add Slot</button>
      `;

      PlaySlotApp.showModal('Add Custom Time Slot', modalContent, modalFooter);
    });

    loadSlots();
  }

  // Slot action handlers
  window.changeSlotState = (turfId, date, time, newStatus) => {
    window.PlaySlotData.updateSlotState(turfId, date, time, newStatus);
    PlaySlotApp.showToast(`Slot "${time}" marked as ${newStatus}`, 'success');
    renderSlotManagement(document.getElementById('ownerSectionContainer'), turfId);
  };

  window.promptEditOwnerSlot = (turfId, date, time, currentPrice, currentStatus) => {
    const modalContent = `
      <div class="form-group" style="margin-bottom:16px;">
        <label>Slot Timing *</label>
        <input type="text" id="editSlotTime" class="form-input" value="${time}" required>
      </div>
      <div class="form-group" style="margin-bottom:16px;">
        <label>Slot Rate (₹) *</label>
        <input type="number" id="editSlotPrice" class="form-input" value="${currentPrice}" required>
      </div>
      <div class="form-group">
        <label>Slot Status</label>
        <select id="editSlotStatus" class="form-select">
          <option value="Available" ${currentStatus === 'Available' ? 'selected' : ''}>Available</option>
          <option value="Booked" ${currentStatus === 'Booked' ? 'selected' : ''}>Booked</option>
          <option value="Blocked" ${currentStatus === 'Blocked' ? 'selected' : ''}>Blocked / Maintenance</option>
        </select>
      </div>
    `;

    const modalFooter = `
      <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="window.executeEditOwnerSlot('${turfId}', '${date}', '${time}')">Save Slot</button>
    `;

    PlaySlotApp.showModal(`Edit Slot Timing`, modalContent, modalFooter);
  };

  window.executeEditOwnerSlot = (turfId, date, originalTime) => {
    const time = document.getElementById('editSlotTime').value.trim();
    const price = document.getElementById('editSlotPrice').value;
    const status = document.getElementById('editSlotStatus').value;

    if (!time) {
      PlaySlotApp.showToast('Please specify slot time.', 'error');
      return;
    }

    window.PlaySlotData.updateSlot(turfId, date, originalTime, { time, price, status });
    PlaySlotApp.closeModal();
    PlaySlotApp.showToast(`Slot timing updated!`, 'success');
    renderSlotManagement(document.getElementById('ownerSectionContainer'), turfId);
  };

  window.promptDeleteOwnerSlot = (turfId, date, time) => {
    if (confirm(`Remove slot timing "${time}" for this date?`)) {
      window.PlaySlotData.deleteSlot(turfId, date, time);
      PlaySlotApp.showToast(`Slot "${time}" removed.`, 'success');
      renderSlotManagement(document.getElementById('ownerSectionContainer'), turfId);
    }
  };

  window.executeAddCustomSlot = (turfId, date) => {
    const time = document.getElementById('customSlotTime').value.trim();
    const price = document.getElementById('customSlotPrice').value;
    const status = document.getElementById('customSlotStatus').value;
    if (!time) {
      PlaySlotApp.showToast('Please enter a valid slot timing.', 'error');
      return;
    }
    window.PlaySlotData.addCustomSlot(turfId, date, { time, price, status });
    PlaySlotApp.closeModal();
    PlaySlotApp.showToast(`Slot "${time}" added!`, 'success');
    renderSlotManagement(document.getElementById('ownerSectionContainer'), turfId);
  };

  // --- 5. Owner Bookings Management (CRUD) ---
  function renderOwnerBookings(container) {
    const bookings = window.PlaySlotData.getBookings({ ownerId: 'owner-1' });

    container.innerHTML = `
      <div class="owner-header">
        <div>
          <h1 class="owner-title" style="font-size:1.8rem; font-weight:900;">🎟️ Turf Reservations & Booking Log (${bookings.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Track all customer reservations across your managed turf grounds</p>
        </div>
      </div>

      <div class="table-card">
        <div class="table-responsive">
          <table class="owner-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Player / Customer</th>
                <th>Turf Arena</th>
                <th>Match Date</th>
                <th>Slot Time</th>
                <th>Players</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${bookings.map(b => `
                <tr>
                  <td><strong style="color:var(--primary-color);">${b.bookingId}</strong></td>
                  <td>👤 <strong>${b.userName}</strong><br><span style="font-size:0.8rem; color:var(--text-muted);">${b.userPhone || ''}</span></td>
                  <td><strong>${b.turfName}</strong><br><span style="font-size:0.78rem; color:var(--primary-color);">🏆 ${b.sport}</span></td>
                  <td>📅 ${b.date}</td>
                  <td>⏰ <strong>${b.timeSlot}</strong></td>
                  <td>${b.playersCount || 6}</td>
                  <td><strong style="color:#059669;">₹${b.totalAmount}</strong></td>
                  <td><span class="badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}">${b.status}</span></td>
                  <td>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                      <button onclick="window.viewOwnerBookingReceipt('${b.bookingId}')" class="btn btn-outline-dark btn-sm">Receipt</button>
                      ${b.status === 'Confirmed' ? `
                        <button onclick="window.updateBookingState('${b.bookingId}', 'Completed')" class="btn btn-secondary btn-sm">Complete</button>
                        <button onclick="window.updateBookingState('${b.bookingId}', 'Cancelled')" class="btn btn-danger btn-sm">Cancel</button>
                      ` : ''}
                      <button onclick="window.promptDeleteOwnerBooking('${b.bookingId}')" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.viewOwnerBookingReceipt = (bookingId) => {
    const b = window.PlaySlotData.getBookingById(bookingId);
    if (!b) return;

    const modalContent = `
      <div style="text-align:center; margin-bottom:18px;">
        <div class="logo-badge" style="margin:0 auto 10px auto; width:44px; height:44px; font-size:1.3rem;">⚡</div>
        <h3 style="font-size:1.2rem; font-weight:800;">${b.turfName}</h3>
        <p style="color:var(--text-muted); font-size:0.85rem;">Official Booking Confirmation</p>
      </div>

      <div style="background:var(--bg-color); padding:16px; border-radius:12px; font-size:0.9rem; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Booking ID:</span>
          <strong>${b.bookingId}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Player:</span>
          <strong>${b.userName} (${b.userPhone || ''})</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Schedule:</span>
          <strong>📅 ${b.date} • ⏰ ${b.timeSlot}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Status:</span>
          <span class="badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}">${b.status}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:1px dashed var(--border-color);">
          <span style="font-weight:700;">Total Paid:</span>
          <strong style="color:var(--primary-color); font-size:1.05rem;">₹${b.totalAmount}</strong>
        </div>
      </div>
    `;

    PlaySlotApp.showModal(`Receipt #${b.bookingId}`, modalContent, `<button class="btn btn-primary" onclick="PlaySlotApp.closeModal()">Close</button>`);
  };

  window.promptDeleteOwnerBooking = (bookingId) => {
    if (confirm(`Are you sure you want to delete reservation #${bookingId}?`)) {
      window.PlaySlotData.deleteBooking(bookingId);
      PlaySlotApp.showToast(`Booking #${bookingId} deleted.`, 'success');
      renderOwnerBookings(document.getElementById('ownerSectionContainer'));
    }
  };

  window.updateBookingState = (bookingId, status) => {
    window.PlaySlotData.updateBooking(bookingId, { status });
    PlaySlotApp.showToast(`Booking ${bookingId} status updated to ${status}.`, 'success');
    renderCurrentSection();
  };

  // --- 6. Owner Earnings & Analytics Section ---
  function renderOwnerEarnings(container) {
    const stats = window.PlaySlotData.getOwnerStats('owner-1');
    const bookings = window.PlaySlotData.getBookings({ ownerId: 'owner-1' }).filter(b => b.status !== 'Cancelled');

    container.innerHTML = `
      <div class="owner-header">
        <div>
          <h1 class="owner-title" style="font-size:1.8rem; font-weight:900;">💰 Earnings & Financial Reports</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Track gross booking receipts, commission breakdowns, and bank payout history</p>
        </div>
        <button onclick="PlaySlotApp.showToast('Payout report dispatched to your registered email! ✉️')" class="btn btn-outline-dark">
          Export Financial Report 📄
        </button>
      </div>

      <!-- Earnings Stat Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background:#ECFDF5; color:#10B981;">📅</div>
          <div class="stat-info">
            <h4>Today's Earnings</h4>
            <div class="value">₹3,400</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#E0F2FE; color:#0284C7;">📈</div>
          <div class="stat-info">
            <h4>This Week</h4>
            <div class="value">₹24,800</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#FEF3C7; color:#D97706;">💰</div>
          <div class="stat-info">
            <h4>This Month</h4>
            <div class="value">₹${stats.monthlyRevenue.toLocaleString()}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#F3E8FF; color:#8B5CF6;">🏦</div>
          <div class="stat-info">
            <h4>Lifetime Payouts</h4>
            <div class="value">₹4,28,000</div>
          </div>
        </div>
      </div>

      <!-- Revenue Chart Breakdown (CSS/SVG Visualization) -->
      <div class="table-card" style="margin-bottom:32px;">
        <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:6px;">Weekly Slot Booking Revenue Trend</h3>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:24px;">Daily revenue performance across all active turf venues</p>

        <div style="display:flex; align-items:flex-end; gap:20px; height:180px; padding:0 20px; border-bottom:2px solid var(--border-color); margin-bottom:12px;">
          <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <span style="font-size:0.75rem; font-weight:700;">₹4,200</span>
            <div style="width:100%; height:80px; background:linear-gradient(180deg, var(--primary-color), var(--primary-hover)); border-radius:6px 6px 0 0;"></div>
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Mon</span>
          </div>
          <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <span style="font-size:0.75rem; font-weight:700;">₹5,800</span>
            <div style="width:100%; height:110px; background:linear-gradient(180deg, var(--primary-color), var(--primary-hover)); border-radius:6px 6px 0 0;"></div>
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Tue</span>
          </div>
          <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <span style="font-size:0.75rem; font-weight:700;">₹3,600</span>
            <div style="width:100%; height:65px; background:linear-gradient(180deg, var(--primary-color), var(--primary-hover)); border-radius:6px 6px 0 0;"></div>
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Wed</span>
          </div>
          <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <span style="font-size:0.75rem; font-weight:700;">₹6,900</span>
            <div style="width:100%; height:130px; background:linear-gradient(180deg, var(--primary-color), var(--primary-hover)); border-radius:6px 6px 0 0;"></div>
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Thu</span>
          </div>
          <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <span style="font-size:0.75rem; font-weight:700;">₹8,400</span>
            <div style="width:100%; height:150px; background:linear-gradient(180deg, var(--secondary-color), #059669); border-radius:6px 6px 0 0;"></div>
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Fri</span>
          </div>
          <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <span style="font-size:0.75rem; font-weight:700;">₹12,600</span>
            <div style="width:100%; height:180px; background:linear-gradient(180deg, var(--secondary-color), #059669); border-radius:6px 6px 0 0;"></div>
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700; color:var(--secondary-color);">Sat</span>
          </div>
          <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <span style="font-size:0.75rem; font-weight:700;">₹14,200</span>
            <div style="width:100%; height:190px; background:linear-gradient(180deg, var(--secondary-color), #059669); border-radius:6px 6px 0 0;"></div>
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700; color:var(--secondary-color);">Sun</span>
          </div>
        </div>
      </div>

      <!-- Transaction History Table -->
      <div class="table-card">
        <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:16px;">Payout Settlement History</h3>
        <div class="table-responsive">
          <table class="owner-table">
            <thead>
              <tr>
                <th>Settlement ID</th>
                <th>Date</th>
                <th>Booking Count</th>
                <th>Gross Revenue</th>
                <th>Net Bank Payout</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>SETTLE-9821</strong></td>
                <td>2026-08-20</td>
                <td>18 Bookings</td>
                <td>₹28,400</td>
                <td><strong style="color:#059669;">₹26,980</strong></td>
                <td><span class="badge badge-success">✓ Transferred to HDFC</span></td>
              </tr>
              <tr>
                <td><strong>SETTLE-9745</strong></td>
                <td>2026-08-13</td>
                <td>24 Bookings</td>
                <td>₹36,200</td>
                <td><strong style="color:#059669;">₹34,390</strong></td>
                <td><span class="badge badge-success">✓ Transferred to HDFC</span></td>
              </tr>
              <tr>
                <td><strong>SETTLE-9690</strong></td>
                <td>2026-08-06</td>
                <td>19 Bookings</td>
                <td>₹31,000</td>
                <td><strong style="color:#059669;">₹29,450</strong></td>
                <td><span class="badge badge-success">✓ Transferred to HDFC</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Global helper to switch owner sections from inline buttons
  window.switchOwnerNav = (secName) => {
    currentOwnerSection = secName;
    navItems.forEach(i => {
      if (i.getAttribute('data-section') === secName) i.classList.add('active');
      else i.classList.remove('active');
    });
    renderCurrentSection();
  };

  window.manageTurfSlots = (turfId) => {
    window.switchOwnerNav('slots');
    renderSlotManagement(document.getElementById('ownerSectionContainer'), turfId);
  };

  window.promptDeleteTurf = (turfId, turfName) => {
    const modalContent = `
      <p style="color:var(--text-body); font-size:0.95rem; line-height:1.6;">
        Are you sure you want to permanently remove <strong>${turfName}</strong> from your turf listing? All scheduled slots will be unlisted.
      </p>
    `;

    const modalFooter = `
      <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="window.executeDeleteTurf('${turfId}')">Delete Turf</button>
    `;

    PlaySlotApp.showModal('Delete Turf Arena', modalContent, modalFooter);
  };

  window.executeDeleteTurf = (turfId) => {
    window.PlaySlotData.deleteTurf(turfId);
    PlaySlotApp.closeModal();
    PlaySlotApp.showToast('Turf deleted successfully.', 'success');
    renderMyTurfs(document.getElementById('ownerSectionContainer'));
  };

  // Initial render
  renderCurrentSection();
});
