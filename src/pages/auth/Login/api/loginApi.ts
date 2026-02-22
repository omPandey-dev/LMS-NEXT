import { toast } from 'sonner';

export const loginApi = {
  handleError: (error: any): string => {
    const errorMessage = error?.response?.data || 'Login failed. Please try again.';
    toast.error(errorMessage);
    return errorMessage;
  },
};
