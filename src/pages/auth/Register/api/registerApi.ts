import { toast } from 'sonner';

export const registerApi = {
  handleError: (error: any): string => {
    const errorMessage = error?.response?.data || 'Registration failed. Please try again.';
    toast.error(errorMessage);
    return errorMessage;
  },
};
