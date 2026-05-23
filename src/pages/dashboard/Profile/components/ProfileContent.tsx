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
    <div className="space-y-4 text-sm text-[var(--app-text-soft)]">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-[var(--app-text)]">Profile</h1>
          <p className="mt-1 text-xs text-[var(--app-muted)]">
            View and manage your profile information
          </p>
        </div>
        <Button onClick={() => setIsEditModalOpen(true)} size="md" className="w-full sm:w-auto">
          <Edit2 className="mr-2 h-3.5 w-3.5" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader className="mb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-4 w-4 text-[var(--app-accent)]" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <div className="space-y-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3 border-b border-[var(--app-border)] pb-4 sm:flex-row">
            <div className="flex h-14 w-14 items-center justify-center bg-[var(--app-accent)] text-lg font-semibold text-white sm:h-16 sm:w-16">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-sm font-semibold text-[var(--app-text)]">
                {user?.email?.split('@')[0] || 'User'}
              </h2>
              <p className="text-xs text-[var(--app-muted)]">{user?.email || 'N/A'}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Email */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-[var(--app-accent-soft)]">
                <Mail className="h-4 w-4 text-[var(--app-accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--app-muted)]">
                  Email Address
                </p>
                <p className="mt-0.5 truncate text-sm font-medium text-[var(--app-text)]">
                  {user?.email || 'N/A'}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-[var(--app-accent-soft)]">
                <Shield className="h-4 w-4 text-[var(--app-accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--app-muted)]">
                  Role
                </p>
                <p className="mt-0.5 text-sm font-medium capitalize text-[var(--app-text)]">
                  {user?.role || 'N/A'}
                </p>
              </div>
            </div>

            {/* User ID */}
            {user?.userId && (
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-[var(--app-accent-soft)]">
                  <User className="h-4 w-4 text-[var(--app-accent)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--app-muted)]">
                    User ID
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-[var(--app-text)]">
                    {user.userId}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Account Settings Card */}
      <Card>
        <CardHeader className="mb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-4 w-4 text-[var(--app-accent)]" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <div className="space-y-3">
          <div className="flex items-center justify-between border border-[var(--app-border)] p-3">
            <div>
              <p className="text-sm font-medium text-[var(--app-text)]">Account Status</p>
              <p className="text-xs text-[var(--app-muted)]">Your account is active</p>
            </div>
            <span className="bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-[var(--app-success)]">
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
