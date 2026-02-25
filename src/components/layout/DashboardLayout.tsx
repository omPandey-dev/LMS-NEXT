import { ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <Sidebar userRole={user?.role} onLogout={handleLogout} />

      <div className="ml-72 min-h-screen">
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white px-6 py-4 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Welcome back</h2>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                <User className="h-5 w-5" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{user?.email}</p>
                <p className="text-xs capitalize text-gray-500 dark:text-gray-400">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
};
