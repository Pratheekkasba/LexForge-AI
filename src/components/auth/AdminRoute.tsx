import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { DashboardSkeleton } from '../ui/Skeleton';

export function AdminRoute() {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <DashboardSkeleton />
      </div>
    );
  }

  // User must be logged in and must be an 'owner' or 'admin' 
  // (In a real system, you might have a 'superadmin' role, but here we'll use 'owner' for platform admin)
  if (!user || userProfile?.role !== 'owner') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
