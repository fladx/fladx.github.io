import axios from 'axios';
import type {AuthResponse, LoginRequest, RegisterRequest, StudentResponse, AddStudentCourseRequest} from '../types/auth';

const API_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавление токена в заголовок запроса
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обработка ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Можно добавить логику обработки ошибок здесь
    console.error('API Error:', error.response?.data || error.message);
    
    // Ошибка будет обработана в компоненте, который вызвал API
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
  
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
};

export const userService = {
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
};

export const studentService = {
  getAllForTeacher: async (): Promise<StudentResponse[]> => {
    const response = await api.get<StudentResponse[]>('/teachers/students');
    return response.data;
  },
  createStudent: async (data: RegisterRequest): Promise<StudentResponse> => {
    const response = await api.post<StudentResponse>('/teachers/students', data);
    return response.data;
  },
  addCourseToStudent: async (data: AddStudentCourseRequest) => {
    const response = await api.post('/teachers/students/courses', data);
    return response.data;
  },
};

export const courseService = {
  getAllCourses: async () => {
    const response = await api.get('/courses');
    return response.data;
  },
};

export default api; 