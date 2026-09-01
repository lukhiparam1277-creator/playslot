import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: false
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        venues: resolve(__dirname, 'pages/venues.html'),
        venueDetails: resolve(__dirname, 'pages/venue-details.html'),
        booking: resolve(__dirname, 'pages/booking.html'),
        bookingSuccess: resolve(__dirname, 'pages/booking-success.html'),
        myBookings: resolve(__dirname, 'pages/my-bookings.html'),
        login: resolve(__dirname, 'pages/login.html'),
        register: resolve(__dirname, 'pages/register.html'),
        profile: resolve(__dirname, 'pages/profile.html'),
        ownerLogin: resolve(__dirname, 'owner/login.html'),
        ownerRegister: resolve(__dirname, 'owner/register.html'),
        ownerDashboard: resolve(__dirname, 'owner/dashboard.html'),
        ownerVenues: resolve(__dirname, 'owner/venues.html'),
        ownerAddVenue: resolve(__dirname, 'owner/add-venue.html'),
        ownerEditVenue: resolve(__dirname, 'owner/edit-venue.html'),
        ownerSlots: resolve(__dirname, 'owner/slots.html'),
        ownerBookings: resolve(__dirname, 'owner/bookings.html'),
        ownerRevenue: resolve(__dirname, 'owner/revenue.html'),
        ownerProfile: resolve(__dirname, 'owner/profile.html'),
        adminLogin: resolve(__dirname, 'admin/login.html'),
        adminDashboard: resolve(__dirname, 'admin/dashboard.html'),
        adminUsers: resolve(__dirname, 'admin/users.html'),
        adminOwners: resolve(__dirname, 'admin/owners.html'),
        adminVenues: resolve(__dirname, 'admin/venues.html'),
        adminSports: resolve(__dirname, 'admin/sports.html'),
        adminBookings: resolve(__dirname, 'admin/bookings.html'),
        adminPayments: resolve(__dirname, 'admin/payments.html'),
        adminSettings: resolve(__dirname, 'admin/settings.html')
      }
    }
  }
});
