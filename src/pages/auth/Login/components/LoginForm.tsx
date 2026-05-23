import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { LoginFormData } from '../schemas/loginSchema';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';
import { Eye, EyeOff, GraduationCap, UserRound } from 'lucide-react';

interface LoginFormProps {
  form: ReturnType<typeof useForm<LoginFormData>>;
  onSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
}

export const LoginForm = ({ form, onSubmit, isLoading }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'admin' | 'instructor'>('admin');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="w-full max-w-sm">
      <div className="mb-7 text-center">
        <h1 className="text-2xl font-semibold text-[var(--app-text)]">Welcome to LMS!</h1>
      </div>

      <div className="mb-7 grid grid-cols-2 gap-5">
        <button
          type="button"
          onClick={() => setRole('admin')}
          className={cn(
            'flex h-28 flex-col items-center justify-center rounded border bg-[var(--app-panel)] text-xs font-medium text-[var(--app-text-soft)] shadow-sm transition-all hover:-translate-y-0.5',
            role === 'admin' ? 'border-[var(--app-accent)] ring-2 ring-[var(--app-accent)]/15' : 'border-[var(--app-border)]',
          )}
          aria-pressed={role === 'admin'}
        >
          <span className="mb-3 flex h-14 w-16 items-center justify-center bg-[var(--app-accent-soft)] text-[var(--app-accent)]">
            <UserRound className="h-9 w-9" />
          </span>
          Admin
        </button>
        <button
          type="button"
          onClick={() => setRole('instructor')}
          className={cn(
            'flex h-28 flex-col items-center justify-center rounded border bg-[var(--app-panel)] text-xs font-medium text-[var(--app-text-soft)] shadow-sm transition-all hover:-translate-y-0.5',
            role === 'instructor' ? 'border-[var(--app-accent)] ring-2 ring-[var(--app-accent)]/15' : 'border-[var(--app-border)]',
          )}
          aria-pressed={role === 'instructor'}
        >
          <span className="mb-3 flex h-14 w-16 items-center justify-center bg-[var(--app-accent-soft)] text-[var(--app-accent)]">
            <GraduationCap className="h-9 w-9" />
          </span>
          Instructor
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        <Input
          type="email"
          placeholder="Enter your email address"
          {...register('email')}
          error={errors.email?.message}
          autoComplete="email"
          className="h-10"
        />

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            {...register('password')}
            error={errors.password?.message}
            autoComplete="current-password"
            className="h-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-[var(--app-muted)] transition-colors hover:text-[var(--app-accent)] focus:outline-none focus:text-[var(--app-accent)]"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="pt-1 text-right">
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-[var(--app-muted)] transition-colors hover:text-[var(--app-accent)]"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 h-10 w-full bg-[var(--app-accent)] text-sm font-semibold text-white transition-colors hover:brightness-95 focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};
