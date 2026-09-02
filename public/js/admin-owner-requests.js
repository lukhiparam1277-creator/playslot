/**
 * PlaySlot Admin Turf Owner Applications Review Engine
 * Strictly enforces OWNER ≠ TURF separation.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const user = window.PlaySlotData.getCurrentUser();
  if (!user || user.role !== 'admin') {
    window.location.href = '/admin';
    return;
  }

  const tableBody = document.getElementById('ownerRequestsTableBody');
  const filterSelect = document.getElementById('filterAppStatus');
  const totalCountSpan = document.getElementById('totalApplicationsCount');

  function renderApplications() {
    if (!tableBody) return;

    const statusFilter = filterSelect ? filterSelect.value : 'Pending';
    const applications = window.PlaySlotData.getOwnerApplications(statusFilter);

    if (totalCountSpan) {
      totalCountSpan.textContent = applications.length;
    }

    if (applications.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding:40px 20px; color:var(--text-muted); font-size:0.95rem;">
            ${statusFilter === 'Pending' ? 'No pending owner requests' : `No partner applications found matching "${statusFilter}".`}
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = applications.map(app => `
      <tr>
        <td><strong style="color:var(--primary-color); font-family:var(--font-heading);">${app.applicationId || app.id}</strong></td>
        <td>
          <strong>${app.ownerName || app.name}</strong><br>
          <span style="font-size:0.78rem; color:var(--text-muted);">${app.email} • ${app.phone}</span>
        </td>
        <td>
          <strong>${app.businessName || app.turfName}</strong><br>
          <span style="font-size:0.78rem; color:var(--text-muted);">${app.turfType || 'Outdoor'} Arena</span>
        </td>
        <td>${app.city || 'Mumbai'} ${app.area ? `(${app.area})` : ''}</td>
        <td><span class="badge badge-primary">🏆 ${(app.sports || ['Cricket']).join(', ')}</span></td>
        <td>${app.appliedDate || app.submittedDate || 'Recent'}</td>
        <td>
          <span class="badge ${app.status === 'Approved' ? 'badge-success' : (app.status === 'Pending' ? 'badge-warning' : 'badge-danger')}">
            ${app.status}
          </span>
        </td>
        <td>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <button onclick="window.openApplicationReview('${app.applicationId || app.id}')" class="btn btn-outline-dark btn-sm">
              View
            </button>
            ${app.status === 'Pending' ? `
              <button onclick="window.promptApproveApplication('${app.applicationId || app.id}')" class="btn btn-emerald btn-sm">
                Approve ✓
              </button>
              <button onclick="window.promptRejectApplication('${app.applicationId || app.id}')" class="btn btn-danger btn-sm">
                Reject
              </button>
            ` : (app.status === 'Approved' ? `
              <button onclick="window.suspendOwner('${app.applicationId || app.id}')" class="btn btn-danger btn-sm">
                Suspend
              </button>
            ` : (app.status === 'Suspended' || app.status === 'Rejected' ? `
              <button onclick="window.promptApproveApplication('${app.applicationId || app.id}')" class="btn btn-emerald btn-sm">
                Re-Approve
              </button>
            ` : ''))}
          </div>
        </td>
      </tr>
    `).join('');
  }

  if (filterSelect) {
    filterSelect.addEventListener('change', renderApplications);
  }

  // Action: Open Comprehensive Review Modal
  window.openApplicationReview = (appId) => {
    const app = window.PlaySlotData.getOwnerApplicationById(appId);
    if (!app) return;

    const modalContent = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; padding-bottom:12px; border-bottom:1px solid var(--border-color);">
        <div>
          <span style="font-size:0.78rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Application Reference</span>
          <h3 style="font-size:1.3rem; font-weight:900; color:var(--primary-color);">${app.applicationId || app.id}</h3>
        </div>
        <span class="badge ${app.status === 'Approved' ? 'badge-success' : (app.status === 'Pending' ? 'badge-warning' : 'badge-danger')}" style="font-size:0.88rem; padding:6px 14px;">
          ${app.status}
        </span>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
        <!-- Left: Owner Specs -->
        <div style="background:var(--bg-color); padding:16px; border-radius:12px; font-size:0.9rem;">
          <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:10px; color:var(--text-dark);">👤 Owner Information</h4>
          <p><strong>Name:</strong> ${app.ownerName || app.name}</p>
          <p><strong>Business:</strong> ${app.businessName || app.turfName}</p>
          <p><strong>Email:</strong> ${app.email}</p>
          <p><strong>Mobile:</strong> ${app.phone}</p>
          <p><strong>Submitted Date:</strong> ${app.appliedDate || app.submittedDate || 'Recent'}</p>
        </div>

        <!-- Right: Turf Specs -->
        <div style="background:var(--bg-color); padding:16px; border-radius:12px; font-size:0.9rem;">
          <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:10px; color:var(--text-dark);">🏟️ Proposed Arena Specs</h4>
          <p><strong>Turf Name:</strong> ${app.turfName}</p>
          <p><strong>City / Area:</strong> ${app.city} (${app.area || 'Metro'})</p>
          <p><strong>Base Rate:</strong> ₹${app.pricePerHour || 1200} / hour</p>
          <p><strong>Hours:</strong> ${app.openingTime || '06:00 AM'} - ${app.closingTime || '11:00 PM'}</p>
        </div>
      </div>

      ${app.rejectionReason ? `
        <div style="background:var(--danger-light); padding:12px 16px; border-radius:10px; margin-bottom:18px; border:1px solid #FECACA;">
          <strong style="color:var(--danger-color);">Rejection Reason on File:</strong><br>
          <span style="color:#7F1D1D; font-size:0.88rem;">${app.rejectionReason}</span>
        </div>
      ` : ''}
    `;

    let modalFooter = '';
    if (app.status === 'Pending') {
      modalFooter = `
        <button class="btn btn-danger" onclick="window.promptRejectApplication('${app.applicationId || app.id}')">Reject Application</button>
        <button class="btn btn-emerald" onclick="window.promptApproveApplication('${app.applicationId || app.id}')">Approve Owner Access ✓</button>
      `;
    } else if (app.status === 'Rejected') {
      modalFooter = `
        <button class="btn btn-emerald" onclick="window.promptApproveApplication('${app.applicationId || app.id}')">Re-Approve Partner</button>
        <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Close</button>
      `;
    } else {
      modalFooter = `
        <button class="btn btn-danger" onclick="window.suspendOwner('${app.applicationId || app.id}')">Suspend Account</button>
        <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Close</button>
      `;
    }

    PlaySlotApp.showModal(`Review Turf Partner Application`, modalContent, modalFooter);
  };

  // Action: Approve Application Flow (Section 7 & 8: OWNER != TURF)
  window.promptApproveApplication = (appId) => {
    const app = window.PlaySlotData.getOwnerApplicationById(appId);
    if (!app) return;

    if (confirm(`Approve partner application ${app.applicationId || app.id} for ${app.ownerName || app.name}? This will grant Owner Portal access.`)) {
      window.PlaySlotData.approveOwnerApplication(appId);
      PlaySlotApp.closeModal();
      PlaySlotApp.showToast(`Owner ${app.ownerName || app.name} approved successfully! Owner account is now active.`, 'success');
      renderApplications();
    }
  };

  // Action: Reject Application Flow with Reason Selection
  window.promptRejectApplication = (appId) => {
    const app = window.PlaySlotData.getOwnerApplicationById(appId);
    if (!app) return;

    const modalContent = `
      <p style="color:var(--text-body); font-size:0.95rem; margin-bottom:14px;">
        Please select the primary reason for rejecting <strong>${app.businessName || app.turfName}</strong> (${app.applicationId || app.id}):
      </p>

      <div class="form-group" style="margin-bottom:14px;">
        <label>Standard Rejection Category</label>
        <select id="rejectReasonCategory" class="form-select">
          <option value="Turf information and dimensions incomplete.">Turf information and dimensions incomplete</option>
          <option value="Uploaded photos do not clearly show the ground condition.">Uploaded photos do not clearly show ground condition</option>
          <option value="Floodlighting or player safety guidelines not met.">Floodlighting or player safety guidelines not met</option>
          <option value="Duplicate or invalid owner contact details.">Duplicate or invalid owner contact details</option>
          <option value="Other">Other custom feedback</option>
        </select>
      </div>

      <div class="form-group" style="margin-bottom:18px;">
        <label>Custom Notes for Applicant</label>
        <textarea id="rejectCustomNotes" class="form-textarea" rows="3" placeholder="Provide specific feedback on what the turf owner should fix..."></textarea>
      </div>
    `;

    const modalFooter = `
      <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="window.executeRejectApplication('${app.applicationId || app.id}')">Confirm Rejection</button>
    `;

    PlaySlotApp.showModal('Reject Partner Application', modalContent, modalFooter);
  };

  window.executeRejectApplication = (appId) => {
    const category = document.getElementById('rejectReasonCategory').value;
    const customNotes = document.getElementById('rejectCustomNotes').value.trim();
    const finalReason = customNotes ? `${category} Note: ${customNotes}` : category;

    window.PlaySlotData.rejectOwnerApplication(appId, finalReason);
    PlaySlotApp.closeModal();
    PlaySlotApp.showToast(`Application has been rejected.`, 'success');
    renderApplications();
  };

  window.suspendOwner = (appId) => {
    window.PlaySlotData.updateOwnerStatus(appId, 'Suspended', 'Suspended by platform administration');
    PlaySlotApp.closeModal();
    PlaySlotApp.showToast(`Owner account suspended.`, 'success');
    renderApplications();
  };

  renderApplications();
});
