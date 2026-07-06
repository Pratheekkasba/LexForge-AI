import { createContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../config/firebase';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  sendPasswordReset,
  logOut,
  getAuthErrorMessage,
} from '../lib/auth';
import {
  createUserProfile,
  getUserProfile,
  updateUserLastLogin,
  createLogEntry,
  createOrganization,
} from '../lib/firestore';
import type { UserProfile } from '../types';
import toast from 'react-hot-toast';

// ─── Context Shape ──────────────────────────────────────
export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ───────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          // Try to load existing profile
          let profile = await getUserProfile(firebaseUser.uid);

          if (!profile) {
            // First-time sign-in (e.g., Google) — create profile
            profile = await createUserProfile(firebaseUser);
            try {
              const orgId = await createOrganization(
                (firebaseUser.displayName || 'My') + "'s Organization",
                firebaseUser.uid,
                firebaseUser.displayName || 'User',
                firebaseUser.email || ''
              );
              profile = { ...profile, organizationId: orgId, role: 'owner' };
            } catch (orgErr) {
              console.warn('Could not create org (likely rules):', orgErr);
              profile = { ...profile, organizationId: firebaseUser.uid, role: 'owner' };
            }
          } else if (!profile.organizationId) {
            // Fix for existing users without an organization
            try {
              const orgId = await createOrganization(
                (firebaseUser.displayName || 'My') + "'s Organization",
                firebaseUser.uid,
                firebaseUser.displayName || 'User',
                firebaseUser.email || ''
              );
              profile = { ...profile, organizationId: orgId, role: 'owner' };
            } catch (orgErr) {
              console.warn('Could not create org (likely rules):', orgErr);
              profile = { ...profile, organizationId: firebaseUser.uid, role: 'owner' };
            }
          } else {
            // Update last login timestamp
            await updateUserLastLogin(firebaseUser.uid);
          }

          setUserProfile(profile);
        } catch (err) {
          console.error('Failed to load user profile:', err);
          // Fallback so the user isn't totally blocked by bad rules
          setUserProfile({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Developer',
            email: firebaseUser.email || '',
            photo: firebaseUser.photoURL || '',
            role: 'owner',
            organizationId: firebaseUser.uid, // Use UID as fallback org ID
            createdAt: new Date(),
            lastLogin: new Date(),
            subscription: 'free',
            status: 'active'
          });
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ── Auth Actions ────────────────────────────────────
  const login = useCallback(async (email: string, password: string, remember = false) => {
    try {
      await signInWithEmail(email, password, remember);
      await createLogEntry(auth.currentUser?.uid ?? '', 'user.login', 'auth');
      toast.success('Welcome back!');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      const message = getAuthErrorMessage(code);
      toast.error(message);
      throw err;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    try {
      const newUser = await signUpWithEmail(email, password, name);
      await createUserProfile(newUser);
      await createOrganization(name + "'s Organization", newUser.uid, name, email);
      await createLogEntry(newUser.uid, 'user.register', 'auth');
      toast.success('Account created! Check your email for verification.');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      const message = getAuthErrorMessage(code);
      toast.error(message);
      throw err;
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google!');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      if (code !== 'auth/popup-closed-by-user') {
        toast.error(getAuthErrorMessage(code));
      }
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Clear React state immediately
      setUser(null);
      setUserProfile(null);

      if (auth.currentUser) {
        // Fire and forget log entry
        createLogEntry(auth.currentUser.uid, 'user.logout', 'auth').catch(e => {
          console.error('Failed to create log entry on logout', e);
        });
      }
      
      // Fire and forget sign out
      logOut().catch(e => console.error('Firebase signout error:', e));
      
      toast.success('Signed out successfully.');
      window.location.href = '/login';
    } catch {
      toast.error('Failed to sign out.');
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      await sendPasswordReset(email);
      toast.success('Password reset email sent!');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      toast.error(getAuthErrorMessage(code));
      throw err;
    }
  }, []);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
