import { RegisterUserHeader } from './components/RegisterUserHeader';
import { RegisterUserForm } from './components/RegisterUserForm';
import { useRegisterUser } from './hooks/useRegisterUser';

export const RegisterUser = () => {
  const { form, onSubmit, isLoading, isSuperAdmin, availableRoles } = useRegisterUser();

  return (
    <div className="space-y-0">
      <RegisterUserHeader />
      <RegisterUserForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isSuperAdmin={isSuperAdmin}
        availableRoles={availableRoles}
      />
    </div>
  );
};
