import { LoginHeader } from './components/LoginHeader';
import { LoginForm } from './components/LoginForm';
import { useLogin } from './hooks/useLogin';

export const Login = () => {
  const { form, onSubmit, isLoading } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <LoginHeader />
        <LoginForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};
