import { LoginHeader } from './components/LoginHeader';
import { LoginForm } from './components/LoginForm';
import { useLogin } from './hooks/useLogin';

export const Login = () => {
  const { form, onSubmit, isLoading } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50/30 p-4 transition-colors dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        <LoginHeader />
        <LoginForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};
