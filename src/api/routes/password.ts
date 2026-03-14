import api from '@/api/services/api';

export const passwordApi = {
  forgetPassword: async (email: string) => {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await api.post('/verify-otp', { email, otp });
    return response.data;
  },

  resetPassword: async (email: string, otp: string, newPassword: string) => {
    const response = await api.post('/reset-password', { email, otp, newPassword });
    return response.data;
  },
};
