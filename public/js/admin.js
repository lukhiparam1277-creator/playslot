// PlaySlot Pure JavaScript Admin Console Engine
document.addEventListener('DOMContentLoaded', () => {
  // Canvas Chart Renderer
  const canvas = document.getElementById('adminChart');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth;
    const height = canvas.height = 240;

    const data = [12, 19, 15, 25, 22, 30, 28, 35, 42, 38, 45, 50];
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(...data) + 10;

    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.35)');
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0.0)');

    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    data.forEach((val, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = height - padding - (val / maxValue) * chartHeight;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = '#2563EB';
    ctx.lineWidth = 3;
    data.forEach((val, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = height - padding - (val / maxValue) * chartHeight;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  // Admin Sports Page
  const sportsTable = document.getElementById('adminSportsTableBody');
  const modal = document.getElementById('sportModal');
  const openModalBtn = document.getElementById('openAddSportModal');
  const closeModalBtn = document.getElementById('closeSportModal');
  const addSportForm = document.getElementById('addSportForm');

  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', () => modal.style.display = 'flex');
  }
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
  }

  function renderSportsTable() {
    if (!sportsTable) return;
    sportsTable.innerHTML = PlaySlotApp.sports.map((s, idx) => `
      <tr>
        <td style="font-size:1.6rem;">${s.icon}</td>
        <td><strong>${s.name}</strong></td>
        <td>${s.description}</td>
        <td><span class="badge badge-primary">${s.categoryType || 'Both'}</span></td>
        <td><span class="badge ${s.isActive !== false ? 'badge-success' : 'badge-danger'}">${s.isActive !== false ? 'Active' : 'Disabled'}</span></td>
        <td>
          <div class="action-btns">
            <button onclick="toggleSportActive(${idx})" class="btn-icon btn-icon-primary" title="Toggle Status">🔄</button>
            <button onclick="deleteSport(${idx})" class="btn-icon btn-icon-danger" title="Delete">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.toggleSportActive = (idx) => {
    PlaySlotApp.sports[idx].isActive = !PlaySlotApp.sports[idx].isActive;
    renderSportsTable();
  };
  window.deleteSport = (idx) => {
    if (confirm('Delete this sport category?')) {
      PlaySlotApp.sports.splice(idx, 1);
      renderSportsTable();
    }
  };

  if (addSportForm) {
    addSportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('newSportName').value;
      const icon = document.getElementById('newSportIcon').value;
      const description = document.getElementById('newSportDesc').value;
      const image = document.getElementById('newSportImg').value || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80';

      PlaySlotApp.sports.unshift({
        name,
        icon,
        description,
        image,
        startingPrice: 500,
        venuesAvailable: 1,
        rating: 4.8,
        categoryType: 'Both',
        isActive: true
      });

      modal.style.display = 'none';
      addSportForm.reset();
      renderSportsTable();
    });
  }

  renderSportsTable();

  // Admin Venues Page
  const venuesTable = document.getElementById('adminVenuesTableBody');
  function renderVenuesTable() {
    if (!venuesTable) return;
    venuesTable.innerHTML = PlaySlotApp.venues.map((v, idx) => `
      <tr>
        <td><img src="${v.images[0]}" alt="${v.name}" style="width:60px; height:45px; object-fit:cover; border-radius:8px;"></td>
        <td><strong>${v.name}</strong></td>
        <td>${v.sportName}</td>
        <td>${v.location}, ${v.city}</td>
        <td><strong>₹${v.pricePerHour}</strong></td>
        <td>★ ${v.rating}</td>
        <td><span class="badge ${v.isActive !== false ? 'badge-success' : 'badge-danger'}">${v.isActive !== false ? 'Active' : 'Disabled'}</span></td>
        <td>
          <div class="action-btns">
            <button onclick="toggleVenueActive(${idx})" class="btn-icon btn-icon-primary" title="Toggle Status">🔄</button>
            <button onclick="deleteVenue(${idx})" class="btn-icon btn-icon-danger" title="Delete">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.toggleVenueActive = (idx) => {
    PlaySlotApp.venues[idx].isActive = !PlaySlotApp.venues[idx].isActive;
    renderVenuesTable();
  };
  window.deleteVenue = (idx) => {
    if (confirm('Delete venue listing?')) {
      PlaySlotApp.venues.splice(idx, 1);
      renderVenuesTable();
    }
  };

  renderVenuesTable();

  // Admin Add Venue Form Options
  const vSportSelect = document.getElementById('vSport');
  if (vSportSelect) {
    PlaySlotApp.sports.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = `${s.icon} ${s.name}`;
      vSportSelect.appendChild(opt);
    });
  }

  const addVenueForm = document.getElementById('addVenueForm');
  if (addVenueForm) {
    addVenueForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('vName').value;
      const sportName = document.getElementById('vSport').value;
      const city = document.getElementById('vCity').value;
      const location = document.getElementById('vLocation').value;
      const pricePerHour = parseFloat(document.getElementById('vPrice').value);
      const address = document.getElementById('vAddress').value;
      const description = document.getElementById('vDesc').value;
      const image = document.getElementById('vImage').value || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80';

      const facilities = Array.from(document.querySelectorAll('.fac-chk:checked')).map(c => c.value);

      PlaySlotApp.venues.unshift({
        _id: 'v-' + Date.now(),
        name,
        sportName,
        city,
        address,
        location,
        rating: 4.8,
        reviewsCount: 1,
        distance: '1.5 km',
        distanceVal: 1.5,
        pricePerHour,
        venueType: 'Outdoor',
        images: [image],
        facilities,
        slotTimings: ['06:00 AM - 07:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'],
        description,
        isActive: true
      });

      window.location.href = '/admin/venues.html';
    });
  }

  // Admin Bookings Management
  const adminBookingsTable = document.getElementById('adminBookingsTableBody');
  function renderAdminBookings() {
    if (!adminBookingsTable) return;
    const bookings = JSON.parse(localStorage.getItem('playslot_user_bookings') || '[]') || [
      { bookingId: 'PS-109283', venueName: 'Thunderbolts Box Cricket Arena', sportName: 'Box Cricket', date: '2026-08-10', timeSlot: '07:00 PM - 08:00 PM', totalAmount: 1416, status: 'confirmed' }
    ];

    adminBookingsTable.innerHTML = bookings.map((b, idx) => `
      <tr>
        <td><strong>${b.bookingId}</strong></td>
        <td><strong>${b.venueName}</strong><br><span style="font-size:0.8rem; color:var(--primary-color);">🏆 ${b.sportName}</span></td>
        <td>📅 ${b.date}<br>⏰ ${b.timeSlot}</td>
        <td><strong>₹${b.totalAmount}</strong></td>
        <td><span class="badge ${b.status === 'confirmed' ? 'badge-success' : (b.status === 'completed' ? 'badge-primary' : 'badge-danger')}">${b.status.toUpperCase()}</span></td>
        <td>
          <div style="display:flex; gap:6px;">
            ${b.status !== 'completed' ? `<button onclick="updateBookingAdminStatus(${idx}, 'completed')" class="btn btn-secondary" style="padding:4px 10px; font-size:0.75rem;">Approve</button>` : ''}
            ${b.status !== 'cancelled' ? `<button onclick="updateBookingAdminStatus(${idx}, 'cancelled')" class="btn btn-danger" style="padding:4px 10px; font-size:0.75rem;">Reject</button>` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.updateBookingAdminStatus = (idx, newStatus) => {
    const bookings = JSON.parse(localStorage.getItem('playslot_user_bookings') || '[]');
    if (bookings[idx]) bookings[idx].status = newStatus;
    localStorage.setItem('playslot_user_bookings', JSON.stringify(bookings));
    renderAdminBookings();
  };

  renderAdminBookings();

  // Admin Users Moderation
  const adminUsersTable = document.getElementById('adminUsersTableBody');
  function renderAdminUsers() {
    if (!adminUsersTable) return;
    const users = JSON.parse(localStorage.getItem('playslot_registered_users') || '[]') || [
      { name: 'Rahul Sharma', email: 'user@playslot.com', phone: '9876543210', role: 'user', isBlocked: false }
    ];

    if (users.length === 0) {
      users.push({ name: 'Rahul Sharma', email: 'user@playslot.com', phone: '9876543210', role: 'user', isBlocked: false });
    }

    adminUsersTable.innerHTML = users.map((u, idx) => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${u.avatar || '/images/default-avatar.png'}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;">
            <strong>${u.name}</strong>
          </div>
        </td>
        <td>${u.email}</td>
        <td>${u.phone || '9876543210'}</td>
        <td><span class="badge badge-primary">${u.role}</span></td>
        <td><span class="badge ${u.isBlocked ? 'badge-danger' : 'badge-success'}">${u.isBlocked ? 'Blocked' : 'Active'}</span></td>
        <td>
          <div style="display:flex; gap:8px;">
            <button onclick="toggleUserBlock(${idx})" class="btn ${u.isBlocked ? 'btn-secondary' : 'btn-outline'}" style="padding:6px 12px; font-size:0.8rem;">${u.isBlocked ? 'Unblock' : 'Block User'}</button>
            <button onclick="deleteUser(${idx})" class="btn btn-danger" style="padding:6px 12px; font-size:0.8rem;">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.toggleUserBlock = (idx) => {
    const users = JSON.parse(localStorage.getItem('playslot_registered_users') || '[]');
    if (users[idx]) users[idx].isBlocked = !users[idx].isBlocked;
    localStorage.setItem('playslot_registered_users', JSON.stringify(users));
    renderAdminUsers();
  };

  window.deleteUser = (idx) => {
    if (confirm('Delete user account?')) {
      const users = JSON.parse(localStorage.getItem('playslot_registered_users') || '[]');
      users.splice(idx, 1);
      localStorage.setItem('playslot_registered_users', JSON.stringify(users));
      renderAdminUsers();
    }
  };

  renderAdminUsers();
});
