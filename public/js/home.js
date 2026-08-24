/**
 * PlaySlot Homepage Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  // Initialize Sport Options in Search Select
  const heroSportSelect = document.getElementById('heroSportSelect');
  if (heroSportSelect) {
    const sports = window.PlaySlotData.getSports();
    heroSportSelect.innerHTML = '<option value="All">All Sports (8)</option>' +
      sports.map(s => `<option value="${s.name}">${s.icon} ${s.name}</option>`).join('');
  }

  // Set default date to today
  const heroDateInput = document.getElementById('heroDateInput');
  if (heroDateInput) {
    heroDateInput.value = new Date().toISOString().split('T')[0];
    heroDateInput.min = new Date().toISOString().split('T')[0];
  }

  // Render 8 Sports Cards
  const homeSportsGrid = document.getElementById('homeSportsGrid');
  if (homeSportsGrid) {
    const sports = window.PlaySlotData.getSports();
    homeSportsGrid.innerHTML = sports.map(sport => `
      <div class="sport-card">
        <div class="sport-img-wrapper">
          <img src="${sport.image}" alt="${sport.name}" loading="lazy">
          <div class="sport-icon-badge">${sport.icon}</div>
          <div style="position:absolute; bottom:12px; left:12px;" class="badge badge-dark">${sport.categoryType}</div>
        </div>
        <div class="sport-info">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <h3>${sport.name}</h3>
            <span class="badge badge-success">★ 4.9</span>
          </div>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px; line-height:1.5;">${sport.description}</p>
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-color); padding:10px 14px; border-radius:10px; margin-bottom:16px; font-size:0.84rem;">
            <span>Starts <strong>₹${sport.startingPrice}/hr</strong></span>
            <span style="color:var(--primary-color); font-weight:700;">🏟️ ${sport.turfsCount} Venues</span>
          </div>
          <a href="/venues.html?sport=${encodeURIComponent(sport.name)}" class="btn btn-primary" style="width:100%;">
            Explore Turfs ⚡
          </a>
        </div>
      </div>
    `).join('');
  }

  // Render Popular Turfs (Top 6 Featured)
  const homeTurfsGrid = document.getElementById('homeTurfsGrid');
  if (homeTurfsGrid) {
    const turfs = window.PlaySlotData.getTurfs().slice(0, 6);
    homeTurfsGrid.innerHTML = turfs.map(turf => `
      <div class="venue-card">
        <div class="venue-img-wrapper">
          <img src="${turf.images[0]}" alt="${turf.name}" loading="lazy">
          <button class="fav-btn" onclick="PlaySlotApp.showToast('Added ${turf.name} to favorites! ❤️')">❤️</button>
          <div style="position:absolute; bottom:12px; left:12px;" class="badge badge-success">● Available Today</div>
        </div>
        <div class="venue-info">
          <div class="venue-name">${turf.name}</div>
          <div class="venue-meta">
            <span>📍 ${turf.location}, ${turf.city}</span>
            <span>•</span>
            <span style="color:var(--primary-color); font-weight:600;">${turf.distance}</span>
          </div>

          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px;">
            ${(turf.sportsAvailable || [turf.sport]).map(sp => `
              <span class="badge badge-primary" style="font-size:0.75rem;">${sp}</span>
            `).join('')}
            <span class="badge badge-dark" style="font-size:0.75rem;">${turf.turfType}</span>
          </div>

          <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px; font-size:0.85rem;">
            <span class="badge badge-warning">★ ${turf.rating}</span>
            <span style="color:var(--text-muted);">(${turf.reviewsCount} reviews)</span>
            <span style="margin-left:auto; color:#059669; font-weight:700; font-size:0.8rem;">⚡ ${turf.slotTimings.length} Slots</span>
          </div>

          <div class="venue-footer">
            <div class="price-tag">
              <span class="amount">₹${turf.pricePerHour}</span>
              <span class="unit">per hour</span>
            </div>
            <a href="/venue-detail.html?id=${turf.id}" class="btn btn-emerald">
              View Turf ➔
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }
});
