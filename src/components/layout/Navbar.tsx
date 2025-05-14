import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { Button } from '../ui/Button';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4263EB;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  span {
    color: #212529;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? '#4263EB' : '#495057'};
  text-decoration: none;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  padding: 0.5rem 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background-color: #4263EB;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #495057;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  max-width: 300px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  z-index: 200;
  display: flex;
  flex-direction: column;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    font-weight: 600;
    color: #4263EB;
  }
`;

const UserRole = styled.div`
  font-size: 0.8rem;
  color: #868e96;
  margin-top: 0.25rem;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
`;

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const getRoleText = () => {
    switch (user?.role) {
      case 'STUDENT':
        return 'Ученик';
      case 'TEACHER':
        return 'Репетитор';
      case 'ADMIN':
        return 'Администратор';
      default:
        return '';
    }
  };

  return (
    <NavbarContainer>
      <Logo to="/">
        Teachify
      </Logo>
      
      <NavLinks>
        <NavLink to="/" $isActive={location.pathname === '/'}>
          Главная
        </NavLink>
        
        {isAuthenticated ? (
          <>
            {user?.role === 'STUDENT' && (
              <NavLink to="/tutors" $isActive={location.pathname === '/tutors'}>
                Скоро
              </NavLink>
            )}
            
            {user?.role === 'TEACHER' && (
              <NavLink to="/profile" $isActive={location.pathname === '/profile'}>
                Мой профиль
              </NavLink>
            )}
            
            <NavLink to="/dashboard" $isActive={location.pathname === '/dashboard'}>
              Личный кабинет
            </NavLink>
            
            <Button variant="outline" onClick={handleLogout}>
              Выйти
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/login" $isActive={location.pathname === '/login'}>
              Вход
            </NavLink>
            
            <NavLink to="/register" $isActive={location.pathname === '/register'}>
              Регистрация
            </NavLink>
          </>
        )}
      </NavLinks>
      
      <MobileMenuButton onClick={toggleMobileMenu}>
        <FiMenu />
      </MobileMenuButton>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <MobileMenuHeader>
                <Logo to="/" onClick={closeMobileMenu}>
                  Teachify
                </Logo>
                <MobileMenuButton onClick={closeMobileMenu}>
                  <FiX />
                </MobileMenuButton>
              </MobileMenuHeader>
              
              {isAuthenticated && user && (
                <UserInfo>
                  <FiUser />
                  <div>
                    <span>{user.username}</span>
                    <UserRole>{getRoleText()}</UserRole>
                  </div>
                </UserInfo>
              )}
              
              <MobileNavLinks>
                <NavLink to="/" $isActive={location.pathname === '/'} onClick={closeMobileMenu}>
                  Главная
                </NavLink>
                
                {isAuthenticated ? (
                  <>
                    {user?.role === 'STUDENT' && (
                      <NavLink to="/tutors" $isActive={location.pathname === '/tutors'} onClick={closeMobileMenu}>
                        Скоро
                      </NavLink>
                    )}
                    
                    {user?.role === 'TEACHER' && (
                      <NavLink to="/profile" $isActive={location.pathname === '/profile'} onClick={closeMobileMenu}>
                        Мой профиль
                      </NavLink>
                    )}
                    
                    <NavLink to="/dashboard" $isActive={location.pathname === '/dashboard'} onClick={closeMobileMenu}>
                      Личный кабинет
                    </NavLink>
                    
                    <Button variant="outline" onClick={handleLogout} fullWidth>
                      <FiLogOut style={{ marginRight: '0.5rem' }} />
                      Выйти
                    </Button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" $isActive={location.pathname === '/login'} onClick={closeMobileMenu}>
                      Вход
                    </NavLink>
                    
                    <NavLink to="/register" $isActive={location.pathname === '/register'} onClick={closeMobileMenu}>
                      Регистрация
                    </NavLink>
                  </>
                )}
              </MobileNavLinks>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
}; 