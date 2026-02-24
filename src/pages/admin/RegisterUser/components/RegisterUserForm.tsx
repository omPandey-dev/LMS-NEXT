import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckCircle2 } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegisterFormData } from '../schemas/registerSchema';

interface RegisterUserFormProps {
  form: UseFormReturn<RegisterFormData>;
  onSubmit: (data: RegisterFormData) => void;
  isLoading: boolean;
  isSuperAdmin: boolean;
  availableRoles: string[];
}

const inputBase =
  'mt-3 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 transition focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-700';

export const RegisterUserForm = ({
  form,
  onSubmit,
  isLoading,
  isSuperAdmin,
  availableRoles,
}: RegisterUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  return (
    <Card className="mx-auto w-full max-w-5xl overflow-hidden rounded-b-2xl border border-gray-200 border-t-0 bg-gray-50 p-0 shadow-none dark:border-gray-700 dark:bg-gray-900/80">
      <form onSubmit={handleSubmit(onSubmit)} className="border-t border-gray-200 px-8 py-10 dark:border-gray-700">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          <div>
            <label className="text-[2rem] font-semibold text-gray-800 dark:text-gray-100">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              {...register('fullName')}
              className={`${inputBase} ${errors.fullName ? 'border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30' : ''}`}
              autoComplete="name"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">First and last name</p>
            {errors.fullName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="text-[2rem] font-semibold text-gray-800 dark:text-gray-100">Email</label>
            <input
              type="email"
              placeholder="example@example.com"
              {...register('email')}
              className={`${inputBase} ${errors.email ? 'border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30' : ''}`}
              autoComplete="email"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Work email address</p>
            {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-[2rem] font-semibold text-gray-800 dark:text-gray-100">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register('password')}
              className={`${inputBase} ${errors.password ? 'border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30' : ''}`}
              autoComplete="new-password"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Minimum 6 characters</p>
            {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>}
          </div>

          <div>
            <label className="text-[2rem] font-semibold text-gray-800 dark:text-gray-100">User Role</label>
            <select
              {...register('role')}
              className={`${inputBase} appearance-none ${errors.role ? 'border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30' : ''}`}
            >
              <option value="">Select a user role</option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role === 'Admin'
                    ? 'Admin'
                    : role === 'OrganizationAdmin'
                      ? 'Organization Admin'
                      : role}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Permission level for this user</p>
            {errors.role && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role.message}</p>}
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          {isSuperAdmin ? (
            <p className="flex items-start text-sm text-gray-700 dark:text-gray-200">
              <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 text-green-600" />
              SuperAdmin Access: You can assign Admin and Organization Admin roles.
            </p>
          ) : (
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Note: Only SuperAdmin users can create Admin and Organization Admin accounts.
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row dark:border-gray-700">
          <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="min-w-[170px]">
            {isLoading ? 'Registering...' : 'Register User'}
          </Button>
          <Button type="button" variant="outline" size="md" onClick={() => reset()} disabled={isLoading} className="min-w-[130px]">
            Clear Form
          </Button>
        </div>
      </form>
    </Card>
  );
};
