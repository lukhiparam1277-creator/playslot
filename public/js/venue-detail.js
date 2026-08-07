// PlaySlot Venue Detail Script
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('venueDetailContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const venueId = urlParams.get('id') || '64b000000000000000000001';

  const venue = PlaySlotApp.venues.find(v => v._id === venueId) || PlaySlotApp.venues[0];
  const today = new Date().toISOString().split('T')[0];

  container.innerHTML = `
    <!-- Venue Header -->
    <div class="venue-detail-hero">
      <div class="container">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
              <h1 style="font-size:2.2rem; font-weight:800;">${venue.name}</h1>
              <div class="badge badge-success">Available Today</div>
              <div class="badge badge-primary">${venue.venueType}</div>
            </div>
            <p style="color:var(--text-muted); font-size:1rem;">📍 ${venue.address} | 🏆 ${venue.sportName}</p>
          </div>
          <div style="text-align:right;">
            <div class="rating-badge" style="font-size:1.1rem; padding:6px 14px; display:inline-flex;">★ ${venue.rating} (${venue.reviewsCount} reviews)</div>
            <div style="font-size:1.6rem; font-weight:800; color:var(--primary-color); margin-top:8px;">₹${venue.pricePerHour} <span style="font-size:0.85rem; font-weight:400; color:var(--text-muted);">/ hr</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- Gallery Grid -->
      <div class="gallery-grid">
        <div class="gallery-main">
          <img src="${venue.images[0]}" alt="${venue.name}">
        </div>
        <div class="gallery-side">
          <img src="${venue.images[0]}" alt="${venue.name}">
          <img src="${venue.images[0]}" alt="${venue.name}">
        </div>
      </div>

      <!-- Detail Layout & Slots -->
      <div class="venue-detail-layout">
        <div>
          <h3 style="font-size:1.3rem; font-weight:700; margin-bottom:12px;">About the Venue</h3>
          <p style="color:var(--text-muted); font-size:0.98rem; line-height:1.7; margin-bottom:32px;">
            ${venue.description}
          </p>

          <h3 style="font-size:1.3rem; font-weight:700; margin-bottom:12px;">Facilities & Amenities</h3>
          <div class="facilities-grid">
            ${venue.facilities.map(fac => `
              <div class="facility-card">
                <span>
                  ${fac.includes('Parking') ? '🚗' : ''}
                  ${fac.includes('Washroom') || fac.includes('Shower') ? '🚿' : ''}
                  ${fac.includes('Flood') ? '💡' : ''}
                  ${fac.includes('Water') ? '💧' : ''}
                  ${fac.includes('Equipment') ? '🏏' : ''}
                  ${fac.includes('Conditioning') ? '❄️' : ''}
                </span>
                ${fac}
              </div>
            `).join('')}
          </div>

          <h3 style="font-size:1.3rem; font-weight:700; margin-top:40px; margin-bottom:12px;">Location & Map</h3>
          <div style="width:100%; height:260px; border-radius:var(--border-radius); overflow:hidden; border:1px solid var(--border-color); margin-bottom:40px;">
            <iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://maps.google.com/maps?q=${encodeURIComponent(venue.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed" allowfullscreen></iframe>
          </div>
        </div>

        <!-- Slot Selector Card -->
        <div>
          <div class="slots-container">
            <h3 style="font-size:1.3rem; font-weight:700; margin-bottom:8px;">Available Slots</h3>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:18px;">Select date and slot timing to proceed</p>

            <form id="slotBookingForm">
              <div class="form-group" style="margin-bottom:16px;">
                <label>📅 Choose Booking Date</label>
                <input type="date" id="slotBookingDate" class="form-input" value="${today}" min="${today}">
              </div>

              <label style="font-size:0.85rem; font-weight:600;">⏰ Choose Time Slot</label>
              <div class="slots-grid" id="slotsGrid">
                ${venue.slotTimings.map((slot, idx) => `
                  <div class="slot-pill ${idx === 1 ? 'disabled' : ''}" data-slot="${slot}">
                    ${slot}
                    ${idx === 1 ? '<br><span style="font-size:0.7rem; font-weight:400;">Booked</span>' : ''}
                  </div>
                `).join('')}
              </div>

              <button type="submit" id="bookSlotSubmitBtn" class="btn btn-primary" style="width:100%; height:50px; font-size:1rem;" disabled>Book Now ⚡</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  // Slot Interactivity
  let selectedSlot = '';
  const slotPills = document.querySelectorAll('.slot-pill:not(.disabled)');
  const submitBtn = document.getElementById('bookSlotSubmitBtn');

  slotPills.forEach(pill => {
    pill.addEventListener('click', () => {
      slotPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedSlot = pill.getAttribute('data-slot');
      if (submitBtn) submitBtn.removeAttribute('disabled');
    });
  });

  document.getElementById('slotBookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = PlaySlotApp.getUser();
    if (!user) {
      window.location.href = `/login.html?error=${encodeURIComponent('Please login to access slot reservation page')}`;
      return;
    }

    const date = document.getElementById('slotBookingDate').value;
    window.location.href = `/book-slot.html?venueId=${venue._id}&date=${date}&timeSlot=${encodeURIComponent(selectedSlot)}`;
  });
});
