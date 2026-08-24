/**
 * PlaySlot Admin Turf Owner Applications Review Engine
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

    const statusFilter = filterSelect ? filterSelect.value : 'All';
    const applications = window.PlaySlotData.getOwnerApplications(statusFilter);

    if (totalCountSpan) {
      totalCountSpan.textContent = applications.length;
    }

    if (applications.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding:40px 20px; color:var(--text-muted);">
            No partner applications found matching "${statusFilter}".
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = applications.map(app => `
      <tr>
        <td><strong style="color:var(--primary-color); font-family:var(--font-heading);">${app.applicationId}</strong></td>
        <td>
          <strong>${app.ownerName}</strong><br>
          <span style="font-size:0.78rem; color:var(--text-muted);">${app.email} • ${app.phone}</span>
        </td>
        <td>
          <strong>${app.turfName}</strong><br>
          <span style="font-size:0.78rem; color:var(--text-muted);">${app.turfType} Turf</span>
        </td>
        <td>${app.city} (${app.area})</td>
        <td><span class="badge badge-primary">🏆 ${(app.sports || []).join(', ')}</span></td>
        <td>${app.submittedDate}</td>
        <td>
          <span class="badge ${app.status === 'Approved' ? 'badge-success' : (app.status === 'Pending' ? 'badge-warning' : 'badge-danger')}">
            ${app.status}
          </span>
        </td>
        <td>
          <button onclick="window.openApplicationReview('${app.applicationId}')" class="btn btn-primary btn-sm" style="background:#8B5CF6;">
            Review Details ➔
          </button>
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
          <h3 style="font-size:1.3rem; font-weight:900; color:var(--primary-color);">${app.applicationId}</h3>
        </div>
        <span class="badge ${app.status === 'Approved' ? 'badge-success' : (app.status === 'Pending' ? 'badge-warning' : 'badge-danger')}" style="font-size:0.88rem; padding:6px 14px;">
          ${app.status}
        </span>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
        <!-- Left: Owner Specs -->
        <div style="background:var(--bg-color); padding:16px; border-radius:12px; font-size:0.9rem;">
          <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:10px; color:var(--text-dark);">👤 Owner Information</h4>
          <p><strong>Name:</strong> ${app.ownerName}</p>
          <p><strong>Email:</strong> ${app.email}</p>
          <p><strong>Mobile:</strong> ${app.phone}</p>
          <p><strong>Submitted Date:</strong> ${app.submittedDate}</p>
        </div>

        <!-- Right: Turf Specs -->
        <div style="background:var(--bg-color); padding:16px; border-radius:12px; font-size:0.9rem;">
          <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:10px; color:var(--text-dark);">🏟️ Arena Specifications</h4>
          <p><strong>Turf Name:</strong> ${app.turfName}</p>
          <p><strong>Address:</strong> ${app.turfAddress}, ${app.area}, ${app.city}</p>
          <p><strong>Type:</strong> ${app.turfType} | <strong>Rate:</strong> ₹${app.pricePerHour}/hr</p>
          <p><strong>Operating Hours:</strong> ${app.openingTime} - ${app.closingTime}</p>
        </div>
      </div>

      <!-- Description & Sports -->
      <div style="margin-bottom:18px;">
        <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:6px;">Supported Sports:</h4>
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px;">
          ${(app.sports || []).map(s => `<span class="badge badge-primary">${s}</span>`).join('')}
        </div>

        <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:6px;">Player Facilities:</h4>
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px;">
          ${(app.facilities || []).map(f => `<span class="badge badge-dark">${f}</span>`).join('')}
        </div>

        <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:6px;">Ground Description:</h4>
        <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.5;">${app.description}</p>
      </div>

      <!-- Images Preview -->
      <div style="margin-bottom:20px;">
        <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:8px;">Turf Ground Photo:</h4>
        <img src="${app.images[0]}" alt="${app.turfName}" style="width:100%; height:180px; object-fit:cover; border-radius:12px;">
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
        <button class="btn btn-danger" onclick="window.promptRejectApplication('${app.applicationId}')">Reject Application</button>
        <button class="btn btn-emerald" onclick="window.promptApproveApplication('${app.applicationId}')">Approve & Register Turf ✓</button>
      `;
    } else if (app.status === 'Rejected') {
      modalFooter = `
        <button class="btn btn-emerald" onclick="window.promptApproveApplication('${app.applicationId}')">Re-Approve Partner</button>
        <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Close</button>
      `;
    } else {
      modalFooter = `
        <span style="color:#059669; font-weight:700; align-self:center; margin-right:auto;">✓ Partner Active & Listed</span>
        <button class="btn btn-outline-dark" onclick="PlaySlotApp.closeModal()">Close</button>
      `;
    }

    PlaySlotApp.showModal(`Review Turf Partner Application`, modalContent, modalFooter);
  };

  // Action: Approve Application Flow
  window.promptApproveApplication = (appId) => {
    const app = window.PlaySlotData.getOwnerApplicationById(appId);
    if (!app) return;

    if (confirm(`Approve application ${app.applicationId} for ${app.ownerName} (${app.turfName})? This will grant Owner Login access and add the venue to the public directory.`)) {
      window.PlaySlotData.approveOwnerApplication(appId);
      PlaySlotApp.closeModal();
      PlaySlotApp.showToast(`Owner ${app.ownerName} approved successfully! Venue is now active.`, 'success');
      renderApplications();
    }
  };

  // Action: Reject Application Flow with Reason Selection
  window.promptRejectApplication = (appId) => {
    const app = window.PlaySlotData.getOwnerApplicationById(appId);
    if (!app) return;

    const modalContent = `
      <p style="color:var(--text-body); font-size:0.95rem; margin-bottom:14px;">
        Please select the primary reason for rejecting <strong>${app.turfName}</strong> (${app.applicationId}):
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
      <button class="btn btn-danger" onclick="window.executeRejectApplication('${app.applicationId}')">Confirm Rejection</button>
    `;

    PlaySlotApp.showModal('Reject Partner Application', modalContent, modalFooter);
  };

  window.executeRejectApplication = (appId) => {
    const category = document.getElementById('rejectReasonCategory').value;
    const customNotes = document.getElementById('rejectCustomNotes').value.trim();
    const finalReason = customNotes ? `${category} Note: ${customNotes}` : category;

    window.PlaySlotData.rejectOwnerApplication(appId, finalReason);
    PlaySlotApp.closeModal();
    PlaySlotApp.showToast(`Application ${appId} has been rejected.`, 'success');
    renderApplications();
  };

  renderApplications();
});
