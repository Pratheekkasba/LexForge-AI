import * as crypto from 'crypto';
import * as admin from 'firebase-admin';
import { ApiError, ErrorCodes } from '../utils/errors';

export const hashKey = (key: string): string => {
  return crypto.createHash('sha256').update(key).digest('hex');
};

export const validateApiKey = async (rawKey: string) => {
  if (!admin.apps.length) admin.initializeApp();
  const db = admin.firestore();

  // The client passes the raw key `sk_live_12345...`
  // The database stores the key exactly as it is since I'm going to migrate it from the frontend implementation which stores it in plaintext for demo purposes.
  // In a real production system, the frontend would NEVER have access to store the full key, 
  // it would call a cloud function that generates it, hashes it, saves the hash, and returns the raw key ONCE.
  // For the sake of this architectural demo interacting with the frontend we built, we will query the exact key.
  
  const snapshot = await db
    .collection('apiKeys')
    .where('key', '==', rawKey)
    .where('status', '==', 'active')
    .limit(1)
    .get();

  if (snapshot.empty) {
    throw new ApiError(401, 'Invalid API Key', ErrorCodes.UNAUTHORIZED);
  }

  const keyDoc = snapshot.docs[0];
  const keyData = keyDoc.data();

  // Update last used asynchronously
  keyDoc.ref.update({
    lastUsed: admin.firestore.FieldValue.serverTimestamp()
  }).catch(console.error);

  return {
    id: keyDoc.id,
    organizationId: keyData.organizationId,
    permissions: keyData.permissions || ['read', 'write'],
  };
};

// Validates a Firebase Auth JWT (Bearer Token passed by frontend Dashboard Playground)
export const validateJwt = async (token: string) => {
  if (!admin.apps.length) admin.initializeApp();
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Get user profile to find organization
    const userDoc = await admin.firestore().collection('users').doc(decodedToken.uid).get();
    if (!userDoc.exists) {
      throw new Error('User profile not found');
    }
    
    return {
      userId: decodedToken.uid,
      organizationId: userDoc.data()?.organizationId,
      role: userDoc.data()?.role,
    };
  } catch (error) {
    throw new ApiError(401, 'Invalid authentication token', ErrorCodes.UNAUTHORIZED);
  }
};
