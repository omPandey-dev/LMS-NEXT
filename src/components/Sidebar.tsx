
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
      className={`relative flex h-screen flex-col border-r border-[var(--app-border)] bg-[var(--app-shell)] text-[var(--app-text-soft)] transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-14' : 'w-60'
      }`}
    >
      {/* Header - aligned with main header */}
      <div className={`flex h-14 items-center border-b border-[var(--app-border)] bg-[var(--app-shell)] transition-all duration-300 ${
        isCollapsed ? 'justify-center px-0' : 'justify-between px-3'
      }`}>
        {/* Brand */}
        {!isCollapsed ? (
          <div className="flex flex-1 items-center gap-2">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center bg-[var(--app-accent)]">
              <span className="text-xs font-bold text-white">L</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-[var(--app-text)]">LMS Next</h1>
              <p className="text-[11px] text-[var(--app-muted)]">Admin</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="flex h-7 w-7 items-center justify-center bg-[var(--app-accent)]">
              <span className="text-xs font-bold text-white">L</span>
            </div>
          </div>
        )}

        {/* Collapse / Expand toggle (desktop only) */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className={`hidden h-6 w-6 flex-shrink-0 items-center justify-center text-[var(--app-muted)] transition-colors hover:bg-[var(--app-hover)] hover:text-[var(--app-text)] min-[721px]:flex ${
              isCollapsed ? 'absolute right-2' : ''
            }`}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      <nav className={`flex-1 space-y-0.5 overflow-y-auto transition-all duration-300 ${
        isCollapsed ? 'p-1.5' : 'p-2.5'
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
                className={`group relative flex items-center gap-2.5 text-xs transition-all ${
                  isCollapsed 
                    ? 'justify-center px-2 py-2' 
                    : 'px-3 py-2'
                } ${
                  isActive
                    ? 'bg-[var(--app-accent)] text-white shadow-md'
                    : 'text-[var(--app-text-soft)] hover:bg-[var(--app-hover)] hover:text-[var(--app-text)]'
                }`}
              >
                <Icon className={`flex-shrink-0 ${
                  isCollapsed ? 'h-4 w-4' : 'h-3.5 w-3.5'
                }`} />
                {!isCollapsed && (
                  <span className="truncate font-medium">{item.label}</span>
                )}
              </Link>
              {/* Tooltip card for collapsed state */}
              {isCollapsed && hoveredItem === item.path && (
                <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap border border-[var(--app-border)] bg-[var(--app-panel)] px-3 py-2 text-sm font-medium text-[var(--app-text)] shadow-lg">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className={`space-y-0.5 border-t border-[var(--app-border)] transition-all duration-300 ${
        isCollapsed ? 'p-1.5' : 'p-2.5'
      }`}>
        <div className="relative">
          <Button
            variant="ghost"
            className={`w-full text-[var(--app-text-soft)] transition-colors hover:bg-[var(--app-hover)] hover:text-[var(--app-text)] ${
              isCollapsed ? 'justify-center px-2 py-2' : 'justify-start px-3 py-2 text-xs'
            }`}
            onClick={toggleTheme}
            onMouseEnter={() => isCollapsed && setHoveredItem('theme')}
            onMouseLeave={() => isCollapsed && setHoveredItem(null)}
            title={isCollapsed ? `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme` : ''}
          >
            {theme === 'light' ? (
              <Moon className={`flex-shrink-0 ${isCollapsed ? 'h-4 w-4' : 'h-3.5 w-3.5'}`} />
            ) : (
              <Sun className={`flex-shrink-0 ${isCollapsed ? 'h-4 w-4' : 'h-3.5 w-3.5'}`} />
            )}
            {!isCollapsed && (
              <>
                <span className="ml-2 hidden sm:inline font-medium">Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme</span>
                <span className="ml-2 sm:hidden font-medium">{theme === 'light' ? 'Dark' : 'Light'}</span>
              </>
            )}
          </Button>
          {isCollapsed && hoveredItem === 'theme' && (
            <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap border border-[var(--app-border)] bg-[var(--app-panel)] px-3 py-2 text-sm font-medium text-[var(--app-text)] shadow-lg">
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </div>
          )}
        </div>
        <div className="relative">
          <Button
            variant="ghost"
            className={`w-full text-[var(--app-danger)] transition-colors hover:bg-rose-500/10 ${
              isCollapsed ? 'justify-center px-2 py-2' : 'justify-start px-3 py-2 text-xs'
            }`}
            onClick={onLogout}
            onMouseEnter={() => isCollapsed && setHoveredItem('logout')}
            onMouseLeave={() => isCollapsed && setHoveredItem(null)}
            title={isCollapsed ? 'Logout' : ''}
          >
            <LogOut className={`flex-shrink-0 ${isCollapsed ? 'h-4 w-4' : 'h-3.5 w-3.5'}`} />
            {!isCollapsed && <span className="ml-2 font-medium">Logout</span>}
          </Button>
          {isCollapsed && hoveredItem === 'logout' && (
            <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap border border-[var(--app-border)] bg-[var(--app-panel)] px-3 py-2 text-sm font-medium text-[var(--app-text)] shadow-lg">
              Logout
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
