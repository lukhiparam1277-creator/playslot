/**
 * PlaySlot Turf Owner Application Status Checker
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const resultContainer = document.getElementById('statusResultContainer');
  const searchInput = document.getElementById('statusSearchInput');
  const searchBtn = document.getElementById('statusSearchBtn');

  const urlParams = new URLSearchParams(window.location.search);
  const initialAppId = urlParams.get('appId') || 'PS-OWNER-10245';
  const isNewlySubmitted = urlParams.get('submitted');

  if (searchInput && initialAppId) {
    searchInput.value = initialAppId;
  }

  function displayApplication(app) {
    if (!resultContainer) return;

    if (!app) {
      resultContainer.innerHTML = `
        <div class="empty-state" style="padding:40px 20px;">
          <div class="empty-icon">🔍</div>
          <h3>Application Not Found</h3>
          <p style="color:var(--text-muted); margin-top:6px;">No application found with ID or Email "${searchInput.value}". Please check your details and try again.</p>
          <a href="/owner/apply" class="btn btn-primary" style="margin-top:16px;">Submit New Application</a>
        </div>
      `;
      return;
    }

    let statusBadge = '';
    let statusNotice = '';
    let actionButtons = '';

    if (app.status === 'Pending') {
      statusBadge = '<span class="badge badge-warning" style="font-size:0.95rem; padding:8px 18px;">⏳ PENDING REVIEW</span>';
      statusNotice = `
        <div style="background:var(--accent-amber-light); border:1.5px solid #FCD34D; padding:20px; border-radius:14px; margin-bottom:24px;">
          <h4 style="color:#92400E; font-size:1.1rem; font-weight:800; margin-bottom:6px;">Application Under Review</h4>
          <p style="color:#B45309; font-size:0.92rem; line-height:1.6;">
            Thank you for applying to become a PlaySlot Turf Partner! Our operations team is currently reviewing your arena specifications and safety guidelines. You will receive login access once approved.
          </p>
        </div>
      `;
      actionButtons = `
        <a href="/" class="btn btn-outline-dark" style="flex:1;">Back to Homepage</a>
        <a href="/contact.html" class="btn btn-outline" style="flex:1;">Contact Operations Help</a>
      `;
    } else if (app.status === 'Approved') {
      statusBadge = '<span class="badge badge-success" style="font-size:0.95rem; padding:8px 18px;">✓ APPROVED</span>';
      statusNotice = `
        <div style="background:var(--secondary-light); border:1.5px solid #A7F3D0; padding:20px; border-radius:14px; margin-bottom:24px;">
          <h4 style="color:#065F46; font-size:1.1rem; font-weight:800; margin-bottom:6px;">Congratulations! Your Turf is Approved 🎉</h4>
          <p style="color:#047857; font-size:0.92rem; line-height:1.6;">
            Your venue has been verified and registered on the PlaySlot portal. You can now log in to the Turf Owner Console to manage schedules and accept bookings.
          </p>
        </div>
      `;
      actionButtons = `
        <a href="/owner/login" class="btn btn-emerald btn-lg" style="width:100%;">Proceed to Turf Owner Login ➔</a>
      `;
    } else if (app.status === 'Rejected') {
      statusBadge = '<span class="badge badge-danger" style="font-size:0.95rem; padding:8px 18px;">✕ NOT APPROVED</span>';
      statusNotice = `
        <div style="background:var(--danger-light); border:1.5px solid #FECACA; padding:20px; border-radius:14px; margin-bottom:24px;">
          <h4 style="color:var(--danger-color); font-size:1.1rem; font-weight:800; margin-bottom:6px;">Application Feedback</h4>
          <p style="color:#991B1B; font-size:0.92rem; line-height:1.6; margin-bottom:10px;">
            Your partner application was not approved for the following reason:
          </p>
          <div style="background:#FFFFFF; padding:12px 16px; border-radius:8px; border:1px solid #FECACA; font-weight:600; color:#7F1D1D; font-size:0.88rem;">
            "${app.rejectionReason || 'Incomplete specifications or verification details.'}"
          </div>
        </div>
      `;
      actionButtons = `
        <a href="/owner/apply" class="btn btn-primary" style="flex:1;">Submit Updated Application</a>
        <a href="/contact.html" class="btn btn-outline-dark" style="flex:1;">Contact Partner Support</a>
      `;
    }

    resultContainer.innerHTML = `
      ${isNewlySubmitted ? `
        <div style="background:var(--secondary-light); border:1px solid #A7F3D0; padding:16px; border-radius:12px; margin-bottom:24px; color:#065F46; font-size:0.95rem; font-weight:700;">
          🎉 Application Submitted Successfully! Keep note of your Application ID below.
        </div>
      ` : ''}

      <div class="summary-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; padding-bottom:18px; border-bottom:1px solid var(--border-color); flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-size:0.82rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Application Reference ID</div>
            <div style="font-size:1.6rem; font-weight:900; color:var(--primary-color); font-family:var(--font-heading);">${app.applicationId}</div>
          </div>
          ${statusBadge}
        </div>

        ${statusNotice}

        <!-- Application Summary Breakdown -->
        <div style="background:var(--bg-color); padding:20px; border-radius:14px; border:1px solid var(--border-color); margin-bottom:28px;">
          <h4 style="font-size:1.05rem; font-weight:800; margin-bottom:16px;">Application Overview</h4>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; font-size:0.92rem;">
            <div>
              <span style="color:var(--text-muted);">Partner Name:</span><br>
              <strong>${app.ownerName}</strong>
            </div>
            <div>
              <span style="color:var(--text-muted);">Email Address:</span><br>
              <strong>${app.email}</strong>
            </div>
            <div>
              <span style="color:var(--text-muted);">Turf Arena:</span><br>
              <strong>${app.turfName}</strong>
            </div>
            <div>
              <span style="color:var(--text-muted);">Location:</span><br>
              <strong>${app.area}, ${app.city}</strong>
            </div>
            <div>
              <span style="color:var(--text-muted);">Sport Categories:</span><br>
              <strong>${(app.sports || []).join(', ')}</strong>
            </div>
            <div>
              <span style="color:var(--text-muted);">Submitted Date:</span><br>
              <strong>${app.submittedDate}</strong>
            </div>
          </div>
        </div>

        <div style="display:flex; gap:14px; flex-wrap:wrap;">
          ${actionButtons}
        </div>
      </div>
    `;
  }

  function handleSearch() {
    const q = (searchInput ? searchInput.value.trim() : '') || initialAppId;
    if (!q) return;

    let app = window.PlaySlotData.getOwnerApplicationById(q);
    if (!app) {
      app = window.PlaySlotData.getOwnerApplicationByEmail(q);
    }

    displayApplication(app);
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    });
  }

  handleSearch();
});
