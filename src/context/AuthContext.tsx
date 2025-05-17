import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthResponse, Role, UserProfileResponse } from '../types/auth';
import { authService, userService } from '../services/api';
import { useNotification } from './NotificationContext';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfileResponse | null;
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
  const [user, setUser] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    // Проверка, есть ли сохраненный токен
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoading(true);
      userService.getCurrentUser()
        .then(userData => {
          setIsAuthenticated(true);
          setUser(userData);
        })
        .catch(() => {
          // Если не получилось получить данные пользователя, очищаем токен
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
          addNotification('error', 'Сессия устарела. Пожалуйста, войдите снова.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [addNotification]);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Отправка запроса на вход:', { username });
      const response = await authService.login({ username, password });
      console.log('Получен ответ на вход:', response);
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
    console.log('Обработка ответа аутентификации:', response);
    localStorage.setItem('token', response.token);
    
    // После получения токена, запрашиваем информацию о пользователе
    console.log('Запрос информации о пользователе с токеном');
    userService.getCurrentUser()
      .then(userData => {
        console.log('Получена информация о пользователе:', userData);
        setIsAuthenticated(true);
        setUser(userData);
        addNotification('success', 'Вы успешно вошли в систему!');
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        addNotification('error', 'Ошибка получения данных пользователя');
        logout();
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('lastTeacherPath');
    
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