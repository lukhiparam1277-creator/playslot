// PlaySlot Booking Checkout & Ticket Confirmation Script
document.addEventListener('DOMContentLoaded', () => {
  const summaryContainer = document.getElementById('bookingSummaryContainer');
  const ticketContainer = document.getElementById('ticketContainer');

  const urlParams = new URLSearchParams(window.location.search);
  const venueId = urlParams.get('venueId') || '64b000000000000000000001';
  const date = urlParams.get('date') || new Date().toISOString().split('T')[0];
  const timeSlot = urlParams.get('timeSlot') || '05:00 PM - 06:00 PM';
  const bookingId = urlParams.get('bookingId');

  // Checkout View
  if (summaryContainer) {
    const venue = PlaySlotApp.venues.find(v => v._id === venueId) || PlaySlotApp.venues[0];
    const slotPrice = venue.pricePerHour;
    const gstAmount = Math.round(slotPrice * 0.18);
    const totalAmount = slotPrice + gstAmount;

    summaryContainer.innerHTML = `
      <div style="display:flex; gap:20px; align-items:center; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid var(--border-color);">
        <img src="${venue.images[0]}" alt="${venue.name}" style="width:100px; height:80px; object-fit:cover; border-radius:12px;">
        <div>
          <h3 style="font-size:1.3rem; font-weight:700;">${venue.name}</h3>
          <p style="color:var(--text-muted); font-size:0.9rem;">📍 ${venue.location}, ${venue.city}</p>
          <div class="badge badge-primary" style="margin-top:6px;">🏆 ${venue.sportName}</div>
        </div>
      </div>

      <form id="checkoutConfirmForm">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px;">
          <div class="form-group">
            <label>📅 Booking Date</label>
            <input type="text" value="${date}" class="form-input" readonly>
          </div>
          <div class="form-group">
            <label>⏰ Selected Time Slot</label>
            <input type="text" value="${timeSlot}" class="form-input" readonly>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:24px;">
          <label>👥 Number of Players</label>
          <select id="playersCountSelect" class="form-select">
            <option value="2">2 Players</option>
            <option value="4">4 Players</option>
            <option value="6" selected>6 Players</option>
            <option value="8">8 Players</option>
            <option value="10">10 Players</option>
          </select>
        </div>

        <div style="background:var(--bg-color); padding:20px; border-radius:var(--border-radius-sm); margin-bottom:28px;">
          <h4 style="font-size:1rem; font-weight:700; margin-bottom:14px;">Payment Summary</h4>
          <div class="summary-item">
            <span>Slot Price (1 Hour)</span>
            <span>₹${slotPrice}</span>
          </div>
          <div class="summary-item">
            <span>Government GST (18%)</span>
            <span>₹${gstAmount}</span>
          </div>
          <div class="summary-item total">
            <span>Total Payable Amount</span>
            <span>₹${totalAmount}</span>
          </div>
        </div>

        <button type="submit" class="btn btn-secondary" style="width:100%; height:52px; font-size:1.1rem;">
          Proceed to Pay & Confirm Slot ⚡
        </button>
      </form>
    `;

    document.getElementById('checkoutConfirmForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const user = PlaySlotApp.getUser();
      const newBookingId = 'PS-' + Math.floor(100000 + Math.random() * 900000);
      const playersCount = parseInt(document.getElementById('playersCountSelect').value);

      const bookingRecord = {
        bookingId: newBookingId,
        userId: user ? user._id : 'guest',
        venueName: venue.name,
        venueImage: venue.images[0],
        sportName: venue.sportName,
        date,
        timeSlot,
        playersCount,
        totalAmount,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const userBookings = JSON.parse(localStorage.getItem('playslot_user_bookings') || '[]');
      userBookings.unshift(bookingRecord);
      localStorage.setItem('playslot_user_bookings', JSON.stringify(userBookings));

      window.location.href = `/booking-success.html?bookingId=${newBookingId}&venueId=${venue._id}&date=${date}&timeSlot=${encodeURIComponent(timeSlot)}&total=${totalAmount}&players=${playersCount}`;
    });
  }

  // Confirmation Ticket View
  if (ticketContainer) {
    const total = urlParams.get('total') || '1416';
    const players = urlParams.get('players') || '6';

    ticketContainer.innerHTML = `
      <div class="ticket-header">
        <div style="font-size:3.5rem; margin-bottom:8px;">🎉</div>
        <h2 style="font-size:1.8rem; font-weight:800;">Booking Confirmed!</h2>
        <p style="opacity:0.9; font-size:0.95rem; margin-top:4px;">Booking ID: <strong>${bookingId || 'PS-109283'}</strong></p>
      </div>

      <div class="ticket-body">
        <div style="display:flex; gap:16px; align-items:center; margin-bottom:24px; padding-bottom:20px; border-bottom:1px dashed var(--border-color);">
          <img src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80" alt="Venue" style="width:80px; height:65px; object-fit:cover; border-radius:10px;">
          <div>
            <h4 style="font-size:1.1rem; font-weight:700;">Thunderbolts Box Cricket Arena</h4>
            <div class="badge badge-success" style="margin-top:4px;">🏆 Box Cricket</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
          <div>
            <div style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">DATE</div>
            <div style="font-size:1rem; font-weight:700;">${date}</div>
          </div>
          <div>
            <div style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">TIME SLOT</div>
            <div style="font-size:1rem; font-weight:700;">${timeSlot}</div>
          </div>
          <div>
            <div style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">PLAYERS</div>
            <div style="font-size:1rem; font-weight:700;">${players} Players</div>
          </div>
          <div>
            <div style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">AMOUNT PAID</div>
            <div style="font-size:1.1rem; font-weight:800; color:var(--secondary-color);">₹${total} (Paid)</div>
          </div>
        </div>

        <div style="display:flex; gap:14px; margin-top:32px;">
          <a href="/my-bookings.html" class="btn btn-primary" style="flex:1;">View My Bookings</a>
          <a href="/index.html" class="btn btn-outline" style="flex:1;">Back to Home</a>
        </div>
      </div>
    `;
  }
});
