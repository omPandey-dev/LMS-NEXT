import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { Lock } from 'lucide-react';

export const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--app-bg)] p-4 text-[var(--app-text)] transition-colors">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center bg-[var(--app-accent)]">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="mb-2 text-xl font-semibold text-[var(--app-text)]">
            Reset Password
          </h1>
          <p className="text-sm text-[var(--app-muted)]">
            Follow the steps to reset your password
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};
