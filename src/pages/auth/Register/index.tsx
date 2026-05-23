import { RegisterHeader } from './components/RegisterHeader';
import { RegisterForm } from './components/RegisterForm';
import { useRegister } from './hooks/useRegister';

export const Register = () => {
  const { form, onSubmit, isLoading } = useRegister();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--app-bg)] p-4 text-[var(--app-text)] transition-colors">
      <div className="w-full max-w-md">
        <RegisterHeader />
        <RegisterForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};
