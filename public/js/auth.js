// PlaySlot Authentication Script
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const alertContainer = document.getElementById('authAlertContainer') || document.getElementById('registerAlertContainer');

  const urlParams = new URLSearchParams(window.location.search);
  const errorMsg = urlParams.get('error');
  const successMsg = urlParams.get('success');

  if (alertContainer) {
    if (errorMsg) alertContainer.innerHTML = `<div class="alert alert-danger">⚠️ ${decodeURIComponent(errorMsg)}</div>`;
    if (successMsg) alertContainer.innerHTML = `<div class="alert alert-success">✓ ${decodeURIComponent(successMsg)}</div>`;
  }

  // Login Form Submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;

      if (email === 'admin@playslot.com' && password === 'admin123') {
        const adminUser = {
          _id: 'admin-1',
          name: 'PlaySlot Admin',
          email: 'admin@playslot.com',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        };
        PlaySlotApp.setUser(adminUser);
        window.location.href = '/admin/dashboard.html';
        return;
      }

      if (email === 'user@playslot.com' && password === 'user123') {
        const standardUser = {
          _id: 'user-1',
          name: 'Rahul Sharma',
          email: 'user@playslot.com',
          phone: '9876543210',
          role: 'user',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        };
        PlaySlotApp.setUser(standardUser);
        window.location.href = '/index.html';
        return;
      }

      // Check registered users in localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('playslot_registered_users') || '[]');
      const found = registeredUsers.find(u => u.email === email && u.password === password);

      if (found) {
        PlaySlotApp.setUser(found);
        window.location.href = '/index.html';
      } else {
        if (alertContainer) {
          alertContainer.innerHTML = '<div class="alert alert-danger">⚠️ Invalid email or password.</div>';
        }
      }
    });
  }

  // Register Form Submission
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      const phone = document.getElementById('regPhone').value;
      const email = document.getElementById('regEmail').value.trim().toLowerCase();
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('regConfirmPassword').value;

      if (password !== confirmPassword) {
        if (alertContainer) alertContainer.innerHTML = '<div class="alert alert-danger">⚠️ Passwords do not match!</div>';
        return;
      }

      const newUser = {
        _id: 'user-' + Date.now(),
        name,
        phone,
        email,
        password,
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };

      const registeredUsers = JSON.parse(localStorage.getItem('playslot_registered_users') || '[]');
      registeredUsers.push(newUser);
      localStorage.setItem('playslot_registered_users', JSON.stringify(registeredUsers));

      PlaySlotApp.setUser(newUser);
      window.location.href = '/index.html?success=Welcome%20to%20PlaySlot!%20Account%20created%20successfully.';
    });
  }
});
