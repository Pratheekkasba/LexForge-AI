import { useAuth } from './useAuth';
import { useFirestoreDoc } from './useFirestore';
import type { Organization } from '../types';

/**
 * Fetch the current user's organization.
 */
export function useOrganization() {
  const { userProfile } = useAuth();
  const orgId = userProfile?.organizationId;

  const { data, isLoading, error, refetch } = useFirestoreDoc<Organization>(
    'organizations',
    orgId || undefined,
  );

  return {
    organization: data ?? null,
    isLoading,
    error,
    refetch,
    hasOrganization: !!orgId,
  };
}
