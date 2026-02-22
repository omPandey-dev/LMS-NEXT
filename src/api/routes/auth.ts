import api from '../services/api';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types';

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<{ message: string; email: string; role: string }> => {
    const response = await api.post('register', data);
    return response.data;
  },
};
