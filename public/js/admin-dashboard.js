/**
 * PlaySlot Super Admin Console Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const user = window.PlaySlotData.getCurrentUser();
  if (!user || user.role !== 'admin') {
    window.location.href = '/admin';
    return;
  }

  let currentAdminSection = 'dashboard'; // dashboard | users | owners | turfs | bookings | sports | reports | settings

  const navItems = document.querySelectorAll('.admin-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetSec = item.getAttribute('data-section');
      if (targetSec) {
        e.preventDefault();
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentAdminSection = targetSec;
        renderAdminSection();
      }
    });
  });

  function renderAdminSection() {
    const mainContainer = document.getElementById('adminSectionContainer');
    if (!mainContainer) return;

    if (currentAdminSection === 'dashboard') {
      renderDashboard(mainContainer);
    } else if (currentAdminSection === 'users') {
      renderUsersManagement(mainContainer);
    } else if (currentAdminSection === 'owners') {
      renderOwnersManagement(mainContainer);
    } else if (currentAdminSection === 'turfs') {
      renderTurfsModeration(mainContainer);
    } else if (currentAdminSection === 'bookings') {
      renderAllBookings(mainContainer);
    } else if (currentAdminSection === 'sports') {
      renderSportsManager(mainContainer);
    } else if (currentAdminSection === 'reports') {
      renderReports(mainContainer);
    } else if (currentAdminSection === 'settings') {
      renderSettings(mainContainer);
    }
  }

  // --- 1. Admin Dashboard Overview ---
  function renderDashboard(container) {
    const stats = window.PlaySlotData.getAdminStats();
    const recentBookings = window.PlaySlotData.getBookings().slice(0, 5);
    const pendingTurfs = window.PlaySlotData.getTurfs().filter(t => t.status === 'Pending');

    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">🛡️ Super Administrator Console</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">System-wide governance, turf approvals, athlete users, and platform financials</p>
        </div>
        <div style="display:flex; gap:10px;">
          <span class="badge badge-purple" style="padding:6px 14px; font-size:0.85rem;">⚡ Platform Operational</span>
          <a href="/index.html" target="_blank" class="btn btn-outline-dark btn-sm">View Live Site ↗</a>
        </div>
      </div>

      <!-- Stats Grid (7 Metrics) -->
      <div class="stats-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:24px;">
        <div class="stat-card">
          <div class="stat-icon" style="background:#E0F2FE; color:#0284C7;">👥</div>
          <div class="stat-info">
            <h4>Total Athletes</h4>
            <div class="value">${stats.totalUsers}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#FEF3C7; color:#D97706;">🏟️</div>
          <div class="stat-info">
            <h4>Turf Owners</h4>
            <div class="value">${stats.totalOwners}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#ECFDF5; color:#10B981;">🏟️</div>
          <div class="stat-info">
            <h4>Total Turfs</h4>
            <div class="value">${stats.totalTurfs} Arenas</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#F3E8FF; color:#8B5CF6;">🎟️</div>
          <div class="stat-info">
            <h4>Total Bookings</h4>
            <div class="value">${stats.totalBookings}</div>
          </div>
        </div>
      </div>

      <div class="stats-grid" style="grid-template-columns:repeat(3, 1fr); margin-bottom:32px;">
        <div class="stat-card">
          <div class="stat-icon" style="background:#ECFDF5; color:#10B981;">💰</div>
          <div class="stat-info">
            <h4>Platform Gross Revenue</h4>
            <div class="value">₹${stats.totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#E0F2FE; color:#0284C7;">📅</div>
          <div class="stat-info">
            <h4>Today's Slot Bookings</h4>
            <div class="value">${stats.todayBookingsCount} Slots</div>
          </div>
        </div>

        <a href="/admin/owner-requests" class="stat-card" style="cursor:pointer; text-decoration:none;">
          <div class="stat-icon" style="background:#FEE2E2; color:#DC2626;">⏳</div>
          <div class="stat-info">
            <h4>Pending Owner Requests</h4>
            <div class="value">${stats.pendingApprovals} Items</div>
          </div>
        </a>
      </div>

      <!-- Pending Moderation Alert Card -->
      ${stats.pendingApprovals > 0 ? `
        <div style="background:var(--accent-amber-light); border:1.5px solid #FCD34D; padding:20px; border-radius:14px; margin-bottom:32px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <h4 style="color:#92400E; font-size:1.05rem; font-weight:800;">⚠️ ${stats.pendingApprovals} Turf Partner Application(s) Awaiting Review</h4>
            <p style="color:#B45309; font-size:0.88rem;">Review partner applications and specifications before granting owner access.</p>
          </div>
          <a href="/admin/owner-requests" class="btn btn-primary btn-sm">Review Applications ➔</a>
        </div>
      ` : ''}

      <!-- System Booking Logs Preview -->
      <div class="table-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <div>
            <h3 style="font-size:1.15rem; font-weight:800;">🎟️ Recent System Bookings</h3>
            <p style="font-size:0.85rem; color:var(--text-muted);">Real-time reservations across all venues and sport categories</p>
          </div>
          <button onclick="window.switchAdminNav('bookings')" class="btn btn-outline-dark btn-sm">View All Bookings ➔</button>
        </div>

        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>User / Athlete</th>
                <th>Turf Arena</th>
                <th>Sport</th>
                <th>Date & Slot</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${recentBookings.map(b => `
                <tr>
                  <td><strong style="color:var(--primary-color);">${b.bookingId}</strong></td>
                  <td>👤 ${b.userName}</td>
                  <td><strong>${b.turfName}</strong></td>
                  <td><span class="badge badge-primary">🏆 ${b.sport}</span></td>
                  <td>📅 ${b.date} • ${b.timeSlot}</td>
                  <td><strong style="color:#059669;">₹${b.totalAmount}</strong></td>
                  <td><span class="badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}">${b.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- 2. Admin Users Management ---
  function renderUsersManagement(container) {
    const users = window.PlaySlotData.getUsers();

    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">👥 Athlete & Customer Management (${users.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Review player profiles, track total slot bookings, and moderate user access</p>
        </div>
      </div>

      <div class="table-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Athlete / User</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Total Bookings</th>
                <th>Joined Date</th>
                <th>Status</th>
                <th>Moderation Actions</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td>
                    <div style="display:flex; gap:12px; align-items:center;">
                      <img src="${u.avatar}" alt="${u.name}" style="width:38px; height:38px; border-radius:50%; object-fit:cover;">
                      <strong>${u.name}</strong>
                    </div>
                  </td>
                  <td>${u.email}</td>
                  <td>${u.phone}</td>
                  <td>${u.city}</td>
                  <td><strong>${u.totalBookings} Slots</strong></td>
                  <td>${u.joinedDate}</td>
                  <td><span class="badge ${u.status === 'Active' ? 'badge-success' : 'badge-danger'}">${u.status}</span></td>
                  <td>
                    <div style="display:flex; gap:6px;">
                      <button onclick="window.viewUserModal('${u.id}')" class="btn btn-outline-dark btn-sm">View</button>
                      ${u.status === 'Active' ? `
                        <button onclick="window.toggleUserStatus('${u.id}', 'Blocked')" class="btn btn-danger btn-sm">Block</button>
                      ` : `
                        <button onclick="window.toggleUserStatus('${u.id}', 'Active')" class="btn btn-emerald btn-sm">Unblock</button>
                      `}
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

  window.toggleUserStatus = (userId, newStatus) => {
    window.PlaySlotData.updateUserStatus(userId, newStatus);
    PlaySlotApp.showToast(`User status updated to ${newStatus}.`, 'success');
    renderUsersManagement(document.getElementById('adminSectionContainer'));
  };

  window.viewUserModal = (userId) => {
    const u = window.PlaySlotData.getUsers().find(user => user.id === userId);
    if (!u) return;

    const modalContent = `
      <div style="text-align:center; margin-bottom:20px;">
        <img src="${u.avatar}" alt="${u.name}" style="width:90px; height:90px; border-radius:50%; object-fit:cover; margin:0 auto 12px auto; border:3px solid var(--primary-light);">
        <h3 style="font-size:1.3rem; font-weight:800;">${u.name}</h3>
        <p style="color:var(--text-muted); font-size:0.9rem;">${u.email} • ${u.phone}</p>
      </div>

      <div style="background:var(--bg-color); padding:18px; border-radius:12px; font-size:0.9rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Home City:</span>
          <strong>${u.city}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Joined Platform:</span>
          <strong>${u.joinedDate}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Total Slot Bookings:</span>
          <strong style="color:var(--primary-color);">${u.totalBookings} Slots</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Account State:</span>
          <span class="badge ${u.status === 'Active' ? 'badge-success' : 'badge-danger'}">${u.status}</span>
        </div>
      </div>
    `;

    PlaySlotApp.showModal(`User Details - ${u.name}`, modalContent, `<button class="btn btn-primary" onclick="PlaySlotApp.closeModal()">Close</button>`);
  };

  // --- 3. Admin Turf Owners Management ---
  function renderOwnersManagement(container) {
    const owners = window.PlaySlotData.getOwners();

    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">🏟️ Turf Venue Owners (${owners.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Verify merchant applications, track arena revenue, and manage owner accounts</p>
        </div>
      </div>

      <div class="table-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Owner Partner</th>
                <th>Email Address</th>
                <th>Contact Phone</th>
                <th>City</th>
                <th>Turfs Listed</th>
                <th>Bookings Handled</th>
                <th>Monthly Revenue</th>
                <th>Status</th>
                <th>Partner Actions</th>
              </tr>
            </thead>
            <tbody>
              ${owners.map(o => `
                <tr>
                  <td>
                    <div style="display:flex; gap:12px; align-items:center;">
                      <img src="${o.avatar}" alt="${o.name}" style="width:38px; height:38px; border-radius:50%; object-fit:cover;">
                      <strong>${o.name}</strong>
                    </div>
                  </td>
                  <td>${o.email}</td>
                  <td>${o.phone}</td>
                  <td>${o.city}</td>
                  <td><strong>${o.turfsCount} Turfs</strong></td>
                  <td>${o.totalBookings}</td>
                  <td><strong style="color:#059669;">₹${o.monthlyEarnings.toLocaleString()}</strong></td>
                  <td><span class="badge ${o.status === 'Active' ? 'badge-success' : (o.status === 'Pending' ? 'badge-warning' : 'badge-danger')}">${o.status}</span></td>
                  <td>
                    <div style="display:flex; gap:6px;">
                      ${o.status === 'Pending' ? `
                        <button onclick="window.toggleOwnerStatus('${o.id}', 'Active')" class="btn btn-emerald btn-sm">Approve ✓</button>
                      ` : ''}
                      ${o.status === 'Active' ? `
                        <button onclick="window.toggleOwnerStatus('${o.id}', 'Blocked')" class="btn btn-danger btn-sm">Block</button>
                      ` : (o.status === 'Blocked' ? `
                        <button onclick="window.toggleOwnerStatus('${o.id}', 'Active')" class="btn btn-emerald btn-sm">Unblock</button>
                      ` : '')}
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

  window.toggleOwnerStatus = (ownerId, newStatus) => {
    window.PlaySlotData.updateOwnerStatus(ownerId, newStatus);
    PlaySlotApp.showToast(`Owner status updated to ${newStatus}.`, 'success');
    renderOwnersManagement(document.getElementById('adminSectionContainer'));
  };

  // --- 4. Admin Turfs Moderation Section ---
  function renderTurfsModeration(container) {
    const turfs = window.PlaySlotData.getTurfs();

    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">🏟️ Turf Arenas Directory & Moderation (${turfs.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Approve, inspect, and moderate all platform sports turfs</p>
        </div>
      </div>

      <div class="table-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Turf Arena</th>
                <th>Owner Partner</th>
                <th>Sport</th>
                <th>Location</th>
                <th>Price / Hr</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Moderation Actions</th>
              </tr>
            </thead>
            <tbody>
              ${turfs.map(t => `
                <tr>
                  <td>
                    <div style="display:flex; gap:12px; align-items:center;">
                      <img src="${t.images[0]}" alt="${t.name}" style="width:60px; height:45px; border-radius:8px; object-fit:cover;">
                      <div>
                        <strong>${t.name}</strong><br>
                        <span style="font-size:0.78rem; color:var(--text-muted);">${t.turfType} Turf</span>
                      </div>
                    </div>
                  </td>
                  <td>👤 ${t.ownerName || 'Vikram Malhotra'}</td>
                  <td><span class="badge badge-primary">🏆 ${t.sport}</span></td>
                  <td>${t.location}, ${t.city}</td>
                  <td><strong>₹${t.pricePerHour}</strong></td>
                  <td><span class="badge badge-warning">★ ${t.rating}</span></td>
                  <td><span class="badge ${t.status === 'Approved' ? 'badge-success' : (t.status === 'Pending' ? 'badge-warning' : 'badge-danger')}">${t.status}</span></td>
                  <td>
                    <div style="display:flex; gap:6px;">
                      <a href="/venue-detail.html?id=${t.id}" target="_blank" class="btn btn-outline-dark btn-sm">Inspect ↗</a>
                      ${t.status === 'Pending' ? `
                        <button onclick="window.moderateTurf('${t.id}', 'Approved')" class="btn btn-emerald btn-sm">Approve</button>
                        <button onclick="window.moderateTurf('${t.id}', 'Rejected')" class="btn btn-danger btn-sm">Reject</button>
                      ` : (t.status === 'Approved' ? `
                        <button onclick="window.moderateTurf('${t.id}', 'Rejected')" class="btn btn-danger btn-sm">Unlist</button>
                      ` : `
                        <button onclick="window.moderateTurf('${t.id}', 'Approved')" class="btn btn-emerald btn-sm">Re-Approve</button>
                      `)}
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

  window.moderateTurf = (turfId, newStatus) => {
    window.PlaySlotData.updateTurfStatus(turfId, newStatus);
    PlaySlotApp.showToast(`Turf status updated to ${newStatus}.`, 'success');
    renderTurfsModeration(document.getElementById('adminSectionContainer'));
  };

  // --- 5. Admin All Bookings Section ---
  function renderAllBookings(container) {
    const bookings = window.PlaySlotData.getBookings();

    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">🎟️ System-Wide Slot Reservations (${bookings.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Full audit log of player bookings across all turf properties</p>
        </div>
        <button onclick="PlaySlotApp.showToast('Full booking report exported to CSV! 📥')" class="btn btn-primary">
          Export Audit CSV 📥
        </button>
      </div>

      <div class="table-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Player Customer</th>
                <th>Turf Arena</th>
                <th>Sport</th>
                <th>Date & Slot</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${bookings.map(b => `
                <tr>
                  <td><strong style="color:var(--primary-color);">${b.bookingId}</strong></td>
                  <td>👤 <strong>${b.userName}</strong><br><span style="font-size:0.78rem; color:var(--text-muted);">${b.userEmail}</span></td>
                  <td><strong>${b.turfName}</strong></td>
                  <td><span class="badge badge-primary">🏆 ${b.sport}</span></td>
                  <td>📅 ${b.date}<br>⏰ <strong>${b.timeSlot}</strong></td>
                  <td><strong style="color:#059669; font-size:0.95rem;">₹${b.totalAmount}</strong></td>
                  <td><span style="font-size:0.8rem; color:var(--text-muted);">${b.paymentMethod || 'UPI Paid'}</span></td>
                  <td><span class="badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}">${b.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- 6. Admin Sports Management Section ---
  function renderSportsManager(container) {
    const sports = window.PlaySlotData.getSports();

    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">🏆 Platform Sports Categories (${sports.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Configure allowed sport types, baseline rates, and imagery</p>
        </div>
        <button id="btnAdminAddSport" class="btn btn-primary">+ Add New Sport</button>
      </div>

      <div class="table-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Icon & Name</th>
                <th>Description</th>
                <th>Starting Price</th>
                <th>Turf Count</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${sports.map(s => `
                <tr>
                  <td>
                    <div style="display:flex; gap:10px; align-items:center;">
                      <span style="font-size:1.6rem;">${s.icon}</span>
                      <strong>${s.name}</strong>
                    </div>
                  </td>
                  <td style="max-width:300px; font-size:0.85rem; color:var(--text-muted);">${s.description}</td>
                  <td><strong>₹${s.startingPrice}/hr</strong></td>
                  <td><strong>${s.turfsCount} Turfs</strong></td>
                  <td><span class="badge badge-dark">${s.categoryType}</span></td>
                  <td>
                    <div style="display:flex; gap:6px;">
                      <button onclick="window.promptDeleteSport('${s.id}', '${s.name}')" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById('btnAdminAddSport').addEventListener('click', () => {
      const modalContent = `
        <div class="form-group" style="margin-bottom:14px;">
          <label>Sport Name *</label>
          <input type="text" id="newSportName" class="form-input" placeholder="e.g. Squash" required>
        </div>
        <div class="form-group" style="margin-bottom:14px;">
          <label>Emoji Icon *</label>
          <input type="text" id="newSportIcon" class="form-input" placeholder="e.g. 🎾" value="🏅" required>
        </div>
        <div class="form-group" style="margin-bottom:14px;">
          <label>Starting Price (₹/hr) *</label>
          <input type="number" id="newSportPrice" class="form-input" value="1000" required>
        </div>
        <div class="form-group" style="margin-bottom:14px;">
          <label>Category Type</label>
          <select id="newSportType" class="form-select">
            <option value="Both">Both (Indoor / Outdoor)</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
          </select>
        </div>
        <div class="form-group">
          <label>Description</label>
          <input type="text" id="newSportDesc" class="form-input" placeholder="Brief sport summary...">
        </div>
      `;

      const modalFooter = `
        <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.executeAddSport()">Add Sport</button>
      `;

      PlaySlotApp.showModal('Add New Sport Category', modalContent, modalFooter);
    });
  }

  window.executeAddSport = () => {
    const name = document.getElementById('newSportName').value.trim();
    const icon = document.getElementById('newSportIcon').value.trim();
    const startingPrice = document.getElementById('newSportPrice').value;
    const categoryType = document.getElementById('newSportType').value;
    const description = document.getElementById('newSportDesc').value;

    if (!name) {
      PlaySlotApp.showToast('Please specify sport name.', 'error');
      return;
    }

    window.PlaySlotData.addSport({ name, icon, startingPrice, categoryType, description });
    PlaySlotApp.closeModal();
    PlaySlotApp.showToast(`Sport "${name}" registered successfully!`, 'success');
    renderSportsManager(document.getElementById('adminSectionContainer'));
  };

  window.promptDeleteSport = (sportId, sportName) => {
    if (confirm(`Are you sure you want to remove ${sportName} from platform sports?`)) {
      window.PlaySlotData.deleteSport(sportId);
      PlaySlotApp.showToast(`Sport ${sportName} removed.`, 'success');
      renderSportsManager(document.getElementById('adminSectionContainer'));
    }
  };

  // --- 7. Admin Reports Section ---
  function renderReports(container) {
    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">📊 Platform Analytics & Commission Reports</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Gross transaction volumes, platform commission take-rate, and city rankings</p>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background:#ECFDF5; color:#10B981;">💰</div>
          <div class="stat-info">
            <h4>Total Platform GMV</h4>
            <div class="value">₹45,82,000</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#E0F2FE; color:#0284C7;">📈</div>
          <div class="stat-info">
            <h4>Commission Revenue (8%)</h4>
            <div class="value">₹3,66,560</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#FEF3C7; color:#D97706;">🏟️</div>
          <div class="stat-info">
            <h4>Top City</h4>
            <div class="value">Mumbai (48%)</div>
          </div>
        </div>
      </div>

      <div class="table-card">
        <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:16px;">City-wise Booking & Demand Matrix</h3>
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>City / Region</th>
                <th>Total Turfs</th>
                <th>Monthly Bookings</th>
                <th>Gross Volume</th>
                <th>Average Slot Price</th>
                <th>Growth Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Mumbai</strong></td>
                <td>38 Turfs</td>
                <td>1,840 Slots</td>
                <td><strong style="color:#059669;">₹24,50,000</strong></td>
                <td>₹1,350 / hr</td>
                <td><span class="badge badge-success">+24% YoY</span></td>
              </tr>
              <tr>
                <td><strong>Bengaluru</strong></td>
                <td>32 Turfs</td>
                <td>1,420 Slots</td>
                <td><strong style="color:#059669;">₹18,20,000</strong></td>
                <td>₹1,280 / hr</td>
                <td><span class="badge badge-success">+31% YoY</span></td>
              </tr>
              <tr>
                <td><strong>Delhi / NCR</strong></td>
                <td>24 Turfs</td>
                <td>980 Slots</td>
                <td><strong style="color:#059669;">₹13,12,000</strong></td>
                <td>₹1,400 / hr</td>
                <td><span class="badge badge-success">+18% YoY</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- 8. Admin Settings Section ---
  function renderSettings(container) {
    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">⚙️ Platform Settings & Configuration</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Configure convenience fees, GST rates, and notification parameters</p>
        </div>
      </div>

      <div class="summary-card" style="max-width:800px;">
        <form id="adminSettingsForm">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:18px;">
            <div class="form-group">
              <label>Platform Commission Take-Rate (%)</label>
              <input type="number" class="form-input" value="8" required>
            </div>
            <div class="form-group">
              <label>Default Convenience Fee (₹)</label>
              <input type="number" class="form-input" value="49" required>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px;">
            <div class="form-group">
              <label>Government GST Tax Rate (%)</label>
              <input type="number" class="form-input" value="18" required>
            </div>
            <div class="form-group">
              <label>Support Helpline Number</label>
              <input type="text" class="form-input" value="+91 98765 43210" required>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Save Platform Settings</button>
        </form>
      </div>
    `;

    document.getElementById('adminSettingsForm').addEventListener('submit', (e) => {
      e.preventDefault();
      PlaySlotApp.showToast('Platform settings saved successfully!', 'success');
    });
  }

  // Global helper to switch admin sections
  window.switchAdminNav = (secName) => {
    currentAdminSection = secName;
    navItems.forEach(i => {
      if (i.getAttribute('data-section') === secName) i.classList.add('active');
      else i.classList.remove('active');
    });
    renderAdminSection();
  };

  renderAdminSection();
});
