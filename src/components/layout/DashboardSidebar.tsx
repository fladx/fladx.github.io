import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiCalendar, 
  FiUsers, 
  FiBarChart2, 
  FiUser, 
  FiHome,
  FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: var(--gradient-primary);
  color: white;
  padding: 2rem 1rem;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NavItem = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
  background-color: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  svg {
    margin-right: 1rem;
    font-size: 1.2rem;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto;
  font-size: 1rem;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  svg {
    margin-right: 1rem;
    font-size: 1.2rem;
  }
`;

export const DashboardSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    logout();
    // После выхода пользователя перенаправит на главную страницу
    // благодаря ProtectedRoute в App.tsx
  };
  
  return (
    <SidebarContainer>
      <Logo>Teachify</Logo>
      
      <NavItems>
        <NavItem to="/dashboard" $isActive={isActive('/dashboard')}>
          <FiHome />
          Главная
        </NavItem>
        
        <NavItem to="/dashboard/calendar" $isActive={isActive('/dashboard/calendar')}>
          <FiCalendar />
          Календарь
        </NavItem>
        
        <NavItem to="/dashboard/students" $isActive={isActive('/dashboard/students')}>
          <FiUsers />
          Ученики
        </NavItem>
        
        <NavItem to="/dashboard/stats" $isActive={isActive('/dashboard/stats')}>
          <FiBarChart2 />
          Статистика
        </NavItem>
        
        <NavItem to="/dashboard/profile" $isActive={isActive('/dashboard/profile')}>
          <FiUser />
          Профиль
        </NavItem>
      </NavItems>
      
      <LogoutButton onClick={handleLogout}>
        <FiLogOut />
        Выйти
      </LogoutButton>
    </SidebarContainer>
  );
}; 