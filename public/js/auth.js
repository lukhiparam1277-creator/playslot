// PlaySlot UI-Only Authentication & Role Switching
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const errorMsg = urlParams.get('error');
  const successMsg = urlParams.get('success');
  const returnUrl = urlParams.get('returnUrl');
  const roleParam = urlParams.get('role');

  const alertContainer = document.getElementById('authAlertContainer') || document.getElementById('registerAlertContainer');
  if (alertContainer) {
    if (errorMsg) alertContainer.innerHTML = `<div class="alert alert-danger">⚠️ ${decodeURIComponent(errorMsg)}</div>`;
    if (successMsg) alertContainer.innerHTML = `<div class="alert alert-success">✓ ${decodeURIComponent(successMsg)}</div>`;
  }

  // ==========================================
  // LOGIN ROLE SWITCHING & SUBMISSION
  // ==========================================
  const loginForm = document.getElementById('loginForm');
  const roleBtnUser = document.getElementById('roleBtnUser');
  const roleBtnOwner = document.getElementById('roleBtnOwner');
  const selectedRoleInput = document.getElementById('selectedRole');
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');
  const authHeaderIcon = document.getElementById('authHeaderIcon');
  const authHeading = document.getElementById('authHeading');
  const authSubheading = document.getElementById('authSubheading');
  const loginEmail = document.getElementById('loginEmail');
  const registerLink = document.getElementById('registerLink');

  function setLoginRole(role) {
    if (!selectedRoleInput) return;
    selectedRoleInput.value = role;

    if (role === 'turf_owner') {
      if (roleBtnOwner) roleBtnOwner.classList.add('active');
      if (roleBtnUser) roleBtnUser.classList.remove('active');
      if (authHeaderIcon) authHeaderIcon.textContent = '🏟️';
      if (authHeading) authHeading.textContent = 'Turf Owner Login';
      if (authSubheading) authSubheading.textContent = 'Sign in to manage your turf venues, slots & revenue';
      if (loginSubmitBtn) loginSubmitBtn.textContent = 'Login as Turf Owner 🏟️';
      if (loginEmail && !loginEmail.value) loginEmail.placeholder = 'e.g. owner@playslot.com';
      if (registerLink) registerLink.href = '/register.html?role=turf_owner';
    } else {
      if (roleBtnUser) roleBtnUser.classList.add('active');
      if (roleBtnOwner) roleBtnOwner.classList.remove('active');
      if (authHeaderIcon) authHeaderIcon.textContent = '⚽';
      if (authHeading) authHeading.textContent = 'Welcome Back to PlaySlot';
      if (authSubheading) authSubheading.textContent = 'Sign in to access your sports booking account';
      if (loginSubmitBtn) loginSubmitBtn.textContent = 'Login as User 🚀';
      if (loginEmail && !loginEmail.value) loginEmail.placeholder = 'e.g. user@playslot.com';
      if (registerLink) registerLink.href = '/register.html?role=user';
    }
  }

  if (roleBtnUser && roleBtnOwner) {
    roleBtnUser.addEventListener('click', () => setLoginRole('user'));
    roleBtnOwner.addEventListener('click', () => setLoginRole('turf_owner'));
    
    if (roleParam === 'turf_owner') {
      setLoginRole('turf_owner');
    } else {
      setLoginRole('user');
    }
  }

  // Quick Demo Buttons
  const fillUserDemoBtn = document.getElementById('fillUserDemoBtn');
  const fillOwnerDemoBtn = document.getElementById('fillOwnerDemoBtn');

  if (fillUserDemoBtn) {
    fillUserDemoBtn.addEventListener('click', () => {
      setLoginRole('user');
      if (loginEmail) loginEmail.value = 'user@playslot.com';
      const pass = document.getElementById('loginPassword');
      if (pass) pass.value = 'user123';
    });
  }

  if (fillOwnerDemoBtn) {
    fillOwnerDemoBtn.addEventListener('click', () => {
      setLoginRole('turf_owner');
      if (loginEmail) loginEmail.value = 'owner@playslot.com';
      const pass = document.getElementById('loginPassword');
      if (pass) pass.value = 'owner123';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;
      const role = selectedRoleInput ? selectedRoleInput.value : 'user';

      if (alertContainer) alertContainer.innerHTML = '';

      // Demo User Login
      if (email === 'user@playslot.com' || (email.includes('user') && password)) {
        const userObj = {
          id: 'usr_demo_01',
          name: 'Rahul Sharma',
          email: email || 'user@playslot.com',
          phone: '9876543210',
          role: 'user',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        };
        PlaySlotApp.setUser(userObj);
        window.location.href = returnUrl ? decodeURIComponent(returnUrl) : '/my-bookings.html';
        return;
      }

      // Demo Turf Owner Login
      if (email === 'owner@playslot.com' || (email.includes('owner') && password)) {
        const ownerObj = {
          id: 'owner_demo_01',
          name: 'Vikram Malhotra',
          email: email || 'owner@playslot.com',
          phone: '9812345678',
          role: 'turf_owner',
          facilityName: 'Apex Sports Arena & Turfs',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        };
        PlaySlotApp.setUser(ownerObj);
        window.location.href = '/owner/dashboard.html?success=Welcome%20back%20Turf%20Owner!';
        return;
      }

      // Check registered users in localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('playslot_registered_users') || '[]');
      const found = registeredUsers.find(u => u.email === email && u.password === password);

      if (found) {
        PlaySlotApp.setUser(found);
        if (found.role === 'turf_owner') {
          window.location.href = '/owner/dashboard.html';
        } else {
          window.location.href = returnUrl ? decodeURIComponent(returnUrl) : '/my-bookings.html';
        }
      } else {
        // Fallback demo login based on role
        const fallbackUser = {
          id: `${role === 'turf_owner' ? 'owner' : 'usr'}_${Date.now()}`,
          name: role === 'turf_owner' ? 'Turf Owner' : 'Player User',
          email: email,
          phone: '9876543210',
          role: role,
          avatar: role === 'turf_owner'
            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        };
        PlaySlotApp.setUser(fallbackUser);
        if (role === 'turf_owner') {
          window.location.href = '/owner/dashboard.html';
        } else {
          window.location.href = returnUrl ? decodeURIComponent(returnUrl) : '/my-bookings.html';
        }
      }
    });
  }

  // ==========================================
  // REGISTER ROLE SWITCHING & SUBMISSION
  // ==========================================
  const registerForm = document.getElementById('registerForm');
  const regRoleBtnUser = document.getElementById('regRoleBtnUser');
  const regRoleBtnOwner = document.getElementById('regRoleBtnOwner');
  const selectedRegRoleInput = document.getElementById('selectedRegRole');
  const regSubmitBtn = document.getElementById('regSubmitBtn');
  const regHeaderIcon = document.getElementById('regHeaderIcon');
  const regHeading = document.getElementById('regHeading');
  const regSubheading = document.getElementById('regSubheading');
  const facilityNameGroup = document.getElementById('facilityNameGroup');
  const nameLabel = document.getElementById('nameLabel');
  const loginLink = document.getElementById('loginLink');

  function setRegisterRole(role) {
    if (!selectedRegRoleInput) return;
    selectedRegRoleInput.value = role;

    if (role === 'turf_owner') {
      if (regRoleBtnOwner) regRoleBtnOwner.classList.add('active');
      if (regRoleBtnUser) regRoleBtnUser.classList.remove('active');
      if (regHeaderIcon) regHeaderIcon.textContent = '🏟️';
      if (regHeading) regHeading.textContent = 'Register as Turf Owner';
      if (regSubheading) regSubheading.textContent = 'List your sports arena and receive automated slot bookings';
      if (facilityNameGroup) facilityNameGroup.style.display = 'flex';
      if (nameLabel) nameLabel.textContent = '👤 Owner / Contact Person Name';
      if (regSubmitBtn) regSubmitBtn.textContent = 'Register as Turf Owner 🏟️';
      if (loginLink) loginLink.href = '/login.html?role=turf_owner';
    } else {
      if (regRoleBtnUser) regRoleBtnUser.classList.add('active');
      if (regRoleBtnOwner) regRoleBtnOwner.classList.remove('active');
      if (regHeaderIcon) regHeaderIcon.textContent = '🏆';
      if (regHeading) regHeading.textContent = 'Create Your PlaySlot Account';
      if (regSubheading) regSubheading.textContent = 'Join thousands of sports enthusiasts and players';
      if (facilityNameGroup) facilityNameGroup.style.display = 'none';
      if (nameLabel) nameLabel.textContent = '👤 Full Name';
      if (regSubmitBtn) regSubmitBtn.textContent = 'Register as User ⚡';
      if (loginLink) loginLink.href = '/login.html?role=user';
    }
  }

  if (regRoleBtnUser && regRoleBtnOwner) {
    regRoleBtnUser.addEventListener('click', () => setRegisterRole('user'));
    regRoleBtnOwner.addEventListener('click', () => setRegisterRole('turf_owner'));

    if (roleParam === 'turf_owner') {
      setRegisterRole('turf_owner');
    } else {
      setRegisterRole('user');
    }
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const email = document.getElementById('regEmail').value.trim().toLowerCase();
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('regConfirmPassword').value;
      const role = selectedRegRoleInput ? selectedRegRoleInput.value : 'user';
      const facilityName = document.getElementById('regFacility') ? document.getElementById('regFacility').value.trim() : '';

      if (password !== confirmPassword) {
        if (alertContainer) alertContainer.innerHTML = '<div class="alert alert-danger">⚠️ Passwords do not match!</div>';
        return;
      }

      const newUser = {
        id: `${role === 'turf_owner' ? 'owner' : 'usr'}_${Date.now()}`,
        name,
        phone,
        email,
        password,
        role,
        facilityName: role === 'turf_owner' ? facilityName : '',
        avatar: role === 'turf_owner'
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date().toISOString()
      };

      const registeredUsers = JSON.parse(localStorage.getItem('playslot_registered_users') || '[]');
      registeredUsers.push(newUser);
      localStorage.setItem('playslot_registered_users', JSON.stringify(registeredUsers));

      PlaySlotApp.setUser(newUser);

      if (role === 'turf_owner') {
        window.location.href = '/owner/dashboard.html?success=Welcome%20Turf%20Owner!%20Your%20account%20has%20been%20created.';
      } else {
        window.location.href = '/my-bookings.html?success=Welcome%20to%20PlaySlot!%20Your%20account%20is%20ready.';
      }
    });
  }
});
