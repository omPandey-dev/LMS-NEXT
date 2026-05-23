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
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text-soft)] transition-colors">
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
      <div className={`transition-all duration-300 ${isCollapsed ? 'min-[721px]:ml-14' : 'min-[721px]:ml-60'}`}>
        {/* Header - aligned with sidebar header */}
        <header className="sticky top-0 z-30 h-14 border-b border-[var(--app-border)] bg-[var(--app-shell)]/95 backdrop-blur-sm transition-colors">
          <div className="flex h-full items-center justify-between px-3 sm:px-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 text-[var(--app-muted)] transition-colors hover:bg-[var(--app-hover)] hover:text-[var(--app-text)] lg:hidden"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
              <h2 className="text-sm font-semibold text-[var(--app-text)]">LMS Console</h2>
            </div>
            <Link
              to="/home/profile"
              className="group flex items-center gap-2 px-2 py-1.5 transition-all hover:bg-[var(--app-hover)]"
            >
              <div className="flex h-7 w-7 items-center justify-center bg-[var(--app-accent)] text-white transition-transform group-hover:scale-105">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-xs font-medium text-[var(--app-text)] transition-colors group-hover:text-[var(--app-accent)]">
                  {user?.email}
                </p>
                <p className="text-[11px] capitalize text-[var(--app-muted)]">{user?.role}</p>
              </div>
              <span className="text-xs font-medium text-[var(--app-text)] sm:hidden">Profile</span>
            </Link>
          </div>
        </header>

        {/* Main content area */}
        <main className="min-h-[calc(100vh-56px)] bg-[var(--app-bg)] p-3 text-[var(--app-text-soft)] sm:p-4">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};
