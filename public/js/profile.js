/**
 * PlaySlot User Profile & Account Settings Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const container = document.getElementById('profileMainContainer');
  if (!container) return;

  function render() {
    const user = window.PlaySlotData.getCurrentUser() || {
      id: 'user-1',
      name: 'Rahul Sharma',
      email: 'user@playslot.com',
      phone: '+91 98765 43210',
      role: 'user',
      city: 'Mumbai',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };

    const bookings = window.PlaySlotData.getBookings();

    container.innerHTML = `
      <div class="section-title">My Account & Profile</div>
      <div class="section-subtitle">Manage your player profile details, notification preferences, and security settings</div>

      <div id="profileAlert"></div>

      <div style="display:grid; grid-template-columns:1fr 2fr; gap:32px;">
        <!-- Left Profile Card -->
        <div class="summary-card" style="text-align:center;">
          <img id="profileAvatarImg" src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}" alt="${user.name}" style="width:120px; height:120px; border-radius:50%; object-fit:cover; margin:0 auto 16px auto; border:4px solid var(--primary-light); box-shadow:var(--shadow-md);">
          
          <h3 style="font-size:1.35rem; font-weight:800;">${user.name}</h3>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:12px;">${user.email}</p>
          
          <div style="margin-bottom:20px;">
            <span class="badge ${user.role === 'turf_owner' ? 'badge-primary' : (user.role === 'admin' ? 'badge-purple' : 'badge-success')}">
              ${user.role === 'turf_owner' ? '🏟️ Verified Turf Owner' : (user.role === 'admin' ? '🛡️ Administrator' : '👤 Verified Athlete')}
            </span>
          </div>

          <div style="background:var(--bg-color); padding:16px; border-radius:12px; text-align:left; margin-bottom:20px; border:1px solid var(--border-color);">
            <div style="font-size:0.82rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Total Slot Bookings</div>
            <div style="font-size:1.6rem; font-weight:900; color:var(--primary-color); font-family:var(--font-heading);">${bookings.length} Slots</div>
          </div>

          <a href="/my-bookings.html" class="btn btn-outline" style="width:100%; margin-bottom:10px;">View My Bookings</a>
          <button onclick="PlaySlotApp.logout()" class="btn btn-outline-dark" style="width:100%;">Log Out</button>
        </div>

        <!-- Right Forms Column -->
        <div style="display:flex; flex-direction:column; gap:24px;">
          <!-- Edit Profile Info -->
          <div class="summary-card">
            <h3 style="font-size:1.25rem; font-weight:800; margin-bottom:20px;">Edit Profile Information</h3>
            <form id="profileUpdateForm">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                <div class="form-group">
                  <label>Full Name</label>
                  <input type="text" id="profName" value="${user.name}" class="form-input" required>
                </div>
                <div class="form-group">
                  <label>Email Address</label>
                  <input type="email" value="${user.email}" class="form-input" readonly style="opacity:0.75; cursor:not-allowed;">
                </div>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                <div class="form-group">
                  <label>Contact Phone</label>
                  <input type="text" id="profPhone" value="${user.phone || '+91 98765 43210'}" class="form-input" required>
                </div>
                <div class="form-group">
                  <label>Home City / Location</label>
                  <select id="profCity" class="form-select">
                    <option value="Mumbai" ${user.city === 'Mumbai' ? 'selected' : ''}>Mumbai</option>
                    <option value="Bengaluru" ${user.city === 'Bengaluru' ? 'selected' : ''}>Bengaluru</option>
                    <option value="Delhi" ${user.city === 'Delhi' ? 'selected' : ''}>Delhi / Gurugram</option>
                  </select>
                </div>
              </div>

              <div class="form-group" style="margin-bottom:24px;">
                <label>Profile Avatar URL</label>
                <input type="text" id="profAvatar" value="${user.avatar || ''}" class="form-input" placeholder="https://images.unsplash.com/...">
              </div>

              <button type="submit" class="btn btn-primary">Save Profile Changes</button>
            </form>
          </div>

          <!-- Notification Preferences -->
          <div class="summary-card">
            <h3 style="font-size:1.25rem; font-weight:800; margin-bottom:16px;">Notification Preferences</h3>
            <div style="display:flex; flex-direction:column; gap:14px;">
              <label style="display:flex; align-items:center; justify-content:space-between; cursor:pointer;">
                <div>
                  <strong>Slot Booking Confirmations</strong>
                  <div style="font-size:0.82rem; color:var(--text-muted);">Receive instant WhatsApp & SMS receipts upon booking</div>
                </div>
                <input type="checkbox" checked style="width:20px; height:20px; accent-color:var(--primary-color);">
              </label>
              <label style="display:flex; align-items:center; justify-content:space-between; cursor:pointer;">
                <div>
                  <strong>Turf Offers & Weekend Tournaments</strong>
                  <div style="font-size:0.82rem; color:var(--text-muted);">Exclusive promotional discounts for your favorite sports</div>
                </div>
                <input type="checkbox" checked style="width:20px; height:20px; accent-color:var(--primary-color);">
              </label>
            </div>
          </div>

          <!-- Change Password -->
          <div class="summary-card">
            <h3 style="font-size:1.25rem; font-weight:800; margin-bottom:20px;">Change Password</h3>
            <form id="passwordChangeForm">
              <div class="form-group" style="margin-bottom:16px;">
                <label>Current Password</label>
                <input type="password" id="currPass" class="form-input" placeholder="••••••••" required>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
                <div class="form-group">
                  <label>New Password</label>
                  <input type="password" id="newPass" class="form-input" placeholder="••••••••" required>
                </div>
                <div class="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" id="confPass" class="form-input" placeholder="••••••••" required>
                </div>
              </div>
              <button type="submit" class="btn btn-outline-dark">Update Password</button>
            </form>
          </div>
        </div>
      </div>
    `;

    document.getElementById('profileUpdateForm').addEventListener('submit', (e) => {
      e.preventDefault();
      user.name = document.getElementById('profName').value;
      user.phone = document.getElementById('profPhone').value;
      user.city = document.getElementById('profCity').value;
      const avatarVal = document.getElementById('profAvatar').value.trim();
      if (avatarVal) user.avatar = avatarVal;

      window.PlaySlotData.setCurrentUser(user);
      PlaySlotApp.showToast('Profile updated successfully!', 'success');
      PlaySlotApp.renderNavbar();
      render();
    });

    document.getElementById('passwordChangeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const newP = document.getElementById('newPass').value;
      const confP = document.getElementById('confPass').value;
      if (newP !== confP) {
        PlaySlotApp.showToast('Passwords do not match.', 'error');
        return;
      }
      PlaySlotApp.showToast('Password changed successfully!', 'success');
      e.target.reset();
    });
  }

  render();
});
