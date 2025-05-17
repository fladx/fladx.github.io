export type Role = 'STUDENT' | 'TEACHER';

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

export interface ErrorResponse {
  message: string;
}

export interface UserProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  telegramId?: number;
  role: Role;
  createdAt: string;
  updatedAt?: string;
}

export interface StudentCourse {
  courseId: number;
  courseName: string;
  courseDescription?: string | null;
  startDate: string;
  status: string;
  price: number;
}

export interface StudentResponse {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  balance: number;
  level: number;
  courses: StudentCourse[];
}

export interface AddStudentCourseRequest {
  studentId: number;
  courseId: number;
  startDate: string;
  endDate?: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED' | 'PAUSED';
  price: number;
} 