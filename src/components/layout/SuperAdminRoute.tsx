import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { storage } from '@/utils/storage';

interface SuperAdminRouteProps {
  children?: ReactNode;
}

export const SuperAdminRoute = ({ children }: SuperAdminRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const hasToken = !!storage.getToken();
  const role = user?.role || storage.getUserRole();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--app-bg)] text-[var(--app-text-soft)]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-[var(--app-accent)]"></div>
          <p className="mt-3 text-xs text-[var(--app-muted)]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasToken || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'SuperAdmin') {
    return <Navigate to="/home/dashboard" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
