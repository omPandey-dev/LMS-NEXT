import api from '../services/api';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

export const usersApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/api/GetAllUsers');
    return response.data;
  },
};
