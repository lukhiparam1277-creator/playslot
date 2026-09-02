/**
 * PlaySlot Global Application Engine & UI Components (v2)
 */



const PlaySlotApp = {
  // Toast Notification System
  showToast: (message, type = 'success') => {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : (type === 'error' ? '⚠️' : 'ℹ️');
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  // Modal Manager
  showModal: (title, contentHtml, footerHtml = '') => {
    let modal = document.getElementById('globalAppModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'globalAppModal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3 style="font-size:1.3rem; font-weight:800;">${title}</h3>
          <button class="modal-close" onclick="PlaySlotApp.closeModal()">✕</button>
        </div>
        <div class="modal-body">${contentHtml}</div>
        ${footerHtml ? `<div class="modal-footer" style="margin-top:24px; display:flex; justify-content:flex-end; gap:12px;">${footerHtml}</div>` : ''}
      </div>
    `;

    modal.classList.add('active');
  },

  closeModal: () => {
    const modal = document.getElementById('globalAppModal');
    if (modal) modal.classList.remove('active');
  },

  // Public & User Navbar Component
  renderNavbar: () => {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    const user = window.PlaySlotData ? window.PlaySlotData.getCurrentUser() : null;
    const currentPath = window.location.pathname;

    let authNavActions = '';
    let loggedInMenu = '';

    if (user && user.role === 'user') {
      loggedInMenu = `
        <li><a href="/user/dashboard" class="nav-link ${currentPath.includes('dashboard') ? 'active' : ''}">Dashboard</a></li>
        <li><a href="/user/bookings" class="nav-link ${currentPath.includes('bookings') ? 'active' : ''}">My Bookings</a></li>
      `;
      authNavActions = `
        <a href="/user/dashboard" class="user-profile-menu">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}" alt="${user.name}" class="avatar-sm">
          <span style="font-weight:700; font-size:0.9rem; color:var(--text-dark);">${user.name.split(' ')[0]}</span>
        </a>
        <button onclick="PlaySlotApp.logout()" class="btn btn-outline-dark btn-sm">Logout</button>
      `;
    } else if (user && user.role === 'turf_owner') {
      loggedInMenu = `
        <li><a href="/owner/dashboard" class="nav-link" style="color:var(--secondary-color); font-weight:700;">🏟️ Owner Console</a></li>
      `;
      authNavActions = `
        <a href="/owner/dashboard" class="btn btn-emerald btn-sm">Owner Console</a>
        <button onclick="PlaySlotApp.logout()" class="btn btn-outline-dark btn-sm">Logout</button>
      `;
    } else if (user && user.role === 'admin') {
      loggedInMenu = `
        <li><a href="/admin/dashboard" class="nav-link" style="color:var(--accent-purple); font-weight:700;">🛡️ Admin Console</a></li>
      `;
      authNavActions = `
        <a href="/admin/dashboard" class="btn btn-primary btn-sm" style="background:#8B5CF6;">Admin Console</a>
        <button onclick="PlaySlotApp.logout()" class="btn btn-outline-dark btn-sm">Logout</button>
      `;
    } else {
      authNavActions = `
        <a href="/login" class="btn btn-outline-dark" style="padding:8px 18px;">Login</a>
        <a href="/register" class="btn btn-primary" style="padding:8px 20px;">Register</a>
      `;
    }

    container.innerHTML = `
      <nav class="navbar">
        <div class="container navbar-container">
          <a href="/" class="logo">
            <div class="logo-badge">⚡</div>
            <span>Play<span class="brand-dot">Slot</span></span>
          </a>

          <ul class="nav-menu" id="navMenu">
            <li><a href="/" class="nav-link ${currentPath === '/' || currentPath.includes('index') ? 'active' : ''}">Home</a></li>
            <li><a href="/sports" class="nav-link ${currentPath.includes('sports') ? 'active' : ''}">Sports</a></li>
            <li><a href="/turfs" class="nav-link ${currentPath.includes('turfs') || currentPath.includes('venues') || currentPath.includes('venue-detail') ? 'active' : ''}">Turfs</a></li>
            ${loggedInMenu}
            <li><a href="/contact.html" class="nav-link ${currentPath.includes('contact') ? 'active' : ''}">Support</a></li>
          </ul>

          <div class="nav-actions">
            ${authNavActions}
            <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle navigation">☰</button>
          </div>
        </div>
      </nav>

      <!-- Mobile Bottom Navigation Bar -->
      <div class="mobile-bottom-nav">
        <a href="/" class="mobile-bottom-nav-item ${currentPath === '/' || currentPath.includes('index') ? 'active' : ''}">
          <span class="icon">🏠</span>
          <span>Home</span>
        </a>
        <a href="/sports" class="mobile-bottom-nav-item ${currentPath.includes('sports') ? 'active' : ''}">
          <span class="icon">🏆</span>
          <span>Sports</span>
        </a>
        <a href="/turfs" class="mobile-bottom-nav-item ${currentPath.includes('turfs') || currentPath.includes('venues') ? 'active' : ''}">
          <span class="icon">🏟️</span>
          <span>Turfs</span>
        </a>
        ${user && user.role === 'user' ? `
          <a href="/user/bookings" class="mobile-bottom-nav-item ${currentPath.includes('bookings') ? 'active' : ''}">
            <span class="icon">🎟️</span>
            <span>Bookings</span>
          </a>
          <a href="/user/dashboard" class="mobile-bottom-nav-item ${currentPath.includes('dashboard') ? 'active' : ''}">
            <span class="icon">👤</span>
            <span>Dashboard</span>
          </a>
        ` : `
          <a href="/login" class="mobile-bottom-nav-item ${currentPath.includes('login') ? 'active' : ''}">
            <span class="icon">👤</span>
            <span>Login</span>
          </a>
        `}
      </div>
    `;

    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
      });
    }
  },

  // Public Footer Component (Contains Owner Application links)
  renderFooter: () => {
    const container = document.getElementById('footer-container');
    if (!container) return;

    container.innerHTML = `
      <footer>
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <a href="/" class="logo" style="color:#ffffff; margin-bottom:14px; display:inline-flex;">
                <div class="logo-badge">⚡</div>
                <span>Play<span class="brand-dot">Slot</span></span>
              </a>
              <p style="color:var(--text-light); font-size:0.9rem; line-height:1.6; max-width:320px;">
                The premier sports & turf booking platform. Discover verified turf arenas, check real-time slot availability, and reserve with zero hassle.
              </p>
              <div style="margin-top:16px;">
                <span class="badge badge-dark">⚡ Instant Confirmation</span>
                <span class="badge badge-dark" style="margin-left:6px;">🔒 100% Verified</span>
              </div>
            </div>

            <div class="footer-col">
              <h4>Quick Links</h4>
              <ul class="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/sports">Sports Categories</a></li>
                <li><a href="/turfs">Explore Verified Turfs</a></li>
                <li><a href="/user/bookings">My Slot Bookings</a></li>
                <li><a href="/contact.html">Help & Support</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Turf Partners</h4>
              <ul class="footer-links">
                <li><a href="/owner/apply" style="color:#10B981; font-weight:700;">🏟️ List Your Turf Arena</a></li>
                <li><a href="/owner/status">Check Application Status</a></li>
                <li><a href="/owner/login">Turf Partner Login</a></li>
                <li><a href="/contact.html">Partner Support</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Contact & Support</h4>
              <ul class="footer-links">
                <li>📍 100 Feet Road, Indiranagar, Bengaluru</li>
                <li>📞 +91 98765 43210 (24/7 Helpline)</li>
                <li>✉️ support@playslot.com</li>
                <li>⏰ Support Hours: 06:00 AM - 11:00 PM</li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} PlaySlot Sports Technologies. All rights reserved.</p>
            <div style="display:flex; gap:16px;">
              <a href="#" onclick="alert('PlaySlot Privacy Policy: We respect and safeguard player information.'); return false;">Privacy Policy</a>
              <span>•</span>
              <a href="#" onclick="alert('PlaySlot Terms: Standard venue rules apply.'); return false;">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  logout: () => {
    if (window.PlaySlotData) {
      window.PlaySlotData.logout();
    }
    window.location.href = '/login?success=Logged%20out%20successfully';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PlaySlotApp.renderNavbar();
  PlaySlotApp.renderFooter();
});

if (typeof window !== 'undefined') {
  window.PlaySlotApp = PlaySlotApp;
}
