// PlaySlot 52 Sports Categories Script
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('allSportsGrid');
  const searchInput = document.getElementById('categorySearchInput');
  const typeBtns = document.querySelectorAll('.category-type-btn');

  if (!container) return;

  let activeType = 'All';

  function renderGrid() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    const filtered = PlaySlotApp.sports.filter(sport => {
      const matchesSearch = sport.name.toLowerCase().includes(query) || sport.description.toLowerCase().includes(query);
      const matchesType = (activeType === 'All') || (sport.categoryType === activeType) || (sport.categoryType === 'Both');
      return matchesSearch && matchesType;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">🏆</div>
          <h3>No Sports Categories Found</h3>
          <p style="color:var(--text-muted);">Try searching for another sport name.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(sport => `
      <div class="sport-card">
        <div class="sport-img-wrapper">
          <img src="${sport.image}" alt="${sport.name}">
          <div class="sport-icon-badge">${sport.icon}</div>
          <div style="position:absolute; bottom:10px; left:10px;" class="badge badge-primary">${sport.categoryType}</div>
        </div>
        <div class="sport-info">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <h3 style="font-size:1.15rem; font-weight:700;">${sport.name}</h3>
            <div style="color:#D97706; font-size:0.85rem; font-weight:700;">★ ${sport.rating}</div>
          </div>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">${sport.description}</p>
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-color); padding:8px 12px; border-radius:10px; margin-bottom:16px; font-size:0.82rem;">
            <span>Starting <strong>₹${sport.startingPrice}/hr</strong></span>
            <span style="color:var(--primary-color); font-weight:600;">🏟️ ${sport.venuesAvailable} Venues</span>
          </div>
          <a href="/venues.html?sport=${encodeURIComponent(sport.name)}" class="btn btn-primary" style="width:100%; padding:10px; font-size:0.9rem;">Book Now ⚡</a>
        </div>
      </div>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', renderGrid);
  }

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeType = btn.getAttribute('data-type');
      renderGrid();
    });
  });

  renderGrid();
});
