/**
 * PLAYSlot Auth Service
 * Manages user, turf owner, and admin authentication and session state.
 */

const authService = (() => {
  function getCurrentUser() {
    const key = dataService.getKeys().CURRENT_USER;
    return dataService.get(key, null);
  }

  function setCurrentUser(user) {
    const key = dataService.getKeys().CURRENT_USER;
    if (user) {
      dataService.set(key, user);
    } else {
      localStorage.removeItem(key);
    }
    return user;
  }

  function logout() {
    setCurrentUser(null);
  }

  function loginUser(email) {
    const users = dataService.get(dataService.getKeys().USERS, []);
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      user = {
        id: 'user-' + Date.now(),
        name: email.split('@')[0].toUpperCase(),
        email,
        phone: '+91 98765 43210',
        role: 'user',
        city: 'Mumbai',
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        totalBookings: 0,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };
      users.push(user);
      dataService.set(dataService.getKeys().USERS, users);
    }

    setCurrentUser(user);
    return user;
  }

  function registerUser(userData) {
    const users = dataService.get(dataService.getKeys().USERS, []);
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      return existing;
    }

    const newUser = {
      id: 'user-' + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+91 98765 43210',
      role: 'user',
      city: userData.city || 'Mumbai',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      totalBookings: 0,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };

    users.push(newUser);
    dataService.set(dataService.getKeys().USERS, users);
    setCurrentUser(newUser);
    return newUser;
  }

  function loginAdmin(email, password) {
    const adminUser = {
      id: 'admin-1',
      name: 'Super Administrator',
      email: email || 'admin@playslot.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    setCurrentUser(adminUser);
    return adminUser;
  }

  return {
    getCurrentUser,
    setCurrentUser,
    logout,
    loginUser,
    registerUser,
    loginAdmin
  };
})();

if (typeof window !== 'undefined') {
  window.authService = authService;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { authService };
}
