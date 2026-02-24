import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, Moon, Settings, Sun, User } from 'lucide-react';
import sidebarMenu from '@/data/sidebarMenu.json';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/components/theme-context';

interface SidebarProps {
  userRole?: string;
  onLogout: () => void;
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

export default function Sidebar({ userRole, onLogout }: SidebarProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const allowedItems = (sidebarMenu as SidebarItem[]).filter(
    (item) => !item.roles || (!!userRole && item.roles.includes(userRole)),
  );

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-gray-200 bg-white text-gray-900 transition-colors dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
      <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
        <h1 className="text-xl font-bold">LMS Next</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {allowedItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-gray-200 p-4 dark:border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
