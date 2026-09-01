/**
 * PLAYSlot Common Components & Utilities (common.js)
 * Reusable UI renderers, Toast system, Modal system, Auth status, and Theme management
 */
import { AuthService } from './services/authService.js';
import { Storage } from './services/storage.js';

// ==========================================================================
// Theme Management (Light / Dark mode)
// ==========================================================================
export const Theme = {
  init() {
    const savedTheme = localStorage.getItem('playslot_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateToggleIcons(savedTheme);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('playslot_theme', next);
    this.updateToggleIcons(next);
    showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  },

  updateToggleIcons(theme) {
    const btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach(btn => {
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      btn.title = `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`;
    });
  }
};

// ==========================================================================
// Toast Notification Engine
// ==========================================================================
export function showToast(message, type = 'success') {
  let container = document.getElementById('playslot-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'playslot-toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✓',
    danger: '✕',
    warning: '⚠️',
    info: 'ℹ️'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div style="display:flex; align-items:center; gap:10px;">
      <span style="font-weight:800; font-size:1.1rem;">${icons[type] || 'ℹ️'}</span>
      <span>${message}</span>
    </div>
    <button class="toast-close">&times;</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.onclick = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 250);
  };

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 250);
    }
  }, 4000);
}

// ==========================================================================
// Modal Helpers
// ==========================================================================
export function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}

export function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

