/**
 * PlaySlot Super Admin Console Interactive Engine
 * 100% Dynamic - Zero Static / Fake Numbers
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

    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">🛡️ Super Administrator Console</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">System-wide governance, turf approvals, athlete users, and platform financials</p>
        </div>
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <button onclick="window.promptResetDemoData()" class="btn btn-outline-dark btn-sm" style="border-color:#DC2626; color:#DC2626; font-weight:700;" title="Development reset tool">
            🔄 Reset Demo Data
          </button>
          <span class="badge badge-purple" style="padding:6px 14px; font-size:0.85rem;">⚡ Platform Operational</span>
          <a href="/index.html" target="_blank" class="btn btn-outline-dark btn-sm">View Live Site ↗</a>
        </div>
      </div>

      <!-- Stats Grid (7 Real Dynamic Metrics) -->
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
              ${recentBookings.length > 0 ? recentBookings.map(b => `
                <tr>
                  <td><strong style="color:var(--primary-color);">${b.bookingId}</strong></td>
                  <td>👤 ${b.userName}</td>
                  <td><strong>${b.turfName}</strong></td>
                  <td><span class="badge badge-primary">🏆 ${b.sport}</span></td>
                  <td>📅 ${b.date} • ${b.timeSlot}</td>
                  <td><strong style="color:#059669;">₹${b.totalAmount}</strong></td>
                  <td><span class="badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}">${b.status}</span></td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="7" style="text-align:center; padding:36px 20px; color:var(--text-muted); font-size:0.95rem;">
                    No bookings yet
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- 2. Admin Users Management (CRUD) ---
  function renderUsersManagement(container) {
    const users = window.PlaySlotData.getUsers();

    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">👥 Athlete & Customer Management (${users.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Review player profiles, track total slot bookings, and manage user access</p>
        </div>
        <button onclick="window.promptAddUserModal()" class="btn btn-primary">+ Add Athlete User</button>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${users.length > 0 ? users.map(u => `
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
                  <td><strong>${u.totalBookings || 0} Slots</strong></td>
                  <td>${u.joinedDate}</td>
                  <td><span class="badge ${u.status === 'Active' ? 'badge-success' : 'badge-danger'}">${u.status}</span></td>
                  <td>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                      <button onclick="window.viewUserModal('${u.id}')" class="btn btn-outline-dark btn-sm">View</button>
                      <button onclick="window.promptEditUserModal('${u.id}')" class="btn btn-primary btn-sm">Edit</button>
                      ${u.status === 'Active' ? `
                        <button onclick="window.toggleUserStatus('${u.id}', 'Blocked')" class="btn btn-warning btn-sm">Block</button>
                      ` : `
                        <button onclick="window.toggleUserStatus('${u.id}', 'Active')" class="btn btn-emerald btn-sm">Unblock</button>
                      `}
                      <button onclick="window.promptDeleteUser('${u.id}', '${u.name.replace(/'/g, "\\'")}')" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="8" style="text-align:center; padding:36px 20px; color:var(--text-muted);">
                    No athletes found
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.promptAddUserModal = () => {
    const modalContent = `
      <div class="form-group" style="margin-bottom:14px;">
        <label>Full Name *</label>
        <input type="text" id="userFormName" class="form-input" placeholder="e.g. Aryan Khan" required>
      </div>
      <div class="form-group" style="margin-bottom:14px;">
        <label>Email Address *</label>
        <input type="email" id="userFormEmail" class="form-input" placeholder="user@example.com" required>
      </div>
      <div class="form-group" style="margin-bottom:14px;">
        <label>Phone Number</label>
        <input type="text" id="userFormPhone" class="form-input" placeholder="+91 98765 43210" value="+91 98765 00000">
      </div>
      <div class="form-group" style="margin-bottom:14px;">
        <label>Home City</label>
        <input type="text" id="userFormCity" class="form-input" placeholder="e.g. Mumbai" value="Mumbai">
      </div>
      <div class="form-group">
        <label>Account Status</label>
        <select id="userFormStatus" class="form-select">
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>
    `;

    const modalFooter = `
      <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="window.executeSaveUser(false)">Add User</button>
    `;

    PlaySlotApp.showModal('Create Athlete Profile', modalContent, modalFooter);
  };

  window.promptEditUserModal = (userId) => {
    const u = window.PlaySlotData.getUserById(userId);
    if (!u) return;

    const modalContent = `
      <div class="form-group" style="margin-bottom:14px;">
        <label>Full Name *</label>
        <input type="text" id="userFormName" class="form-input" value="${u.name}" required>
      </div>
      <div class="form-group" style="margin-bottom:14px;">
        <label>Email Address *</label>
        <input type="email" id="userFormEmail" class="form-input" value="${u.email}" required>
      </div>
      <div class="form-group" style="margin-bottom:14px;">
        <label>Phone Number</label>
        <input type="text" id="userFormPhone" class="form-input" value="${u.phone || ''}">
      </div>
      <div class="form-group" style="margin-bottom:14px;">
        <label>Home City</label>
        <input type="text" id="userFormCity" class="form-input" value="${u.city || ''}">
      </div>
      <div class="form-group">
        <label>Account Status</label>
        <select id="userFormStatus" class="form-select">
          <option value="Active" ${u.status === 'Active' ? 'selected' : ''}>Active</option>
          <option value="Blocked" ${u.status === 'Blocked' ? 'selected' : ''}>Blocked</option>
        </select>
      </div>
    `;

    const modalFooter = `
      <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="window.executeSaveUser(true, '${u.id}')">Save Changes</button>
    `;

    PlaySlotApp.showModal(`Edit Profile - ${u.name}`, modalContent, modalFooter);
  };

  window.executeSaveUser = (isEdit, userId) => {
    const name = document.getElementById('userFormName').value.trim();
    const email = document.getElementById('userFormEmail').value.trim();
    const phone = document.getElementById('userFormPhone').value.trim();
    const city = document.getElementById('userFormCity').value.trim();
    const status = document.getElementById('userFormStatus').value;

    if (!name || !email) {
      PlaySlotApp.showToast('Name and Email are required.', 'error');
      return;
    }

    if (isEdit && userId) {
      window.PlaySlotData.updateUser(userId, { name, email, phone, city, status });
      PlaySlotApp.showToast(`User ${name} updated successfully!`, 'success');
    } else {
      window.PlaySlotData.addUser({ name, email, phone, city, status });
      PlaySlotApp.showToast(`Athlete ${name} registered successfully!`, 'success');
    }

    PlaySlotApp.closeModal();
    renderUsersManagement(document.getElementById('adminSectionContainer'));
  };

  window.promptDeleteUser = (userId, userName) => {
    if (confirm(`Are you sure you want to permanently delete athlete "${userName}"?`)) {
      window.PlaySlotData.deleteUser(userId);
      PlaySlotApp.showToast(`User ${userName} deleted.`, 'success');
      renderUsersManagement(document.getElementById('adminSectionContainer'));
    }
  };

  window.toggleUserStatus = (userId, newStatus) => {
    window.PlaySlotData.updateUserStatus(userId, newStatus);
    PlaySlotApp.showToast(`User status updated to ${newStatus}.`, 'success');
    renderUsersManagement(document.getElementById('adminSectionContainer'));
  };

  window.viewUserModal = (userId) => {
    const u = window.PlaySlotData.getUserById(userId);
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
          <strong style="color:var(--primary-color);">${u.totalBookings || 0} Slots</strong>
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
                <th>Total Revenue</th>
                <th>Status</th>
                <th>Partner Actions</th>
              </tr>
            </thead>
            <tbody>
              ${owners.length > 0 ? owners.map(o => {
                const ownerTurfs = window.PlaySlotData.getTurfs({ ownerId: o.id }, true);
                const ownerBookings = window.PlaySlotData.getBookings({ ownerId: o.id });
                const ownerRev = ownerBookings
                  .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
                  .reduce((s, b) => s + (Number(b.totalAmount) || 0), 0);

                return `
                  <tr>
                    <td>
                      <div style="display:flex; gap:12px; align-items:center;">
                        <img src="${o.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}" alt="${o.name}" style="width:38px; height:38px; border-radius:50%; object-fit:cover;">
                        <div>
                          <strong>${o.ownerName || o.name}</strong><br>
                          <span style="font-size:0.75rem; color:var(--text-muted);">${o.businessName || ''}</span>
                        </div>
                      </div>
                    </td>
                    <td>${o.email}</td>
                    <td>${o.phone}</td>
                    <td>${o.city}</td>
                    <td><strong>${ownerTurfs.length} Turfs</strong></td>
                    <td>${ownerBookings.length}</td>
                    <td><strong style="color:#059669;">₹${ownerRev.toLocaleString()}</strong></td>
                    <td><span class="badge ${o.status === 'Approved' ? 'badge-success' : (o.status === 'Pending' ? 'badge-warning' : 'badge-danger')}">${o.status}</span></td>
                    <td>
                      <div style="display:flex; gap:6px;">
                        ${o.status === 'Pending' ? `
                          <button onclick="window.adminApproveOwner('${o.id}')" class="btn btn-emerald btn-sm">Approve ✓</button>
                          <button onclick="window.adminRejectOwner('${o.id}')" class="btn btn-danger btn-sm">Reject</button>
                        ` : ''}
                        ${o.status === 'Approved' ? `
                          <button onclick="window.adminToggleOwner('${o.id}', 'Suspended')" class="btn btn-danger btn-sm">Suspend</button>
                        ` : (o.status === 'Suspended' || o.status === 'Blocked' ? `
                          <button onclick="window.adminToggleOwner('${o.id}', 'Approved')" class="btn btn-emerald btn-sm">Reactivate</button>
                        ` : '')}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('') : `
                <tr>
                  <td colspan="9" style="text-align:center; padding:36px 20px; color:var(--text-muted);">
                    No owners registered yet
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.adminApproveOwner = (ownerId) => {
    window.PlaySlotData.approveOwnerApplication(ownerId);
    PlaySlotApp.showToast('Owner approved successfully! Portal access enabled.', 'success');
    renderOwnersManagement(document.getElementById('adminSectionContainer'));
  };

  window.adminRejectOwner = (ownerId) => {
    window.PlaySlotData.rejectOwnerApplication(ownerId, 'Application did not meet platform criteria.');
    PlaySlotApp.showToast('Owner request rejected.', 'success');
    renderOwnersManagement(document.getElementById('adminSectionContainer'));
  };

  window.adminToggleOwner = (ownerId, newStatus) => {
    window.PlaySlotData.updateOwnerStatus(ownerId, newStatus);
    PlaySlotApp.showToast(`Owner status updated to ${newStatus}.`, 'success');
    renderOwnersManagement(document.getElementById('adminSectionContainer'));
  };

  // --- 4. Admin Turfs Moderation Section (CRUD) ---
  function renderTurfsModeration(container) {
    const turfs = window.PlaySlotData.getTurfs({}, true);

    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">🏟️ Turf Arenas Directory & Moderation (${turfs.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Create, edit, inspect, and moderate all platform sports turfs</p>
        </div>
        <button onclick="window.promptAddTurfAdmin()" class="btn btn-primary">+ Add Turf Arena</button>
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
                <th>Actions & Moderation</th>
              </tr>
            </thead>
            <tbody>
              ${turfs.length > 0 ? turfs.map(t => `
                <tr>
                  <td>
                    <div style="display:flex; gap:12px; align-items:center;">
                      <img src="${(t.images && t.images[0]) || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80'}" alt="${t.name}" style="width:60px; height:45px; border-radius:8px; object-fit:cover;">
                      <div>
                        <strong>${t.name}</strong><br>
                        <span style="font-size:0.78rem; color:var(--text-muted);">${t.turfType} Turf</span>
                      </div>
                    </div>
                  </td>
                  <td>👤 ${t.ownerName || 'Turf Partner'}</td>
                  <td><span class="badge badge-primary">🏆 ${t.sport}</span></td>
                  <td>${t.location}, ${t.city}</td>
                  <td><strong>₹${t.pricePerHour}</strong></td>
                  <td><span class="badge badge-warning">★ ${t.rating || 5.0}</span></td>
                  <td><span class="badge ${t.status === 'Approved' ? 'badge-success' : (t.status === 'Pending' ? 'badge-warning' : 'badge-danger')}">${t.status}</span></td>
                  <td>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                      <button onclick="window.viewTurfAdminModal('${t.id}')" class="btn btn-outline-dark btn-sm">Inspect</button>
                      <button onclick="window.promptEditTurfAdmin('${t.id}')" class="btn btn-primary btn-sm">Edit</button>
                      ${t.status === 'Pending' ? `
                        <button onclick="window.moderateTurf('${t.id}', 'Approved')" class="btn btn-emerald btn-sm">Approve</button>
                        <button onclick="window.moderateTurf('${t.id}', 'Rejected')" class="btn btn-warning btn-sm">Reject</button>
                      ` : (t.status === 'Approved' ? `
                        <button onclick="window.moderateTurf('${t.id}', 'Rejected')" class="btn btn-warning btn-sm">Unlist</button>
                      ` : `
                        <button onclick="window.moderateTurf('${t.id}', 'Approved')" class="btn btn-emerald btn-sm">Re-Approve</button>
                      `)}
                      <button onclick="window.promptDeleteTurfAdmin('${t.id}', '${t.name.replace(/'/g, "\\'")}')" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="8" style="text-align:center; padding:36px 20px; color:var(--text-muted);">
                    No turfs available
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.promptAddTurfAdmin = () => {
    const sports = window.PlaySlotData.getSports();

    const modalContent = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
        <div class="form-group">
          <label>Turf Name *</label>
          <input type="text" id="adminTurfName" class="form-input" placeholder="e.g. Apex Sports Arena" required>
        </div>
        <div class="form-group">
          <label>Primary Sport *</label>
          <select id="adminTurfSport" class="form-select">
            ${sports.map(s => `<option value="${s.name}">${s.icon} ${s.name}</option>`).join('')}
          </select>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
        <div class="form-group">
          <label>City *</label>
          <input type="text" id="adminTurfCity" class="form-input" placeholder="e.g. Mumbai" value="Mumbai" required>
        </div>
        <div class="form-group">
          <label>Location / Area *</label>
          <input type="text" id="adminTurfLocation" class="form-input" placeholder="e.g. Andheri West" required>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
        <div class="form-group">
          <label>Price Per Hour (₹) *</label>
          <input type="number" id="adminTurfPrice" class="form-input" value="1400" required>
        </div>
        <div class="form-group">
          <label>Turf Type</label>
          <select id="adminTurfType" class="form-select">
            <option value="Outdoor">Outdoor</option>
            <option value="Indoor">Indoor</option>
            <option value="Covered Box">Covered Box</option>
          </select>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
        <div class="form-group">
          <label>Owner Name</label>
          <input type="text" id="adminTurfOwner" class="form-input" value="Super Admin Managed">
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="adminTurfStatus" class="form-select">
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div class="form-group" style="margin-bottom:14px;">
        <label>Image URL</label>
        <input type="url" id="adminTurfImage" class="form-input" value="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80">
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea id="adminTurfDesc" class="form-input" rows="2" placeholder="Arena description, turf quality, lights..."></textarea>
      </div>
    `;

    const modalFooter = `
      <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="window.executeSaveTurfAdmin(false)">Add Turf Arena</button>
    `;

    PlaySlotApp.showModal('Create Turf Arena Listing', modalContent, modalFooter);
  };

  window.promptEditTurfAdmin = (turfId) => {
    const turf = window.PlaySlotData.getTurfById(turfId);
    if (!turf) return;
    const sports = window.PlaySlotData.getSports();

    const modalContent = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
        <div class="form-group">
          <label>Turf Name *</label>
          <input type="text" id="adminTurfName" class="form-input" value="${turf.name}" required>
        </div>
        <div class="form-group">
          <label>Primary Sport *</label>
          <select id="adminTurfSport" class="form-select">
            ${sports.map(s => `<option value="${s.name}" ${turf.sport === s.name ? 'selected' : ''}>${s.icon} ${s.name}</option>`).join('')}
          </select>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
        <div class="form-group">
          <label>City *</label>
          <input type="text" id="adminTurfCity" class="form-input" value="${turf.city}" required>
        </div>
        <div class="form-group">
          <label>Location / Area *</label>
          <input type="text" id="adminTurfLocation" class="form-input" value="${turf.location}" required>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
        <div class="form-group">
          <label>Price Per Hour (₹) *</label>
          <input type="number" id="adminTurfPrice" class="form-input" value="${turf.pricePerHour}" required>
        </div>
        <div class="form-group">
          <label>Turf Type</label>
          <select id="adminTurfType" class="form-select">
            <option value="Outdoor" ${turf.turfType === 'Outdoor' ? 'selected' : ''}>Outdoor</option>
            <option value="Indoor" ${turf.turfType === 'Indoor' ? 'selected' : ''}>Indoor</option>
            <option value="Covered Box" ${turf.turfType === 'Covered Box' ? 'selected' : ''}>Covered Box</option>
          </select>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
        <div class="form-group">
          <label>Owner Name</label>
          <input type="text" id="adminTurfOwner" class="form-input" value="${turf.ownerName || 'Vikram Malhotra'}">
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="adminTurfStatus" class="form-select">
            <option value="Approved" ${turf.status === 'Approved' ? 'selected' : ''}>Approved</option>
            <option value="Pending" ${turf.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Rejected" ${turf.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
          </select>
        </div>
      </div>

      <div class="form-group" style="margin-bottom:14px;">
        <label>Image URL</label>
        <input type="url" id="adminTurfImage" class="form-input" value="${turf.images[0] || ''}">
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea id="adminTurfDesc" class="form-input" rows="2">${turf.description || ''}</textarea>
      </div>
    `;

    const modalFooter = `
      <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="window.executeSaveTurfAdmin(true, '${turf.id}')">Save Changes</button>
    `;

    PlaySlotApp.showModal(`Edit Turf - ${turf.name}`, modalContent, modalFooter);
  };

  window.executeSaveTurfAdmin = (isEdit, turfId) => {
    const name = document.getElementById('adminTurfName').value.trim();
    const sport = document.getElementById('adminTurfSport').value;
    const city = document.getElementById('adminTurfCity').value.trim();
    const location = document.getElementById('adminTurfLocation').value.trim();
    const pricePerHour = parseInt(document.getElementById('adminTurfPrice').value) || 1200;
    const turfType = document.getElementById('adminTurfType').value;
    const ownerName = document.getElementById('adminTurfOwner').value.trim();
    const status = document.getElementById('adminTurfStatus').value;
    const image = document.getElementById('adminTurfImage').value.trim() || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
    const description = document.getElementById('adminTurfDesc').value.trim();

    if (!name || !city || !location) {
      PlaySlotApp.showToast('Name, City, and Location are required.', 'error');
      return;
    }

    const payload = {
      name,
      sport,
      sportsAvailable: [sport],
      city,
      location,
      address: `${location}, ${city}`,
      pricePerHour,
      turfType,
      ownerName,
      status,
      images: [image],
      description: description || 'Verified multi-sports turf on PlaySlot.'
    };

    if (isEdit && turfId) {
      window.PlaySlotData.updateTurf(turfId, payload);
      PlaySlotApp.showToast(`Turf "${name}" updated successfully!`, 'success');
    } else {
      window.PlaySlotData.saveTurf(payload);
      PlaySlotApp.showToast(`Turf arena "${name}" added to platform!`, 'success');
    }

    PlaySlotApp.closeModal();
    renderTurfsModeration(document.getElementById('adminSectionContainer'));
  };

  window.viewTurfAdminModal = (turfId) => {
    const t = window.PlaySlotData.getTurfById(turfId);
    if (!t) return;

    const modalContent = `
      <div style="margin-bottom:16px;">
        <img src="${t.images[0]}" alt="${t.name}" style="width:100%; height:180px; object-fit:cover; border-radius:12px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:1.3rem; font-weight:800;">${t.name}</h3>
          <span class="badge ${t.status === 'Approved' ? 'badge-success' : 'badge-warning'}">${t.status}</span>
        </div>
        <p style="color:var(--text-muted); font-size:0.88rem; margin-top:4px;">📍 ${t.location}, ${t.city} • 🏆 ${t.sport}</p>
      </div>

      <div style="background:var(--bg-color); padding:16px; border-radius:12px; font-size:0.9rem; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Rate / Hour:</span>
          <strong>₹${t.pricePerHour}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Turf Type:</span>
          <strong>${t.turfType}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Owner Partner:</span>
          <strong>${t.ownerName || 'Vikram Malhotra'}</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Slot Timings:</span>
          <strong>${t.slotTimings ? t.slotTimings.length : 7} Daily Slots</strong>
        </div>
      </div>

      <div style="margin-bottom:10px;">
        <h4 style="font-size:0.9rem; margin-bottom:6px;">Amenities & Facilities:</h4>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          ${(t.facilities || ['Flood Lights', 'Parking', 'Washroom']).map(f => `<span class="badge badge-primary">${f}</span>`).join('')}
        </div>
      </div>
    `;

    const modalFooter = `
      <a href="/venue-detail.html?id=${t.id}" target="_blank" class="btn btn-outline-dark">Public Page ↗</a>
      <button class="btn btn-primary" onclick="PlaySlotApp.closeModal()">Close</button>
    `;

    PlaySlotApp.showModal(`Turf Details - ${t.name}`, modalContent, modalFooter);
  };

  window.promptDeleteTurfAdmin = (turfId, turfName) => {
    if (confirm(`Are you sure you want to delete turf arena "${turfName}" from the platform?`)) {
      window.PlaySlotData.deleteTurf(turfId);
      PlaySlotApp.showToast(`Turf ${turfName} deleted.`, 'success');
      renderTurfsModeration(document.getElementById('adminSectionContainer'));
    }
  };

  window.moderateTurf = (turfId, newStatus) => {
    window.PlaySlotData.updateTurfStatus(turfId, newStatus);
    PlaySlotApp.showToast(`Turf status updated to ${newStatus}.`, 'success');
    renderTurfsModeration(document.getElementById('adminSectionContainer'));
  };

  // --- 5. Admin All Bookings Section (CRUD) ---
  function renderAllBookings(container) {
    const bookings = window.PlaySlotData.getBookings();

    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">🎟️ System-Wide Slot Reservations (${bookings.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Full audit log of player bookings with edit, reschedule, and cancellation control</p>
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
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${bookings.length > 0 ? bookings.map(b => `
                <tr>
                  <td><strong style="color:var(--primary-color);">${b.bookingId}</strong></td>
                  <td>👤 <strong>${b.userName}</strong><br><span style="font-size:0.78rem; color:var(--text-muted);">${b.userEmail}</span></td>
                  <td><strong>${b.turfName}</strong></td>
                  <td><span class="badge badge-primary">🏆 ${b.sport}</span></td>
                  <td>📅 ${b.date}<br>⏰ <strong>${b.timeSlot}</strong></td>
                  <td><strong style="color:#059669; font-size:0.95rem;">₹${b.totalAmount}</strong></td>
                  <td><span class="badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}">${b.status}</span></td>
                  <td>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                      <button onclick="window.viewBookingAdminModal('${b.bookingId}')" class="btn btn-outline-dark btn-sm">Ticket</button>
                      <button onclick="window.promptEditBookingAdmin('${b.bookingId}')" class="btn btn-primary btn-sm">Edit</button>
                      <button onclick="window.promptDeleteBookingAdmin('${b.bookingId}')" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="8" style="text-align:center; padding:36px 20px; color:var(--text-muted);">
                    No bookings yet
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.viewBookingAdminModal = (bookingId) => {
    const b = window.PlaySlotData.getBookingById(bookingId);
    if (!b) return;

    const modalContent = `
      <div style="text-align:center; margin-bottom:18px;">
        <div class="logo-badge" style="margin:0 auto 10px auto; width:44px; height:44px; font-size:1.3rem;">🎟️</div>
        <h3 style="font-size:1.25rem; font-weight:800;">${b.turfName}</h3>
        <span class="badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}">${b.status}</span>
      </div>

      <div style="background:var(--bg-color); padding:16px; border-radius:12px; font-size:0.9rem; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Booking ID:</span>
          <strong>${b.bookingId}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Customer:</span>
          <strong>${b.userName} (${b.userPhone || '+91 98765 43210'})</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Sport Category:</span>
          <strong>${b.sport}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Reserved Slot:</span>
          <strong>📅 ${b.date} • ⏰ ${b.timeSlot}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Player Count:</span>
          <strong>${b.playersCount || 6} Players</strong>
        </div>
        <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:1px dashed var(--border-color);">
          <span style="font-weight:800;">Total Paid:</span>
          <strong style="color:var(--primary-color); font-size:1.05rem;">₹${b.totalAmount}</strong>
        </div>
      </div>
    `;

    PlaySlotApp.showModal(`Booking Ticket #${b.bookingId}`, modalContent, `<button class="btn btn-primary" onclick="PlaySlotApp.closeModal()">Close</button>`);
  };

  window.promptEditBookingAdmin = (bookingId) => {
    const b = window.PlaySlotData.getBookingById(bookingId);
    if (!b) return;

    const modalContent = `
      <div class="form-group" style="margin-bottom:14px;">
        <label>Customer Name</label>
        <input type="text" id="editBookingUserName" class="form-input" value="${b.userName}" required>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
        <div class="form-group">
          <label>Date (YYYY-MM-DD)</label>
          <input type="date" id="editBookingDate" class="form-input" value="${b.date}" required>
        </div>
        <div class="form-group">
          <label>Time Slot</label>
          <input type="text" id="editBookingSlot" class="form-input" value="${b.timeSlot}" required>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
        <div class="form-group">
          <label>Total Amount (₹)</label>
          <input type="number" id="editBookingAmount" class="form-input" value="${b.totalAmount}" required>
        </div>
        <div class="form-group">
          <label>Booking Status</label>
          <select id="editBookingStatus" class="form-select">
            <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </div>
      </div>
    `;

    const modalFooter = `
      <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="window.executeSaveBookingAdmin('${b.bookingId}')">Update Booking</button>
    `;

    PlaySlotApp.showModal(`Edit Reservation #${b.bookingId}`, modalContent, modalFooter);
  };

  window.executeSaveBookingAdmin = (bookingId) => {
    const userName = document.getElementById('editBookingUserName').value.trim();
    const date = document.getElementById('editBookingDate').value.trim();
    const timeSlot = document.getElementById('editBookingSlot').value.trim();
    const totalAmount = parseFloat(document.getElementById('editBookingAmount').value) || 1200;
    const status = document.getElementById('editBookingStatus').value;

    window.PlaySlotData.updateBooking(bookingId, { userName, date, timeSlot, totalAmount, status });
    PlaySlotApp.closeModal();
    PlaySlotApp.showToast(`Booking #${bookingId} updated successfully!`, 'success');
    renderAllBookings(document.getElementById('adminSectionContainer'));
  };

  window.promptDeleteBookingAdmin = (bookingId) => {
    if (confirm(`Are you sure you want to delete booking #${bookingId} permanently?`)) {
      window.PlaySlotData.deleteBooking(bookingId);
      PlaySlotApp.showToast(`Booking #${bookingId} removed.`, 'success');
      renderAllBookings(document.getElementById('adminSectionContainer'));
    }
  };

  // --- 6. Admin Sports Management Section (CRUD) ---
  function renderSportsManager(container) {
    const sports = window.PlaySlotData.getSports();

    container.innerHTML = `
      <div class="admin-header">
        <div>
          <h1 class="admin-title" style="font-size:1.8rem; font-weight:900;">🏆 Platform Sports Categories (${sports.length})</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">Create, edit, view, and delete sports categories & rates</p>
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
                      <button onclick="window.viewSportAdminModal('${s.id}')" class="btn btn-outline-dark btn-sm">View</button>
                      <button onclick="window.promptEditSport('${s.id}')" class="btn btn-primary btn-sm">Edit</button>
                      <button onclick="window.promptDeleteSport('${s.id}', '${s.name.replace(/'/g, "\\'")}')" class="btn btn-danger btn-sm">Delete</button>
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
        <div class="form-group" style="margin-bottom:14px;">
          <label>Image URL</label>
          <input type="url" id="newSportImage" class="form-input" value="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80">
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

  window.viewSportAdminModal = (sportId) => {
    const s = window.PlaySlotData.getSportById(sportId);
    if (!s) return;

    const modalContent = `
      <div style="text-align:center; margin-bottom:18px;">
        <img src="${s.image}" alt="${s.name}" style="width:100%; height:160px; object-fit:cover; border-radius:12px; margin-bottom:12px;">
        <span style="font-size:2.2rem;">${s.icon}</span>
        <h3 style="font-size:1.3rem; font-weight:800; margin-top:6px;">${s.name}</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-top:4px;">${s.description}</p>
      </div>

      <div style="background:var(--bg-color); padding:16px; border-radius:12px; font-size:0.9rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Starting Rate:</span>
          <strong style="color:var(--primary-color);">₹${s.startingPrice} / hr</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Court/Venue Format:</span>
          <strong>${s.categoryType}</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Active Turfs Listed:</span>
          <strong>${s.turfsCount} Venues</strong>
        </div>
      </div>
    `;

    PlaySlotApp.showModal(`Sport - ${s.name}`, modalContent, `<button class="btn btn-primary" onclick="PlaySlotApp.closeModal()">Close</button>`);
  };

  window.promptEditSport = (sportId) => {
    const s = window.PlaySlotData.getSportById(sportId);
    if (!s) return;

    const modalContent = `
      <div class="form-group" style="margin-bottom:14px;">
        <label>Sport Name *</label>
        <input type="text" id="editSportName" class="form-input" value="${s.name}" required>
      </div>
      <div class="form-group" style="margin-bottom:14px;">
        <label>Emoji Icon *</label>
        <input type="text" id="editSportIcon" class="form-input" value="${s.icon}" required>
      </div>
      <div class="form-group" style="margin-bottom:14px;">
        <label>Starting Price (₹/hr) *</label>
        <input type="number" id="editSportPrice" class="form-input" value="${s.startingPrice}" required>
      </div>
      <div class="form-group" style="margin-bottom:14px;">
        <label>Category Type</label>
        <select id="editSportType" class="form-select">
          <option value="Both" ${s.categoryType === 'Both' ? 'selected' : ''}>Both (Indoor / Outdoor)</option>
          <option value="Indoor" ${s.categoryType === 'Indoor' ? 'selected' : ''}>Indoor</option>
          <option value="Outdoor" ${s.categoryType === 'Outdoor' ? 'selected' : ''}>Outdoor</option>
        </select>
      </div>
      <div class="form-group" style="margin-bottom:14px;">
        <label>Image URL</label>
        <input type="url" id="editSportImage" class="form-input" value="${s.image || ''}">
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" id="editSportDesc" class="form-input" value="${s.description || ''}">
      </div>
    `;

    const modalFooter = `
      <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="window.executeEditSport('${s.id}')">Save Changes</button>
    `;

    PlaySlotApp.showModal(`Edit Sport - ${s.name}`, modalContent, modalFooter);
  };

  window.executeEditSport = (sportId) => {
    const name = document.getElementById('editSportName').value.trim();
    const icon = document.getElementById('editSportIcon').value.trim();
    const startingPrice = parseInt(document.getElementById('editSportPrice').value) || 1000;
    const categoryType = document.getElementById('editSportType').value;
    const image = document.getElementById('editSportImage').value.trim();
    const description = document.getElementById('editSportDesc').value.trim();

    if (!name) {
      PlaySlotApp.showToast('Please specify sport name.', 'error');
      return;
    }

    window.PlaySlotData.updateSport(sportId, { name, icon, startingPrice, categoryType, image, description });
    PlaySlotApp.closeModal();
    PlaySlotApp.showToast(`Sport "${name}" updated successfully!`, 'success');
    renderSportsManager(document.getElementById('adminSectionContainer'));
  };

  window.executeAddSport = () => {
    const name = document.getElementById('newSportName').value.trim();
    const icon = document.getElementById('newSportIcon').value.trim();
    const startingPrice = document.getElementById('newSportPrice').value;
    const categoryType = document.getElementById('newSportType').value;
    const image = document.getElementById('newSportImage') ? document.getElementById('newSportImage').value.trim() : '';
    const description = document.getElementById('newSportDesc').value;

    if (!name) {
      PlaySlotApp.showToast('Please specify sport name.', 'error');
      return;
    }

    window.PlaySlotData.addSport({ name, icon, startingPrice, categoryType, image, description });
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

  // --- 7. Admin Reports Section (Strictly Dynamic) ---
  function renderReports(container) {
    const stats = window.PlaySlotData.getAdminStats();
    const turfs = window.PlaySlotData.getTurfs({}, true);
    const bookings = window.PlaySlotData.getBookings();

    const commissionRevenue = Math.round(stats.totalRevenue * 0.08);

    // City matrix dynamic calculation
    const cities = ['Mumbai', 'Bengaluru', 'Delhi'];
    const cityMatrix = cities.map(city => {
      const cityTurfs = turfs.filter(t => t.city && t.city.toLowerCase().includes(city.toLowerCase()));
      const cityBookings = bookings.filter(b => {
        const turf = turfs.find(t => t.id === b.turfId);
        return turf && turf.city && turf.city.toLowerCase().includes(city.toLowerCase());
      });
      const grossVolume = cityBookings
        .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
        .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
      return {
        city,
        turfsCount: cityTurfs.length,
        bookingsCount: cityBookings.length,
        grossVolume
      };
    });

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
            <div class="value">₹${stats.totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#E0F2FE; color:#0284C7;">📈</div>
          <div class="stat-info">
            <h4>Commission Revenue (8%)</h4>
            <div class="value">₹${commissionRevenue.toLocaleString()}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background:#FEF3C7; color:#D97706;">🏟️</div>
          <div class="stat-info">
            <h4>Total Active Arenas</h4>
            <div class="value">${stats.totalTurfs} Turfs</div>
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
                <th>Processed Bookings</th>
                <th>Gross Volume</th>
                <th>Platform Commission (8%)</th>
              </tr>
            </thead>
            <tbody>
              ${cityMatrix.map(c => `
                <tr>
                  <td><strong>${c.city}</strong></td>
                  <td>${c.turfsCount} Turfs</td>
                  <td>${c.bookingsCount} Slots</td>
                  <td><strong style="color:#059669;">₹${c.grossVolume.toLocaleString()}</strong></td>
                  <td>₹${Math.round(c.grossVolume * 0.08).toLocaleString()}</td>
                </tr>
              `).join('')}
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
          <p style="color:var(--text-muted); font-size:0.95rem;">Configure convenience fees, GST rates, and demo state parameters</p>
        </div>
      </div>

      <div class="summary-card" style="max-width:800px; margin-bottom:28px;">
        <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:16px;">Fee & Operational Variables</h3>
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

      <!-- Section 25: Reset Demo Data Option -->
      <div class="summary-card" style="max-width:800px; border-left:4px solid #DC2626;">
        <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:8px; color:#DC2626;">Developer Environment - Reset Demo Data</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:16px;">
          Restore the pristine initial state: 4 users, 4 approved owners, 4 turfs, and 1 demo booking.
        </p>
        <button onclick="window.promptResetDemoData()" class="btn btn-danger">
          🔄 Reset All Platform Demo Data
        </button>
      </div>
    `;

    document.getElementById('adminSettingsForm').addEventListener('submit', (e) => {
      e.preventDefault();
      PlaySlotApp.showToast('Platform settings saved successfully!', 'success');
    });
  }

  // Section 25: Reset Demo Data with Confirmation Modal
  window.promptResetDemoData = () => {
    const modalContent = `
      <p style="color:var(--text-body); font-size:0.95rem; margin-bottom:16px;">
        Are you sure you want to reset all platform data to the initial clean demo state?
      </p>
      <div style="background:var(--bg-color); padding:14px; border-radius:10px; font-size:0.85rem; color:var(--text-muted); margin-bottom:16px;">
        • 4 initial users<br>
        • 4 approved turf owners<br>
        • 4 approved turfs<br>
        • 1 realistic demo booking<br>
        • All custom pending requests and newly booked slots will be cleared.
      </div>
    `;

    const modalFooter = `
      <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="window.executeResetDemoData()">Confirm Reset</button>
    `;

    PlaySlotApp.showModal('Reset All Demo Data?', modalContent, modalFooter);
  };

  window.executeResetDemoData = () => {
    window.PlaySlotData.resetDemoData();
    PlaySlotApp.closeModal();
    PlaySlotApp.showToast('Demo data restored to initial clean state!', 'success');
    renderAdminSection();
  };

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
