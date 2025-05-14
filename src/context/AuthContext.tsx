import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthResponse, Role } from '../types/auth';
import { authService } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string; role: Role } | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    username: string,
    phone: string,
    role: Role,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ username: string; role: Role } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Проверка, есть ли сохраненный токен
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role') as Role | null;

    if (token && username && role) {
      setIsAuthenticated(true);
      setUser({ username, role });
    }

    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login({ username, password });
      handleAuthResponse(response);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    username: string,
    phone: string,
    role: Role,
    password: string
  ) => {
    try {
      setIsLoading(true);
      const response = await authService.register({
        firstName,
        lastName,
        usernameField: username,
        phone,
        role,
        password,
      });
      handleAuthResponse(response);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthResponse = (response: AuthResponse) => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.usernameField);
    localStorage.setItem('role', response.role);
    
    setIsAuthenticated(true);
    setUser({
      username: response.usernameField,
      role: response.role,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, isLoading }}>
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