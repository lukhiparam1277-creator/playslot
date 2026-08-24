/**
 * PlaySlot Turf Owner Login Logic & Approval Access Gate
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const form = document.getElementById('ownerLoginForm');
  const alertContainer = document.getElementById('ownerLoginAlert');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('ownerEmail').value.trim();
      const password = document.getElementById('ownerPassword').value;

      if (!email || !password) {
        PlaySlotApp.showToast('Please provide both email and password.', 'error');
        return;
      }

      const result = window.PlaySlotData.checkOwnerLoginEligibility(email);

      if (!result.allowed) {
        if (alertContainer) {
          alertContainer.innerHTML = `
            <div style="background:var(--danger-light); border:1.5px solid #FECACA; padding:16px; border-radius:12px; margin-bottom:20px;">
              <h4 style="color:var(--danger-color); font-weight:800; font-size:0.95rem; margin-bottom:4px;">
                ${result.status === 'Pending' ? '⏳ Application Still Under Review' : '⚠️ Application Status Notice'}
              </h4>
              <p style="color:#991B1B; font-size:0.88rem; line-height:1.5;">
                ${result.message}
              </p>
              ${result.applicationId ? `
                <a href="/owner/status?appId=${result.applicationId}" class="btn btn-outline-dark btn-sm" style="margin-top:10px;">Check Application Status ➔</a>
              ` : `
                <a href="/owner/apply" class="btn btn-primary btn-sm" style="margin-top:10px;">Apply to List Your Turf ➔</a>
              `}
            </div>
          `;
        }
        return;
      }

      PlaySlotApp.showToast(`Welcome to Turf Owner Console, ${result.ownerUser.name}!`, 'success');

      setTimeout(() => {
        window.location.href = '/owner/dashboard';
      }, 400);
    });
  }
});
