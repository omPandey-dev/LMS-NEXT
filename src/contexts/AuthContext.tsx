import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/api/routes/auth';
import { storage } from '@/utils/storage';
import { getUserFromToken } from '@/utils/jwt';
import type { UserInfo } from '@/types';

interface AuthContextType {
  user: UserInfo | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const token = storage.getToken();

      if (token) {
        const userInfo = getUserFromToken(token);
        const fallbackUser = {
          email: storage.getUserEmail(),
          role: storage.getUserRole(),
        };

        if (userInfo?.role) {
          storage.setUserRole(userInfo.role);
        }
        if (userInfo?.email) {
          storage.setUserEmail(userInfo.email);
        }

        setUser(userInfo || fallbackUser);
      } else {
        storage.clearAll();
        setUser(null);
      }

      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    storage.setToken(response.token);

    const userInfo = getUserFromToken(response.token) || {
      email: response.email,
      role: response.roles?.[0],
    };

    if (userInfo.role) {
      storage.setUserRole(userInfo.role);
    }
    if (userInfo.email) {
      storage.setUserEmail(userInfo.email);
    }

    setUser(userInfo);
  };

  const logout = () => {
    // Clear all stored authentication data
    storage.clearAll();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: storage.isAuthenticated(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
