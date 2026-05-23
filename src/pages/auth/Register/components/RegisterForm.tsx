import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { RegisterFormData } from '../schemas/registerSchema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { UserPlus } from 'lucide-react';

interface RegisterFormProps {
  form: ReturnType<typeof useForm<RegisterFormData>>;
  onSubmit: (data: RegisterFormData) => void;
  isLoading: boolean;
}

export const RegisterForm = ({ form, onSubmit, isLoading }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email?.message}
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password?.message}
          autoComplete="new-password"
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
        />

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--app-text-soft)]">
            Role
          </label>
          <select
            {...register('role')}
            className={`w-full rounded border border-[var(--app-border)] bg-[var(--app-panel)] px-3 py-2 text-sm text-[var(--app-text)] transition-all duration-200 focus:border-[var(--app-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)] ${
              errors.role ? 'border-rose-400 focus:ring-rose-400' : 'hover:border-[var(--app-accent)]'
            }`}
          >
            <option value="">Select a role</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Staff">Staff</option>
            <option value="OrganizationAdmin">Organization Admin</option>
            <option value="SuperAdmin">Super Admin</option>
            <option value="Parent">Parent</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-xs text-[var(--app-danger)]">{errors.role.message}</p>
          )}
        </div>

        <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full">
          <UserPlus className="mr-2 h-4 w-4" />
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[var(--app-muted)]">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[var(--app-accent)] transition-colors hover:brightness-95">
            Sign in
          </Link>
        </p>
      </div>
    </Card>
  );
};
