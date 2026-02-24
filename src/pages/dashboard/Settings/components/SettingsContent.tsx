import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Settings as SettingsIcon } from 'lucide-react';

export const SettingsContent = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your account settings and preferences.</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <SettingsIcon className="mr-2 h-5 w-5 text-blue-600" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">Email</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{user?.email || 'N/A'}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">Role</p>
            <p className="text-lg font-semibold capitalize text-gray-900 dark:text-gray-100">{user?.role || 'N/A'}</p>
          </div>
          <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              More settings will be available as additional APIs are implemented.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
