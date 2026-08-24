/**
 * PlaySlot Sports Categories Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const sportsGrid = document.getElementById('allSportsGrid');
  const searchInput = document.getElementById('categorySearchInput');
  const typeBtns = document.querySelectorAll('.category-type-btn');
  const totalCountSpan = document.getElementById('totalCategoriesCount');

  let currentType = 'All';
  let searchQuery = '';

  function render() {
    if (!sportsGrid) return;

    let sports = window.PlaySlotData.getSports();

    if (currentType !== 'All') {
      sports = sports.filter(s => s.categoryType === currentType || s.categoryType === 'Both');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      sports = sports.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }

    if (totalCountSpan) {
      totalCountSpan.textContent = sports.length;
    }

    if (sports.length === 0) {
      sportsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">🏆</div>
          <h3>No Sports Found</h3>
          <p style="color:var(--text-muted); margin-top:6px;">No sports matching "${searchQuery}".</p>
        </div>
      `;
      return;
    }

    sportsGrid.innerHTML = sports.map(sport => `
      <div class="sport-card">
        <div class="sport-img-wrapper">
          <img src="${sport.image}" alt="${sport.name}" loading="lazy">
          <div class="sport-icon-badge">${sport.icon}</div>
          <div style="position:absolute; bottom:12px; left:12px;" class="badge badge-dark">${sport.categoryType}</div>
        </div>
        <div class="sport-info">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <h3>${sport.name}</h3>
            <span class="badge badge-success">★ 4.9</span>
          </div>
          <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:16px; line-height:1.5;">${sport.description}</p>
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-color); padding:10px 14px; border-radius:10px; margin-bottom:18px; font-size:0.85rem;">
            <span>Starting <strong>₹${sport.startingPrice}/hr</strong></span>
            <span style="color:var(--primary-color); font-weight:700;">🏟️ ${sport.turfsCount} Turfs</span>
          </div>
          <a href="/venues.html?sport=${encodeURIComponent(sport.name)}" class="btn btn-primary" style="width:100%;">
            View ${sport.name} Turfs ➔
          </a>
        </div>
      </div>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });
  }

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.getAttribute('data-type');
      render();
    });
  });

  render();
});
