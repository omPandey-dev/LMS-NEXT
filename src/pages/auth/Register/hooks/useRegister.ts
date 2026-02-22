import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { authApi } from '@/api/routes/auth';
import { registerSchema, type RegisterFormData } from '../schemas/registerSchema';
import { registerApi } from '../api/registerApi';

export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await authApi.register({
        email: data.email,
        password: data.password,
        role: data.role,
        fullName: '', // Register page doesn't have fullName, using empty string
      });
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error: any) {
      registerApi.handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
};