// Formatters
export function formatCurrency(amount) {
  return '₹' + Number(amount || 0).toLocaleString('en-IN');
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ==========================================================================
// Public Navbar Injection
// ==========================================================================
export async function initNavbar(activePage = '') {
  const container = document.getElementById('navbar-container');
  if (!container) return;

  const auth = await AuthService.getCurrentAuth();
  const isUserLoggedIn = auth && auth.role === 'user' && auth.user;
  const user = isUserLoggedIn ? auth.user : null;

  // Determine root path prefix relative to current page
  const isSubdir = window.location.pathname.includes('/pages/') || 
                   window.location.pathname.includes('/owner/') || 
                   window.location.pathname.includes('/admin/');
  const root = isSubdir ? '../' : './';

  container.innerHTML = `
    <header class="navbar">
      <div class="container navbar-inner">
        <a href="${root}index.html" class="brand-logo">
          <div class="logo-icon">⚡</div>
          <span>PLAY<span class="highlight">SLOT</span></span>
        </a>

        <ul class="nav-links">
          <li><a href="${root}index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
          <li><a href="${root}pages/venues.html" class="nav-link ${activePage === 'venues' ? 'active' : ''}">Find Turfs</a></li>
          ${isUserLoggedIn ? `<li><a href="${root}pages/my-bookings.html" class="nav-link ${activePage === 'my-bookings' ? 'active' : ''}">My Bookings</a></li>` : ''}
        </ul>

        <div class="nav-actions">
          <button class="theme-toggle-btn" id="themeToggleBtn">🌙</button>

          ${isUserLoggedIn ? `
            <div style="display:flex; align-items:center; gap:10px;">
              <a href="${root}pages/profile.html" style="display:flex; align-items:center; gap:8px; font-weight:600; font-size:0.9rem;">
                <img src="${user.avatar}" alt="${user.name}" style="width:36px; height:36px; border-radius:50%; border:2px solid var(--primary); object-fit:cover;">
                <span>${user.name.split(' ')[0]}</span>
              </a>
              <button id="logoutBtn" class="btn btn-outline btn-sm">Logout</button>
            </div>
          ` : `
            <a href="${root}pages/login.html" class="btn btn-outline btn-sm">Log In</a>
            <a href="${root}pages/register.html" class="btn btn-primary btn-sm">Sign Up</a>
          `}

          <button class="mobile-menu-toggle" id="mobileMenuToggle">☰</button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-nav-drawer" id="mobileNavDrawer">
        <a href="${root}index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">🏠 Home</a>
        <a href="${root}pages/venues.html" class="nav-link ${activePage === 'venues' ? 'active' : ''}">🏟️ Find Turfs</a>
        ${isUserLoggedIn ? `<a href="${root}pages/my-bookings.html" class="nav-link">🎟️ My Bookings</a>` : ''}
        <hr style="border:none; border-top:1px solid var(--border-color); margin:8px 0;">
        ${isUserLoggedIn ? `
          <a href="${root}pages/profile.html" class="nav-link">👤 My Profile (${user.name})</a>
          <button id="mobileLogoutBtn" class="btn btn-outline btn-sm w-full">Logout</button>
        ` : `
          <a href="${root}pages/login.html" class="btn btn-outline w-full">Log In</a>
          <a href="${root}pages/register.html" class="btn btn-primary w-full">Sign Up Free</a>
        `}
      </div>
    </header>
  `;

  // Attach handlers
  document.getElementById('themeToggleBtn')?.addEventListener('click', () => Theme.toggle());
  
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  if (mobileToggle && drawer) {
    mobileToggle.addEventListener('click', () => {
      drawer.classList.toggle('open');
      mobileToggle.textContent = drawer.classList.contains('open') ? '✕' : '☰';
    });
  }

  const logoutHandler = async () => {
    await AuthService.logout();
    showToast('Logged out successfully', 'info');
    setTimeout(() => window.location.href = `${root}index.html`, 500);
  };

  document.getElementById('logoutBtn')?.addEventListener('click', logoutHandler);
  document.getElementById('mobileLogoutBtn')?.addEventListener('click', logoutHandler);
}

// ==========================================================================
// Public Footer Injection
// ==========================================================================
export function initFooter() {
  const container = document.getElementById('footer-container');
  if (!container) return;

  const isSubdir = window.location.pathname.includes('/pages/') || 
                   window.location.pathname.includes('/owner/') || 
                   window.location.pathname.includes('/admin/');
  const root = isSubdir ? '../' : './';

  container.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="brand-logo" style="margin-bottom:16px; color:#ffffff;">
              <div class="logo-icon">⚡</div>
              <span>PLAY<span class="highlight">SLOT</span></span>
            </div>
            <p style="color:#94a3b8; font-size:0.92rem; line-height:1.6; max-width:320px;">
              India's premier sports turf and slot booking network. Instant court reservations for Cricket, Football, Badminton, Pickleball, Basketball, Golf & Pool.
            </p>
            <div style="display:flex; gap:12px; margin-top:18px;">
              <span style="font-size:1.3rem; cursor:pointer;">📱</span>
              <span style="font-size:1.3rem; cursor:pointer;">🌐</span>
              <span style="font-size:1.3rem; cursor:pointer;">💬</span>
            </div>
          </div>

          <div class="footer-col">
            <h4>Sports Categories</h4>
            <ul>
              <li><a href="${root}pages/venues.html?sport=Cricket">Box Cricket</a></li>
              <li><a href="${root}pages/venues.html?sport=Football">Football / Futsal</a></li>
              <li><a href="${root}pages/venues.html?sport=Badminton">Badminton Courts</a></li>
              <li><a href="${root}pages/venues.html?sport=Pickleball">Pickleball</a></li>
              <li><a href="${root}pages/venues.html?sport=Golf">Golf Simulator</a></li>
              <li><a href="${root}pages/venues.html?sport=8+Ball+Pool">8 Ball Pool</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Portals & Quick Links</h4>
            <ul>
              <li><a href="${root}pages/venues.html">Explore Venues</a></li>
              <li><a href="${root}pages/login.html">Player Login</a></li>
              <li><a href="${root}owner/login.html">Turf Owner SaaS</a></li>
              <li><a href="${root}owner/register.html">List Your Arena</a></li>
              <li><a href="${root}admin/login.html">Admin Portal</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Get Help</h4>
            <ul>
              <li><span style="color:#94a3b8; font-size:0.9rem;">📍 Mumbai • Bengaluru • Delhi</span></li>
              <li><span style="color:#94a3b8; font-size:0.9rem;">📞 +91 (800) 555-SLOT</span></li>
              <li><span style="color:#94a3b8; font-size:0.9rem;">✉️ support@playslot.app</span></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div>© 2026 PLAYSlot Sports Technologies Ltd. All rights reserved.</div>
          <div>HTML5 • CSS3 • Vanilla JavaScript Frontend Suite</div>
        </div>
      </div>
    </footer>
  `;
}

// ==========================================================================
// Owner Sidebar Injection (with Multi-Owner Switcher)
// ==========================================================================
export async function initOwnerSidebar(activePage = 'dashboard') {
  const container = document.getElementById('owner-sidebar-container');
  if (!container) return;

  const auth = await AuthService.getCurrentAuth();
  const owners = Storage.get('OWNERS') || [];
  const currentOwner = auth?.owner || owners[0];

  const root = window.location.pathname.includes('/owner/') ? './' : '../owner/';
  const publicRoot = window.location.pathname.includes('/owner/') ? '../' : './';

  container.innerHTML = `
    <aside class="dash-sidebar" id="dashSidebar">
      <div class="dash-sidebar-header">
        <a href="${root}dashboard.html" class="dash-sidebar-logo">
          <div class="logo-icon" style="width:32px; height:32px; font-size:1rem;">⚡</div>
          <span>PLAYSLOT</span>
        </a>
        <span class="dash-sidebar-badge">OWNER</span>
      </div>

      <div style="padding:14px; background:rgba(255,255,255,0.04); border-bottom:1px solid rgba(255,255,255,0.06);">
        <div style="font-size:0.75rem; color:#94a3b8; margin-bottom:4px;">SWITCH ACTIVE OWNER:</div>
        <select id="multiOwnerSelect" style="width:100%; padding:6px 8px; border-radius:6px; background:#1e293b; color:#ffffff; border:1px solid #334155; font-size:0.82rem; font-weight:600; outline:none; cursor:pointer;">
          ${owners.map(o => `
            <option value="${o.id}" ${o.id === currentOwner.id ? 'selected' : ''}>
              ${o.name} (${o.businessName})
            </option>
          `).join('')}
        </select>
      </div>

      <nav class="dash-nav">
        <div class="dash-nav-section">Operations</div>
        <a href="${root}dashboard.html" class="dash-nav-item ${activePage === 'dashboard' ? 'active' : ''}">
          <span class="dash-nav-icon">📊</span>
          <span>Dashboard</span>
        </a>
        <a href="${root}venues.html" class="dash-nav-item ${activePage === 'venues' ? 'active' : ''}">
          <span class="dash-nav-icon">🏟️</span>
          <span>My Venues</span>
        </a>
        <a href="${root}slots.html" class="dash-nav-item ${activePage === 'slots' ? 'active' : ''}">
          <span class="dash-nav-icon">⏱️</span>
          <span>Manage Slots</span>
        </a>
        <a href="${root}bookings.html" class="dash-nav-item ${activePage === 'bookings' ? 'active' : ''}">
          <span class="dash-nav-icon">🎟️</span>
          <span>Bookings</span>
        </a>

        <div class="dash-nav-section">Financials & Profile</div>
        <a href="${root}revenue.html" class="dash-nav-item ${activePage === 'revenue' ? 'active' : ''}">
          <span class="dash-nav-icon">💰</span>
          <span>Revenue & Payouts</span>
        </a>
        <a href="${root}profile.html" class="dash-nav-item ${activePage === 'profile' ? 'active' : ''}">
          <span class="dash-nav-icon">👤</span>
          <span>Business Profile</span>
        </a>
        <a href="${publicRoot}index.html" class="dash-nav-item">
          <span class="dash-nav-icon">🌐</span>
          <span>Public Website</span>
        </a>
      </nav>

      <div class="dash-sidebar-footer">
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${currentOwner.avatar}" alt="${currentOwner.name}" style="width:36px; height:36px; border-radius:50%; object-fit:cover; border:2px solid var(--primary);">
          <div>
            <div style="color:#ffffff; font-size:0.85rem; font-weight:700; max-width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${currentOwner.name}</div>
            <div style="font-size:0.75rem; color:#94a3b8;">${currentOwner.status}</div>
          </div>
        </div>
        <button id="ownerLogoutBtn" title="Logout" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">🚪</button>
      </div>
    </aside>
  `;

  // Handle Multi-owner switch
  document.getElementById('multiOwnerSelect')?.addEventListener('change', async (e) => {
    await AuthService.switchActiveOwner(e.target.value);
    showToast(`Switched active owner to ${e.target.options[e.target.selectedIndex].text.split('(')[0]}`, 'success');
    setTimeout(() => window.location.reload(), 400);
  });

  document.getElementById('ownerLogoutBtn')?.addEventListener('click', async () => {
    await AuthService.logout();
    showToast('Logged out of Owner Portal', 'info');
    setTimeout(() => window.location.href = `${publicRoot}index.html`, 400);
  });
}

// ==========================================================================
// Admin Sidebar Injection
// ==========================================================================
export function initAdminSidebar(activePage = 'dashboard') {
  const container = document.getElementById('admin-sidebar-container');
  if (!container) return;

  const root = window.location.pathname.includes('/admin/') ? './' : '../admin/';
  const publicRoot = window.location.pathname.includes('/admin/') ? '../' : './';

  container.innerHTML = `
    <aside class="dash-sidebar admin-sidebar" id="dashSidebar">
      <div class="dash-sidebar-header">
        <a href="${root}dashboard.html" class="dash-sidebar-logo">
          <div class="logo-icon" style="width:32px; height:32px; font-size:1rem; background:linear-gradient(135deg, #6366f1 0%, #4338ca 100%);">⚡</div>
          <span>PLAYSLOT</span>
        </a>
        <span class="admin-badge-role">ADMIN</span>
      </div>

      <nav class="dash-nav">
        <div class="dash-nav-section">Overview</div>
        <a href="${root}dashboard.html" class="dash-nav-item ${activePage === 'dashboard' ? 'active' : ''}">
          <span class="dash-nav-icon">📈</span>
          <span>Dashboard</span>
        </a>

        <div class="dash-nav-section">Management</div>
        <a href="${root}owners.html" class="dash-nav-item ${activePage === 'owners' ? 'active' : ''}">
          <span class="dash-nav-icon">🏢</span>
          <span>Owners & Approvals</span>
        </a>
        <a href="${root}venues.html" class="dash-nav-item ${activePage === 'venues' ? 'active' : ''}">
          <span class="dash-nav-icon">🏟️</span>
          <span>Venues</span>
        </a>
        <a href="${root}users.html" class="dash-nav-item ${activePage === 'users' ? 'active' : ''}">
          <span class="dash-nav-icon">👥</span>
          <span>Users</span>
        </a>
        <a href="${root}sports.html" class="dash-nav-item ${activePage === 'sports' ? 'active' : ''}">
          <span class="dash-nav-icon">🏆</span>
          <span>Sports (8)</span>
        </a>

        <div class="dash-nav-section">Finance & System</div>
        <a href="${root}bookings.html" class="dash-nav-item ${activePage === 'bookings' ? 'active' : ''}">
          <span class="dash-nav-icon">🎟️</span>
          <span>All Bookings</span>
        </a>
        <a href="${root}payments.html" class="dash-nav-item ${activePage === 'payments' ? 'active' : ''}">
          <span class="dash-nav-icon">💳</span>
          <span>Payments</span>
        </a>
        <a href="${root}settings.html" class="dash-nav-item ${activePage === 'settings' ? 'active' : ''}">
          <span class="dash-nav-icon">⚙️</span>
          <span>Settings</span>
        </a>
        <a href="${publicRoot}index.html" class="dash-nav-item">
          <span class="dash-nav-icon">🌐</span>
          <span>Public Site</span>
        </a>
      </nav>

      <div class="dash-sidebar-footer">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:36px; height:36px; border-radius:50%; background:#6366f1; display:flex; align-items:center; justify-content:center; color:#ffffff; font-weight:800;">A</div>
          <div>
            <div style="color:#ffffff; font-size:0.85rem; font-weight:700;">Administrator</div>
            <div style="font-size:0.75rem; color:#94a3b8;">Full System Access</div>
          </div>
        </div>
        <button id="adminLogoutBtn" title="Logout" style="background:none; border:none; color:#ef4444; font-size:1.2rem; cursor:pointer;">🚪</button>
      </div>
    </aside>
  `;

  document.getElementById('adminLogoutBtn')?.addEventListener('click', async () => {
    await AuthService.logout();
    showToast('Logged out of Admin Portal', 'info');
    setTimeout(() => window.location.href = `${publicRoot}index.html`, 400);
  });
}

// Auto-run Theme init on page load
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
});
