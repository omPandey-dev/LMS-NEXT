import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
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

const selectBase =
  'w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 bg-white text-slate-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:bg-slate-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:disabled:bg-gray-900 border-blue-200/60 hover:border-blue-300/60 dark:hover:border-gray-500';

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
    <Card className="mx-auto mt-4 w-full max-w-5xl p-0 overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-5 sm:px-6 sm:py-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          <div>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter full name"
              {...register('fullName')}
              error={errors.fullName?.message}
              autoComplete="name"
            />
            <p className="mt-1.5 text-xs text-slate-500 dark:text-gray-400">First and last name</p>
          </div>

          <div>
            <Input
              label="Email"
              type="email"
              placeholder="example@example.com"
              {...register('email')}
              error={errors.email?.message}
              autoComplete="email"
            />
            <p className="mt-1.5 text-xs text-slate-500 dark:text-gray-400">Work email address</p>
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              {...register('password')}
              error={errors.password?.message}
              autoComplete="new-password"
            />
            <p className="mt-1.5 text-xs text-slate-500 dark:text-gray-400">Minimum 6 characters</p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">User Role</label>
            <select
              {...register('role')}
              className={`${selectBase} ${errors.role ? 'border-rose-400 focus:ring-rose-400' : ''}`}
            >
              <option value="">Select a user role</option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role === 'Admin' ? 'Admin' : role === 'OrganizationAdmin' ? 'Organization Admin' : role}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-gray-400">Permission level for this user</p>
            {errors.role && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role.message}</p>}
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-blue-100/60 bg-white/70 p-4 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/60">
          {isSuperAdmin ? (
            <p className="flex items-start text-sm text-slate-700 dark:text-gray-200">
              <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              SuperAdmin Access: You can assign Admin and Organization Admin roles.
            </p>
          ) : (
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Note: Only SuperAdmin users can create Admin and Organization Admin accounts.
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-blue-100/60 pt-5 sm:flex-row dark:border-gray-700">
          <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="min-w-[160px]">
            {isLoading ? 'Registering...' : 'Register User'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => reset()}
            disabled={isLoading}
            className="min-w-[120px]"
          >
            Clear Form
          </Button>
        </div>
      </form>
    </Card>
  );
};
