import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { FiCalendar, FiUsers, FiBarChart2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--text);
`;

const WelcomeCard = styled(motion.div)`
  background: var(--gradient-primary);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const WelcomeTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border-left: 5px solid var(--primary);
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--text);
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.75rem;
      color: var(--primary);
    }
  }
  
  p {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
  }
  
  span {
    font-size: 0.9rem;
    color: var(--text-light);
  }
`;

const ActionLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  svg {
    margin-right: 1rem;
    color: var(--primary);
    font-size: 1.25rem;
  }
`;

export const DashboardHome = () => {
  const { user } = useAuth();
  
  const firstName = user?.firstName || 'Преподаватель';
  
  return (
    <div>
      <PageTitle>Панель управления</PageTitle>
      
      <WelcomeCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <WelcomeTitle>Привет, {firstName}!</WelcomeTitle>
        <WelcomeText>
          Здесь вы можете управлять вашими учениками, просматривать расписание, 
          отслеживать статистику и многое другое.
        </WelcomeText>
      </WelcomeCard>
      
      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3>
            <FiUsers />
            Ученики
          </h3>
          <p>12</p>
          <span>Активных учеников</span>
        </StatCard>
        
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>
            <FiCalendar />
            Занятия
          </h3>
          <p>8</p>
          <span>Запланировано на эту неделю</span>
        </StatCard>
        
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3>
            <FiBarChart2 />
            Активность
          </h3>
          <p>85%</p>
          <span>Средняя посещаемость</span>
        </StatCard>
      </StatsGrid>
      
      <div>
        <h2>Быстрые действия</h2>
        <ActionLinks>
          <ActionLink to="/dashboard/calendar">
            <FiCalendar />
            Просмотр расписания
          </ActionLink>
          
          <ActionLink to="/dashboard/students">
            <FiUsers />
            Управление учениками
          </ActionLink>
          
          <ActionLink to="/dashboard/stats">
            <FiBarChart2 />
            Анализ успеваемости
          </ActionLink>
        </ActionLinks>
      </div>
    </div>
  );
}; 