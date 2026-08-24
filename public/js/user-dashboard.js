/**
 * PlaySlot User Dashboard Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const container = document.getElementById('userDashboardContainer');
  if (!container) return;

  const user = window.PlaySlotData.getCurrentUser();
  if (!user || user.role !== 'user') {
    // If not logged in as user, redirect to login
    window.location.href = '/login?error=' + encodeURIComponent('Please login to access your player dashboard') + '&redirect=/user/dashboard';
    return;
  }

  const allBookings = window.PlaySlotData.getBookings({ userId: user.id, userEmail: user.email });
  const upcomingBookings = allBookings.filter(b => b.status === 'Confirmed');
  const completedBookings = allBookings.filter(b => b.status === 'Completed');

  // Check URL params for welcome toast
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('welcome')) {
    PlaySlotApp.showToast(`Welcome to your PlaySlot Dashboard, ${user.name}! 🚀`, 'success');
  }

  container.innerHTML = `
    <!-- Header Section -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:32px; flex-wrap:wrap; gap:16px;">
      <div style="display:flex; align-items:center; gap:16px;">
        <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}" alt="${user.name}" style="width:64px; height:64px; border-radius:50%; object-fit:cover; border:3px solid var(--primary-light); box-shadow:var(--shadow-sm);">
        <div>
          <h1 style="font-size:1.8rem; font-weight:900;">Welcome, ${user.name}! ⚡</h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">${user.email} • ${user.city || 'Mumbai'}</p>
        </div>
      </div>

      <div style="display:flex; gap:12px;">
        <a href="/turfs" class="btn btn-primary">+ Book a Turf</a>
        <a href="/user/bookings" class="btn btn-outline-dark">My Bookings</a>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid" style="grid-template-columns:repeat(4, 1fr); margin-bottom:32px;">
      <div class="stat-card">
        <div class="stat-icon" style="background:#E0F2FE; color:#0284C7;">🎟️</div>
        <div class="stat-info">
          <h4>Total Bookings</h4>
          <div class="value">${allBookings.length} Slots</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background:#ECFDF5; color:#10B981;">📅</div>
        <div class="stat-info">
          <h4>Upcoming Matches</h4>
          <div class="value">${upcomingBookings.length} Slots</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background:#FEF3C7; color:#D97706;">🏆</div>
        <div class="stat-info">
          <h4>Favorite Sport</h4>
          <div class="value" style="font-size:1.2rem;">Box Cricket</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background:#F3E8FF; color:#8B5CF6;">⭐</div>
        <div class="stat-info">
          <h4>Reward Points</h4>
          <div class="value">450 Pts</div>
        </div>
      </div>
    </div>

    <!-- Upcoming Matches or Empty State -->
    <div class="table-card" style="margin-bottom:32px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <div>
          <h3 style="font-size:1.25rem; font-weight:800;">⚡ Upcoming Match Reservations</h3>
          <p style="font-size:0.85rem; color:var(--text-muted);">Confirmed time slots ready for gameplay</p>
        </div>
        <a href="/user/bookings" class="btn btn-outline-dark btn-sm">View All Bookings ➔</a>
      </div>

      ${upcomingBookings.length > 0 ? `
        <div style="display:flex; flex-direction:column; gap:16px;">
          ${upcomingBookings.map(b => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-color); padding:18px 22px; border-radius:14px; border:1px solid var(--border-color); flex-wrap:wrap; gap:16px;">
              <div style="display:flex; gap:16px; align-items:center;">
                <img src="${b.turfImage}" alt="${b.turfName}" style="width:75px; height:60px; object-fit:cover; border-radius:10px;">
                <div>
                  <div style="display:flex; gap:8px; align-items:center; margin-bottom:4px;">
                    <span class="badge badge-primary">🏆 ${b.sport}</span>
                    <span class="badge badge-success">● Confirmed</span>
                  </div>
                  <h4 style="font-size:1.1rem; font-weight:800;">${b.turfName}</h4>
                  <div style="font-size:0.85rem; color:var(--text-muted);">
                    Booking ID: <strong style="color:var(--primary-color);">${b.bookingId}</strong>
                  </div>
                </div>
              </div>

              <div style="text-align:right;">
                <div style="font-size:0.95rem; font-weight:800; color:var(--text-dark);">📅 ${b.date}</div>
                <div style="font-size:0.9rem; font-weight:700; color:var(--primary-color); margin-top:2px;">⏰ ${b.timeSlot}</div>
                <div style="font-size:0.82rem; color:#059669; font-weight:800; margin-top:2px;">₹${b.totalAmount} (Paid)</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="empty-state" style="padding:40px 20px;">
          <div class="empty-icon">🏟️</div>
          <h3>No Upcoming Matches</h3>
          <p style="color:var(--text-muted); margin-top:6px;">You don't have any active turf reservations. Find a turf ground near you!</p>
          <a href="/turfs" class="btn btn-primary" style="margin-top:18px;">Find & Book Turfs ➔</a>
        </div>
      `}
    </div>

    <!-- Quick Discover Turfs Grid -->
    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:20px;">
      <div>
        <h3 style="font-size:1.25rem; font-weight:800;">Explore Popular Turfs</h3>
        <p style="font-size:0.85rem; color:var(--text-muted);">Trending arenas ready for instant booking</p>
      </div>
      <a href="/turfs" class="btn btn-outline">View All Turfs ➔</a>
    </div>

    <div class="venues-grid" style="grid-template-columns:repeat(3, 1fr);">
      ${window.PlaySlotData.getTurfs().slice(0, 3).map(turf => `
        <div class="venue-card">
          <div class="venue-img-wrapper" style="height:180px;">
            <img src="${turf.images[0]}" alt="${turf.name}">
            <div style="position:absolute; bottom:10px; left:10px;" class="badge badge-success">Available Today</div>
          </div>
          <div class="venue-info">
            <div class="venue-name" style="font-size:1.1rem;">${turf.name}</div>
            <div class="venue-meta" style="font-size:0.85rem; margin-bottom:10px;">
              <span>📍 ${turf.location}, ${turf.city}</span>
            </div>
            <div class="venue-footer">
              <div class="price-tag">
                <span class="amount" style="font-size:1.2rem;">₹${turf.pricePerHour}</span>
                <span class="unit">per hour</span>
              </div>
              <a href="/venue-detail.html?id=${turf.id}" class="btn btn-emerald btn-sm">Book Slot</a>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
});
