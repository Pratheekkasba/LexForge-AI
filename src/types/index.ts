// ─── User ───────────────────────────────────────────────
export type UserRole = 'admin' | 'owner' | 'developer' | 'member';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';
export type SubscriptionPlan = 'free' | 'starter' | 'professional' | 'enterprise';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photo: string;
  role: UserRole;
  organizationId: string;
  createdAt: Date;
  lastLogin: Date;
  subscription: SubscriptionPlan;
  status: UserStatus;
}

// ─── Organization ───────────────────────────────────────
export interface OrganizationMember {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  joinedAt: Date;
}

export interface OrganizationUsage {
  apiCalls: number;
  tokensUsed: number;
  documentsProcessed: number;
  storageUsedMB: number;
}

export interface OrganizationBilling {
  plan: SubscriptionPlan;
  status: 'active' | 'past_due' | 'canceled';
  currentPeriodEnd: Date;
  amount: number;
  currency: string;
}

export interface Organization {
  id: string;
  name: string;
  owner: string;
  members: OrganizationMember[];
  subscription: SubscriptionPlan;
  usage: OrganizationUsage;
  billing: OrganizationBilling;
  createdAt: Date;
  updatedAt: Date;
}

// ─── API Key ────────────────────────────────────────────
export type ApiKeyStatus = 'active' | 'revoked' | 'expired';

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  prefix: string;
  organizationId: string;
  createdBy: string;
  createdAt: Date;
  lastUsed: Date | null;
  expiresAt: Date | null;
  status: ApiKeyStatus;
  permissions: string[];
}

// ─── Project ────────────────────────────────────────────
export type ProjectStatus = 'active' | 'archived' | 'paused';

export interface Project {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  createdBy: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Usage ──────────────────────────────────────────────
export interface UsageRecord {
  id: string;
  organizationId: string;
  date: Date;
  apiCalls: number;
  tokensUsed: number;
  documentsProcessed: number;
  latencyMs: number;
}

// ─── Billing ────────────────────────────────────────────
export type BillingStatus = 'paid' | 'pending' | 'overdue' | 'canceled';

export interface BillingRecord {
  id: string;
  organizationId: string;
  plan: SubscriptionPlan;
  amount: number;
  currency: string;
  status: BillingStatus;
  invoiceDate: Date;
  paidAt: Date | null;
  invoiceUrl: string;
}

// ─── Logs ───────────────────────────────────────────────
export type LogAction =
  | 'user.login'
  | 'user.logout'
  | 'user.register'
  | 'api_key.created'
  | 'api_key.revoked'
  | 'org.member_added'
  | 'org.member_removed'
  | 'org.settings_updated'
  | 'project.created'
  | 'project.archived'
  | 'api.request';

export interface LogEntry {
  id: string;
  userId: string;
  action: LogAction;
  resource: string;
  resourceId: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
  ip: string;
}

// ─── Notification ───────────────────────────────────────
export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  link?: string;
}

// ─── Auth ───────────────────────────────────────────────
export interface AuthState {
  user: import('firebase/auth').User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}
