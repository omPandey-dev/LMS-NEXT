import { RegisterHeader } from './components/RegisterHeader';
import { RegisterForm } from './components/RegisterForm';
import { useRegister } from './hooks/useRegister';

export const Register = () => {
  const { form, onSubmit, isLoading } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50/50 to-blue-50/50 p-4 transition-colors dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        <RegisterHeader />
        <RegisterForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};
