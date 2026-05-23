import api, { type ApiRequestConfig } from '../services/api';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

export const usersApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/api/GetAllUsers', {
      skipAuthRedirect: true,
    } as ApiRequestConfig);
    return response.data;
  },
};
