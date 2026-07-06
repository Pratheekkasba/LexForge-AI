import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, browserSessionPersistence, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCaxtDxL3ZlBZvHPDXUo3Gn68-AM1hIeNo",
  authDomain: "lexforge-ai.firebaseapp.com",
  projectId: "lexforge-ai",
  storageBucket: "lexforge-ai.firebasestorage.app",
  messagingSenderId: "957986512481",
  appId: "1:957986512481:web:96b8e127adf6ddab59d420",
  measurementId: "G-X1GXEWNN1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics (only in browser)
export const initAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

// Auth persistence helpers
export const setRememberMe = async (remember: boolean) => {
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
};

export default app;
