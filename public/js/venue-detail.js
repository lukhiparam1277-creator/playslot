/**
 * PlaySlot Turf Details & Slot Booking Selector Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const container = document.getElementById('venueDetailContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const turfId = urlParams.get('id') || 'turf-1';

  const turf = window.PlaySlotData.getTurfById(turfId);
  if (!turf) {
    container.innerHTML = `
      <div class="container" style="padding:80px 20px; text-align:center;">
        <h2>Turf Not Found</h2>
        <p style="color:var(--text-muted); margin:12px 0 24px 0;">The requested sports arena could not be located.</p>
        <a href="/venues.html" class="btn btn-primary">Browse All Turfs</a>
      </div>
    `;
    return;
  }

  // Generate Next 7 Days for Date Selector
  const daysList = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    let dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    let dateNumber = d.getDate();
    if (i === 0) dayLabel = 'Today';
    else if (i === 1) dayLabel = 'Tomorrow';

    daysList.push({
      dateStr,
      dayLabel,
      dateNumber,
      month: d.toLocaleDateString('en-US', { month: 'short' })
    });
  }

  let selectedDate = daysList[0].dateStr;
  let selectedSlot = '';

  function renderPage() {
    const slots = window.PlaySlotData.getSlotsForTurfAndDate(turf.id, selectedDate);

    container.innerHTML = `
      <!-- Hero Banner Header -->
      <div class="venue-detail-hero">
        <div class="container">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
            <div>
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px; flex-wrap:wrap;">
                <h1 style="font-size:2.3rem; font-weight:900; margin-bottom:0;">${turf.name}</h1>
                <span class="badge badge-success">● Instant Booking</span>
                <span class="badge badge-dark">${turf.turfType}</span>
              </div>
              <p style="color:var(--text-light); font-size:1.02rem;">
                📍 ${turf.address} | 🏆 <strong>${(turf.sportsAvailable || [turf.sport]).join(', ')}</strong>
              </p>
            </div>
            <div style="text-align:right;">
              <div class="badge badge-warning" style="font-size:1rem; padding:8px 16px;">★ ${turf.rating} (${turf.reviewsCount} verified reviews)</div>
              <div style="font-size:1.8rem; font-weight:900; color:#38BDF8; margin-top:8px; font-family:var(--font-heading);">
                ₹${turf.pricePerHour} <span style="font-size:0.9rem; font-weight:400; color:var(--text-light);">/ hour</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <!-- Interactive Multi-Image Gallery -->
        <div class="gallery-grid">
          <div class="gallery-main">
            <img id="mainGalleryImage" src="${turf.images[0]}" alt="${turf.name}">
          </div>
          <div class="gallery-side">
            ${turf.images.map((img, idx) => `
              <img src="${img}" alt="${turf.name}" class="gallery-thumb" onclick="document.getElementById('mainGalleryImage').src='${img}'">
            `).join('')}
          </div>
        </div>

        <!-- Detail Layout & Booking Slot Selector -->
        <div class="venue-detail-layout">
          <div>
            <!-- Description -->
            <div class="summary-card" style="margin-bottom:32px;">
              <h3 style="font-size:1.3rem; font-weight:800; margin-bottom:14px;">About This Sports Arena</h3>
              <p style="color:var(--text-body); font-size:0.98rem; line-height:1.7; margin-bottom:20px;">
                ${turf.description}
              </p>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; background:var(--bg-color); padding:18px; border-radius:12px; font-size:0.9rem;">
                <div>
                  <span style="color:var(--text-muted); font-weight:600;">⏰ Operating Hours:</span><br>
                  <strong>${turf.openingTime} - ${turf.closingTime}</strong>
                </div>
                <div>
                  <span style="color:var(--text-muted); font-weight:600;">📞 Arena Helpline:</span><br>
                  <strong>${turf.contactPhone}</strong>
                </div>
              </div>
            </div>

            <!-- Facilities & Amenities -->
            <div class="summary-card" style="margin-bottom:32px;">
              <h3 style="font-size:1.3rem; font-weight:800; margin-bottom:18px;">Facilities & Player Amenities</h3>
              <div class="facilities-grid">
                ${turf.facilities.map(fac => {
                  let icon = '⚡';
                  if (fac.includes('Parking')) icon = '🚗';
                  else if (fac.includes('Washroom')) icon = '🚿';
                  else if (fac.includes('Changing')) icon = '👕';
                  else if (fac.includes('Water')) icon = '💧';
                  else if (fac.includes('Flood')) icon = '💡';
                  else if (fac.includes('Seating')) icon = '🪑';
                  else if (fac.includes('Equipment')) icon = '🏏';
                  return `
                    <div class="facility-card">
                      <span style="font-size:1.3rem;">${icon}</span>
                      <span>${fac}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Ground Rules -->
            <div class="summary-card" style="margin-bottom:32px;">
              <h3 style="font-size:1.3rem; font-weight:800; margin-bottom:16px;">Arena Guidelines & Rules</h3>
              <ul style="padding-left:20px; color:var(--text-body); font-size:0.92rem; line-height:1.8;">
                ${(turf.rules || [
                  'Non-marking sports shoes or rubber turf studs only.',
                  'Please arrive 10 minutes before your slot booking.',
                  'Smoking and outside food prohibited on the turf ground.',
                  'Cancellations allowed up to 4 hours before slot start.'
                ]).map(rule => `<li>${rule}</li>`).join('')}
              </ul>
            </div>

            <!-- Google Map Preview -->
            <div class="summary-card">
              <h3 style="font-size:1.3rem; font-weight:800; margin-bottom:14px;">Turf Location & Directions</h3>
              <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:16px;">📍 ${turf.address}</p>
              <div style="width:100%; height:260px; border-radius:12px; overflow:hidden; border:1px solid var(--border-color);">
                <iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://maps.google.com/maps?q=${encodeURIComponent(turf.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed" allowfullscreen></iframe>
              </div>
            </div>
          </div>

          <!-- Sticky Slot Booking UI -->
          <div>
            <div class="slots-container">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                <h3 style="font-size:1.3rem; font-weight:800;">Book a Slot</h3>
                <span class="badge badge-primary">Instant Booking</span>
              </div>
              <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:20px;">
                Select your preferred date and available slot to proceed to confirmation.
              </p>

              <!-- 7-Day Date Selector Row -->
              <label style="font-size:0.82rem; font-weight:700; color:var(--text-dark); text-transform:uppercase;">📅 Select Date</label>
              <div class="date-selector-row">
                ${daysList.map(item => `
                  <div class="date-chip ${item.dateStr === selectedDate ? 'active' : ''}" data-date="${item.dateStr}">
                    <div style="font-size:0.75rem; font-weight:600; text-transform:uppercase;">${item.dayLabel}</div>
                    <div style="font-size:1.15rem; font-weight:800;">${item.dateNumber}</div>
                    <div style="font-size:0.7rem;">${item.month}</div>
                  </div>
                `).join('')}
              </div>

              <!-- Slot Timing Grid -->
              <label style="font-size:0.82rem; font-weight:700; color:var(--text-dark); text-transform:uppercase;">⏰ Select Time Slot (1 Hour)</label>
              <div class="slots-grid" id="turfSlotsGrid">
                ${slots.map(slot => `
                  <div class="slot-pill ${slot.status === 'Booked' || slot.status === 'Blocked' ? 'disabled' : (slot.time === selectedSlot ? 'active' : '')}" 
                       data-slot="${slot.time}" 
                       data-price="${slot.price}">
                    ${slot.time}
                    <div style="font-size:0.72rem; font-weight:600; margin-top:3px;">
                      ${slot.status === 'Booked' ? '🔴 Booked' : (slot.status === 'Blocked' ? '⛔ Blocked' : `₹${slot.price} • Available`)}
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Selected Slot Notice & Submit -->
              <div id="slotBookingFeedback" style="margin-bottom:20px; font-size:0.9rem;">
                ${selectedSlot ? `
                  <div style="background:var(--secondary-light); border:1px solid #A7F3D0; padding:12px; border-radius:10px; color:#065F46;">
                    ✓ Selected: <strong>${selectedSlot}</strong> on <strong>${selectedDate}</strong>
                  </div>
                ` : `
                  <div style="color:var(--text-muted); font-size:0.85rem;">
                    👉 Please click on an available time slot above to proceed.
                  </div>
                `}
              </div>

              <button type="button" id="proceedToBookBtn" class="btn btn-emerald" style="width:100%; height:52px; font-size:1.05rem;" ${!selectedSlot ? 'disabled' : ''}>
                Book Now ⚡
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Hook Date Chips
    document.querySelectorAll('.date-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        selectedDate = chip.getAttribute('data-date');
        selectedSlot = '';
        renderPage();
      });
    });

    // Hook Slot Pills
    document.querySelectorAll('.slot-pill:not(.disabled)').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.slot-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedSlot = pill.getAttribute('data-slot');
        const bookBtn = document.getElementById('proceedToBookBtn');
        if (bookBtn) bookBtn.removeAttribute('disabled');
        const feedback = document.getElementById('slotBookingFeedback');
        if (feedback) {
          feedback.innerHTML = `
            <div style="background:var(--secondary-light); border:1px solid #A7F3D0; padding:12px; border-radius:10px; color:#065F46;">
              ✓ Selected: <strong>${selectedSlot}</strong> on <strong>${selectedDate}</strong>
            </div>
          `;
        }
      });
    });

    // Hook Proceed to Book Button
    const bookBtn = document.getElementById('proceedToBookBtn');
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        if (!selectedSlot) {
          PlaySlotApp.showToast('Please pick an available time slot.', 'error');
          return;
        }
        window.location.href = `/book-slot.html?turfId=${turf.id}&date=${selectedDate}&timeSlot=${encodeURIComponent(selectedSlot)}`;
      });
    }
  }

  renderPage();
});
