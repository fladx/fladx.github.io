import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

const FormContainer = styled(motion.form)`
  width: 100%;
  max-width: 400px;
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

const RegisterLink = styled.p`
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

export const LoginForm = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    try {
      setLoading(true);
      await login(username, password);
      // После успешного входа пользователь будет перенаправлен через AuthContext
    } catch (err) {
      setError('Неверное имя пользователя или пароль');
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
      <Title>Вход в систему</Title>
      
      {error && (
        <ErrorMessage
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </ErrorMessage>
      )}
      
      <Input
        label="Имя пользователя"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Введите имя пользователя"
        required
      />
      
      <Input
        label="Пароль"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Введите пароль"
        required
      />
      
      <Button
        type="submit"
        fullWidth
        disabled={loading}
      >
        {loading ? 'Загрузка...' : 'Войти'}
      </Button>
      
      <RegisterLink>
        Нет аккаунта?
        <Link to="/register">Зарегистрироваться</Link>
      </RegisterLink>
    </FormContainer>
  );
}; 