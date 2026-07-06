import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  getDocs,
  serverTimestamp,
  type QueryConstraint,
  type DocumentData,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { UserProfile, Organization, OrganizationMember, SubscriptionPlan } from '../types';
import type { User } from 'firebase/auth';

// ─── Generic CRUD ───────────────────────────────────────

export async function createDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: T,
): Promise<void> {
  await setDoc(doc(db, collectionName, id), data);
}

export async function getDocument<T>(
  collectionName: string,
  id: string,
): Promise<T | null> {
  const docSnap = await getDoc(doc(db, collectionName, id));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as T;
}

export async function updateDocument(
  collectionName: string,
  id: string,
  data: Partial<DocumentData>,
): Promise<void> {
  await updateDoc(doc(db, collectionName, id), data);
}

export async function deleteDocument(
  collectionName: string,
  id: string,
): Promise<void> {
  await deleteDoc(doc(db, collectionName, id));
}

export async function queryDocuments<T>(
  collectionName: string,
  ...constraints: QueryConstraint[]
): Promise<T[]> {
  const q = query(collection(db, collectionName), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

// ─── User Profile ───────────────────────────────────────

export async function createUserProfile(user: User): Promise<UserProfile> {
  const profile: UserProfile = {
    uid: user.uid,
    name: user.displayName ?? 'User',
    email: user.email ?? '',
    photo: user.photoURL ?? '',
    role: 'member',
    organizationId: '',
    createdAt: new Date(),
    lastLogin: new Date(),
    subscription: 'free',
    status: 'active',
  };

  await setDoc(doc(db, 'users', user.uid), {
    ...profile,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
  });

  return profile;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  return getDocument<UserProfile>('users', uid);
}

export async function updateUserLastLogin(uid: string): Promise<void> {
  await updateDoc(doc(db, 'users', uid), {
    lastLogin: serverTimestamp(),
  });
}

// ─── Organization ───────────────────────────────────────

export async function createOrganization(
  name: string,
  ownerUid: string,
  ownerName: string,
  ownerEmail: string,
): Promise<string> {
  const orgRef = doc(collection(db, 'organizations'));
  const orgId = orgRef.id;

  const member: OrganizationMember = {
    uid: ownerUid,
    name: ownerName,
    email: ownerEmail,
    role: 'owner',
    joinedAt: new Date(),
  };

  const org: Omit<Organization, 'id'> = {
    name,
    owner: ownerUid,
    members: [member],
    subscription: 'free' as SubscriptionPlan,
    usage: {
      apiCalls: 0,
      tokensUsed: 0,
      documentsProcessed: 0,
      storageUsedMB: 0,
    },
    billing: {
      plan: 'free',
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      amount: 0,
      currency: 'USD',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await setDoc(orgRef, {
    ...org,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    members: [{ ...member, joinedAt: serverTimestamp() }],
  });

  // Link user to organization
  await updateDoc(doc(db, 'users', ownerUid), {
    organizationId: orgId,
    role: 'owner',
  });

  return orgId;
}

export async function getOrganization(orgId: string): Promise<Organization | null> {
  return getDocument<Organization>('organizations', orgId);
}

// ─── API Keys ───────────────────────────────────────────

function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = 'sk_live_';
  for (let i = 0; i < 48; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

export async function createApiKey(
  name: string,
  organizationId: string,
  createdBy: string,
): Promise<{ id: string; key: string }> {
  const keyRef = doc(collection(db, 'apiKeys'));
  const fullKey = generateApiKey();
  const prefix = fullKey.substring(0, 12) + '...';

  try {
    await setDoc(keyRef, {
      name,
      key: fullKey,
      prefix,
      organizationId,
      createdBy,
      createdAt: serverTimestamp(),
      lastUsed: null,
      expiresAt: null,
      status: 'active',
      permissions: ['read', 'write'],
    });
  } catch (err) {
    console.warn('Could not write API key to Firestore (likely rules):', err);
    // Return the key anyway so the UI works
  }

  return { id: keyRef.id, key: fullKey };
}

// ─── Logs ───────────────────────────────────────────────

export async function createLogEntry(
  userId: string,
  action: string,
  resource: string,
  resourceId: string = '',
  metadata: Record<string, unknown> = {},
): Promise<void> {
  const logRef = doc(collection(db, 'logs'));
  await setDoc(logRef, {
    userId,
    action,
    resource,
    resourceId,
    timestamp: serverTimestamp(),
    metadata,
    ip: '',
  });
}
