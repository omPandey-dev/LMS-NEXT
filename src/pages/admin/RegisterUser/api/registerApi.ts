import { authApi } from '@/api/routes/auth';
import type { RegisterRequest } from '@/types';
import { toast } from 'sonner';

export const registerUserApi = {
  register: async (data: RegisterRequest): Promise<void> => {
    try {
      await authApi.register(data);
      toast.success(`User ${data.fullName} (${data.email}) registered successfully with role: ${data.role}`);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.response?.data || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  },
};
