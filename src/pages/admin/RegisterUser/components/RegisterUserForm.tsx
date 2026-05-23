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
  'w-full rounded border border-[var(--app-border)] bg-[var(--app-panel)] px-3 py-2 text-sm text-[var(--app-text)] transition-all duration-200 focus:border-[var(--app-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)] disabled:cursor-not-allowed disabled:bg-[var(--app-panel-muted)] disabled:text-[var(--app-muted)] hover:border-[var(--app-accent)]';

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
    <Card className="mx-auto w-full max-w-5xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter full name"
              {...register('fullName')}
              error={errors.fullName?.message}
              autoComplete="name"
            />
            <p className="mt-1.5 text-xs text-[var(--app-muted)]">First and last name</p>
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
            <p className="mt-1.5 text-xs text-[var(--app-muted)]">Work email address</p>
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
            <p className="mt-1.5 text-xs text-[var(--app-muted)]">Minimum 6 characters</p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--app-text-soft)]">User Role</label>
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
            <p className="mt-1.5 text-xs text-[var(--app-muted)]">Permission level for this user</p>
            {errors.role && <p className="mt-1 text-xs text-[var(--app-danger)]">{errors.role.message}</p>}
          </div>
        </div>

        <div className="border border-[var(--app-border)] bg-[var(--app-panel-muted)] p-3">
          {isSuperAdmin ? (
            <p className="flex items-start text-xs text-[var(--app-text-soft)]">
              <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 text-[var(--app-success)]" />
              SuperAdmin Access: You can assign Admin and Organization Admin roles.
            </p>
          ) : (
            <p className="text-xs text-amber-500">
              Note: Only SuperAdmin users can create Admin and Organization Admin accounts.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--app-border)] pt-4 sm:flex-row">
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
