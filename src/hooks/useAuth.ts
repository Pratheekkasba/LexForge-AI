import { useContext } from 'react';
import { AuthContext, type AuthContextType } from '../contexts/AuthContext';

/**
 * Hook to consume the AuthContext.
 * Must be used within an `<AuthProvider>`.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
