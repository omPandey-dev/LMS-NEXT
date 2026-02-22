import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Settings as SettingsIcon } from 'lucide-react';

export const SettingsContent = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences.</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2 text-blue-600" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="text-lg font-semibold text-gray-900">{user?.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Role</p>
            <p className="text-lg font-semibold text-gray-900 capitalize">{user?.role || 'N/A'}</p>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              More settings will be available as additional APIs are implemented.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
