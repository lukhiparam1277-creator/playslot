/**
 * PlaySlot Turf Owner Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.PlaySlotData) return;

  const form = document.getElementById('ownerApplicationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const ownerName = document.getElementById('appOwnerName').value.trim();
    const email = document.getElementById('appEmail').value.trim();
    const phone = document.getElementById('appPhone').value.trim();
    const turfName = document.getElementById('appTurfName').value.trim();
    const turfAddress = document.getElementById('appAddress').value.trim();
    const city = document.getElementById('appCity').value;
    const area = document.getElementById('appArea').value.trim();
    const turfType = document.getElementById('appTurfType').value;

    const selectedSports = Array.from(document.querySelectorAll('input[name="sport"]:checked')).map(cb => cb.value);
    if (selectedSports.length === 0) {
      PlaySlotApp.showToast('Please select at least one sport for your turf.', 'error');
      return;
    }

    const pricePerHour = document.getElementById('appPrice').value;
    const openingTime = document.getElementById('appOpen').value.trim();
    const closingTime = document.getElementById('appClose').value.trim();
    const description = document.getElementById('appDesc').value.trim();
    const imageUrl = document.getElementById('appImage').value.trim() || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80';

    const selectedFacilities = Array.from(document.querySelectorAll('input[name="facility"]:checked')).map(cb => cb.value);

    const application = window.PlaySlotData.submitOwnerApplication({
      ownerName,
      email,
      phone,
      turfName,
      turfAddress,
      city,
      area,
      turfType,
      sports: selectedSports,
      pricePerHour,
      openingTime,
      closingTime,
      description,
      images: [imageUrl],
      facilities: selectedFacilities
    });

    PlaySlotApp.showToast('Application submitted successfully!', 'success');

    setTimeout(() => {
      window.location.href = `/owner/status?appId=${application.applicationId}&submitted=1`;
    }, 500);
  });
});
