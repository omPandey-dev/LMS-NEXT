export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  roles: string[];
}

export interface UserInfo {
  userId?: string;
  email?: string;
  role?: string;
  message?: string;
}

export interface ApiResponse<T> {
  data?: T;
  message: string;
  statusCode?: number;
  isSuccess?: boolean;
}
