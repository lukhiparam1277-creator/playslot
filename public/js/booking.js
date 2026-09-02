/**
 * PlaySlot Booking Checkout & Ticket Confirmation Logic
 * Includes Strict Double Booking Prevention (Section 18)
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const summaryContainer = document.getElementById('bookingSummaryContainer');
  const ticketContainer = document.getElementById('ticketContainer');

  const urlParams = new URLSearchParams(window.location.search);
  const turfId = urlParams.get('turfId') || urlParams.get('venueId') || 'turf-1';
  const date = urlParams.get('date') || new Date().toISOString().split('T')[0];
  const timeSlot = urlParams.get('timeSlot') || '07:00 PM - 08:00 PM';
  const bookingId = urlParams.get('bookingId');

  // --- 1. Booking Checkout Summary View ---
  if (summaryContainer) {
    const turf = window.PlaySlotData.getTurfById(turfId);
    const currentUser = window.PlaySlotData.getCurrentUser() || {
      id: 'user-1',
      name: 'Rahul Sharma',
      email: 'user@playslot.com',
      phone: '+91 98765 43210'
    };

    if (!turf) {
      summaryContainer.innerHTML = `
        <div class="empty-state">
          <h3>Venue Not Found</h3>
          <a href="/venues.html" class="btn btn-primary" style="margin-top:16px;">Browse All Venues</a>
        </div>
      `;
      return;
    }

    const isBooked = window.PlaySlotData.isSlotBooked(turf.id, date, timeSlot);

    const basePrice = turf.pricePerHour || 1200;
    const convenienceFee = 49;
    const gstAmount = Math.round(basePrice * 0.18);
    const totalAmount = basePrice + convenienceFee + gstAmount;

    summaryContainer.innerHTML = `
      <!-- Turf Overview Header -->
      <div style="display:flex; gap:20px; align-items:center; margin-bottom:24px; padding-bottom:20px; border-bottom:1px solid var(--border-color); flex-wrap:wrap;">
        <img src="${(turf.images && turf.images[0]) || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80'}" alt="${turf.name}" style="width:110px; height:85px; object-fit:cover; border-radius:12px;">
        <div style="flex:1; min-width:240px;">
          <div style="display:flex; gap:8px; align-items:center; margin-bottom:4px;">
            <span class="badge badge-primary">🏆 ${turf.sport}</span>
            <span class="badge badge-dark">${turf.turfType}</span>
          </div>
          <h3 style="font-size:1.3rem; font-weight:800; margin-bottom:4px;">${turf.name}</h3>
          <p style="color:var(--text-muted); font-size:0.88rem;">📍 ${turf.address}</p>
        </div>
      </div>

      ${isBooked ? `
        <div style="background:#FEE2E2; border:1.5px solid #F87171; padding:18px; border-radius:12px; color:#991B1B; margin-bottom:24px; font-weight:700;">
          ⚠️ This slot has already been booked. Please return to the turf page and choose another slot timing.
        </div>
      ` : ''}

      <form id="confirmBookingForm">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
          <div class="form-group">
            <label>📅 Booking Date</label>
            <input type="text" value="${date}" class="form-input" readonly style="font-weight:700;">
          </div>
          <div class="form-group">
            <label>⏰ Selected Slot Time</label>
            <input type="text" value="${timeSlot}" class="form-input" readonly style="font-weight:700; color:var(--primary-color);">
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
          <div class="form-group">
            <label>👤 Player Name</label>
            <input type="text" id="bookingUserName" value="${currentUser.name}" class="form-input" required ${isBooked ? 'disabled' : ''}>
          </div>
          <div class="form-group">
            <label>📞 Contact Phone</label>
            <input type="text" id="bookingUserPhone" value="${currentUser.phone || '+91 98765 43210'}" class="form-input" required ${isBooked ? 'disabled' : ''}>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:24px;">
          <label>👥 Number of Players</label>
          <select id="playersCountSelect" class="form-select" ${isBooked ? 'disabled' : ''}>
            <option value="2">2 Players (Singles match)</option>
            <option value="4">4 Players (Doubles match)</option>
            <option value="6" selected>6 Players (Small squad)</option>
            <option value="8">8 Players (Full team)</option>
            <option value="10">10 Players (Full turf squad)</option>
            <option value="12">12+ Players</option>
          </select>
        </div>

        <!-- Price Breakdown -->
        <div style="background:var(--bg-color); padding:22px; border-radius:14px; border:1px solid var(--border-color); margin-bottom:28px;">
          <h4 style="font-size:1.05rem; font-weight:800; margin-bottom:14px;">Price & Billing Breakdown</h4>
          <div class="summary-item">
            <span>Turf Slot Rate (1 Hour)</span>
            <span style="font-weight:700;">₹${basePrice}</span>
          </div>
          <div class="summary-item">
            <span>Platform Convenience Fee</span>
            <span style="font-weight:700;">₹${convenienceFee}</span>
          </div>
          <div class="summary-item">
            <span>Applicable GST & Taxes (18%)</span>
            <span style="font-weight:700;">₹${gstAmount}</span>
          </div>
          <div class="summary-item total">
            <span>Total Payable Amount</span>
            <span style="color:var(--primary-color); font-size:1.4rem;">₹${totalAmount}</span>
          </div>
        </div>

        <!-- Cancellation Notice -->
        <div style="background:var(--secondary-light); border:1px solid #A7F3D0; padding:14px 18px; border-radius:10px; font-size:0.85rem; color:#065F46; margin-bottom:28px;">
          🛡️ <strong>Free Cancellation Policy:</strong> You can cancel this booking at any time from your <em>My Bookings</em> dashboard.
        </div>

        ${isBooked ? `
          <button type="button" onclick="window.location.href='/venue-detail.html?id=${turf.id}'" class="btn btn-outline-dark" style="width:100%; height:54px; font-size:1.1rem;">
            ← Select Another Slot
          </button>
        ` : `
          <button type="submit" id="btnConfirmBooking" class="btn btn-emerald" style="width:100%; height:54px; font-size:1.15rem;">
            Confirm Booking ⚡
          </button>
        `}
      </form>
    `;

    document.getElementById('confirmBookingForm').addEventListener('submit', (e) => {
      e.preventDefault();

      // Section 18: Double booking prevention check
      if (window.PlaySlotData.isSlotBooked(turf.id, date, timeSlot)) {
        PlaySlotApp.showToast('This slot has already been booked.', 'error');
        return;
      }

      const userName = document.getElementById('bookingUserName').value;
      const userPhone = document.getElementById('bookingUserPhone').value;
      const playersCount = document.getElementById('playersCountSelect').value;

      try {
        const newBooking = window.PlaySlotData.createBooking({
          userId: currentUser.id,
          userName,
          userEmail: currentUser.email,
          userPhone,
          turfId: turf.id,
          turfName: turf.name,
          turfImage: (turf.images && turf.images[0]) || '',
          ownerId: turf.ownerId,
          sport: turf.sport,
          date,
          timeSlot,
          playersCount,
          basePrice,
          convenienceFee,
          gstAmount,
          totalAmount
        });

        PlaySlotApp.showToast(`Booking ${newBooking.bookingId} confirmed!`, 'success');

        setTimeout(() => {
          window.location.href = `/booking-success.html?bookingId=${newBooking.bookingId}`;
        }, 500);
      } catch (err) {
        PlaySlotApp.showToast(err.message || 'This slot has already been booked.', 'error');
      }
    });
  }

  // --- 2. Booking Success / Ticket View ---
  if (ticketContainer) {
    const booking = window.PlaySlotData.getBookingById(bookingId) || window.PlaySlotData.getBookings()[0];

    if (!booking) {
      ticketContainer.innerHTML = `
        <div class="empty-state">
          <h3>No Booking Details Found</h3>
          <a href="/my-bookings.html" class="btn btn-primary" style="margin-top:16px;">Go to My Bookings</a>
        </div>
      `;
      return;
    }

    ticketContainer.innerHTML = `
      <div class="ticket-card">
        <div class="ticket-header">
          <div style="font-size:3.2rem; margin-bottom:6px;">🎉</div>
          <h2 style="color:#FFFFFF; font-size:2rem; font-weight:900; margin-bottom:4px;">Booking Confirmed!</h2>
          <p style="opacity:0.95; font-size:0.95rem;">
            Slot reservation verified & confirmed. Your digital pass is active!
          </p>
        </div>

        <div class="ticket-body">
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-color); padding:16px; border-radius:12px; margin-bottom:24px; border:1px dashed var(--border-color);">
            <div>
              <div style="font-size:0.78rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Booking Reference ID</div>
              <div style="font-size:1.3rem; font-weight:900; color:var(--primary-color); font-family:var(--font-heading);">${booking.bookingId}</div>
            </div>
            <span class="badge badge-success" style="padding:6px 14px; font-size:0.85rem;">● ${booking.status.toUpperCase()}</span>
          </div>

          <div style="display:flex; gap:18px; align-items:center; margin-bottom:24px; padding-bottom:20px; border-bottom:1px solid var(--border-color);">
            <img src="${booking.turfImage || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80'}" alt="${booking.turfName}" style="width:90px; height:70px; object-fit:cover; border-radius:10px;">
            <div>
              <div class="badge badge-primary" style="margin-bottom:4px;">🏆 ${booking.sport}</div>
              <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:2px;">${booking.turfName}</h3>
              <p style="font-size:0.85rem; color:var(--text-muted);">Verified Sports Partner</p>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
            <div class="summary-item" style="flex-direction:column; align-items:flex-start; border:none; padding:0;">
              <span style="font-size:0.8rem; color:var(--text-muted);">📅 RESERVATION DATE</span>
              <strong style="font-size:1rem; color:var(--text-dark);">${booking.date}</strong>
            </div>
            <div class="summary-item" style="flex-direction:column; align-items:flex-start; border:none; padding:0;">
              <span style="font-size:0.8rem; color:var(--text-muted);">⏰ SLOT TIME</span>
              <strong style="font-size:1rem; color:var(--primary-color);">${booking.timeSlot}</strong>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px; padding-bottom:20px; border-bottom:1px solid var(--border-color);">
            <div class="summary-item" style="flex-direction:column; align-items:flex-start; border:none; padding:0;">
              <span style="font-size:0.8rem; color:var(--text-muted);">👤 PLAYER NAME</span>
              <strong style="font-size:1rem; color:var(--text-dark);">${booking.userName}</strong>
            </div>
            <div class="summary-item" style="flex-direction:column; align-items:flex-start; border:none; padding:0;">
              <span style="font-size:0.8rem; color:var(--text-muted);">💳 TOTAL PAID</span>
              <strong style="font-size:1.2rem; color:#059669;">₹${booking.totalAmount}</strong>
            </div>
          </div>

          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <a href="/my-bookings.html" class="btn btn-primary" style="flex:1;">View All My Bookings</a>
            <button onclick="window.print()" class="btn btn-outline-dark">Print Pass 🖨️</button>
          </div>
        </div>
      </div>
    `;
  }
});
