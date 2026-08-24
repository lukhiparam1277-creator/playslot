/**
 * PlaySlot Hidden Admin Login Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const form = document.getElementById('adminLoginForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('adminEmail').value.trim();
      const password = document.getElementById('adminPassword').value;

      if (!email || !password) {
        PlaySlotApp.showToast('Please provide admin credentials.', 'error');
        return;
      }

      window.PlaySlotData.loginAdmin(email, password);
      PlaySlotApp.showToast('Super Administrator authenticated successfully!', 'success');

      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 400);
    });
  }
});
