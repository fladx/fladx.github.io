import styled from 'styled-components';
import { LoginForm } from '../components/auth/LoginForm';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const PageBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7ff 0%, #e9ecff 100%);
  z-index: -1;
`;

const DecorativeCircle = styled(motion.div)<{ size: number; top: number; left: number; color: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.color};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  opacity: 0.5;
  z-index: -1;
`;

export const LoginPage = () => {
  return (
    <PageContainer>
      <PageBackground />
      
      {/* Декоративные элементы */}
      <DecorativeCircle
        size={200}
        top={20}
        left={10}
        color="#4263EB"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1 }}
      />
      <DecorativeCircle
        size={150}
        top={70}
        left={80}
        color="#FCC419"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <DecorativeCircle
        size={100}
        top={30}
        left={70}
        color="#4263EB"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
      
      <LoginForm />
    </PageContainer>
  );
}; 