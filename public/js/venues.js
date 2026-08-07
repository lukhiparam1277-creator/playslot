// PlaySlot Venues Listing Script
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('venuesGrid');
  const sportSelect = document.getElementById('filterSport');
  const form = document.getElementById('venueFilterForm');
  const resetBtn = document.getElementById('resetFiltersBtn');

  if (!container) return;

  // Get URL Params
  const urlParams = new URLSearchParams(window.location.search);
  const initialSport = urlParams.get('sport') || 'All';
  const initialSearch = urlParams.get('search') || '';
  const initialCity = urlParams.get('city') || 'All';

  if (sportSelect && initialSport !== 'All') sportSelect.value = initialSport;
  if (document.getElementById('filterSearch')) document.getElementById('filterSearch').value = initialSearch;
  if (document.getElementById('filterCity')) document.getElementById('filterCity').value = initialCity;

  function renderVenues() {
    const search = (document.getElementById('filterSearch')?.value || '').toLowerCase().trim();
    const sport = document.getElementById('filterSport')?.value || 'All';
    const city = document.getElementById('filterCity')?.value || 'All';
    const type = document.getElementById('filterType')?.value || 'All';
    const maxPrice = parseFloat(document.getElementById('filterMaxPrice')?.value || 0);
    const minRating = parseFloat(document.getElementById('filterMinRating')?.value || 0);
    const maxDistance = parseFloat(document.getElementById('filterMaxDistance')?.value || 0);
    const sort = document.getElementById('filterSort')?.value || 'default';

    let list = [...PlaySlotApp.venues];

    if (sport !== 'All') {
      list = list.filter(v => v.sportName.toLowerCase() === sport.toLowerCase());
    }
    if (city !== 'All') {
      list = list.filter(v => v.city.toLowerCase() === city.toLowerCase());
    }
    if (type !== 'All') {
      list = list.filter(v => v.venueType === type);
    }
    if (maxPrice > 0) {
      list = list.filter(v => v.pricePerHour <= maxPrice);
    }
    if (minRating > 0) {
      list = list.filter(v => v.rating >= minRating);
    }
    if (maxDistance > 0) {
      list = list.filter(v => v.distanceVal <= maxDistance);
    }
    if (search) {
      list = list.filter(v => 
        v.name.toLowerCase().includes(search) || 
        v.location.toLowerCase().includes(search) || 
        v.sportName.toLowerCase().includes(search)
      );
    }

    // Sort
    if (sort === 'price_low') {
      list.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (sort === 'price_high') {
      list.sort((a, b) => b.pricePerHour - a.pricePerHour);
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'distance') {
      list.sort((a, b) => a.distanceVal - b.distanceVal);
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <div class="empty-icon">🏟️</div>
          <h3>No Venues Found</h3>
          <p style="color:var(--text-muted);">Try clearing or adjusting your search filters.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(v => `
      <div class="venue-card">
        <div class="venue-img-wrapper">
          <img src="${v.images[0]}" alt="${v.name}">
          <button class="fav-btn" title="Add to Favorites">❤️</button>
          <div style="position:absolute; bottom:12px; left:12px;" class="badge badge-success">Available Today</div>
        </div>
        <div class="venue-info">
          <div class="venue-name" style="font-size:1.1rem; font-weight:700; color:#0F172A; margin-bottom:4px;">${v.name}</div>
          <div class="venue-meta" style="font-size:0.88rem; color:#64748B; margin-bottom:12px;">
            <span>${v.distance} • ${v.city}</span>
          </div>
          <div style="display:flex; gap:8px; align-items:center; margin-bottom:16px;">
            <span class="badge" style="background:#F1F5F9; color:#475569; border-radius:12px; padding:4px 12px; font-size:0.8rem; font-weight:600;">${v.sportName}</span>
            <span class="badge" style="background:#F1F5F9; color:#475569; border-radius:12px; padding:4px 12px; font-size:0.8rem; font-weight:600;">${v.venueType}</span>
          </div>
          <div class="venue-footer">
            <div class="price-tag">
              <span class="amount">₹${v.pricePerHour}</span>
              <span class="unit">per hour</span>
            </div>
            <a href="/venue-detail.html?id=${v._id}" class="btn btn-primary" style="padding:10px 18px; font-size:0.88rem;">Book Slot</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      renderVenues();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (document.getElementById('filterSearch')) document.getElementById('filterSearch').value = '';
      if (document.getElementById('filterSport')) document.getElementById('filterSport').value = 'All';
      if (document.getElementById('filterCity')) document.getElementById('filterCity').value = 'All';
      if (document.getElementById('filterType')) document.getElementById('filterType').value = 'All';
      if (document.getElementById('filterMaxPrice')) document.getElementById('filterMaxPrice').value = '';
      if (document.getElementById('filterMinRating')) document.getElementById('filterMinRating').value = '';
      if (document.getElementById('filterMaxDistance')) document.getElementById('filterMaxDistance').value = '';
      if (document.getElementById('filterSort')) document.getElementById('filterSort').value = 'default';
      renderVenues();
    });
  }

  renderVenues();
});
