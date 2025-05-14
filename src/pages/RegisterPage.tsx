import styled from 'styled-components';
import { RegisterForm } from '../components/auth/RegisterForm';
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

const DecorativeShape = styled(motion.div)<{ 
  width: number; 
  height: number; 
  top: number; 
  right: number; 
  rotate: number;
  color: string;
}>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${props => props.color};
  top: ${props => props.top}%;
  right: ${props => props.right}%;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  transform: rotate(${props => props.rotate}deg);
  opacity: 0.1;
  z-index: -1;
`;

const DecorativeCircle = styled(motion.div)<{ size: number; bottom: number; left: number; color: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.color};
  bottom: ${props => props.bottom}%;
  left: ${props => props.left}%;
  opacity: 0.1;
  z-index: -1;
`;

export const RegisterPage = () => {
  return (
    <PageContainer>
      <PageBackground />
      
      {/* Декоративные элементы */}
      <DecorativeShape
        width={300}
        height={300}
        top={10}
        right={5}
        rotate={45}
        color="#4263EB"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1 }}
      />
      <DecorativeShape
        width={200}
        height={200}
        top={60}
        right={15}
        rotate={-20}
        color="#FCC419"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <DecorativeCircle
        size={150}
        bottom={10}
        left={10}
        color="#4263EB"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
      
      <RegisterForm />
    </PageContainer>
  );
}; 