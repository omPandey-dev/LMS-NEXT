import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { Lock } from 'lucide-react';

export const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50/30 p-4 transition-colors dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:text-gray-100 mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-slate-600 dark:text-gray-400">
            Follow the steps to reset your password
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};
