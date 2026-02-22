import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { registerSchema, type RegisterFormData } from '../schemas/registerSchema';
import { registerUserApi } from '../api/registerApi';
import type { RegisterRequest } from '@/types';

export const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'SuperAdmin';

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const registerData: RegisterRequest = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      await registerUserApi.register(registerData);
      form.reset();
    } catch (error) {
      // Error is already handled in registerUserApi
    } finally {
      setIsLoading(false);
    }
  };

  // Get available roles based on current user's role
  // Only SuperAdmin can select Admin and OrganizationAdmin roles
  const availableRoles = isSuperAdmin
    ? ['Admin', 'OrganizationAdmin', 'Teacher', 'Student', 'Staff', 'Parent']
    : ['Teacher', 'Student', 'Staff', 'Parent'];

  return {
    form,
    onSubmit,
    isLoading,
    isSuperAdmin,
    availableRoles,
  };
};
