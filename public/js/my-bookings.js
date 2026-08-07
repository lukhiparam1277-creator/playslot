// PlaySlot My Bookings Script
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('myBookingsList');
  const tabBtns = document.querySelectorAll('.booking-tab-btn');

  if (!container) return;

  let activeTab = 'upcoming';

  const defaultDemoBookings = [
    {
      bookingId: 'PS-109283',
      venueName: 'Thunderbolts Box Cricket Arena',
      venueImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
      sportName: 'Box Cricket',
      date: '2026-08-10',
      timeSlot: '07:00 PM - 08:00 PM',
      playersCount: 6,
      totalAmount: 1416,
      status: 'confirmed'
    }
  ];

  function getBookings() {
    const saved = localStorage.getItem('playslot_user_bookings');
    return saved ? JSON.parse(saved) : defaultDemoBookings;
  }

  function render() {
    const allBookings = getBookings();

    const upcoming = allBookings.filter(b => b.status === 'confirmed');
    const completed = allBookings.filter(b => b.status === 'completed');
    const cancelled = allBookings.filter(b => b.status === 'cancelled');

    if (document.getElementById('upcomingCount')) document.getElementById('upcomingCount').textContent = upcoming.length;
    if (document.getElementById('completedCount')) document.getElementById('completedCount').textContent = completed.length;
    if (document.getElementById('cancelledCount')) document.getElementById('cancelledCount').textContent = cancelled.length;

    const currentList = activeTab === 'completed' ? completed : (activeTab === 'cancelled' ? cancelled : upcoming);

    if (currentList.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎟️</div>
          <h3>No ${activeTab.toUpperCase()} Bookings</h3>
          <p style="color:var(--text-muted); margin-top:6px;">You don't have any ${activeTab} slot reservations yet.</p>
          <a href="/venues.html" class="btn btn-primary" style="margin-top:20px;">Explore Sports Venues</a>
        </div>
      `;
      return;
    }

    container.innerHTML = currentList.map(b => `
      <div class="venue-card" style="flex-direction:row; padding:20px; align-items:center; gap:24px; margin-bottom:20px; flex-wrap:wrap;">
        <img src="${b.venueImage}" alt="${b.venueName}" style="width:140px; height:100px; object-fit:cover; border-radius:12px;">
        <div style="flex:1; min-width:260px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div>
              <h3 style="font-size:1.2rem; font-weight:700;">${b.venueName}</h3>
              <div style="font-size:0.85rem; color:var(--text-muted); margin-top:2px;">Booking ID: <strong>${b.bookingId}</strong></div>
            </div>
            <div class="badge ${b.status === 'confirmed' ? 'badge-success' : (b.status === 'completed' ? 'badge-primary' : 'badge-danger')}">
              ${b.status.toUpperCase()}
            </div>
          </div>

          <div style="display:flex; gap:24px; font-size:0.9rem; margin-top:12px; color:var(--text-dark); flex-wrap:wrap;">
            <span>🏆 ${b.sportName}</span>
            <span>📅 ${b.date}</span>
            <span>⏰ ${b.timeSlot}</span>
            <span>👥 ${b.playersCount} Players</span>
            <span style="font-weight:700; color:var(--primary-color);">₹${b.totalAmount}</span>
          </div>
        </div>

        ${b.status === 'confirmed' ? `
          <div>
            <button onclick="cancelBooking('${b.bookingId}')" class="btn btn-danger" style="padding:10px 18px; font-size:0.85rem;">Cancel Booking</button>
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  window.cancelBooking = (id) => {
    if (confirm('Are you sure you want to cancel this slot booking?')) {
      const all = getBookings();
      const b = all.find(item => item.bookingId === id);
      if (b) b.status = 'cancelled';
      localStorage.setItem('playslot_user_bookings', JSON.stringify(all));
      render();
    }
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
