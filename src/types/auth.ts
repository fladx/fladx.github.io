export type Role = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  usernameField: string;
  phone: string;
  role: Role;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  usernameField: string;
  role: Role;
} 