import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Settings as SettingsIcon } from 'lucide-react';

export const SettingsContent = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-4 text-sm text-[var(--app-text-soft)]">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--app-text)]">Settings</h1>
      </div>

      <Card>
        <CardHeader className="border-b border-[var(--app-border)] pb-3">
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4 text-[var(--app-accent)]" />
            Account
          </CardTitle>
        </CardHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs text-[var(--app-muted)]">Email</p>
            <p className="text-sm font-medium text-[var(--app-text)]">{user?.email || 'N/A'}</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-[var(--app-muted)]">Role</p>
            <p className="text-sm font-medium capitalize text-[var(--app-text)]">{user?.role || 'N/A'}</p>
          </div>
        </div>
        <div className="mt-4 border-t border-[var(--app-border)] pt-3 text-xs text-[var(--app-muted)]">
          More settings will be available as additional APIs are implemented.
        </div>
      </Card>
    </div>
  );
};
