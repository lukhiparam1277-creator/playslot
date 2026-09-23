import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY_AUTH = 'playslot_react_user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return {
      id: 'user-1',
      name: 'Rahul Sharma',
      email: 'user@playslot.com',
      phone: '+91 98765 43210',
      role: 'user', // 'user' | 'turf_owner' | 'admin'
      city: 'Mumbai',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    }
  }, [currentUser]);

  const login = (email, role = 'user', name = '') => {
    let userObj;
    if (role === 'admin') {
      userObj = {
        id: 'admin-1',
        name: 'Super Administrator',
        email: email || 'admin@playslot.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      };
    } else if (role === 'turf_owner') {
      userObj = {
        id: 'owner-1',
        name: name || 'Vikram Malhotra',
        email: email || 'owner@playslot.com',
        phone: '+91 98201 23456',
        role: 'turf_owner',
        city: 'Mumbai',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      };
    } else {
      userObj = {
        id: 'user-' + Date.now(),
        name: name || (email.split('@')[0].toUpperCase()),
        email: email || 'user@playslot.com',
        phone: '+91 98765 43210',
        role: 'user',
        city: 'Mumbai',
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        totalBookings: 2,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };
    }
    setCurrentUser(userObj);
    return userObj;
  };

  const register = (userData) => {
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
    setCurrentUser(newUser);
    return newUser;
  };

  const switchRole = (newRole) => {
    if (newRole === 'admin') {
      login('admin@playslot.com', 'admin');
    } else if (newRole === 'turf_owner') {
      login('owner@playslot.com', 'turf_owner');
    } else {
      login('user@playslot.com', 'user', 'Rahul Sharma');
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
