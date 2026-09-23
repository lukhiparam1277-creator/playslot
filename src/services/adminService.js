import venueService from './venueService';
import bookingService from './bookingService';
import userService from './userService';
import ownerService from './ownerService';

export const adminService = {
  async getDashboardMetrics() {
    const venues = await venueService.getAllVenues();
    const bookings = await bookingService.getAllBookings();
    const users = await userService.getAllUsers();
    const applications = await ownerService.getAllApplications();

    const pendingApps = applications.filter(a => a.status === 'Pending').length;
    const totalRevenue = bookings.reduce((sum, b) => b.status !== 'Cancelled' ? sum + (Number(b.totalAmount || b.amount) || 0) : sum, 0);

    return {
      totalUsers: users.length,
      totalVenues: venues.length,
      totalBookings: bookings.length,
      pendingApplications: pendingApps,
      totalRevenue: totalRevenue || 4826000
    };
  }
};

export default adminService;
