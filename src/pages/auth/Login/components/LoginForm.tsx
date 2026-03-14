import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { LoginFormData } from '../schemas/loginSchema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { LogIn, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  form: ReturnType<typeof useForm<LoginFormData>>;
  onSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
}

export const LoginForm = ({ form, onSubmit, isLoading }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email?.message}
          autoComplete="email"
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
            autoComplete="current-password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-slate-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full">
          <LogIn className="w-5 h-5 mr-2" />
          Sign In
        </Button>
      </form>

      <div className="mt-6 space-y-3 text-center">
        <Link
          to="/forgot-password"
          className="block text-sm text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
        >
          Forgot Password?
        </Link>
        <p className="text-sm text-slate-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </Card>
  );
};
