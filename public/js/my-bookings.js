/**
 * PlaySlot My Bookings Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const container = document.getElementById('myBookingsList');
  const tabBtns = document.querySelectorAll('.booking-tab-btn');
  const upcomingCount = document.getElementById('upcomingCount');
  const completedCount = document.getElementById('completedCount');
  const cancelledCount = document.getElementById('cancelledCount');

  let activeTab = 'upcoming';

  function render() {
    if (!container) return;

    const user = window.PlaySlotData.getCurrentUser();
    const allBookings = window.PlaySlotData.getBookings();

    const upcoming = allBookings.filter(b => b.status === 'Confirmed');
    const completed = allBookings.filter(b => b.status === 'Completed');
    const cancelled = allBookings.filter(b => b.status === 'Cancelled');

    if (upcomingCount) upcomingCount.textContent = upcoming.length;
    if (completedCount) completedCount.textContent = completed.length;
    if (cancelledCount) cancelledCount.textContent = cancelled.length;

    const currentList = activeTab === 'completed' ? completed : (activeTab === 'cancelled' ? cancelled : upcoming);

    if (currentList.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎟️</div>
          <h3>No ${activeTab.toUpperCase()} Bookings</h3>
          <p style="color:var(--text-muted); margin-top:6px;">You do not have any ${activeTab} slot reservations.</p>
          <a href="/venues.html" class="btn btn-primary" style="margin-top:20px;">Explore Sports Turfs</a>
        </div>
      `;
      return;
    }

    container.innerHTML = currentList.map(b => `
      <div class="venue-card" style="flex-direction:row; padding:22px; align-items:center; gap:24px; margin-bottom:20px; flex-wrap:wrap;">
        <img src="${b.turfImage}" alt="${b.turfName}" style="width:140px; height:105px; object-fit:cover; border-radius:12px;">
        <div style="flex:1; min-width:260px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
            <div>
              <h3 style="font-size:1.25rem; font-weight:800;">${b.turfName}</h3>
              <div style="font-size:0.85rem; color:var(--text-muted); margin-top:2px;">
                Booking ID: <strong style="color:var(--primary-color);">${b.bookingId}</strong>
              </div>
            </div>
            <span class="badge ${b.status === 'Confirmed' ? 'badge-success' : (b.status === 'Completed' ? 'badge-primary' : 'badge-danger')}">
              ● ${b.status.toUpperCase()}
            </span>
          </div>

          <div style="display:flex; gap:20px; font-size:0.9rem; margin-top:12px; color:var(--text-body); flex-wrap:wrap;">
            <span>🏆 <strong>${b.sport}</strong></span>
            <span>📅 <strong>${b.date}</strong></span>
            <span>⏰ <strong>${b.timeSlot}</strong></span>
            <span>👥 <strong>${b.playersCount || 6} Players</strong></span>
            <span style="font-weight:800; color:var(--primary-color); font-size:1rem;">₹${b.totalAmount}</span>
          </div>
        </div>

        <div style="display:flex; gap:10px; flex-direction:column;">
          <button onclick="window.viewBookingReceipt('${b.bookingId}')" class="btn btn-outline-dark btn-sm">
            View Ticket 📄
          </button>
          ${b.status === 'Confirmed' ? `
            <button onclick="window.promptCancelBooking('${b.bookingId}')" class="btn btn-danger btn-sm">
              Cancel Slot ✕
            </button>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  // Action: View Digital Ticket Receipt Modal
  window.viewBookingReceipt = (bookingId) => {
    const booking = window.PlaySlotData.getBookingById(bookingId);
    if (!booking) return;

    const modalContent = `
      <div style="text-align:center; margin-bottom:20px;">
        <div class="logo-badge" style="margin:0 auto 12px auto; width:44px; height:44px; font-size:1.4rem;">⚡</div>
        <h4 style="font-size:1.2rem; font-weight:800;">${booking.turfName}</h4>
        <p style="font-size:0.85rem; color:var(--text-muted);">Official Slot Reservation Ticket</p>
      </div>

      <div style="background:var(--bg-color); padding:18px; border-radius:12px; margin-bottom:20px; font-size:0.9rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Booking ID:</span>
          <strong>${booking.bookingId}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Sport:</span>
          <strong>${booking.sport}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Match Date:</span>
          <strong>${booking.date}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Timing:</span>
          <strong style="color:var(--primary-color);">${booking.timeSlot}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="color:var(--text-muted);">Player Count:</span>
          <strong>${booking.playersCount || 6} Players</strong>
        </div>
        <div style="display:flex; justify-content:space-between; border-top:1px dashed var(--border-color); padding-top:10px; margin-top:10px;">
          <span><strong>Total Amount Paid:</strong></span>
          <strong style="color:#059669; font-size:1.1rem;">₹${booking.totalAmount}</strong>
        </div>
      </div>
    `;

    const modalFooter = `
      <button class="btn btn-outline-dark" onclick="window.print()">Print Ticket 🖨️</button>
      <button class="btn btn-primary" onclick="PlaySlotApp.closeModal()">Done</button>
    `;

    PlaySlotApp.showModal(`Digital Ticket - ${booking.bookingId}`, modalContent, modalFooter);
  };

  // Action: Cancel Slot with confirmation modal
  window.promptCancelBooking = (bookingId) => {
    const booking = window.PlaySlotData.getBookingById(bookingId);
    if (!booking) return;

    const modalContent = `
      <p style="color:var(--text-body); font-size:0.95rem; line-height:1.6; margin-bottom:16px;">
        Are you sure you want to cancel your slot reservation at <strong>${booking.turfName}</strong> for <strong>${booking.date} (${booking.timeSlot})</strong>?
      </p>
      <div style="background:var(--danger-light); padding:12px 16px; border-radius:8px; font-size:0.85rem; color:var(--danger-color);">
        ⚠️ A 100% refund of <strong>₹${booking.totalAmount}</strong> will be processed to your original payment method.
      </div>
    `;

    const modalFooter = `
      <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Keep Booking</button>
      <button class="btn btn-danger" onclick="window.executeCancel('${booking.bookingId}')">Confirm Cancellation</button>
    `;

    PlaySlotApp.showModal('Cancel Slot Booking', modalContent, modalFooter);
  };

  window.executeCancel = (bookingId) => {
    window.PlaySlotData.cancelBooking(bookingId);
    PlaySlotApp.closeModal();
    PlaySlotApp.showToast(`Booking ${bookingId} was successfully cancelled.`, 'success');
    render();
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.classList.add('btn-outline');
      });
      btn.classList.add('active');
      btn.classList.remove('btn-outline');
      activeTab = btn.getAttribute('data-tab');
      render();
    });
  });

  render();
});
