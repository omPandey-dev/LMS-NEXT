import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EditProfileModal } from './EditProfileModal';
import { User, Mail, Shield, Edit2 } from 'lucide-react';

export const ProfileContent = () => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">Profile</h1>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            View and manage your profile information
          </p>
        </div>
        <Button onClick={() => setIsEditModalOpen(true)} size="md" className="w-full sm:w-auto">
          <Edit2 className="mr-2 h-3.5 w-3.5" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="border-0 shadow-lg p-4 sm:p-5">
        <CardHeader className="mb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-4 w-4 text-blue-600" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <div className="space-y-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-700 sm:flex-row">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-xl font-bold text-white shadow-lg sm:h-20 sm:w-20">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {user?.email?.split('@')[0] || 'User'}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'N/A'}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Email */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 flex-shrink-0">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Email Address
                </p>
                <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {user?.email || 'N/A'}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 flex-shrink-0">
                <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Role
                </p>
                <p className="mt-0.5 text-sm font-medium capitalize text-gray-900 dark:text-gray-100">
                  {user?.role || 'N/A'}
                </p>
              </div>
            </div>

            {/* User ID */}
            {user?.userId && (
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 flex-shrink-0">
                  <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    User ID
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {user.userId}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Account Settings Card */}
      <Card className="border-0 shadow-lg p-4 sm:p-5">
        <CardHeader className="mb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-4 w-4 text-blue-600" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Account Status</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Your account is active</p>
            </div>
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Active
            </span>
          </div>
        </div>
      </Card>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </div>
  );
};
