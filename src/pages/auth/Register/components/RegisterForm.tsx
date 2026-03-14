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
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">Register</CardTitle>
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
          <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">
            Role
          </label>
          <select
            {...register('role')}
            className={`w-full px-4 py-2.5 rounded-lg border bg-white text-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 ${
              errors.role ? 'border-rose-400 focus:ring-rose-400' : 'border-blue-200/60 hover:border-blue-300/60 dark:border-gray-600'
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
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role.message}</p>
          )}
        </div>

        <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full">
          <UserPlus className="w-5 h-5 mr-2" />
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </Card>
  );
};
