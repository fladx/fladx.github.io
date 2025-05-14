import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

const FormContainer = styled(motion.form)`
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2rem;
  text-align: center;
`;

const ErrorMessage = styled(motion.div)`
  background-color: #FFF5F5;
  border-left: 4px solid var(--error);
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0.25rem;
  color: var(--error);
  font-size: 0.9rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--text-light);
  
  a {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
    margin-left: 0.25rem;
    
    &:hover {
      text-decoration: underline;
      color: var(--primary-hover);
    }
  }
`;

const InfoText = styled.p`
  text-align: center;
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  font-style: italic;
  background-color: var(--info);
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: var(--text);
`;

export const RegisterForm = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.username || 
        !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Пожалуйста, заполните все поля');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return false;
    }
    
    if (formData.password.length < 4) {
      setError('Пароль должен содержать минимум 4 символа');
      return false;
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Некорректный формат номера телефона');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      await register(
        formData.firstName,
        formData.lastName,
        formData.username,
        formData.phone,
        'TEACHER', // Всегда регистрируем как преподавателя
        formData.password
      );
      // После успешной регистрации пользователь будет перенаправлен через AuthContext
    } catch (err) {
      setError('Ошибка при регистрации. Возможно, имя пользователя уже занято');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <Title>Регистрация преподавателя</Title>
      
      <InfoText>
        На данной платформе могут регистрироваться только преподаватели.
        Ученики добавляются преподавателями в личном кабинете.
      </InfoText>
      
      {error && (
        <ErrorMessage
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </ErrorMessage>
      )}
      
      <FormRow>
        <Input
          label="Имя"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Иван"
          required
        />
        <Input
          label="Фамилия"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Иванов"
          required
        />
      </FormRow>
      
      <Input
        label="Имя пользователя"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="ivanov123"
        required
      />
      
      <Input
        label="Номер телефона"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+79001234567"
        required
      />
      
      <Input
        label="Пароль"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Минимум 4 символа"
        required
      />
      
      <Input
        label="Подтверждение пароля"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Повторите пароль"
        required
      />
      
      <Button
        type="submit"
        fullWidth
        disabled={loading}
      >
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>
      
      <LoginLink>
        Уже есть аккаунт?
        <Link to="/login">Войти</Link>
      </LoginLink>
    </FormContainer>
  );
}; 