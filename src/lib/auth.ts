import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { auth, setRememberMe } from '../config/firebase';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Sign in with email and password.
 * Optionally set persistence to localStorage (Remember Me).
 */
export async function signInWithEmail(
  email: string,
  password: string,
  remember: boolean = false,
): Promise<User> {
  await setRememberMe(remember);
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

/**
 * Create a new account with email and password.
 * Sets displayName and sends a verification email.
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  name: string,
): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: name });
  await sendEmailVerification(result.user);
  return result.user;
}

/**
 * Sign in with Google popup.
 */
export async function signInWithGoogle(): Promise<User> {
  await setRememberMe(true);
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Send a password reset email.
 */
export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Re-send verification email to the current user.
 */
export async function resendVerificationEmail(): Promise<void> {
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser);
  }
}

/**
 * Sign out the current user.
 */
export async function logOut(): Promise<void> {
  await signOut(auth);
}

/**
 * Map Firebase auth error codes to friendly messages.
 */
export function getAuthErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/popup-closed-by-user': 'Sign in was cancelled.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  };
  return messages[code] ?? 'An unexpected error occurred. Please try again.';
}
