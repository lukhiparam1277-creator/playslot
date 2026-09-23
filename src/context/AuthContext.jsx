import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loginWithFirebase,
  registerWithFirebase,
  logoutFromFirebase,
  subscribeToAuthState
} from '../firebase/auth';
import { isFirebaseConfigured } from '../firebase/config';

const AuthContext = createContext(null);
const STORAGE_KEY_AUTH = 'playslot_react_user';

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Auth initial parse error:', e);
    }
    // Default active athlete profile for smooth demo interaction
    return {
      id: 'user-1',
      uid: 'user-1',
      name: 'Rahul Sharma',
      email: 'user@playslot.com',
      phone: '+91 98765 43210',
      role: 'user', // 'user' | 'turf_owner' | 'admin'
      city: 'Mumbai',
      status: 'Active',
      joinedDate: '2025-01-15',
      totalBookings: 2,
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

  // Subscribe to Firebase Auth state if configured
  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    const unsubscribe = subscribeToAuthState((firebaseUser) => {
      if (firebaseUser) {
        // Resolve role based on email or custom claims
        let role = 'user';
        if (firebaseUser.email?.includes('admin')) role = 'admin';
        else if (firebaseUser.email?.includes('owner')) role = 'turf_owner';

        setCurrentUser(prev => ({
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'User'),
          email: firebaseUser.email,
          role,
          avatar: firebaseUser.photoURL || prev?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          city: prev?.city || 'Mumbai'
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, role = 'user', name = '', password = 'password123') => {
    setLoading(true);
    try {
      if (isFirebaseConfigured()) {
        try {
          await loginWithFirebase(email, password);
        } catch (fbErr) {
          console.warn('[Firebase Auth] Fallback to client session:', fbErr.message);
        }
      }

      let userObj;
      if (role === 'admin' || email.includes('admin')) {
        userObj = {
          id: 'admin-1',
          uid: 'admin-1',
          name: 'Super Administrator',
          email: email || 'admin@playslot.com',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        };
      } else if (role === 'turf_owner' || email.includes('owner')) {
        userObj = {
          id: 'owner-1',
          uid: 'owner-1',
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
          uid: 'user-' + Date.now(),
          name: name || (email ? email.split('@')[0].toUpperCase() : 'Rahul Sharma'),
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
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      if (isFirebaseConfigured()) {
        try {
          await registerWithFirebase(userData.email, userData.password || 'password123', userData.name);
        } catch (fbErr) {
          console.warn('[Firebase Auth] Fallback to client registration:', fbErr.message);
        }
      }

      const newUser = {
        id: 'user-' + Date.now(),
        uid: 'user-' + Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '+91 98765 43210',
        role: userData.role || 'user',
        city: userData.city || 'Mumbai',
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        totalBookings: 0,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };

      setCurrentUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
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

  const logout = async () => {
    setLoading(true);
    try {
      await logoutFromFirebase();
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
        logout,
        switchRole
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
