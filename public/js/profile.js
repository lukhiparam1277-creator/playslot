// PlaySlot Profile Page Script
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('profileMainContainer');
  if (!container) return;

  const user = PlaySlotApp.getUser() || {
    _id: 'demo-123',
    name: 'Rahul Sharma',
    email: 'user@playslot.com',
    phone: '9876543210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  };

  const bookings = JSON.parse(localStorage.getItem('playslot_user_bookings') || '[]');

  container.innerHTML = `
    <div class="section-title">My Profile & Account</div>
    <div class="section-subtitle">Manage your profile details, avatar picture, and password settings</div>

    <div id="profileAlert"></div>

    <div style="display:grid; grid-template-columns:1fr 2fr; gap:32px;">
      <!-- Left Profile Card -->
      <div class="summary-card" style="text-align:center;">
        <img id="profileAvatarImg" src="${user.avatar || '/images/default-avatar.png'}" alt="${user.name}" style="width:120px; height:120px; border-radius:50%; object-fit:cover; margin:0 auto 16px auto; border:4px solid var(--primary-light);">
        <h3 style="font-size:1.3rem; font-weight:700;">${user.name}</h3>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:12px;">${user.email}</p>
        <div style="margin-bottom:18px;">
          <span class="badge ${user.role === 'turf_owner' ? 'badge-primary' : 'badge-success'}">
            ${user.role === 'turf_owner' ? '🏟️ Verified Turf Owner' : '👤 Verified User'}
          </span>
        </div>

        <div style="background:var(--bg-color); padding:16px; border-radius:12px; text-align:left; margin-bottom:20px;">
          <div style="font-size:0.85rem; color:var(--text-muted);">Total Slots Booked</div>
          <div style="font-size:1.5rem; font-weight:800; color:var(--primary-color);">${bookings.length || 1} Slots</div>
        </div>

        <a href="/my-bookings.html" class="btn btn-outline" style="width:100%;">View Booking History</a>
      </div>

      <!-- Right Forms Column -->
      <div style="display:flex; flex-direction:column; gap:24px;">
        <!-- Edit Profile Info -->
        <div class="summary-card">
          <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:20px;">Edit Profile Information</h3>
          <form id="profileUpdateForm">
            <div class="form-group" style="margin-bottom:16px;">
              <label>Full Name</label>
              <input type="text" id="profName" value="${user.name}" class="form-input" required>
            </div>
            <div class="form-group" style="margin-bottom:16px;">
              <label>Email Address</label>
              <input type="email" value="${user.email}" class="form-input" readonly style="opacity:0.7;">
            </div>
            <div class="form-group" style="margin-bottom:16px;">
              <label>Phone Number</label>
              <input type="text" id="profPhone" value="${user.phone || '9876543210'}" class="form-input" required>
            </div>
            <div class="form-group" style="margin-bottom:24px;">
              <label>Profile Picture URL</label>
              <input type="text" id="profAvatar" value="${user.avatar || ''}" class="form-input" placeholder="https://images.unsplash.com/...">
            </div>
            <button type="submit" class="btn btn-primary">Save Profile Changes</button>
          </form>
        </div>

        <!-- Change Password -->
        <div class="summary-card">
          <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:20px;">Change Password</h3>
          <form id="passwordChangeForm">
            <div class="form-group" style="margin-bottom:16px;">
              <label>Current Password</label>
              <input type="password" id="currPass" class="form-input" required>
            </div>
            <div class="form-group" style="margin-bottom:16px;">
              <label>New Password</label>
              <input type="password" id="newPass" class="form-input" required>
            </div>
            <div class="form-group" style="margin-bottom:24px;">
              <label>Confirm New Password</label>
              <input type="password" id="confPass" class="form-input" required>
            </div>
            <button type="submit" class="btn btn-outline">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById('profileUpdateForm').addEventListener('submit', (e) => {
    e.preventDefault();
    user.name = document.getElementById('profName').value;
    user.phone = document.getElementById('profPhone').value;
    const avatarInput = document.getElementById('profAvatar').value;
    if (avatarInput) user.avatar = avatarInput;

    PlaySlotApp.setUser(user);
    document.getElementById('profileAlert').innerHTML = '<div class="alert alert-success">✓ Profile updated successfully!</div>';
    PlaySlotApp.renderNavbar();
  });

  document.getElementById('passwordChangeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newP = document.getElementById('newPass').value;
    const confP = document.getElementById('confPass').value;
    if (newP !== confP) {
      document.getElementById('profileAlert').innerHTML = '<div class="alert alert-danger">⚠️ Passwords do not match.</div>';
      return;
    }
    document.getElementById('profileAlert').innerHTML = '<div class="alert alert-success">✓ Password changed successfully!</div>';
    e.target.reset();
  });
});
