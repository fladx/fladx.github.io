import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { studentService, courseService } from '../../services/api';
import type { StudentResponse, AddStudentCourseRequest } from '../../types/auth';
import { Button } from '../../components/ui/Button';
import { useNotification } from '../../context/NotificationContext';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30, 34, 90, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.25s;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #232b5d 60%, #3a1c71 100%);
  border-radius: 18px;
  padding: 36px 28px 28px 28px;
  min-width: 340px;
  box-shadow: 0 8px 32px 0 rgba(58,28,113,0.25), 0 1.5px 8px 0 rgba(66,99,235,0.10);
  color: #fff;
  position: relative;
  border: 1.5px solid #4263eb33;
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 18px;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #fff;
  text-shadow: 0 2px 8px #4263eb33;
`;

const ModalInput = styled.input`
  width: 100%;
  margin-bottom: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  background: #232b5d;
  color: #fff;
  font-size: 1rem;
  box-shadow: 0 1px 4px #4263eb22;
  outline: 1.5px solid #4263eb44;
  transition: outline 0.2s;
  &:focus {
    outline: 2px solid #4263eb;
    background: #232b5d;
  }
`;

const ModalSelect = styled.select`
  width: 100%;
  margin-bottom: 16px;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  background: #232b5d;
  color: #fff;
  font-size: 1rem;
  box-shadow: 0 1px 4px #4263eb22;
  outline: 1.5px solid #4263eb44;
  transition: outline 0.2s;
  &:focus {
    outline: 2px solid #4263eb;
    background: #232b5d;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ModalLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 0.98rem;
  color: #b3baff;
  font-weight: 500;
`;

const defaultCourse: Omit<AddStudentCourseRequest, 'studentId'> = {
  courseId: '' as any,
  startDate: '',
  status: 'IN_PROGRESS',
  price: 0,
};

interface CourseOption {
  id: number;
  name: string;
  description?: string;
}

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<StudentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalStudentId, setModalStudentId] = useState<number | null>(null);
  const [courseForm, setCourseForm] = useState<Omit<AddStudentCourseRequest, 'studentId'>>(defaultCourse);
  const [adding, setAdding] = useState(false);
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    studentService.getAllForTeacher()
      .then(setStudents)
      .finally(() => setLoading(false));
  }, []);

  // Загружаем курсы только при первом открытии модалки
  useEffect(() => {
    if (modalStudentId !== null && courses.length === 0) {
      setCoursesLoading(true);
      courseService.getAllCourses()
        .then(setCourses)
        .finally(() => setCoursesLoading(false));
    }
  }, [modalStudentId, courses.length]);

  const openModal = (studentId: number) => {
    setModalStudentId(studentId);
    setCourseForm(defaultCourse);
  };

  const closeModal = () => {
    setModalStudentId(null);
  };

  const handleCourseFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCourseSubmit = async () => {
    if (modalStudentId == null || !courseForm.courseId) return;
    setAdding(true);
    try {
      const payload: AddStudentCourseRequest = {
        ...courseForm,
        studentId: modalStudentId,
        courseId: Number(courseForm.courseId),
        price: Number(courseForm.price)
      };
      const updatedStudent: StudentResponse = await studentService.addCourseToStudent(payload);
      setStudents(students => students.map(s => s.userId === modalStudentId ? updatedStudent : s));
      addNotification('success', 'Курс успешно добавлен ученику!');
      closeModal();
    } catch (e) {
      alert('Ошибка при добавлении курса');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <h1>Ученики</h1>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={() => alert('Создать нового ученика')}>Создать нового ученика</Button>
        <Button style={{ marginLeft: 8 }} onClick={() => alert('Добавить существующего ученика')}>Добавить существующего ученика</Button>
      </div>
      {loading ? (
        <div>Загрузка...</div>
      ) : students.length === 0 ? (
        <div>У вас пока нет учеников.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Username</th>
              <th>Баланс</th>
              <th>Уровень</th>
              <th>Курсы</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.userId} style={{ borderBottom: '1px solid #eee', verticalAlign: 'top' }}>
                <td>{s.firstName}</td>
                <td>{s.lastName}</td>
                <td>{s.username}</td>
                <td>{s.balance}</td>
                <td>{s.level}</td>
                <td>
                  {s.courses && s.courses.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {s.courses.map(c => (
                        <li key={c.courseId} style={{ marginBottom: 8 }}>
                          <b>{c.courseName}</b> — {c.status === 'IN_PROGRESS' ? 'Активен' : c.status}
                          <br />
                          Цена: {c.price}₽<br />
                          Начало: {c.startDate}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span style={{ color: '#888' }}>Нет курсов</span>
                  )}
                </td>
                <td>
                  <Button size="small" onClick={() => openModal(s.userId)}>
                    Добавить курс
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalStudentId !== null && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Добавить курс ученику</ModalTitle>
            <form onSubmit={e => { e.preventDefault(); handleAddCourseSubmit(); }}>
              {coursesLoading ? (
                <div style={{ color: '#fff', marginBottom: 16 }}>Загрузка курсов...</div>
              ) : (
                <div style={{ marginBottom: 12 }}>
                  <ModalLabel htmlFor="courseId">Курс</ModalLabel>
                  <ModalSelect id="courseId" name="courseId" value={courseForm.courseId} onChange={handleCourseFormChange} required>
                    <option value="" disabled>Выберите курс</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </ModalSelect>
                </div>
              )}
              <div style={{ marginBottom: 12 }}>
                <ModalLabel htmlFor="startDate">Дата начала</ModalLabel>
                <ModalInput
                  as="input"
                  id="startDate"
                  type="date"
                  name="startDate"
                  placeholder="Дата начала"
                  value={courseForm.startDate}
                  onChange={handleCourseFormChange}
                  required
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <ModalLabel htmlFor="price">Цена</ModalLabel>
                <ModalInput
                  id="price"
                  type="number"
                  name="price"
                  placeholder="Цена"
                  value={courseForm.price}
                  onChange={handleCourseFormChange}
                  required
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <ModalLabel htmlFor="status">Статус</ModalLabel>
                <ModalSelect id="status" name="status" value={courseForm.status} onChange={handleCourseFormChange} required>
                  <option value="IN_PROGRESS">Активен</option>
                  <option value="COMPLETED">Завершён</option>
                  <option value="ABANDONED">Брошен</option>
                  <option value="PAUSED">Пауза</option>
                </ModalSelect>
              </div>
              <ModalActions>
                <Button size="small" type="submit" disabled={adding || coursesLoading}>
                  {adding ? 'Добавление...' : 'Сохранить'}
                </Button>
                <Button size="small" variant="outline" type="button" onClick={closeModal}>
                  Отмена
                </Button>
              </ModalActions>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export { StudentsPage }; 