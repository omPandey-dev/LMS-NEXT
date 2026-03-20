import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { usersApi, type User } from '@/api/routes/users';
import { Users as UsersIcon, Loader2 } from 'lucide-react';
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">All Users</h1>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            View and manage all registered users
          </p>
        </div>
      </div>

      {/* Users Table Card */}
      <Card className="border-0 shadow-lg p-4 sm:p-5">
        <CardHeader className="mb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <UsersIcon className="h-4 w-4 text-blue-600" />
            Users List
          </CardTitle>
        </CardHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : users.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Full Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{user.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user.fullName || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {user.phoneNumber || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
