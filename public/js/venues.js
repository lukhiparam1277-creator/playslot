/**
 * PlaySlot Turf Listing & Multi-Filter Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const venuesGrid = document.getElementById('venuesGrid');
  const filterForm = document.getElementById('venueFilterForm');
  const filterSearch = document.getElementById('filterSearch');
  const filterSport = document.getElementById('filterSport');
  const filterCity = document.getElementById('filterCity');
  const filterType = document.getElementById('filterType');
  const filterMaxPrice = document.getElementById('filterMaxPrice');
  const filterMinRating = document.getElementById('filterMinRating');
  const filterMaxDistance = document.getElementById('filterMaxDistance');
  const filterSort = document.getElementById('filterSort');
  const filterAvailToday = document.getElementById('filterAvailToday');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const totalTurfsCount = document.getElementById('totalTurfsCount');

  // URL Query Parameters pre-fill
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('sport') && filterSport) filterSport.value = urlParams.get('sport');
  if (urlParams.get('city') && filterCity) filterCity.value = urlParams.get('city');
  if (urlParams.get('search') && filterSearch) filterSearch.value = urlParams.get('search');

  function renderTurfs() {
    if (!venuesGrid) return;

    const filters = {
      search: filterSearch ? filterSearch.value.trim() : '',
      sport: filterSport ? filterSport.value : 'All',
      city: filterCity ? filterCity.value : 'All',
      turfType: filterType ? filterType.value : 'All',
      maxPrice: filterMaxPrice && filterMaxPrice.value ? filterMaxPrice.value : null,
      minRating: filterMinRating && filterMinRating.value ? filterMinRating.value : null,
      sort: filterSort ? filterSort.value : 'default',
      availableToday: filterAvailToday ? filterAvailToday.checked : false
    };

    let turfs = window.PlaySlotData.getTurfs(filters);

    if (filterMaxDistance && filterMaxDistance.value) {
      const maxDist = parseFloat(filterMaxDistance.value);
      turfs = turfs.filter(t => t.distanceKm <= maxDist);
    }

    if (totalTurfsCount) {
      totalTurfsCount.textContent = turfs.length;
    }

    if (turfs.length === 0) {
      venuesGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">🏟️</div>
          <h3>No Turfs Found</h3>
          <p style="color:var(--text-muted); margin-top:6px;">Try clearing filters or searching for another sport or location.</p>
          <button onclick="document.getElementById('resetFiltersBtn').click()" class="btn btn-primary" style="margin-top:18px;">Reset All Filters</button>
        </div>
      `;
      return;
    }

    venuesGrid.innerHTML = turfs.map(turf => `
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
            <span style="color:var(--primary-color); font-weight:700;">${turf.distance}</span>
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
            <span style="margin-left:auto; color:#059669; font-weight:700; font-size:0.82rem;">⚡ ${turf.slotTimings.length} Slots</span>
          </div>

          <div class="venue-footer">
            <div class="price-tag">
              <span class="amount">₹${turf.pricePerHour}</span>
              <span class="unit">per hour</span>
            </div>
            <a href="/venue-detail.html?id=${turf.id}" class="btn btn-emerald">
              View Details ➔
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Event Listeners
  if (filterForm) {
    filterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      renderTurfs();
    });
  }

  [filterSearch, filterSport, filterCity, filterType, filterMaxPrice, filterMinRating, filterMaxDistance, filterSort, filterAvailToday].forEach(el => {
    if (el) {
      el.addEventListener('change', renderTurfs);
      if (el.tagName === 'INPUT' && el.type === 'text') {
        el.addEventListener('input', renderTurfs);
      }
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (filterSearch) filterSearch.value = '';
      if (filterSport) filterSport.value = 'All';
      if (filterCity) filterCity.value = 'All';
      if (filterType) filterType.value = 'All';
      if (filterMaxPrice) filterMaxPrice.value = '';
      if (filterMinRating) filterMinRating.value = '';
      if (filterMaxDistance) filterMaxDistance.value = '';
      if (filterSort) filterSort.value = 'default';
      if (filterAvailToday) filterAvailToday.checked = false;
      renderTurfs();
    });
  }

  renderTurfs();
});
