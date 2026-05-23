import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const USER_ROLE_KEY = 'user_role';
const USER_EMAIL_KEY = 'user_email';

export const storage = {
  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: 'strict' });
  },

  getToken: (): string | undefined => {
    return Cookies.get(TOKEN_KEY);
  },

  setUserRole: (role: string) => {
    Cookies.set(USER_ROLE_KEY, role, { expires: 7, sameSite: 'strict' });
  },

  getUserRole: (): string | undefined => {
    return Cookies.get(USER_ROLE_KEY);
  },

  setUserEmail: (email: string) => {
    Cookies.set(USER_EMAIL_KEY, email, { expires: 7, sameSite: 'strict' });
  },

  getUserEmail: (): string | undefined => {
    return Cookies.get(USER_EMAIL_KEY);
  },

  removeToken: () => {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_ROLE_KEY);
    Cookies.remove(USER_EMAIL_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get(TOKEN_KEY);
  },

  clearAll: () => {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_ROLE_KEY);
    Cookies.remove(USER_EMAIL_KEY);
  },
};
