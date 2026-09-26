import React, { createContext, useContext, useState, useEffect } from 'react';
import storageService, { STORAGE_KEYS } from '../services/storageService';
import { defaultOwners, defaultUsers } from '../data/initialData';

const AuthContext = createContext(null);
const STORAGE_KEY_AUTH = 'playslot_current_session';

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Auth initial parse error:', e);
    }
    // Default active user session for smooth customer testing
    return {
      id: 'user-1',
      uid: 'user-1',
      name: 'Rahul Sharma',
      email: 'user@playslot.com',
      phone: '+91 98765 43210',
      role: 'user', // 'user' | 'turf_owner' | 'admin'
      city: 'Mumbai',
      status: 'Active',
      joinedDate: '2026-01-12',
      totalBookings: 1,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };
  });

  // Sync to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    }
  }, [currentUser]);

  const login = async (email, password = 'password', requestedRole = '') => {
    setLoading(true);
    try {
      const cleanEmail = (email || '').trim().toLowerCase();

      // 1. Admin login
      if (requestedRole === 'admin' || cleanEmail.includes('admin')) {
        const adminUser = {
          id: 'admin-1',
          uid: 'admin-1',
          name: 'Super Administrator',
          email: cleanEmail || 'admin@playslot.com',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        };
        setCurrentUser(adminUser);
        return { success: true, user: adminUser };
      }

      // 2. Owner login
      if (requestedRole === 'turf_owner' || requestedRole === 'owner' || cleanEmail.includes('owner')) {
        const owners = storageService.get(STORAGE_KEYS.OWNERS, defaultOwners);
        const owner = owners.find(o => o.email?.toLowerCase() === cleanEmail) || owners[0];

        if (owner && (owner.status === 'PENDING' || owner.status === 'Pending')) {
          return {
            success: false,
            pending: true,
            status: 'PENDING',
            message: 'Your owner account has been submitted and is currently pending Admin approval.'
          };
        }

        if (owner && (owner.status === 'REJECTED' || owner.status === 'SUSPENDED')) {
          return {
            success: false,
            status: owner.status,
            message: `Your owner account has been ${owner.status.toLowerCase()}. Please contact platform support.`
          };
        }

        const ownerUser = {
          id: owner ? owner.id : 'owner-1',
          uid: owner ? owner.id : 'owner-1',
          name: owner ? owner.name : 'Vikram Malhotra',
          businessName: owner ? owner.businessName : 'Thunderbolt Sports Infra LLP',
          email: owner ? owner.email : cleanEmail,
          phone: owner ? owner.phone : '+91 98201 23456',
          city: owner ? owner.city : 'Mumbai',
          role: 'turf_owner',
          status: owner ? owner.status : 'APPROVED',
          avatar: owner ? owner.avatar : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        };

        setCurrentUser(ownerUser);
        return { success: true, user: ownerUser };
      }

      // 3. User login
      const users = storageService.get(STORAGE_KEYS.USERS, defaultUsers);
      const existingUser = users.find(u => u.email?.toLowerCase() === cleanEmail);

      const userObj = {
        id: existingUser ? existingUser.id : ('user-' + Date.now()),
        uid: existingUser ? existingUser.id : ('user-' + Date.now()),
        name: existingUser ? existingUser.name : (cleanEmail ? cleanEmail.split('@')[0].toUpperCase() : 'Rahul Sharma'),
        email: cleanEmail || 'user@playslot.com',
        phone: existingUser ? existingUser.phone : '+91 98765 43210',
        role: 'user',
        city: existingUser ? existingUser.city : 'Mumbai',
        status: existingUser ? existingUser.status : 'Active',
        joinedDate: existingUser ? existingUser.joinedDate : new Date().toISOString().split('T')[0],
        totalBookings: existingUser ? existingUser.totalBookings : 0,
        avatar: existingUser ? existingUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };

      setCurrentUser(userObj);
      return { success: true, user: userObj };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const newUser = {
        id: 'user-' + Date.now(),
        uid: 'user-' + Date.now(),
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

      // Add to users list
      const users = storageService.get(STORAGE_KEYS.USERS, defaultUsers);
      storageService.set(STORAGE_KEYS.USERS, [newUser, ...users]);

      setCurrentUser(newUser);
      return { success: true, user: newUser };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        user: currentUser, // Alias for backward compatibility
        loading,
        login,
        register,
        logout
      }}
    >
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

export default AuthContext;
