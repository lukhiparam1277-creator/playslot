/**
 * PlaySlot User Authentication Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const loginForm = document.getElementById('userLoginForm');
  const registerForm = document.getElementById('userRegisterForm');
  const authAlertContainer = document.getElementById('authAlertContainer');
  const registerAlert = document.getElementById('registerAlert');

  // Handle URL alert messages
  const urlParams = new URLSearchParams(window.location.search);
  const successMsg = urlParams.get('success');
  const errorMsg = urlParams.get('error');

  if (authAlertContainer) {
    if (successMsg) {
      authAlertContainer.innerHTML = `
        <div style="background:var(--secondary-light); border:1px solid #A7F3D0; padding:12px; border-radius:10px; color:#065F46; margin-bottom:18px; font-size:0.88rem;">
          ✓ ${decodeURIComponent(successMsg)}
        </div>
      `;
    }
    if (errorMsg) {
      authAlertContainer.innerHTML = `
        <div style="background:var(--danger-light); border:1px solid #FECACA; padding:12px; border-radius:10px; color:var(--danger-color); margin-bottom:18px; font-size:0.88rem;">
          ⚠️ ${decodeURIComponent(errorMsg)}
        </div>
      `;
    }
  }

  // Handle Normal User Login Form
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      if (!email || !password) {
        PlaySlotApp.showToast('Please provide both email and password.', 'error');
        return;
      }

      const user = window.PlaySlotData.loginUser(email, password);
      PlaySlotApp.showToast(`Welcome back, ${user.name}!`, 'success');

      setTimeout(() => {
        const redirectUrl = urlParams.get('redirect') || '/user/dashboard';
        window.location.href = redirectUrl;
      }, 400);
    });
  }

  // Handle User Registration Form
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('regConfirmPassword').value;

      if (password !== confirmPassword) {
        if (registerAlert) {
          registerAlert.innerHTML = `
            <div style="background:var(--danger-light); border:1px solid #FECACA; padding:12px; border-radius:10px; color:var(--danger-color); margin-bottom:18px; font-size:0.88rem;">
              ⚠️ Passwords do not match. Please re-enter your password.
            </div>
          `;
        }
        return;
      }

      const newUser = window.PlaySlotData.registerUser({ name, email, phone, password });
      PlaySlotApp.showToast(`Account created successfully! Welcome to PlaySlot, ${name}.`, 'success');

      setTimeout(() => {
        window.location.href = '/user/dashboard?welcome=1';
      }, 500);
    });
  }
});
