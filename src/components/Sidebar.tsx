
  import { Link, useLocation } from 'react-router-dom';
  import { useState } from 'react';
  import { LayoutDashboard, LogOut, Moon, Settings, Sun, User, ChevronLeft, ChevronRight } from 'lucide-react';
  import sidebarMenu from '@/data/sidebarMenu.json';
  import { Button } from '@/components/ui/Button';
  import { useTheme } from '@/components/theme-context';
   
  interface SidebarProps {
    userRole?: string;
    onLogout: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
  }
   

type IconName = 'LayoutDashboard' | 'Settings' | 'User';

type SidebarItem = {
  path: string;
  label: string;
  icon: IconName;
  roles?: string[];
};

const iconMap = {
  LayoutDashboard,
  Settings,
  User,
};

export default function Sidebar({ userRole, onLogout, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const allowedItems = (sidebarMenu as SidebarItem[]).filter(
    (item) => !item.roles || (!!userRole && item.roles.includes(userRole)),
  );

  return (
    <aside 
      className={`flex h-screen flex-col border-r border-blue-100/60 bg-white/95 backdrop-blur-sm text-slate-800 transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 ${
        isCollapsed ? 'w-16' : 'w-72'
      } relative`}
    >
      {/* Header - aligned with main header */}
      <div className={`h-[73px] border-b border-blue-100/60  dark:border-gray-700 dark:bg-gray-900 flex items-center transition-all duration-300 ${
        isCollapsed ? 'justify-center px-0' : 'justify-between px-4 sm:px-6'
      }`}>
        {/* Brand */}
        {!isCollapsed ? (
          <div className="flex items-center gap-3 flex-1">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:text-gray-100 sm:text-xl">LMS Next</h1>
              <p className="text-xs text-slate-500 dark:text-gray-400">Admin Panel</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
          </div>
        )}

        {/* Collapse / Expand toggle (desktop only) */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className={`hidden min-[721px]:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-blue-100/60 dark:hover:bg-gray-800 transition-colors flex-shrink-0 ${
              isCollapsed ? 'absolute right-2' : ''
            }`}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-slate-600 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-gray-400" />
            )}
          </button>
        )}
      </div>

      <nav className={`flex-1 space-y-1 overflow-y-auto transition-all duration-300 ${
        isCollapsed ? 'p-2' : 'p-3 sm:p-4'
      }`}>
        {allowedItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

          return (
            <div key={item.path} className="relative">
              <Link
                to={item.path}
                onClick={() => {
                  // Close sidebar on mobile when navigating
                  if (window.innerWidth < 1024) {
                    // Small delay to allow navigation
                    setTimeout(() => {
                      const event = new Event('sidebar-close');
                      window.dispatchEvent(event);
                    }, 100);
                  }
                }}
                onMouseEnter={() => isCollapsed && setHoveredItem(item.path)}
                onMouseLeave={() => isCollapsed && setHoveredItem(null)}
                className={`flex items-center gap-3 rounded-lg text-sm transition-all group relative ${
                  isCollapsed 
                    ? 'justify-center px-2 py-2.5' 
                    : 'px-3 py-2.5 sm:px-4'
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'text-slate-700 hover:bg-blue-50/60 dark:text-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className={`flex-shrink-0 ${
                  isCollapsed ? 'h-5 w-5' : 'h-4 w-4'
                }`} />
                {!isCollapsed && (
                  <span className="truncate font-medium">{item.label}</span>
                )}
              </Link>
              {/* Tooltip card for collapsed state */}
              {isCollapsed && hoveredItem === item.path && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className={`space-y-1 border-t border-blue-100/60 dark:border-gray-700 transition-all duration-300 ${
        isCollapsed ? 'p-2' : 'p-3 sm:p-4'
      }`}>
        <div className="relative">
          <Button
            variant="ghost"
            className={`w-full text-slate-700 hover:bg-purple-50/60 dark:text-gray-100 dark:hover:bg-gray-800 transition-colors ${
              isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-start px-3 py-2.5 sm:px-4'
            }`}
            onClick={toggleTheme}
            onMouseEnter={() => isCollapsed && setHoveredItem('theme')}
            onMouseLeave={() => isCollapsed && setHoveredItem(null)}
            title={isCollapsed ? `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme` : ''}
          >
            {theme === 'light' ? (
              <Moon className={`flex-shrink-0 ${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'}`} />
            ) : (
              <Sun className={`flex-shrink-0 ${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'}`} />
            )}
            {!isCollapsed && (
              <>
                <span className="ml-2 hidden sm:inline font-medium">Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme</span>
                <span className="ml-2 sm:hidden font-medium">{theme === 'light' ? 'Dark' : 'Light'}</span>
              </>
            )}
          </Button>
          {isCollapsed && hoveredItem === 'theme' && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 whitespace-nowrap pointer-events-none">
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </div>
          )}
        </div>
        <div className="relative">
          <Button
            variant="ghost"
            className={`w-full text-rose-500 hover:bg-rose-50 dark:text-red-400 dark:hover:bg-red-950/40 transition-colors ${
              isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-start px-3 py-2.5 sm:px-4'
            }`}
            onClick={onLogout}
            onMouseEnter={() => isCollapsed && setHoveredItem('logout')}
            onMouseLeave={() => isCollapsed && setHoveredItem(null)}
            title={isCollapsed ? 'Logout' : ''}
          >
            <LogOut className={`flex-shrink-0 ${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'}`} />
            {!isCollapsed && <span className="ml-2 font-medium">Logout</span>}
          </Button>
          {isCollapsed && hoveredItem === 'logout' && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 whitespace-nowrap pointer-events-none">
              Logout
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
