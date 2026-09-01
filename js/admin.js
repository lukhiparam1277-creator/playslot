/**
 * PLAYSlot Master Admin Portal Controller (admin.js)
 * Platform metrics, owner approvals, user management, sports CRUD, and financial audit
 */
import { initAdminSidebar, showToast, openModal, closeModal, formatCurrency, formatDate } from './common.js';
import { Storage } from './services/storage.js';
import { AdminService } from './services/adminService.js';
import { VenueService } from './services/venueService.js';
import { BookingService } from './services/bookingService.js';

export const AdminController = {
  // =========================================================================
  // 1. Admin Master Dashboard
  // =========================================================================
  async initDashboard() {
    initAdminSidebar('dashboard');

    const metrics = await AdminService.getAdminMetrics();
    document.getElementById('adminKpiUsers').textContent = metrics.totalUsers;
    document.getElementById('adminKpiOwners').textContent = metrics.totalOwners;
    document.getElementById('adminKpiVenues').textContent = metrics.totalVenues;
    document.getElementById('adminKpiBookings').textContent = metrics.totalBookings;
    document.getElementById('adminKpiPending').textContent = metrics.pendingOwners;
    document.getElementById('adminKpiGrossRev').textContent = formatCurrency(metrics.grossRevenue);

    // Recent Owners Approvals preview
    const owners = await AdminService.getOwners();
    const pendingOwners = owners.filter(o => o.status === 'Pending');
    const pendingCont = document.getElementById('adminPendingOwnersTbody');
    if (pendingCont) {
      if (pendingOwners.length === 0) {
        pendingCont.innerHTML = `<tr><td colspan="5" class="text-center" style="padding:20px; color:var(--text-muted);">No pending owner applications.</td></tr>`;
      } else {
        pendingCont.innerHTML = pendingOwners.map(o => `
          <tr>
            <td><strong>${o.name}</strong></td>
            <td>${o.businessName}</td>
            <td><span class="status-pill status-pending">Pending Approval</span></td>
            <td>${formatDate(o.joined)}</td>
            <td>
              <button class="btn btn-primary btn-sm approve-owner-btn" data-id="${o.id}">Approve ✓</button>
              <button class="btn btn-danger btn-sm reject-owner-btn" data-id="${o.id}">Reject ✕</button>
            </td>
          </tr>
        `).join('');

        pendingCont.querySelectorAll('.approve-owner-btn').forEach(btn => {
          btn.addEventListener('click', async () => {
            await AdminService.updateOwnerStatus(btn.dataset.id, 'Approved');
            showToast('Turf Owner Approved! Access granted to partner portal.', 'success');
            this.initDashboard();
          });
        });

        pendingCont.querySelectorAll('.reject-owner-btn').forEach(btn => {
          btn.addEventListener('click', async () => {
            await AdminService.updateOwnerStatus(btn.dataset.id, 'Rejected');
            showToast('Application rejected', 'danger');
            this.initDashboard();
          });
        });
      }
    }
  },

  // =========================================================================
  // 2. User Management
  // =========================================================================
  async initUsers() {
    initAdminSidebar('users');

    const searchInput = document.getElementById('userSearchInput');
    const statusFilter = document.getElementById('userStatusFilter');

    const loadUsers = async () => {
      let users = await AdminService.getUsers();
      const q = searchInput?.value.trim().toLowerCase() || '';
      const filterStatus = statusFilter?.value || 'All';

      if (q) {
        users = users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
      }
      if (filterStatus !== 'All') {
        users = users.filter(u => u.status.toLowerCase() === filterStatus.toLowerCase());
      }

      const tbody = document.getElementById('adminUsersTbody');
      if (!tbody) return;

      tbody.innerHTML = users.map(u => `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:10px;">
              <img src="${u.avatar}" alt="${u.name}" style="width:32px; height:32px; border-radius:50%; object-fit:cover;">
              <strong>${u.name}</strong>
            </div>
          </td>
          <td>${u.email}</td>
          <td>${u.phone}</td>
          <td><span class="status-pill ${u.status === 'Active' ? 'status-active' : 'status-suspended'}">${u.status}</span></td>
          <td>${formatDate(u.joined)}</td>
          <td><strong>${u.bookingsCount}</strong></td>
          <td>
            <button class="btn btn-outline btn-sm toggle-user-btn" data-id="${u.id}" data-status="${u.status}">
              ${u.status === 'Active' ? 'Suspend' : 'Unblock'}
            </button>
            <button class="btn btn-danger btn-sm delete-user-btn" data-id="${u.id}" data-name="${u.name}">🗑️</button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.toggle-user-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const next = await AdminService.toggleUserStatus(btn.dataset.id);
          showToast(`User status updated to ${next}`, 'info');
          loadUsers();
        });
      });

      tbody.querySelectorAll('.delete-user-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (confirm(`Permanently delete account for ${btn.dataset.name}?`)) {
            await AdminService.deleteUser(btn.dataset.id);
            showToast('User deleted', 'danger');
            loadUsers();
          }
        });
      });
    };

    searchInput?.addEventListener('input', () => loadUsers());
    statusFilter?.addEventListener('change', () => loadUsers());
    loadUsers();
  },

  // =========================================================================
  // 3. Owners Moderation & Approvals
  // =========================================================================
  async initOwners() {
    initAdminSidebar('owners');

    const loadOwners = async () => {
      const owners = await AdminService.getOwners();
      const tbody = document.getElementById('adminOwnersTbody');
      if (!tbody) return;

      tbody.innerHTML = owners.map(o => `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:10px;">
              <img src="${o.avatar}" alt="${o.name}" style="width:34px; height:34px; border-radius:50%; object-fit:cover;">
              <div>
                <strong>${o.name}</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">${o.email}</div>
              </div>
            </div>
          </td>
          <td><strong>${o.businessName}</strong></td>
          <td>${o.venuesCount} Turfs</td>
          <td>
            <span class="status-pill ${o.status === 'Approved' ? 'status-approved' : o.status === 'Pending' ? 'status-pending' : 'status-suspended'}">
              ${o.status}
            </span>
          </td>
          <td>${formatDate(o.joined)}</td>
          <td>
            ${o.status === 'Pending' ? `
              <button class="btn btn-primary btn-sm approve-btn" data-id="${o.id}">Approve</button>
              <button class="btn btn-danger btn-sm reject-btn" data-id="${o.id}">Reject</button>
            ` : o.status === 'Approved' ? `
              <button class="btn btn-outline btn-sm suspend-btn" data-id="${o.id}">Suspend</button>
            ` : `
              <button class="btn btn-primary btn-sm approve-btn" data-id="${o.id}">Reactivate</button>
            `}
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          await AdminService.updateOwnerStatus(btn.dataset.id, 'Approved');
          showToast('Owner approved successfully', 'success');
          loadOwners();
        });
      });

      tbody.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          await AdminService.updateOwnerStatus(btn.dataset.id, 'Rejected');
          showToast('Owner rejected', 'danger');
          loadOwners();
        });
      });

      tbody.querySelectorAll('.suspend-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          await AdminService.updateOwnerStatus(btn.dataset.id, 'Suspended');
          showToast('Owner account suspended', 'warning');
          loadOwners();
        });
      });
    };

    loadOwners();
  },

  // =========================================================================
  // 4. Venues Moderation
  // =========================================================================
  async initVenues() {
    initAdminSidebar('venues');

    const loadVenues = async () => {
      const venues = await VenueService.getVenues();
      const tbody = document.getElementById('adminVenuesTbody');
      if (!tbody) return;

      tbody.innerHTML = venues.map(v => `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:10px;">
              <img src="${v.banner}" alt="${v.name}" style="width:40px; height:32px; border-radius:6px; object-fit:cover;">
              <strong>${v.name}</strong>
            </div>
          </td>
          <td>${v.ownerName}</td>
          <td>${v.city}</td>
          <td>${v.sports.join(', ')}</td>
          <td><strong>${formatCurrency(v.hourlyRate)}/hr</strong></td>
          <td><span class="status-pill ${v.status === 'Active' ? 'status-active' : 'status-suspended'}">${v.status}</span></td>
          <td>
            <button class="btn btn-outline btn-sm toggle-venue-btn" data-id="${v.id}">
              ${v.status === 'Active' ? 'Deactivate' : 'Activate'}
            </button>
            <button class="btn btn-danger btn-sm delete-venue-btn" data-id="${v.id}" data-name="${v.name}">🗑️</button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.toggle-venue-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const next = await VenueService.toggleVenueStatus(btn.dataset.id);
          showToast(`Venue status changed to ${next}`, 'info');
          loadVenues();
        });
      });

      tbody.querySelectorAll('.delete-venue-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (confirm(`Delete venue "${btn.dataset.name}"?`)) {
            await VenueService.deleteVenue(btn.dataset.id);
            showToast('Venue removed', 'danger');
            loadVenues();
          }
        });
      });
    };

    loadVenues();
  },

  // =========================================================================
  // 5. Sports Categories Management
  // =========================================================================
  async initSports() {
    initAdminSidebar('sports');

    const loadSports = async () => {
      const sports = await AdminService.getSports();
      const grid = document.getElementById('adminSportsGrid');
      if (!grid) return;

      grid.innerHTML = sports.map(s => `
        <div class="sport-admin-card">
          <div class="sport-admin-header">
            <div class="sport-admin-icon">${s.icon}</div>
            <span class="status-pill ${s.status === 'Active' ? 'status-active' : 'status-suspended'}">${s.status}</span>
          </div>

          <div>
            <h3 style="font-size:1.15rem; margin-bottom:4px;">${s.name}</h3>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:8px;">Category: ${s.category} • ${s.playerCount}</div>
            <p style="font-size:0.85rem; line-height:1.4;">${s.description}</p>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:12px; margin-top:auto;">
            <span style="font-size:0.82rem; font-weight:700;">${s.activeVenues} Venues</span>
            <button class="btn btn-outline btn-sm toggle-sport-btn" data-id="${s.id}">
              ${s.status === 'Active' ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>
      `).join('');

      grid.querySelectorAll('.toggle-sport-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const next = await AdminService.toggleSportStatus(btn.dataset.id);
          showToast(`Sport ${next === 'Active' ? 'enabled' : 'disabled'}`, 'info');
          loadSports();
        });
      });
    };

    // Add Sport Modal
    document.getElementById('openAddSportModalBtn')?.addEventListener('click', () => {
      openModal('addSportModal');
    });

    document.getElementById('addSportForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      await AdminService.addSport({
        name: document.getElementById('newSportNameInput').value,
        icon: document.getElementById('newSportIconInput').value || '🏆',
        category: document.getElementById('newSportCategorySelect').value,
        playerCount: document.getElementById('newSportPlayersInput').value,
        description: document.getElementById('newSportDescInput').value
      });

      closeModal('addSportModal');
      showToast('New sport category created!', 'success');
      loadSports();
    });

    loadSports();
  },

  // =========================================================================
  // 6. Global Bookings Ledger
  // =========================================================================
  async initBookings() {
    initAdminSidebar('bookings');

    const statusFilter = document.getElementById('adminBookingStatusFilter');
    const searchInput = document.getElementById('adminBookingSearchInput');

    const loadBookings = async () => {
      let bookings = await BookingService.getAllBookings({
        status: statusFilter?.value || 'All'
      });

      const q = searchInput?.value.trim().toLowerCase() || '';
      if (q) {
        bookings = bookings.filter(b => 
          b.userName.toLowerCase().includes(q) ||
          b.venueName.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q)
        );
      }

      const tbody = document.getElementById('adminBookingsTbody');
      if (!tbody) return;

      tbody.innerHTML = bookings.map(b => `
        <tr>
          <td><strong>#${b.id}</strong></td>
          <td>${b.userName}</td>
          <td>${b.ownerName}</td>
          <td>${b.venueName}</td>
          <td>${b.sport}</td>
          <td>${formatDate(b.date)} (${b.timeSlot})</td>
          <td><strong>${formatCurrency(b.amount)}</strong></td>
          <td><span class="status-pill ${b.status === 'Upcoming' ? 'status-active' : b.status === 'Completed' ? 'status-approved' : 'status-suspended'}">${b.status}</span></td>
        </tr>
      `).join('');
    };

    statusFilter?.addEventListener('change', () => loadBookings());
    searchInput?.addEventListener('input', () => loadBookings());
    loadBookings();
  },

  // =========================================================================
  // 7. Payments Ledger
  // =========================================================================
  async initPayments() {
    initAdminSidebar('payments');

    const payments = await AdminService.getPayments();
    const tbody = document.getElementById('adminPaymentsTbody');
    if (tbody) {
      tbody.innerHTML = payments.map(p => `
        <tr>
          <td><strong>#${p.id}</strong></td>
          <td>#${p.bookingId}</td>
          <td>${p.user}</td>
          <td>${p.venue}</td>
          <td>${p.owner}</td>
          <td><strong>${formatCurrency(p.amount)}</strong></td>
          <td>${p.method}</td>
          <td><span class="status-pill ${p.status === 'Success' ? 'status-success' : 'status-refunded'}">${p.status}</span></td>
          <td>${p.date}</td>
        </tr>
      `).join('');
    }
  }
};
