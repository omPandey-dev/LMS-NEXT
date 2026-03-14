import { ReactNode, useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleSidebarClose = () => {
      setSidebarOpen(false);
    };
    window.addEventListener('sidebar-close', handleSidebarClose);
    return () => {
      window.removeEventListener('sidebar-close', handleSidebarClose);
    };
  }, []);

  // Reset collapse state on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 720) {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Check on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-slate-0 via-blue-100/60 to-purple-50/30 text-slate-800 transition-colors dark:bg-gray-950 dark:text-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform min-[721px]:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar 
          userRole={user?.role} 
          onLogout={handleLogout}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'min-[721px]:ml-16' : 'min-[721px]:ml-72'}`}>
        {/* Header - aligned with sidebar header */}
        <header className="sticky top-0 z-30 h-[73px] border-b border-blue-100/60 bg-white/80 backdrop-blur-sm shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900">
          <div className="flex h-full items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg p-2 text-slate-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden transition-colors"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <h2 className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:text-gray-100 sm:text-lg">Welcome back</h2>
            </div>
            <Link
              to="/home/profile"
              className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-blue-50/80 dark:hover:bg-gray-800 group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-md transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-slate-700 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {user?.email}
                </p>
                <p className="text-xs capitalize text-slate-500 dark:text-gray-400">{user?.role}</p>
              </div>
              <span className="sm:hidden text-sm font-medium text-slate-700 dark:text-gray-100">Profile</span>
            </Link>
          </div>
        </header>

        {/* Main content area */}
        <main className="p-4 sm:p-6 text-slate-800 dark:text-gray-100 min-h-[calc(100vh-73px)] dark-outlet-gradient">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};
