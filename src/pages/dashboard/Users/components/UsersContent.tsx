import { useState, useEffect } from 'react';
import { usersApi, type User } from '@/api/routes/users';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const UsersContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await usersApi.getAllUsers();
        setUsers(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to fetch users');
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-4 text-sm text-[var(--app-text-soft)]">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--app-text)]">All Users</h1>
        <span className="text-xs text-[var(--app-muted)]">{users.length} records</span>
      </div>

      <section className="rounded border border-[var(--app-border)] bg-[var(--app-panel)]">
        <div className="border-b border-[var(--app-border)] px-4 py-3">
          <h2 className="text-sm font-semibold text-[var(--app-text)]">Users</h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-5 w-5 animate-spin text-[var(--app-accent)]" />
          </div>
        ) : users.length === 0 ? (
          <div className="py-10 text-center text-sm text-[var(--app-muted)]">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-xs">
              <thead className="bg-[var(--app-panel-muted)] uppercase text-[var(--app-muted)]">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">ID</th>
                  <th className="px-4 py-2.5 font-semibold">Full Name</th>
                  <th className="px-4 py-2.5 font-semibold">Email</th>
                  <th className="px-4 py-2.5 font-semibold">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--app-border)]">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-[var(--app-hover)]">
                    <td className="px-4 py-3 text-[var(--app-muted)]">{user.id}</td>
                    <td className="px-4 py-3 font-medium text-[var(--app-text)]">{user.fullName || 'N/A'}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.phoneNumber || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};
